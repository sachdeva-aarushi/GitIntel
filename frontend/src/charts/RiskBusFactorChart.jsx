import { Doughnut } from "react-chartjs-2";

export default function RiskBusFactorChart({ data }) {
    if (!data) return null;

    const top = data.contributors.slice(0, 5);
    const chartData = {
        labels: top.map(c => c.login),
        datasets: [{
            data: top.map(c => c.percentage),
            backgroundColor: ["#27D3FF", "#53A8FF", "#1C5D7A", "#0B3046", "#102033"],
            borderWidth: 2,
            borderColor: '#091525',
        }]
    };

    const levelColor = data.level === "HIGH" ? "red" : data.level === "MEDIUM" ? "orange" : "green";

    return (
        <div className={`risk-card border-${levelColor}`}>
            <div className="risk-card-header">
                <div className="risk-card-title-container">
                    Bus Factor Risk
                </div>
                <span className={`risk-badge bg-${levelColor}-light`}>{data.level}</span>
            </div>
            <div className="risk-card-subtitle">
                Knowledge concentration — what if top contributors leave?
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                <div style={{ width: '224px', height: '224px' }}>
                    <Doughnut data={chartData} options={{
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'bottom',
                                labels: { usePointStyle: true, boxWidth: 8, color: '#9CB3CC' }
                            }
                        }
                    }} />
                </div>
            </div>

        </div>
    );
}
