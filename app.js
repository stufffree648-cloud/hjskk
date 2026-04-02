const chartEl = document.getElementById('chart');
const intervalSelect = document.getElementById('interval-select');
const chartTypeSelect = document.getElementById('chart-type-select');
const ownedSharesInput = document.getElementById('owned-shares');
const ownedStats = document.getElementById('owned-stats');
const footnote = document.getElementById('footnote');
const themeToggle = document.getElementById('theme-toggle');

let payload;
let chart;

function formatNumber(num, digits = 2) {
  return Number(num).toLocaleString(undefined, { maximumFractionDigits: digits });
}

function buildSeries() {
  if (!payload || !chart) return;

  const interval = intervalSelect.value;
  const points = payload.series[interval];
  const labels = points.map((p) => p.date);
  const values = points.map((p) => Number(p.btcPerShare.toFixed(6)));
  const chartType = chartTypeSelect.value === 'bar' ? 'bar' : 'line';

  chart.setOption(
    {
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: labels },
      yAxis: {
        type: 'value',
        name: 'BTC per share',
        axisLabel: { formatter: (v) => Number(v).toFixed(4) }
      },
      series: [
        {
          name: 'BTC per share',
          type: chartType,
          data: values,
          smooth: chartType === 'line',
          large: true
        }
      ],
      dataZoom: [{ type: 'inside' }, { type: 'slider', bottom: 0 }],
      grid: { left: 60, right: 20, top: 25, bottom: 60 }
    },
    true
  );

  const latest = points[points.length - 1];
  const owned = Number(ownedSharesInput.value || 0);
  const estBtc = owned * latest.btcPerShare;
  ownedStats.textContent = owned
    ? `${formatNumber(owned)} share(s) × ${latest.btcPerShare.toFixed(6)} BTC/share = ${formatNumber(estBtc, 6)} BTC (~${formatNumber(estBtc * 100000000, 0)} sats)`
    : 'Enter shares owned to estimate your BTC exposure.';

  footnote.textContent = `Data updated ${payload.meta.generatedAt}. BTC history source: ${payload.meta.btcSource}. Share count source: ${payload.meta.shareSource}.`;
}

function rebuildChartTheme() {
  const dark = themeToggle.checked;
  document.body.classList.toggle('theme-dark', dark);
  document.body.classList.toggle('theme-light', !dark);
  if (chart) {
    chart.dispose();
  }
  chart = echarts.init(chartEl, dark ? 'dark' : undefined);
  buildSeries();
}

async function init() {
  const res = await fetch('data/mstr_bps.json');
  payload = await res.json();
  rebuildChartTheme();
}

intervalSelect.addEventListener('change', buildSeries);
chartTypeSelect.addEventListener('change', buildSeries);
ownedSharesInput.addEventListener('input', buildSeries);
themeToggle.addEventListener('change', rebuildChartTheme);
window.addEventListener('resize', () => chart?.resize());

init();
