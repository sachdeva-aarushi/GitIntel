import React, { useState, useEffect, useRef } from 'react';
import { fetchAISummary, askRepositoryQuestion } from '../../ai/aiApi';
import AIMessage from './AIMessage';
import AIInsightCard from './AIInsightCard';

function AIChatPanel({ owner, repo }) {
    const [messages, setMessages] = useState([]);
    const [summary, setSummary] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    useEffect(() => {
        if (!owner || !repo) return;

        const getInitialSummary = async () => {
            setIsTyping(true);
            try {
                const res = await fetchAISummary(owner, repo);
                if (res && res.ai_summary) {
                    setSummary(res.ai_summary);
                    setMessages([{ role: 'ai', content: "Hello! I've analyzed this repository. How can I help you today?" }]);
                }
            } catch (err) {
                console.error("AI Summary Error:", err);
                setMessages([{ role: 'ai', content: "Failed to fetch AI insights. The API might be unavailable." }]);
            } finally {
                setIsTyping(false);
            }
        };

        getInitialSummary();
    }, [owner, repo]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputValue.trim() || isTyping) return;

        const userMsg = inputValue.trim();
        setInputValue('');
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setIsTyping(true);

        try {
            const res = await askRepositoryQuestion(owner, repo, userMsg);
            const answer = res.answer || res.response || res.ai_summary || "I'm sorry, I couldn't process that request.";
            setMessages(prev => [...prev, { role: 'ai', content: answer }]);
        } catch (err) {
            console.error("AI QA Error:", err);
            setMessages(prev => [...prev, { role: 'ai', content: "Sorry, I encountered an error answering your question." }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="ai-panel-container">
            <div className="ai-panel-header">
                <div className="ai-glow-dot"></div>
                <h3>Githeon AI</h3>
            </div>
            
            <div className="ai-messages-area">
                {summary && (
                    <AIInsightCard 
                        title="Repository Intelligence" 
                        content={summary} 
                    />
                )}
                
                {messages.map((msg, idx) => (
                    <AIMessage key={idx} role={msg.role} content={msg.content} />
                ))}
                
                {isTyping && <AIMessage role="ai" isLoading={true} />}
                
                <div ref={messagesEndRef} />
            </div>

            <div className="ai-input-container">
                <form onSubmit={handleSubmit} className="ai-input-form">
                    <input
                        type="text"
                        className="ai-input"
                        placeholder="Ask about this repo..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        disabled={isTyping}
                    />
                    <button type="submit" className="ai-send-btn" disabled={isTyping || !inputValue.trim()}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AIChatPanel;
