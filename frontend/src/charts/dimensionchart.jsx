export default function DimensionBars({ data }) {

    return (
        <div className="dimension-container">
            {Object.entries(data).map(([key, value]) => (
                <div key={key} className="dimension-row">

                    <span className="dimension-label">
                        {key.replace("_", " ")}
                    </span>

                    <div className="dimension-bar-bg">
                        <div
                            className="dimension-bar-fill"
                            style={{ width: `${value}%` }}
                        />
                    </div>

                    <span className="dimension-value">
                        {value}
                    </span>

                </div>
            ))}
        </div>
    );
}