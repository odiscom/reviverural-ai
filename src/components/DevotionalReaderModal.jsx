import React, { useState } from 'react';
import { X, Bookmark, Heart, Share2, Volume2, Check, Sparkles, Flame } from 'lucide-react';

export default function DevotionalReaderModal({ devotional, onClose }) {
  const [fontSize, setFontSize] = useState('md'); // sm, md, lg
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [copiedQuote, setCopiedQuote] = useState(false);

  if (!devotional) return null;

  const handleShareQuote = () => {
    const shareText = `“${devotional.quote}” — ${devotional.author}\nRead more on GodDome.org (Words For Your Soul)`;
    navigator.clipboard.writeText(shareText);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 2200);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-card reader-modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal Controls Bar */}
        <div className="reader-toolbar">
          <div className="toolbar-left">
            <span className="badge-gold-pill">{devotional.category}</span>
            <span className="reader-read-time">{devotional.readTime}</span>
          </div>

          <div className="toolbar-actions">
            {/* Font Sizer */}
            <div className="font-sizer-group">
              <button 
                className={`font-btn ${fontSize === 'sm' ? 'active' : ''}`}
                onClick={() => setFontSize('sm')}
              >
                A-
              </button>
              <button 
                className={`font-btn ${fontSize === 'md' ? 'active' : ''}`}
                onClick={() => setFontSize('md')}
              >
                A
              </button>
              <button 
                className={`font-btn ${fontSize === 'lg' ? 'active' : ''}`}
                onClick={() => setFontSize('lg')}
              >
                A+
              </button>
            </div>

            <button 
              className={`action-circle-btn ${bookmarked ? 'active' : ''}`}
              onClick={() => setBookmarked(!bookmarked)}
              title="Bookmark Devotional"
            >
              <Bookmark size={18} />
            </button>

            <button 
              className={`action-circle-btn ${liked ? 'liked' : ''}`}
              onClick={() => setLiked(!liked)}
              title="Like Devotional"
            >
              <Heart size={18} fill={liked ? '#be123c' : 'none'} />
            </button>

            <button className="modal-close-btn" onClick={onClose}>×</button>
          </div>
        </div>

        {/* Article Body */}
        <div className="reader-scroll-area">
          <h1 className="reader-dev-title">{devotional.title}</h1>
          <div className="reader-meta-row">
            <span className="meta-author">By {devotional.author}</span>
            <span className="meta-dot">•</span>
            <span className="meta-date">{devotional.date}</span>
          </div>

          {/* Scripture Callout Box */}
          <div className="scripture-hero-box">
            <p className="scripture-verse-text">{devotional.verse}</p>
          </div>

          {/* Quote Callout */}
          <div className="screenshot-quote-box reader-quote-box">
            <p className="screenshot-quote-text">“{devotional.quote}”</p>
            <span className="screenshot-quote-author">— {devotional.author.toUpperCase()}</span>
          </div>

          {/* Body Content */}
          <div className={`devotional-text-body size-${fontSize}`}>
            {devotional.fullContent.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Reader Footer Share Bar */}
          <div className="reader-footer-bar">
            <button className="btn btn-outline-gold" onClick={handleShareQuote}>
              {copiedQuote ? <Check size={16} /> : <Share2 size={16} />}
              <span>{copiedQuote ? 'Quote Copied to Clipboard!' : 'Share Quote Card'}</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(3, 7, 16, 0.88);
          backdrop-filter: blur(16px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 200;
          padding: 20px;
        }

        .reader-modal {
          width: 100%;
          max-width: 820px;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          padding: 0;
          overflow: hidden;
          border: 1px solid var(--border-glow);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8), var(--shadow-glow);
        }

        .reader-toolbar {
          padding: 16px 24px;
          background: rgba(9, 18, 38, 0.9);
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .toolbar-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .reader-read-time {
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        .toolbar-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .font-sizer-group {
          display: flex;
          gap: 4px;
          background: rgba(255, 255, 255, 0.05);
          padding: 3px;
          border-radius: 8px;
          border: 1px solid var(--border-color);
        }

        .font-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          padding: 3px 8px;
          border-radius: 4px;
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
        }

        .font-btn.active {
          background: rgba(251, 191, 36, 0.2);
          color: #fbbf24;
        }

        .action-circle-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-circle-btn:hover, .action-circle-btn.active {
          background: rgba(251, 191, 36, 0.2);
          border-color: #fbbf24;
          color: #fbbf24;
        }

        .action-circle-btn.liked {
          background: rgba(190, 18, 60, 0.2);
          border-color: #be123c;
          color: #be123c;
        }

        .modal-close-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          font-size: 1.8rem;
          cursor: pointer;
          margin-left: 8px;
        }

        .reader-scroll-area {
          flex: 1;
          padding: 32px 40px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .reader-dev-title {
          font-family: var(--font-serif);
          font-size: 2.2rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.25;
        }

        .reader-meta-row {
          font-size: 0.88rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .meta-dot { color: var(--text-muted); }

        .scripture-hero-box {
          background: rgba(251, 191, 36, 0.08);
          border: 1px solid rgba(251, 191, 36, 0.3);
          border-radius: var(--radius-md);
          padding: 16px 20px;
        }

        .scripture-verse-text {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 1.05rem;
          color: #fef8ee;
          line-height: 1.6;
        }

        .reader-quote-box {
          margin: 0;
          max-width: 100%;
        }

        .devotional-text-body {
          display: flex;
          flex-direction: column;
          gap: 16px;
          line-height: 1.7;
          color: #ebd5b3;
        }

        .devotional-text-body p {
          white-space: pre-wrap;
        }

        .size-sm { font-size: 0.95rem; }
        .size-md { font-size: 1.1rem; }
        .size-lg { font-size: 1.25rem; }

        .reader-footer-bar {
          display: flex;
          justify-content: center;
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
      `}</style>
    </div>
  );
}
