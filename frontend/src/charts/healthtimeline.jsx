import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend
);

export default function HealthTimeline({ data }) {

    const labels = data.map(d => d.month);
    const values = data.map(d => d.commits);

    const chartData = {
        labels,
        datasets: [
            {
                label: "Commits",
                data: values,
                borderColor: "#3b82f6",
                backgroundColor: "rgba(59,130,246,0.2)",
                tension: 0.3
            }
        ]
    };

    return <Line data={chartData} />;
}