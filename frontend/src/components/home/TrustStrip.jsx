import React from 'react';

function TrustStrip() {
    const logos = [
        "Microsoft",
        "Stripe",
        "Shopify",
        "Docker",
        "Vercel"
    ];

    return (
        <div className="trust-strip-container">
            <div className="trust-strip-intro">Trusted by developers at:</div>
            <div className="trust-strip-logos">
                {logos.map((logo, i) => (
                    <div key={i} className="trust-logo">
                        <span className="trust-logo-icon"></span>
                        {logo}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TrustStrip;
