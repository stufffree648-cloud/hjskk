# MSTR BTC Holding Per Share Chart

Simple static dashboard with:
- MSTR BTC-per-share chart
- Daily/weekly interval toggle
- Line/histogram switch
- Light/dark theme toggle
- User input for owned MSTR shares to estimate BTC exposure
- Bottom slider zoom + mouse-wheel zoom

## Run locally

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Data notes

Data is generated into `data/mstr_bps.json` by:

```bash
python3 scripts/generate_data.py
```

Sources used by the generator are:
- https://bitbo.io/treasuries/microstrategy/
- https://www.strategy.com/shares
