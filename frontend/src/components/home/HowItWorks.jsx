import React from 'react';

function HowItWorks() {
    const steps = [
        { step: 1, title: "Connect", desc: "Connect your GitHub repository and we analyze the codebase." },
        { step: 2, title: "Analyze", desc: "Our AI dives deep to understand structure, patterns, and risks." },
        { step: 3, title: "Get Insights", desc: "Receive actionable insights and recommendations to improve your code." }
    ];

    return (
        <section className="gitintel-section section-split-how">
            <div className="section-intro">
                <span className="overline">HOW IT WORKS</span>
                <h2>Understand your code in 3 <span className="highlight-text">deep</span> steps</h2>
            </div>
            <div className="steps-container">
                <div className="steps-connector"></div>
                {steps.map((s, idx) => (
                    <div key={idx} className="glass-card step-item">
                        <div className="step-number">{s.step}</div>
                        <h3>{s.title}</h3>
                        <p>{s.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default HowItWorks;
