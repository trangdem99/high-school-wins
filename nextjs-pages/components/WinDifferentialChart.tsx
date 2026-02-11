import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import type { TooltipItem } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface WinDiffDataPoint {
  season: number;
  differential: number;
  record?: string;
}

interface WinDifferentialChartProps {
  title?: string;
  subtitle?: string;
  datasets: {
    label: string;
    data: WinDiffDataPoint[];
    color: string;
  }[];
}

export default function WinDifferentialChart({ title, subtitle, datasets }: WinDifferentialChartProps) {
  const allSeasons = [...new Set(datasets.flatMap((d) => d.data.map((p) => p.season)))].sort();
  const minSeason = Math.min(...allSeasons) - 1;
  const maxSeason = Math.max(...allSeasons) + 0.5;

  const chartData = {
    datasets: datasets.map((ds) => ({
      label: ds.label,
      data: ds.data.map((p) => ({ x: p.season, y: p.differential })),
      borderColor: ds.color,
      backgroundColor: ds.color,
      tension: 0.1,
      pointRadius: 5,
      pointHoverRadius: 7,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: datasets.length > 1,
        labels: {
          font: { family: "'Courier New', monospace", size: 12 },
        },
      },
      tooltip: {
        callbacks: {
          title: (items: TooltipItem<'line'>[]) => {
            const raw = items[0]?.raw as { x: number; y: number } | undefined;
            return raw ? String(raw.x) : '';
          },
          label: (item: TooltipItem<'line'>) => {
            const raw = item.raw as { x: number; y: number };
            const dsIndex = item.datasetIndex;
            const dataIndex = item.dataIndex;
            const dataset = datasets[dsIndex];
            const point = dataset.data[dataIndex];
            const diff = raw.y;
            const sign = diff >= 0 ? '+' : '';
            const lines: string[] = [];
            if (point?.record) {
              lines.push(`Season record: ${point.record} (${sign}${diff})`);
            }
            lines.push(`Win differential: ${sign}${diff}`);
            return lines;
          },
        },
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        titleFont: { family: "'Courier New', monospace", size: 13, weight: 'bold' as const },
        bodyFont: { family: "'Courier New', monospace", size: 12 },
        padding: 10,
        cornerRadius: 3,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          stepSize: 1,
          callback: (value: string | number) => {
            const num = typeof value === 'string' ? parseFloat(value) : value;
            return Number.isInteger(num) ? num : '';
          },
        },
        title: {
          display: true,
          text: 'Cumulative Win Differential',
          font: { family: "'Courier New', monospace", size: 12 },
        },
        grid: {
          color: (context: { tick: { value: number } }) =>
            context.tick.value === 0 ? '#000000' : 'rgba(0, 0, 0, 0.1)',
          lineWidth: (context: { tick: { value: number } }) =>
            context.tick.value === 0 ? 2 : 1,
        },
      },
      x: {
        type: 'linear' as const,
        position: 'bottom' as const,
        min: minSeason,
        max: maxSeason,
        ticks: {
          stepSize: 1,
          callback: (value: string | number) => {
            const num = typeof value === 'string' ? parseFloat(value) : value;
            return Number.isInteger(num) ? num : '';
          },
        },
        title: {
          display: true,
          text: 'Season',
          font: { family: "'Courier New', monospace", size: 12 },
        },
      },
    },
  };

  return (
    <div className="chart-section">
      {title && <h3 className="section-title">{title}</h3>}
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
      <div className="chart-container">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
