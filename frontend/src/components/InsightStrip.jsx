export default function InsightStrip({ text }) {
    const isCritical = text.toLowerCase().includes("high") || text.toLowerCase().includes("low") || text.toLowerCase().includes("open");
    const colorClass = isCritical ? "bg-red-light" : "bg-orange-light";
    const dotClass = isCritical ? "dot-red" : "dot-orange";
    return (
        <div className={`insight-strip ${colorClass}`}>
            <div className={`insight-dot ${dotClass}`}></div>
            <div style={{ flex: 1 }}>{text}</div>
        </div>
    );
}
