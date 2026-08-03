import React, { useState } from 'react';
import { Plus, Sparkles, BookOpen, Check, FileText, BarChart2, MessageSquare, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CMSAdmin({ onPublishNewDevotional }) {
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Peace & Rest');
  const [newVerse, setNewVerse] = useState('');
  const [newQuote, setNewQuote] = useState('');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newContent, setNewContent] = useState('');
  const [published, setPublished] = useState(false);

  const handlePublish = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newDev = {
      id: `dev-${Date.now()}`,
      title: newTitle,
      subtitle: "Words For Your Soul by Jeanna' Mead",
      category: newCategory,
      author: "Jeanna' Mead",
      date: "August 3, 2026",
      readTime: "4 min read",
      audioDuration: "3:30",
      verse: newVerse || "Psalm 46:10 — 'Be still, and know that I am God.'",
      quote: newQuote || "In quietness and trust is your strength.",
      excerpt: newExcerpt || newContent.slice(0, 120) + "...",
      fullContent: newContent,
      likesCount: 1,
      bookmarksCount: 1
    };

    onPublishNewDevotional(newDev);
    setPublished(true);

    confetti({
      particleCount: 70,
      spread: 70,
      colors: ['#fbbf24', '#f59e0b', '#ffffff'],
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      setPublished(false);
      setNewTitle('');
      setNewVerse('');
      setNewQuote('');
      setNewExcerpt('');
      setNewContent('');
    }, 2500);
  };

  return (
    <div className="cms-admin-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <span className="badge-gold-pill"><ShieldCheck size={13} /> Author Studio</span>
          <h1 className="title-xl" style={{ marginTop: '8px' }}>Jeanna' Mead's CMS Admin</h1>
          <p className="subtitle">
            Publish new fireside devotionals, manage community prayer requests, and monitor reader engagement.
          </p>
        </div>
      </div>

      {/* Reader Metrics Bar */}
      <div className="grid-3 metrics-grid">
        <div className="glass-card metric-card">
          <div className="metric-icon-box">
            <BookOpen size={20} className="icon-gold" />
          </div>
          <div>
            <span className="metric-val">128</span>
            <span className="metric-label">Published Devotionals</span>
          </div>
        </div>

        <div className="glass-card metric-card">
          <div className="metric-icon-box">
            <BarChart2 size={20} className="icon-gold" />
          </div>
          <div>
            <span className="metric-val">42.8k</span>
            <span className="metric-label">Monthly Readers</span>
          </div>
        </div>

        <div className="glass-card metric-card">
          <div className="metric-icon-box">
            <Sparkles size={20} className="icon-gold" />
          </div>
          <div>
            <span className="metric-val">1,420</span>
            <span className="metric-label">Prayers Supported</span>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="glass-card publish-card">
        <h2 className="title-lg" style={{ marginBottom: '16px' }}>Publish New Fireside Story / Devotional</h2>

        {published ? (
          <div className="success-banner">
            <Check size={24} className="icon-gold" />
            <div>
              <h4>Devotional Published Successfully!</h4>
              <p>Your new fireside devotional is live on GodDome.org for readers worldwide.</p>
            </div>
          </div>
        ) : (
          <form className="cms-form" onSubmit={handlePublish}>
            <div className="form-row-2">
              <div className="form-group">
                <label className="input-label">Devotional Title:</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="e.g. Whispers of Peace in the Morning Dew" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="input-label">Category / Theme:</label>
                <select 
                  className="input-field select-field"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                >
                  <option value="Peace & Rest">Peace & Rest</option>
                  <option value="Faith & Trust">Faith & Trust</option>
                  <option value="Daily Wisdom">Daily Wisdom</option>
                  <option value="Hope in Trials">Hope in Trials</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="input-label">Anchor Scripture Verse:</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="e.g. Psalm 46:10 — 'Be still, and know that I am God.'" 
                value={newVerse}
                onChange={(e) => setNewVerse(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="input-label">Fireside Quote Callout:</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="e.g. 'In quietness and trust is your strength.'" 
                value={newQuote}
                onChange={(e) => setNewQuote(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="input-label">Short Summary Excerpt:</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="Brief intro for the gallery preview..." 
                value={newExcerpt}
                onChange={(e) => setNewExcerpt(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="input-label">Full Devotional Body Content:</label>
              <textarea 
                className="input-field textarea-field" 
                rows="8"
                placeholder="Write your devotional message here..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-gold btn-lg">
              <Sparkles size={18} />
              <span>Publish to GodDome.org</span>
            </button>
          </form>
        )}
      </div>

      <style>{`
        .cms-admin-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .metric-card {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .metric-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(251, 191, 36, 0.15);
          border: 1px solid rgba(251, 191, 36, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .metric-val {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          font-weight: 800;
          color: #ffffff;
          display: block;
        }

        .metric-label {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .publish-card {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .cms-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-row-2 {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .input-label {
          font-size: 0.84rem;
          font-weight: 700;
          color: var(--text-secondary);
        }

        .select-field {
          cursor: pointer;
        }

        .textarea-field {
          resize: vertical;
        }

        .btn-lg {
          padding: 14px 28px;
          font-size: 1rem;
          align-self: flex-start;
        }

        .success-banner {
          display: flex;
          align-items: center;
          gap: 16px;
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.4);
          padding: 20px;
          border-radius: var(--radius-md);
          color: #ffffff;
        }

        @media (max-width: 768px) {
          .form-row-2 { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
