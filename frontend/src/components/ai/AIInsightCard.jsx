import React from 'react';

function AIInsightCard({ title, content, icon = '💡' }) {
    if (!content) return null;
    
    // Basic formatting
    const formatContent = (text) => {
        if (!text) return { __html: '' };
        let formatted = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br/>');
        return { __html: `<p>${formatted}</p>` };
    };
    
    return (
        <div className="ai-insight-card">
            <div className="ai-insight-title">
                <span className="ai-insight-icon">{icon}</span>
                {title}
            </div>
            <div className="ai-insight-content ai-markdown-content" dangerouslySetInnerHTML={formatContent(content)} />
        </div>
    );
}

export default AIInsightCard;
