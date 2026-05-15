import { Line } from "react-chartjs-2";

export default function LorenzCurveChart({ data }) {
  return (
    <Line
      data={{
        labels: data.map(d => d.cumulative_contributors_pct),
        datasets: [
          {
            label: "Lorenz Curve",
            data: data.map(d => d.cumulative_share),
            borderColor: "#27D3FF",
            backgroundColor: "rgba(39, 211, 255, 0.08)",
            fill: true,
            tension: 0.3,
          },
          {
            label: "Perfect Equality",
            data: data.map(d => d.cumulative_contributors_pct),
            borderColor: "#1C5D7A",
            borderDash: [5, 5],
            fill: false,
          }
        ]
      }}
      options={{
        plugins: {
          legend: { labels: { color: '#9CB3CC' } },
        },
        scales: {
          x: {
            title: { display: true, text: "Cumulative % of Contributors", color: '#9CB3CC' },
            ticks: { color: '#9CB3CC' },
            grid: { color: 'rgba(39, 211, 255, 0.06)' },
          },
          y: {
            title: { display: true, text: "Cumulative % of Commits", color: '#9CB3CC' },
            ticks: { color: '#9CB3CC' },
            grid: { color: 'rgba(39, 211, 255, 0.06)' },
          }
        }
      }}
    />
  );
}