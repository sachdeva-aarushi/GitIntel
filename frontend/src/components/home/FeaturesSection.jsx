import React from 'react';

function FeaturesSection() {
    const features = [
        { 
            title: "Deterministic Health Scoring", 
            desc: "Calculate exact metrics for code churn, issue resolution rates, and PR velocity.",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
            )
        },
        { 
            title: "Contributor Risk Analysis", 
            desc: "Identify single points of failure, bus factor, and key contributor dependency.",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            )
        },
        { 
            title: "Repository Structure Analysis", 
            desc: "Visualize and evaluate the modularity and maintainability of your architecture.",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            )
        },
        { 
            title: "AI-Powered Narration", 
            desc: "Turn raw metrics into actionable, senior-engineer-level insights and explanations.",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a2 2 0 0 1 2 2c0 7.49 4.3 10.74 9.07 10.74a2 2 0 0 1 0 4.52C18.3 19.26 14 22.51 14 30a2 2 0 0 1-4 0c0-7.49-4.3-10.74-9.07-10.74a2 2 0 0 1 0-4.52C5.7 12.74 10 9.49 10 2a2 2 0 0 1 2-2Z"></path></svg>
            )
        },
        { 
            title: "Evolution Tracking", 
            desc: "Observe how your repository health changes over time to catch degradation early.",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
            )
        }
    ];

    return (
        <section className="gitintel-section section-split">
            <div className="section-intro">
                <span className="overline">POWERED BY ADVANCED AI</span>
                <h2>Everything you need to <span className="highlight-text">understand</span> your codebase</h2>
                <p>GitIntel and advanced analytics work together to give you deep insights across your entire repository.</p>
                <a href="#" className="explore-link">Explore all features &rarr;</a>
            </div>
            <div className="features-grid">
                {features.map((feature, idx) => (
                    <div key={idx} className="glass-card feature-card">
                        <div className="feature-icon">
                            {feature.icon}
                        </div>
                        <div className="feature-content">
                            <h3>{feature.title}</h3>
                            <p>{feature.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default FeaturesSection;
