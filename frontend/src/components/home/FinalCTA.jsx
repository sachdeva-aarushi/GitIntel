import React from 'react';

function FinalCTA() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <section className="gitintel-section cta-section">
            <div className="cta-content">
                <h2>Ready to explore the <span className="highlight-text">depths</span> of your codebase?</h2>
                <p>Dive in and discover insights that help you build better, safer, and faster.</p>
                <button className="btn-primary" onClick={scrollToTop}>
                    Get started for free &rarr;
                </button>
            </div>
            <div className="cta-visual-placeholder">
                {/* Future cinematic background element */}
            </div>
        </section>
    );
}

export default FinalCTA;
