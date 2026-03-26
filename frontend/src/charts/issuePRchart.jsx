import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);

export default function IssuePRChart({ data }) {

    const months = Object.keys(data.opened);

    const chartData = {
        labels: months,
        datasets: [
            {
                label: "Issues Opened",
                data: months.map(m => data.opened[m] || 0),
                backgroundColor: "#60a5fa"
            },
            {
                label: "Issues Closed",
                data: months.map(m => data.closed[m] || 0),
                backgroundColor: "#22c55e"
            },
            {
                label: "PRs Merged",
                data: months.map(m => data.merged[m] || 0),
                backgroundColor: "#a78bfa"
            }
        ]
    };

    return <Bar data={chartData} />;
}