import React, { useState } from 'react';
import { Bot, Send, Sparkles, User, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { RURAL_IQ_PROMPTS } from '../data/mockData';

export default function RuralIQAssistant({ currentCounty }) {
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'assistant',
      text: `Hello! I am **RuralIQ AI**, your specialized advisor for ${currentCounty}. I can assist you with USDA grant eligibility (REAP, VAPG), precision soil science, microgrid planning, rural broadband co-ops, and local economic development policy.\n\nHow can I help your farm or township today?`
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg = { id: `u-${Date.now()}`, sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponseText = `Thank you for your question regarding "${query}". Here is the recommended strategic roadmap for ${currentCounty}:\n\n`;

      if (query.toLowerCase().includes('reap') || query.toLowerCase().includes('grant')) {
        aiResponseText += `### USDA REAP Clean Energy Roadmap:\n` +
          `1. **Eligibility Check**: Small businesses in communities under 50,000 pop. qualify for up to 50% federal grant matching.\n` +
          `2. **Energy Audit**: Conduct a Tier II farm energy assessment (solar/anaerobic digester).\n` +
          `3. **AI Application Drafting**: Use our built-in Grant Matcher tool to generate your preliminary executive summary and itemized budget table.\n\n` +
          `*Recommended Next Step: Open the AI Grant Matcher tab to draft your application.*`;
      } else if (query.toLowerCase().includes('soil') || query.toLowerCase().includes('crop')) {
        aiResponseText += `### Regenerative Nitrogen & Soil Strategy:\n` +
          `1. **Cover Crop Selection**: Plant Hairy Vetch or Crimson Clover post-corn harvest to fix 80-120 lbs N/acre naturally.\n` +
          `2. **Sensor Calibration**: Telemetry indicates your soil moisture is optimal at 42%. Hold synthetic side-dressing until tomorrow post-rain.\n` +
          `3. **Yield Target**: With current 84 ppm Nitrogen, your corn yield benchmark is projected at **215 bu/acre**.`;
      } else {
        aiResponseText += `### Key Actionable Steps:\n` +
          `• **Policy Alignment**: Ensure local zoning board permits microgrid energy storage and broadband antenna attachments.\n` +
          `• **Funding Synergy**: Stack state Economic Revitalization funds with federal grants for zero-out-of-pocket infrastructure cost.\n` +
          `• **Community Engagement**: Schedule a public town hall preview on Main Street.`;
      }

      setMessages(prev => [...prev, { id: `a-${Date.now()}`, sender: 'assistant', text: aiResponseText }]);
      setIsTyping(false);
    }, 1100);
  };

  return (
    <div className="ruraliq-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="badge badge-emerald">
            <Sparkles size={13} /> Context-Aware Rural Copilot
          </div>
          <h1 className="title-xl" style={{ marginTop: '8px' }}>RuralIQ Assistant</h1>
          <p className="subtitle">
            Trained on USDA policy manuals, agricultural science, rural economic data, and municipal grant compliance.
          </p>
        </div>
      </div>

      <div className="ruraliq-chat-layout">
        {/* Left: Chat Window */}
        <div className="glass-card chat-card">
          <div className="chat-header">
            <div className="assistant-avatar">
              <Bot size={22} className="bot-icon" />
            </div>
            <div>
              <h3 className="assistant-name">RuralIQ AI Copilot</h3>
              <span className="assistant-status"><span className="status-dot" /> Online • Context: {currentCounty}</span>
            </div>
          </div>

          <div className="chat-messages-area">
            {messages.map(msg => (
              <div key={msg.id} className={`message-bubble-wrap ${msg.sender}`}>
                <div className="message-avatar">
                  {msg.sender === 'assistant' ? <Bot size={16} /> : <User size={16} />}
                </div>
                <div className="message-content-box">
                  <pre className="message-text">{msg.text}</pre>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="message-bubble-wrap assistant">
                <div className="message-avatar">
                  <Bot size={16} />
                </div>
                <div className="typing-indicator">
                  <span /> <span /> <span />
                </div>
              </div>
            )}
          </div>

          <form className="chat-input-bar" onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
            <input 
              type="text"
              className="chat-input"
              placeholder="Ask RuralIQ about USDA grants, crop health, or microgrids..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button type="submit" className="btn btn-primary send-btn" disabled={!inputText.trim() || isTyping}>
              <Send size={16} />
            </button>
          </form>
        </div>

        {/* Right: Quick Prompts & Knowledge Index */}
        <div className="glass-card prompts-side-card">
          <h3 className="title-md flex-center"><Sparkles size={16} className="icon-emerald" /> Suggested Rural Prompts</h3>
          <p className="subtitle" style={{ fontSize: '0.82rem' }}>Click any prompt to consult RuralIQ:</p>

          <div className="prompt-chips-list">
            {RURAL_IQ_PROMPTS.map((promptText, i) => (
              <button 
                key={i} 
                className="prompt-chip-btn"
                onClick={() => handleSendMessage(promptText)}
              >
                <span>{promptText}</span>
                <ArrowRight size={14} className="arrow-icon" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .ruraliq-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .ruraliq-chat-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 20px;
          height: 620px;
        }

        .chat-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0;
          overflow: hidden;
        }

        .chat-header {
          padding: 16px 20px;
          background: rgba(15, 29, 21, 0.85);
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .assistant-avatar {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(5, 150, 105, 0.5) 100%);
          border: 1px solid rgba(16, 185, 129, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #34d399;
        }

        .assistant-name {
          font-size: 1rem;
          font-weight: 700;
          color: #ffffff;
        }

        .assistant-status {
          font-size: 0.76rem;
          color: #34d399;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .chat-messages-area {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .message-bubble-wrap {
          display: flex;
          gap: 12px;
          max-width: 85%;
        }

        .message-bubble-wrap.user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }

        .message-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }

        .message-bubble-wrap.assistant .message-avatar {
          background: rgba(16, 185, 129, 0.2);
          color: #34d399;
        }

        .message-content-box {
          background: rgba(14, 28, 20, 0.85);
          border: 1px solid var(--border-color);
          padding: 12px 16px;
          border-radius: var(--radius-md);
        }

        .message-bubble-wrap.user .message-content-box {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #042f2e;
          font-weight: 600;
          border: none;
        }

        .message-text {
          font-family: var(--font-main);
          font-size: 0.88rem;
          line-height: 1.5;
          white-space: pre-wrap;
        }

        .message-bubble-wrap.user .message-text {
          color: #042f2e;
        }

        .typing-indicator {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 12px 16px;
          background: rgba(14, 28, 20, 0.85);
          border-radius: var(--radius-md);
        }

        .typing-indicator span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #34d399;
          animation: pulseGlow 1.2s infinite ease-in-out;
        }
        .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
        .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

        .chat-input-bar {
          padding: 14px 16px;
          background: rgba(15, 29, 21, 0.85);
          border-top: 1px solid var(--border-color);
          display: flex;
          gap: 10px;
        }

        .chat-input {
          flex: 1;
          background: rgba(9, 19, 13, 0.7);
          border: 1px solid var(--border-color);
          padding: 10px 16px;
          border-radius: var(--radius-md);
          color: #ffffff;
          font-size: 0.9rem;
          outline: none;
        }

        .chat-input:focus {
          border-color: #10b981;
        }

        .send-btn {
          padding: 10px 18px;
        }

        .prompts-side-card {
          display: flex;
          flex-direction: column;
          gap: 12px;
          overflow-y: auto;
        }

        .prompt-chips-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 8px;
        }

        .prompt-chip-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-align: left;
          background: rgba(9, 19, 13, 0.5);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          padding: 12px 14px;
          border-radius: var(--radius-md);
          font-size: 0.82rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .prompt-chip-btn:hover {
          background: rgba(16, 185, 129, 0.15);
          border-color: rgba(16, 185, 129, 0.4);
          color: #ffffff;
          transform: translateX(3px);
        }

        .arrow-icon {
          color: #10b981;
          flex-shrink: 0;
          margin-left: 8px;
        }

        @media (max-width: 1024px) {
          .ruraliq-chat-layout {
            grid-template-columns: 1fr;
            height: auto;
          }
          .chat-card {
            height: 520px;
          }
        }
      `}</style>
    </div>
  );
}
