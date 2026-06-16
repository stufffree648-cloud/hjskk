const chartEl = document.getElementById('chart');
const intervalSelect = document.getElementById('interval-select');
const chartTypeSelect = document.getElementById('chart-type-select');
const basisSelect = document.getElementById('basis-select');
const ownedSharesInput = document.getElementById('owned-shares');
const ownedStats = document.getElementById('owned-stats');
const footnote = document.getElementById('footnote');
const subtitle = document.getElementById('subtitle');
const themeToggle = document.getElementById('theme-toggle');

const statBtc = document.getElementById('stat-btc');
const statBps = document.getElementById('stat-bps');
const statSats = document.getElementById('stat-sats');
const statShares = document.getElementById('stat-shares');

const BASIS = {
  diluted: { share: 'dilutedShares', bps: 'dilutedBtcPerShare', sats: 'dilutedSats', label: 'assumed-diluted' },
  basic: { share: 'basicShares', bps: 'basicBtcPerShare', sats: 'basicSats', label: 'basic (A+B)' },
};

let payload;
let chart;

function fmt(num, digits = 0) {
  return Number(num).toLocaleString(undefined, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function activeFields() {
  return BASIS[basisSelect.value] || BASIS.diluted;
}

function buildSeries() {
  if (!payload || !chart) return;

  const fields = activeFields();
  const interval = intervalSelect.value;
  const points = payload.series[interval];
  const labels = points.map((p) => p.date);
  // Plot in sats/share — Strategy's standard readable unit for "Bitcoin per Share".
  const sats = points.map((p) => Number(p[fields.sats].toFixed(1)));
  const isBar = chartTypeSelect.value === 'bar';

  chart.setOption(
    {
      tooltip: {
        trigger: 'axis',
        valueFormatter: (v) => `${fmt(v)} sats  (${(v / 1e8).toFixed(6)} BTC)`,
      },
      xAxis: { type: 'category', data: labels, boundaryGap: isBar },
      yAxis: {
        type: 'value',
        name: 'BTC / share (sats)',
        scale: true,
        axisLabel: { formatter: (v) => fmt(v) },
      },
      series: [
        {
          name: 'BTC per share',
          type: isBar ? 'bar' : 'line',
          data: sats,
          smooth: !isBar,
          showSymbol: false,
          areaStyle: isBar ? undefined : { opacity: 0.12 },
          large: true,
        },
      ],
      // Slide + zoom: mouse-wheel/pinch (inside) and a draggable range bar pinned to the bottom.
      dataZoom: [
        { type: 'inside', throttle: 50 },
        { type: 'slider', bottom: 8, height: 26 },
      ],
      grid: { left: 70, right: 24, top: 28, bottom: 84 },
    },
    true
  );

  updateStats(points, fields);
}

function updateStats(points, fields) {
  const latest = points[points.length - 1];
  statBtc.textContent = `${fmt(latest.btcHoldings)} BTC`;
  statBps.textContent = `${latest[fields.bps].toFixed(6)} BTC`;
  statSats.textContent = `${fmt(latest[fields.sats])} sats`;
  statShares.textContent = fmt(latest[fields.share]);

  const owned = Number(ownedSharesInput.value || 0);
  if (owned > 0) {
    const estBtc = owned * latest[fields.bps];
    const estSats = owned * latest[fields.sats];
    ownedStats.innerHTML =
      `<strong>${fmt(owned)}</strong> MSTR share(s) ` +
      `&times; ${latest[fields.bps].toFixed(8)} BTC/share = ` +
      `<strong>${estBtc.toFixed(6)} BTC</strong> ` +
      `(${fmt(estSats)} sats) of look-through Bitcoin ` +
      `<span class="muted">— on a ${fields.label} basis, as of ${latest.date}</span>`;
  } else {
    ownedStats.textContent =
      'Enter the number of MSTR shares you own to estimate your look-through BTC.';
  }
}

function applyTheme(dark) {
  document.body.classList.toggle('theme-dark', dark);
  document.body.classList.toggle('theme-light', !dark);
  if (chart) chart.dispose();
  chart = echarts.init(chartEl, dark ? 'dark' : undefined);
  buildSeries();
}

async function init() {
  const res = await fetch('data/mstr_bps.json');
  payload = await res.json();

  const m = payload.meta;
  subtitle.textContent =
    `${fmt(m.latestBtc)} BTC · ${fmt(m.latestDilutedSats)} sats/share (diluted) · as of ${m.asOfBtc}`;
  footnote.innerHTML =
    `Generated ${m.generatedAt}. ${m.notes} ` +
    `Avg cost ≈ $${fmt(m.avgCostUsd)}/BTC. ` +
    `Sources: SEC 8-K/10-Q/10-K (CIK 0001050446), strategy.com, CoinDesk.`;

  // Restore saved theme preference.
  const savedDark = localStorage.getItem('mstr-theme') === 'dark';
  themeToggle.checked = savedDark;
  applyTheme(savedDark);
}

intervalSelect.addEventListener('change', buildSeries);
chartTypeSelect.addEventListener('change', buildSeries);
basisSelect.addEventListener('change', buildSeries);
ownedSharesInput.addEventListener('input', buildSeries);
themeToggle.addEventListener('change', () => {
  localStorage.setItem('mstr-theme', themeToggle.checked ? 'dark' : 'light');
  applyTheme(themeToggle.checked);
});
window.addEventListener('resize', () => chart && chart.resize());

init();
