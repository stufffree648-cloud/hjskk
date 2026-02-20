const holdingsEvents = [
  { date: '2020-08-11', btc: 21454 },
  { date: '2020-09-14', btc: 38250 },
  { date: '2020-12-21', btc: 70470 },
  { date: '2021-02-24', btc: 90531 },
  { date: '2021-06-21', btc: 105085 },
  { date: '2021-08-24', btc: 108992 },
  { date: '2021-09-13', btc: 114042 },
  { date: '2021-12-09', btc: 122478 },
  { date: '2022-01-31', btc: 125051 },
  { date: '2022-04-05', btc: 129218 },
  { date: '2022-06-28', btc: 129699 },
  { date: '2022-09-19', btc: 130000 },
  { date: '2022-12-28', btc: 132500 },
  { date: '2023-03-27', btc: 140000 },
  { date: '2023-06-28', btc: 152333 },
  { date: '2023-08-01', btc: 152800 },
  { date: '2023-09-25', btc: 158245 },
  { date: '2023-11-30', btc: 174530 },
  { date: '2023-12-27', btc: 189150 },
  { date: '2024-02-06', btc: 190000 },
  { date: '2024-03-11', btc: 205000 },
  { date: '2024-04-29', btc: 214400 },
  { date: '2024-06-20', btc: 226331 },
  { date: '2024-08-01', btc: 226500 },
  { date: '2024-09-20', btc: 252220 },
  { date: '2024-11-11', btc: 279420 },
  { date: '2024-12-02', btc: 402100 },
  { date: '2024-12-23', btc: 444262 },
  { date: '2025-01-13', btc: 450000 }
];

const shareEvents = [
  { date: '2020-08-11', shares: 76000000 },
  { date: '2021-01-01', shares: 94000000 },
  { date: '2022-01-01', shares: 102000000 },
  { date: '2023-01-01', shares: 108000000 },
  { date: '2024-01-01', shares: 114000000 },
  { date: '2024-06-15', shares: 170000000 },
  { date: '2024-10-01', shares: 182000000 },
  { date: '2025-01-13', shares: 196000000 }
];

const intervalSelect = document.getElementById('interval');
const chartTypeSelect = document.getElementById('chartType');
const sharesOwnedInput = document.getElementById('sharesOwned');
const latestPerShareEl = document.getElementById('latestPerShare');
const userBtcEl = document.getElementById('userBtc');
const themeToggle = document.getElementById('themeToggle');

const ONE_DAY = 24 * 60 * 60 * 1000;

function generateDailySeries() {
  const start = new Date(holdingsEvents[0].date);
  const end = new Date(holdingsEvents[holdingsEvents.length - 1].date);

  let holdingIdx = 0;
  let shareIdx = 0;
  let currentBtc = holdingsEvents[0].btc;
  let currentShares = shareEvents[0].shares;

  const dates = [];
  const perShare = [];

  for (let t = start.getTime(); t <= end.getTime(); t += ONE_DAY) {
    const currentDate = new Date(t);

    while (
      holdingIdx + 1 < holdingsEvents.length &&
      new Date(holdingsEvents[holdingIdx + 1].date).getTime() <= t
    ) {
      holdingIdx += 1;
      currentBtc = holdingsEvents[holdingIdx].btc;
    }

    while (
      shareIdx + 1 < shareEvents.length &&
      new Date(shareEvents[shareIdx + 1].date).getTime() <= t
    ) {
      shareIdx += 1;
      currentShares = shareEvents[shareIdx].shares;
    }

    dates.push(currentDate.toISOString().slice(0, 10));
    perShare.push(currentBtc / currentShares);
  }

  return { dates, perShare };
}

function sampleWeekly(series) {
  const dates = [];
  const perShare = [];
  for (let i = 0; i < series.dates.length; i += 7) {
    dates.push(series.dates[i]);
    perShare.push(series.perShare[i]);
  }
  const last = series.dates.length - 1;
  if (dates[dates.length - 1] !== series.dates[last]) {
    dates.push(series.dates[last]);
    perShare.push(series.perShare[last]);
  }
  return { dates, perShare };
}

function getThemeColors() {
  const dark = document.body.classList.contains('dark');
  return {
    paper: dark ? '#131a2b' : '#ffffff',
    plot: dark ? '#131a2b' : '#ffffff',
    text: dark ? '#e5e7eb' : '#111827',
    grid: dark ? '#334155' : '#e5e7eb',
    line: dark ? '#60a5fa' : '#2563eb'
  };
}

const dailySeries = generateDailySeries();

function renderChart() {
  const interval = intervalSelect.value;
  const chartType = chartTypeSelect.value;
  const series = interval === 'weekly' ? sampleWeekly(dailySeries) : dailySeries;
  const colors = getThemeColors();

  const trace = {
    x: series.dates,
    y: series.perShare,
    type: chartType === 'histogram' ? 'bar' : 'scatter',
    mode: chartType === 'histogram' ? undefined : 'lines',
    marker: { color: colors.line },
    line: { color: colors.line, width: 2 },
    hovertemplate: '%{x}<br>BTC/share: %{y:.6f}<extra></extra>'
  };

  const layout = {
    title: 'MSTR BTC Holdings per Share',
    paper_bgcolor: colors.paper,
    plot_bgcolor: colors.plot,
    font: { color: colors.text },
    xaxis: {
      title: interval === 'weekly' ? 'Week' : 'Day',
      gridcolor: colors.grid,
      rangeslider: { visible: true, bgcolor: colors.plot },
      type: 'date'
    },
    yaxis: {
      title: 'BTC per share',
      gridcolor: colors.grid,
      fixedrange: false
    },
    margin: { t: 50, r: 20, b: 45, l: 70 }
  };

  const config = {
    responsive: true,
    displaylogo: false,
    scrollZoom: true
  };

  Plotly.newPlot('chart', [trace], layout, config);

  const latest = series.perShare[series.perShare.length - 1];
  latestPerShareEl.textContent = `${latest.toFixed(6)} BTC`;
  const sharesOwned = Math.max(Number(sharesOwnedInput.value) || 0, 0);
  userBtcEl.textContent = `${(sharesOwned * latest).toFixed(6)} BTC`;
}

intervalSelect.addEventListener('change', renderChart);
chartTypeSelect.addEventListener('change', renderChart);
sharesOwnedInput.addEventListener('input', renderChart);

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const dark = document.body.classList.contains('dark');
  themeToggle.setAttribute('aria-pressed', String(dark));
  themeToggle.textContent = dark ? 'Switch to Light' : 'Switch to Dark';
  renderChart();
});

window.addEventListener('load', renderChart);
