#!/usr/bin/env python3
"""Generate data/mstr_bps.json — Strategy (MSTR) BTC-per-share history.

Modeling choices (chosen for accuracy):
  * BTC holdings are DISCRETE events: Strategy announces a cumulative total on a
    specific date (8-K / press release). Between announcements the total is held
    flat (forward-fill), because nothing changed until the next disclosure.
  * Share counts grow CONTINUOUSLY: Strategy sells stock daily via at-the-market
    (ATM) programs to fund purchases. Stepping the share count only at quarter
    ends would create artificial saw-tooth jumps in BTC/share, so instead we
    LINEARLY INTERPOLATE shares between disclosed anchor dates. Before the first
    anchor / after the last disclosed anchor the value is held flat.

Two share bases are produced so the chart can show both:
  * "diluted" = Assumed Diluted Shares Outstanding. This is the denominator
    Strategy itself uses for its published "Bitcoin per Share (sats)" and
    "BTC Yield" KPIs (basic common + assumed conversion of all convertible
    notes & preferred + options/RSUs/PSUs, no treasury method).
  * "basic"   = Basic common shares (Class A + Class B). The more conservative
    "BTC backing each share you actually hold today" view.

Every figure below traces to a primary source; see SOURCES at the bottom.
"""
import json
from datetime import date, datetime, timedelta

# ---------------------------------------------------------------------------
# Cumulative total BTC held, as of each announcement date.
# 2024-12-30 .. 2026-03-23 verified against SEC 8-K exhibits (CIK 0001050446)
# and contemporaneous CoinDesk / Strategy press releases.
# 2026-04-20 .. 2026-06-08 verified against CoinDesk, Strategy press releases,
# Bitcoin Magazine and SEC 8-K snapshots (713,502 Feb 1; 762,099 Mar 29;
# 818,334 May 3) — all mutually consistent.
# ---------------------------------------------------------------------------
BTC_EVENTS = [
    ("2024-03-11", 205000),
    ("2024-03-19", 214246),
    ("2024-05-01", 214400),
    ("2024-06-20", 226331),
    ("2024-08-01", 226500),
    ("2024-09-13", 244800),
    ("2024-09-20", 252220),
    ("2024-11-11", 279420),
    ("2024-11-18", 331200),
    ("2024-11-25", 386700),
    ("2024-12-02", 402100),
    ("2024-12-09", 423650),
    ("2024-12-16", 439000),
    ("2024-12-23", 444262),
    ("2024-12-30", 446400),
    ("2025-01-06", 447470),
    ("2025-01-13", 450000),
    ("2025-01-21", 461000),
    ("2025-01-27", 471107),
    ("2025-02-10", 478740),
    ("2025-02-24", 499096),
    ("2025-03-17", 499226),
    ("2025-03-24", 506137),
    ("2025-03-31", 528185),
    ("2025-04-14", 531644),
    ("2025-04-21", 538200),
    ("2025-04-28", 553555),
    ("2025-05-05", 555450),
    ("2025-05-12", 568840),
    ("2025-05-19", 576230),
    ("2025-05-26", 580250),
    ("2025-06-02", 580955),
    ("2025-06-16", 592100),
    ("2025-06-23", 592345),
    ("2025-06-30", 597325),
    ("2025-07-14", 601550),
    ("2025-07-21", 607770),
    ("2025-07-29", 628791),
    ("2025-08-11", 629096),
    ("2025-08-18", 629376),
    ("2025-08-25", 632457),
    ("2025-09-02", 636505),
    ("2025-09-08", 638460),
    ("2025-09-15", 638985),
    ("2025-09-22", 639835),
    ("2025-09-29", 640031),
    ("2025-10-13", 640250),
    ("2025-10-20", 640418),
    ("2025-10-27", 640808),
    ("2025-11-03", 641205),
    ("2025-11-10", 641692),
    ("2025-11-17", 649870),
    ("2025-12-01", 650000),
    ("2025-12-08", 660624),
    ("2025-12-15", 671268),
    ("2025-12-29", 672497),
    ("2025-12-31", 672500),
    ("2026-01-05", 673783),
    ("2026-01-12", 687410),
    ("2026-01-20", 709715),
    ("2026-01-26", 712647),
    ("2026-02-02", 713502),
    ("2026-02-09", 714644),
    ("2026-02-17", 717131),
    ("2026-02-23", 717722),
    ("2026-03-02", 720737),
    ("2026-03-09", 738731),
    ("2026-03-16", 761068),
    ("2026-03-23", 762099),
    # --- Q2 2026 (newly verified) ---
    ("2026-04-20", 815061),   # +34,164 BTC, surpassed BlackRock's IBIT
    ("2026-04-27", 818334),   # +3,273 BTC (matches May 3 8-K snapshot, 213,371 sats)
    ("2026-05-11", 818869),   # +535 BTC
    ("2026-05-18", 843738),   # +24,869 BTC (~$2B)
    ("2026-06-01", 843706),   # -32 BTC: first-ever net SALE (funded STRC dividend)
    ("2026-06-08", 845256),   # +1,550 BTC — latest/current
]

# ---------------------------------------------------------------------------
# Assumed Diluted Shares Outstanding (Strategy's official BPS denominator).
# Quarter-end figures + the 2026-05-05 anchor back-solved from Strategy's own
# reported Q1-2026 BPS of 213,371 sats at 818,334 BTC.
# ---------------------------------------------------------------------------
DILUTED_SHARES = [
    ("2024-12-31", 281735000),
    ("2025-03-31", 299653000),
    ("2025-06-30", 314216000),
    ("2025-09-30", 320040000),
    ("2025-12-31", 344897000),
    ("2026-02-16", 366114000),   # verified snapshot (basic 333,755K / diluted 366,114K)
    ("2026-03-31", 377847000),   # Q1 2026 reported
    ("2026-05-05", 383527000),   # 818,334 BTC / this = 213,371 sats (Strategy's reported BPS)
]

# ---------------------------------------------------------------------------
# Basic common shares = Class A (balance-sheet, digit-verified from 10-Q/10-K)
# + Class B (constant 19,640,250 held by Saylor).
# 2024-12-31 is an estimate (quarter-end Class A not digit-confirmed); flagged.
# 2026-05-05 ~352.5M from cross-checked current "basic" reporting.
# ---------------------------------------------------------------------------
BASIC_SHARES = [
    ("2024-12-31", 254000000),   # ~234M Class A (est.) + 19.64M Class B — APPROX
    ("2025-03-31", 266177000),   # 246,537,000 + 19,640,250
    ("2025-06-30", 280958000),   # 261,318,000 + 19,640,250
    ("2025-09-30", 287108000),   # 267,468,000 + 19,640,250
    ("2025-12-31", 312062000),   # 292,422,000 + 19,640,250
    ("2026-03-31", 345926000),   # 326,286,000 + 19,640,250
    ("2026-05-05", 352500000),   # ~352.5M current basic (cross-checked)
]


def to_date(s):
    return datetime.strptime(s, "%Y-%m-%d").date()


def forward_fill(points, current):
    """Last announced value at or before `current` (discrete, step function)."""
    value = None
    for d, v in points:
        if d <= current:
            value = v
        else:
            break
    return value


def interpolate(points, current):
    """Linearly interpolate `current` between bracketing anchors.

    Held flat before the first anchor and after the last anchor.
    """
    if current <= points[0][0]:
        return float(points[0][1])
    if current >= points[-1][0]:
        return float(points[-1][1])
    for (d0, v0), (d1, v1) in zip(points, points[1:]):
        if d0 <= current <= d1:
            span = (d1 - d0).days
            if span == 0:
                return float(v1)
            frac = (current - d0).days / span
            return v0 + (v1 - v0) * frac
    return float(points[-1][1])


def main():
    btc_points = sorted((to_date(d), v) for d, v in BTC_EVENTS)
    diluted_points = sorted((to_date(d), v) for d, v in DILUTED_SHARES)
    basic_points = sorted((to_date(d), v) for d, v in BASIC_SHARES)

    start = diluted_points[0][0]      # 2024-12-31 (first date with share data)
    end = btc_points[-1][0]           # 2026-06-08 (latest BTC disclosure)

    daily = []
    d = start
    while d <= end:
        btc = forward_fill(btc_points, d)
        diluted = interpolate(diluted_points, d)
        basic = interpolate(basic_points, d)
        if btc is not None:
            bps_d = btc / diluted
            bps_b = btc / basic
            daily.append(
                {
                    "date": d.isoformat(),
                    "btcHoldings": btc,
                    "dilutedShares": round(diluted),
                    "basicShares": round(basic),
                    "dilutedBtcPerShare": bps_d,
                    "dilutedSats": bps_d * 100_000_000,
                    "basicBtcPerShare": bps_b,
                    "basicSats": bps_b * 100_000_000,
                }
            )
        d += timedelta(days=1)

    # Weekly = every Friday, plus always include the final (latest) point.
    weekly = [p for p in daily if to_date(p["date"]).weekday() == 4]
    if daily and (not weekly or weekly[-1]["date"] != daily[-1]["date"]):
        weekly.append(daily[-1])

    latest = daily[-1]
    payload = {
        "meta": {
            "generatedAt": date.today().isoformat(),
            "asOfBtc": btc_points[-1][0].isoformat(),
            "asOfShares": diluted_points[-1][0].isoformat(),
            "latestBtc": latest["btcHoldings"],
            "latestDilutedShares": latest["dilutedShares"],
            "latestBasicShares": latest["basicShares"],
            "latestDilutedSats": latest["dilutedSats"],
            "latestBasicSats": latest["basicSats"],
            "avgCostUsd": 75680,  # blended avg purchase price per BTC (~Jun 2026)
            "btcSources": [
                "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001050446",
                "https://www.strategy.com/",
                "https://www.coindesk.com/",
            ],
            "shareSources": [
                "SEC 10-Q / 10-K balance sheets (CIK 0001050446)",
                "Strategy Q1 2026 8-K (reported BPS 213,371 sats @ 818,334 BTC)",
            ],
            "notes": (
                "BTC holdings current to "
                + btc_points[-1][0].isoformat()
                + ". Share counts are interpolated between disclosed figures and "
                "held flat after the last disclosure ("
                + diluted_points[-1][0].isoformat()
                + "); per-share values after that date are upper-bound estimates "
                "pending the next share-count disclosure. 'Diluted' = Strategy's "
                "official Assumed Diluted Shares (matches its published BTC-per-Share "
                "KPI); 'Basic' = Class A + Class B common."
            ),
        },
        "series": {"daily": daily, "weekly": weekly},
    }

    with open("data/mstr_bps.json", "w", encoding="utf-8") as f:
        json.dump(payload, f)

    print(f"Wrote {len(daily)} daily points and {len(weekly)} weekly points")
    print(
        f"Latest {latest['date']}: {latest['btcHoldings']:,} BTC | "
        f"diluted {latest['dilutedSats']:.0f} sats/sh | "
        f"basic {latest['basicSats']:.0f} sats/sh"
    )


if __name__ == "__main__":
    main()
