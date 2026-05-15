import { Line } from "react-chartjs-2";
import InsightStrip from "../components/InsightStrip";

export default function RiskPRChart({ data }) {
    if (!data) return null;

    const chartData = {
        labels: ["W-3", "W-2", "W-1", "Current"],
        datasets: [
            {
                label: "Open PRs",
                data: data.trend || [data.open_prs],
                borderColor: "#53A8FF",
                backgroundColor: "rgba(83, 168, 255, 0.1)",
                fill: true,
                tension: 0.3,
            }
        ]
    };

    const levelColor = data.level === "HIGH" ? "red" : data.level === "MEDIUM" ? "orange" : "green";

    const chartOptions = {
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#9CB3CC' } } },
        scales: {
            x: { ticks: { color: '#9CB3CC' }, grid: { color: 'rgba(39, 211, 255, 0.06)' } },
            y: { ticks: { color: '#9CB3CC' }, grid: { color: 'rgba(39, 211, 255, 0.06)' } },
        },
    };

    return (
        <div className={`risk-card border-${levelColor}`}>
            <div className="risk-card-header">
                <div className="risk-card-title-container">
                    PR Backlog Risk
                </div>
                <span className={`risk-badge bg-${levelColor}-light`}>{data.level}</span>
            </div>
            <div className="risk-card-subtitle">
                Open PRs vs merge rate — is code review a bottleneck?
            </div>

            <div style={{ height: '192px', marginBottom: '24px' }}>
                <Line data={chartData} options={chartOptions} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {data.insights.map((i, idx) => (
                    <InsightStrip key={idx} text={i} />
                ))}
                {data.insights.length === 0 && <InsightStrip text={`${data.open_prs} open PRs found`} />}
            </div>
        </div>
    );
}
