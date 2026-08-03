import React, { useState } from 'react';
import { Sparkles, Send, Flame, User, BookOpen, Heart, ArrowRight } from 'lucide-react';

export default function FaithAssistant({ onOpenReaderModal }) {
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'assistant',
      text: `Grace and peace to you! I am your **Faith Assistant** on GodDome.\n\nWhether you are seeking a comforting scripture verse, prayer for an anxious heart, or a devotional reflection by Jeanna' Mead, how can I bless your soul today?`
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    "Verses for peace during anxious moments",
    "Suggested devotional for quiet evening rest",
    "Scripture on standing strong in hard seasons",
    "A short prayer for family unity and healing"
  ];

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg = { id: `u-${Date.now()}`, sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let aiText = `“God's peace, which transcends all understanding, will guard your heart and your mind in Christ Jesus.” — Philippians 4:7\n\n`;

      if (query.toLowerCase().includes('anxious') || query.toLowerCase().includes('peace')) {
        aiText += `### 🌿 Comfort for Anxious Hearts:\n` +
          `1. **Key Scripture**: *1 Peter 5:7* — "Cast all your anxiety on Him because He cares for you."\n` +
          `2. **Jeanna's Fireside Thought**: "Anxiety tries to convince you that tomorrow belongs to you alone. Peace comes when you remember tomorrow is already held in God's hands."\n\n` +
          `*Recommended Devotional: "Starry Nights & Infinity: Finding Comfort in God's Vast Love"*`;
      } else if (query.toLowerCase().includes('sleep') || query.toLowerCase().includes('rest')) {
        aiText += `### 🌙 Evening Rest & Quiet Sleep:\n` +
          `1. **Key Scripture**: *Psalm 4:8* — "In peace I will lie down and sleep, for you alone, Lord, make me dwell in safety."\n` +
          `2. **Evening Prayer**: Lord, I release every worry of this day into Your hands. Wrap my mind in Your quiet peace. Amen.`;
      } else {
        aiText += `### ✨ Encouragement for Your Journey:\n` +
          `1. **Scripture Promise**: *Isaiah 41:10* — "Do not fear, for I am with you; do not be dismayed, for I am your God."\n` +
          `2. **Fireside Prayer**: Heavenly Father, strengthen my faith today. Teach me to rest in Your unfailing love. Amen.`;
      }

      setMessages(prev => [...prev, { id: `a-${Date.now()}`, sender: 'assistant', text: aiText }]);
      setIsTyping(false);
    }, 1100);
  };

  return (
    <div className="faith-ai-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <span className="badge-gold-pill"><Sparkles size={13} /> Spiritual Copilot</span>
          <h1 className="title-xl" style={{ marginTop: '8px' }}>Faith Assistant</h1>
          <p className="subtitle">
            Grounded in Holy Scripture and inspired by the devotional writings of Jeanna' Mead.
          </p>
        </div>
      </div>

      <div className="faith-ai-layout">
        {/* Chat Card */}
        <div className="glass-card chat-card">
          <div className="chat-header">
            <div className="assistant-avatar">
              <Flame size={20} className="flame-icon" />
            </div>
            <div>
              <h3 className="assistant-name">GraceAI Faith Assistant</h3>
              <span className="assistant-status"><span className="status-dot" /> Online • Scripture & Fireside Guidance</span>
            </div>
          </div>

          <div className="chat-messages-area">
            {messages.map(msg => (
              <div key={msg.id} className={`message-bubble-wrap ${msg.sender}`}>
                <div className="message-avatar">
                  {msg.sender === 'assistant' ? <Flame size={15} /> : <User size={15} />}
                </div>
                <div className="message-content-box">
                  <pre className="message-text">{msg.text}</pre>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="message-bubble-wrap assistant">
                <div className="message-avatar"><Flame size={15} /></div>
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
              placeholder="Ask for scriptures on peace, prayers, or devotional insights..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button type="submit" className="btn btn-gold send-btn" disabled={!inputText.trim() || isTyping}>
              <Send size={16} />
            </button>
          </form>
        </div>

        {/* Side Prompts */}
        <div className="glass-card prompts-side-card">
          <h3 className="title-md flex-center"><Sparkles size={16} className="icon-gold" /> Suggested Spiritual Prompts</h3>
          <p className="subtitle" style={{ fontSize: '0.84rem' }}>Click any prompt to ask Faith Assistant:</p>

          <div className="prompt-chips-list">
            {quickPrompts.map((promptText, i) => (
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
        .faith-ai-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .faith-ai-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 20px;
          height: 600px;
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
          background: rgba(9, 18, 38, 0.9);
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .assistant-avatar {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(251, 191, 36, 0.25) 0%, rgba(217, 119, 6, 0.4) 100%);
          border: 1px solid rgba(251, 191, 36, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fbbf24;
        }

        .assistant-name {
          font-family: var(--font-serif);
          font-size: 1.1rem;
          font-weight: 700;
          color: #ffffff;
        }

        .assistant-status {
          font-size: 0.76rem;
          color: #fbbf24;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #fbbf24;
          box-shadow: 0 0 8px #fbbf24;
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
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }

        .message-bubble-wrap.assistant .message-avatar {
          background: rgba(251, 191, 36, 0.2);
          color: #fbbf24;
        }

        .message-content-box {
          background: rgba(13, 22, 44, 0.85);
          border: 1px solid var(--border-color);
          padding: 14px 18px;
          border-radius: var(--radius-md);
        }

        .message-bubble-wrap.user .message-content-box {
          background: linear-gradient(135deg, #fbbf24 0%, #d97706 100%);
          color: #1a0f02;
          font-weight: 600;
          border: none;
        }

        .message-text {
          font-family: var(--font-main);
          font-size: 0.9rem;
          line-height: 1.5;
          white-space: pre-wrap;
        }

        .message-bubble-wrap.user .message-text {
          color: #1a0f02;
        }

        .typing-indicator {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 12px 16px;
          background: rgba(13, 22, 44, 0.85);
          border-radius: var(--radius-md);
        }

        .typing-indicator span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #fbbf24;
          animation: pulseGlow 1.2s infinite ease-in-out;
        }

        .chat-input-bar {
          padding: 14px 18px;
          background: rgba(9, 18, 38, 0.9);
          border-top: 1px solid var(--border-color);
          display: flex;
          gap: 10px;
        }

        .chat-input {
          flex: 1;
          background: rgba(5, 10, 22, 0.7);
          border: 1px solid var(--border-color);
          padding: 10px 16px;
          border-radius: var(--radius-md);
          color: #ffffff;
          font-size: 0.9rem;
          outline: none;
        }

        .prompts-side-card {
          display: flex;
          flex-direction: column;
          gap: 12px;
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
          background: rgba(5, 10, 22, 0.5);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          padding: 12px 14px;
          border-radius: var(--radius-md);
          font-size: 0.82rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .prompt-chip-btn:hover {
          background: rgba(251, 191, 36, 0.15);
          border-color: #fbbf24;
          color: #ffffff;
          transform: translateX(3px);
        }

        .arrow-icon {
          color: #fbbf24;
          flex-shrink: 0;
          margin-left: 8px;
        }

        @media (max-width: 1024px) {
          .faith-ai-layout {
            grid-template-columns: 1fr;
            height: auto;
          }
          .chat-card { height: 500px; }
        }
      `}</style>
    </div>
  );
}
