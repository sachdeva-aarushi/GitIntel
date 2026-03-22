import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Health() {
    const [searchParams] = useSearchParams();
    const owner = searchParams.get('owner') || '';
    const repo = searchParams.get('repo') || '';

    return (
        <div className="app-container">
            <Navbar owner={owner} repo={repo} />

            <h1 className="app-title">
                Health Score — <span>{owner}/{repo}</span>
            </h1>
            <p className="app-subtitle">Health score analysis coming soon.</p>

            <div className="chart-card placeholder-card">
                <div className="placeholder-icon">🏥</div>
                <h2>Health Score</h2>
                <p>This page will display a comprehensive health score for the repository based on commit frequency, contributor diversity, issue resolution rate, and more.</p>
            </div>
        </div>
    );
}

export default Health;
