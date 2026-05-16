import { Line } from "react-chartjs-2";

export default function RiskActivityChart({ data }) {
    if (!data) return null;

    const chartData = {
        labels: ["W1", "W2", "W3", "W4"],
        datasets: [
            {
                label: "Commits",
                data: [30, 25, 20, 18],
                borderColor: "#27D3FF",
                backgroundColor: "rgba(39, 211, 255, 0.1)",
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
                    Activity Drop Risk
                </div>
                <span className={`risk-badge bg-${levelColor}-light`}>{data.level}</span>
            </div>
            <div className="risk-card-subtitle">
                Is the project at risk of going inactive? Commit frequency over 12 months.
            </div>

            <div style={{ height: '192px', marginBottom: '24px' }}>
                <Line data={chartData} options={chartOptions} />
            </div>

        </div>
    );
}
