import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
);

export default function VelocityChart({ data }) {
    if (!data || !data.weeks || data.weeks.length === 0) {
        return <p style={{ color: '#9CB3CC', textAlign: 'center' }}>No velocity data available.</p>;
    }

    const chartData = {
        labels: data.weeks,
        datasets: [
            {
                label: "Commits per Week",
                data: data.counts,
                tension: 0.4,
                fill: true,
                borderColor: "#27D3FF",
                backgroundColor: "rgba(39, 211, 255, 0.1)",
                pointBackgroundColor: "#27D3FF",
                pointBorderColor: "#091525",
                pointRadius: 4,
                pointHoverRadius: 6,
                borderWidth: 2,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                labels: { color: "#9CB3CC" }
            }
        },
        scales: {
            x: {
                ticks: { display: false },
                grid: { color: "rgba(39, 211, 255, 0.06)" }
            },
            y: {
                ticks: { color: "#9CB3CC" },
                grid: { color: "rgba(39, 211, 255, 0.06)" }
            }
        }
    };

    return <Line data={chartData} options={options} />;
}