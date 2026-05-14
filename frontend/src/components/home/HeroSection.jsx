import React from 'react';

function HeroSection({ owner, repo, setOwner, setRepo, handleSubmit }) {
    return (
        <section className="gitintel-section hero-section">
            <div className="hero-content">
                <h1 className="hero-headline">Understand your repositories beyond stars and forks.</h1>
                <p className="hero-subheadline">
                    GitIntel combines deterministic repository analytics with AI-powered engineering narration to reveal maintainability risks, contributor bottlenecks, architectural complexity, and repository health in real time.
                </p>
                <form className="hero-form-container" onSubmit={handleSubmit}>
                    <div className="hero-form-inputs">
                        <input
                            type="text"
                            className="hero-input"
                            placeholder="Repository Owner"
                            value={owner}
                            onChange={(e) => setOwner(e.target.value)}
                            required
                        />
                        <div className="hero-divider"></div>
                        <input
                            type="text"
                            className="hero-input"
                            placeholder="Repository Name"
                            value={repo}
                            onChange={(e) => setRepo(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary btn-deep-blue">
                        Analyze Repository
                    </button>
                </form>
            </div>
            <div className="hero-visual">
                <div className="hero-placeholder">
                    <span>[ Visual Ecosystem ]</span>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
