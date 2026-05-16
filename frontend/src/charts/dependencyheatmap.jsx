export default function DependencyHeatmap({ data }) {

    const getStatusInfo = (status) => {
        switch (status) {
            case "current": return { color: "#27D3FF", label: "Healthy", desc: "Up to date", risk: "Low Risk" };
            case "patch": return { color: "#53A8FF", label: "Stable", desc: "Patch available", risk: "Low Risk" };
            case "minor": return { color: "#448AFF", label: "Warning", desc: "Minor update needed", risk: "Medium Risk" };
            case "major": return { color: "#1C5D7A", label: "Risky", desc: "Major update needed", risk: "High Risk" };
            default: return { color: "#0A2239", label: "Critical", desc: "Unknown/Deprecated", risk: "Critical Risk" };
        }
    };

    // Realistic-sounding mock dependencies
    const mockDeps = [
        "react", "react-dom", "axios", "lodash", "express", 
        "mongoose", "webpack", "babel-core", "jest", "eslint",
        "typescript", "next", "tailwindcss", "framer-motion", "chart.js",
        "d3", "three", "redux", "recoil", "zustand",
        "socket.io", "graphql", "apollo-client", "prisma", "pg"
    ];

    const legendItems = [
        { label: "Healthy", color: "#27D3FF" },
        { label: "Stable", color: "#53A8FF" },
        { label: "Warning", color: "#448AFF" },
        { label: "Risky", color: "#1C5D7A" },
        { label: "Critical", color: "#0A2239" },
    ];

    return (
        <div>
            <div className="heatmap-grid">
                {data.map((cell, i) => {
                    const info = getStatusInfo(cell);
                    const depName = mockDeps[i] || `Dependency ${i + 1}`;
                    return (
                        <div
                            key={i}
                            className="heatmap-cell"
                            style={{ background: info.color }}
                        >
                            <div className="heatmap-tooltip">
                                <div className="heatmap-tooltip-title">{depName}</div>
                                <div className="heatmap-tooltip-status" style={{ color: info.color }}>
                                    {info.label} • {info.risk}
                                </div>
                                <div className="heatmap-tooltip-desc">{info.desc}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <div className="heatmap-legend">
                {legendItems.map((item, idx) => (
                    <div key={idx} className="heatmap-legend-item">
                        <div className="heatmap-legend-color" style={{ background: item.color }}></div>
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}