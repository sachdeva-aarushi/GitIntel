import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function HealthDonut({ data }) {

    const chartData = {
        labels: Object.keys(data),
        datasets: [
            {
                data: Object.values(data),
                backgroundColor: [
                    "#22c55e",
                    "#3b82f6",
                    "#a855f7",
                    "#f59e0b",
                    "#06b6d4"
                ],
                borderWidth: 0
            }
        ]
    };

    return (
        <div style={{ height: "280px" }}>
            <Doughnut data={chartData} />
        </div>
    );
}