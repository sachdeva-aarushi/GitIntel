function renderTree(node, depth = 0) {
    return Object.entries(node).map(([key, value]) => (
        <div key={key} style={{ marginLeft: depth * 12 }}>
            {key}
            {typeof value === "object" && renderTree(value, depth + 1)}
        </div>
    ));
}

export default function RepoTree({ data }) {
    if (!data) return null;

    return (
        <div>
            <h3>Repository Structure</h3>
            <div>
                {renderTree(data.tree)}
            </div>
        </div>
    );
}