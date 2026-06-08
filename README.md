# Strategy (MSTR) — Bitcoin Per Share

Static dashboard tracking how much Bitcoin backs each share of Strategy (MSTR).

## Features

- **BTC-per-share chart** (plotted in sats/share, Strategy's standard unit; BTC/share shown in tooltip & stats)
- **Daily / weekly** interval toggle
- **Line / histogram** chart-type switch
- **Share-basis** toggle:
  - **Assumed diluted** — Strategy's *official* "Bitcoin per Share" KPI denominator (basic common + all convertible notes/preferred + options/RSUs/PSUs)
  - **Basic (Class A + B)** — the more conservative "BTC backing the shares you actually hold" view
- **Dark / light** mode switch (preference saved to `localStorage`)
- **Your-shares input** — estimates your look-through BTC exposure
- **Zoom & slide** — mouse-wheel/pinch zoom inside the plot, plus a draggable range bar pinned to the bottom

## Run locally

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Data

Data is generated into `data/mstr_bps.json` by:

```bash
python3 scripts/generate_data.py
```

### Accuracy & methodology

- **BTC holdings** are discrete, forward-filled between disclosures; cumulative totals are
  verified against SEC 8-K exhibits (CIK 0001050446), Strategy press releases, and CoinDesk.
  Current as of **2026-06-08: 845,256 BTC** (includes the first-ever net sale of 32 BTC on
  May 31, 2026).
- **Share counts** grow continuously via ATM issuance, so they are **linearly interpolated**
  between disclosed anchor dates rather than stepped at quarter ends. Held flat after the last
  disclosure (2026-05-05); per-share values after that date are upper-bound estimates.
- **Verification anchor:** on 2026-05-05 the generated diluted figure reproduces Strategy's own
  reported Q1-2026 BPS of **213,371 sats/share** at 818,334 BTC.

### Sources

- SEC EDGAR 10-Q / 10-K / 8-K filings (CIK 0001050446)
- https://www.strategy.com/
- CoinDesk weekly purchase coverage
