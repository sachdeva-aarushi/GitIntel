import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Risk() {
    const [searchParams] = useSearchParams();
    const owner = searchParams.get('owner') || '';
    const repo = searchParams.get('repo') || '';

    return (
        <div className="app-container">
            <Navbar owner={owner} repo={repo} />

            <h1 className="app-title">
                Risk Analysis — <span>{owner}/{repo}</span>
            </h1>
            <p className="app-subtitle">Risk analysis coming soon.</p>

            <div className="chart-card placeholder-card">
                <div className="placeholder-icon">⚠️</div>
                <h2>Risk Analysis</h2>
                <p>This page will display risk indicators such as bus factor, inactive contributors, dependency vulnerabilities, and stale issues.</p>
            </div>
        </div>
    );
}

export default Risk;
