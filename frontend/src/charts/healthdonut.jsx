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
                    "#27D3FF",
                    "#53A8FF",
                    "#1C5D7A",
                    "#40C4FF",
                    "#0B3046"
                ],
                borderWidth: 2,
                borderColor: '#091525',
            }
        ]
    };

    return (
        <div style={{ height: "280px" }}>
            <Doughnut data={chartData} options={{
                plugins: {
                    legend: { labels: { color: '#9CB3CC', usePointStyle: true, boxWidth: 8 } },
                },
            }} />
        </div>
    );
}