import { Doughnut } from "react-chartjs-2";

export default function RiskBusFactorChart({ data }) {
    if (!data) return null;

    const top = data.contributors.slice(0, 5);
    const chartData = {
        labels: top.map(c => c.login),
        datasets: [{
            data: top.map(c => c.percentage),
            backgroundColor: ["#d92b2b", "#e85f5f", "#f29d4b", "#f7c768", "#e5e7eb"],
            borderWidth: 2
        }]
    };

    const levelColor = data.level === "HIGH" ? "red" : data.level === "MEDIUM" ? "orange" : "green";

    return (
        <div className={`risk-card border-${levelColor}`}>
            <div className="risk-card-header">
                <div className="risk-card-title-container">
                    <span>🧍</span> Bus Factor Risk
                </div>
                <span className={`risk-badge bg-${levelColor}-light`}>{data.level}</span>
            </div>
            <div className="risk-card-subtitle">
                Knowledge concentration — what if top contributors leave?
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                <div style={{ width: '224px', height: '224px' }}>
                    <Doughnut data={chartData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 8 } } } }} />
                </div>
            </div>

            <div className="metric-boxes">
                <div className="metric-box">
                    <div className="metric-box-title">Bus Factor</div>
                    <div className="metric-box-value text-red">{data.bus_factor}</div>
                    <div className="metric-box-sub">critical threshold</div>
                </div>
                <div className="metric-box">
                    <div className="metric-box-title">Top-2 Ownership</div>
                    <div className="metric-box-value text-red">{data.top_contributor_pct}%</div>
                    <div className="metric-box-sub">of all commits</div>
                </div>
            </div>
        </div>
    );
}
