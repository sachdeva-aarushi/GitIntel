import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [owner, setOwner] = useState('');
    const [repo, setRepo] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!owner.trim() || !repo.trim()) return;
        navigate(`/dashboard?owner=${encodeURIComponent(owner.trim())}&repo=${encodeURIComponent(repo.trim())}`);
    };

    return (
 
        <div className="app-container">
            
            <h1 className="app-title">GitHub Repo <span>Health Analyzer</span></h1>
            <p className="app-subtitle">
                Analyze commit activity and health metrics for any public repository
            </p>

            <form onSubmit={handleSubmit} className="search-form">
                <input
                    id="owner-input"
                    className="input-field"
                    type="text"
                    placeholder="Owner (e.g., facebook)"
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                    required
                />
                <input
                    id="repo-input"
                    className="input-field"
                    type="text"
                    placeholder="Repo (e.g., react)"
                    value={repo}
                    onChange={(e) => setRepo(e.target.value)}
                    required
                />
                <button
                    id="analyze-btn"
                    type="submit"
                    className="btn-analyze"
                >
                    Analyze
                </button>
            </form>
        </div>
    );
}

export default Home;
