export default function DependencyHeatmap({ data }) {

    const getColor = (status) => {
        switch (status) {
            case "current": return "#1FAE7A";
            case "patch": return "#86efac";
            case "minor": return "#E0A94F";
            case "major": return "#E86D6D";
            default: return "#e5e7eb";
        }
    };

    return (
        <div className="heatmap-grid">
            {data.map((cell, i) => (
                <div
                    key={i}
                    className="heatmap-cell"
                    style={{ background: getColor(cell) }}
                />
            ))}
        </div>
    );
}