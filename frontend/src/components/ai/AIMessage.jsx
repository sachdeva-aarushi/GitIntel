import React from 'react';

function AIMessage({ role, content, isLoading }) {
    // Basic Markdown to HTML converter for simple paragraphs and bold text
    // A robust solution would use a markdown parser library like 'marked'
    const formatContent = (text) => {
        if (!text) return { __html: '' };
        let formatted = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br/>');
        return { __html: `<p>${formatted}</p>` };
    };

    return (
        <div className={`ai-message-wrapper ${role}`}>
            <div className="ai-message-bubble">
                {isLoading ? (
                    <div className="ai-typing-indicator">
                        <div className="ai-typing-dot"></div>
                        <div className="ai-typing-dot"></div>
                        <div className="ai-typing-dot"></div>
                    </div>
                ) : (
                    <div className="ai-markdown-content" dangerouslySetInnerHTML={formatContent(content)} />
                )}
            </div>
        </div>
    );
}

export default AIMessage;
