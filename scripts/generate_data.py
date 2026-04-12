#!/usr/bin/env python3
import json
from datetime import date, datetime, timedelta

BTC_EVENTS = [
    ("2024-02-06", 190000),
    ("2024-02-26", 193000),
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
    ("2026-04-06", 766970),
]

# Shares in absolute shares (not thousands), sourced from strategy.com/shares
# Pre-Aug-2024 values are split-adjusted (x10) for the 10-for-1 split on Aug 8 2024
SHARE_SNAPSHOTS = [
    ("2024-02-01", 158000000),
    ("2024-03-31", 166000000),
    ("2024-06-30", 175000000),
    ("2024-09-30", 244000000),
    ("2024-12-31", 281735000),
    ("2025-03-31", 299653000),
    ("2025-06-30", 314216000),
    ("2025-09-30", 320040000),
    ("2025-12-31", 344897000),
    ("2026-03-22", 377847000),
]


def to_date(s):
    return datetime.strptime(s, "%Y-%m-%d").date()


def ffill_lookup(points, current):
    value = None
    for d, v in points:
        if d <= current:
            value = v
        else:
            break
    return value


def lerp_lookup(points, current):
    """Linear interpolation between adjacent snapshot dates."""
    if current <= points[0][0]:
        return points[0][1]
    if current >= points[-1][0]:
        return points[-1][1]
    for i in range(len(points) - 1):
        d0, v0 = points[i]
        d1, v1 = points[i + 1]
        if d0 <= current < d1:
            frac = (current - d0).days / (d1 - d0).days
            return v0 + frac * (v1 - v0)
    return points[-1][1]


def main():
    btc_points = sorted((to_date(d), v) for d, v in BTC_EVENTS)
    share_points = sorted((to_date(d), v) for d, v in SHARE_SNAPSHOTS)
    start = btc_points[0][0]
    end = btc_points[-1][0]

    daily = []
    d = start
    while d <= end:
        btc = ffill_lookup(btc_points, d)
        shares = lerp_lookup(share_points, d)
        if btc is not None and shares is not None:
            bps = btc / shares
            daily.append(
                {
                    "date": d.isoformat(),
                    "btcHoldings": btc,
                    "sharesOutstanding": shares,
                    "btcPerShare": bps,
                    "satsPerShare": bps * 100_000_000,
                }
            )
        d += timedelta(days=1)

    weekly = [p for p in daily if datetime.strptime(p["date"], "%Y-%m-%d").weekday() == 4]

    payload = {
        "meta": {
            "generatedAt": date.today().isoformat(),
            "asOf": btc_points[-1][0].isoformat(),
            "btcSource": "https://bitbo.io/treasuries/microstrategy/",
            "shareSource": "https://www.strategy.com/shares",
        },
        "series": {"daily": daily, "weekly": weekly},
    }

    with open("data/mstr_bps.json", "w", encoding="utf-8") as f:
        json.dump(payload, f)

    print(f"Wrote {len(daily)} daily points and {len(weekly)} weekly points")


if __name__ == "__main__":
    main()
