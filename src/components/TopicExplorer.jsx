import React, { useState } from 'react';
import { Compass, Sparkles, BookOpen, ArrowRight } from 'lucide-react';
import { TOPICS_DATA, DEVOTIONALS_DATA } from '../data/devotionalsData';

export default function TopicExplorer({ onOpenReaderModal, setActiveTab }) {
  const [activeTopic, setActiveTopic] = useState(TOPICS_DATA[0]);

  return (
    <div className="topics-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <span className="badge-gold-pill">Scripture & Wisdom Finder</span>
          <h1 className="title-xl" style={{ marginTop: '8px' }}>Topics & Spiritual Guidance</h1>
          <p className="subtitle">
            Find quiet comfort and biblically-grounded reflections for whatever season your heart is in today.
          </p>
        </div>
      </div>

      {/* Topics Grid Selector */}
      <div className="grid-3 topics-selector-grid">
        {TOPICS_DATA.map(topic => (
          <div 
            key={topic.id} 
            className={`glass-card topic-card ${activeTopic.id === topic.id ? 'active' : ''}`}
            onClick={() => setActiveTopic(topic)}
          >
            <div className="topic-header">
              <span className="topic-icon">{topic.icon}</span>
              <span className="badge-gold-pill">{topic.count} Devotionals</span>
            </div>
            <h3 className="topic-name">{topic.name}</h3>
            <p className="topic-verse">Featured Scripture: {topic.verse}</p>
          </div>
        ))}
      </div>

      {/* Selected Topic Focus Showcase */}
      <div className="glass-card topic-focus-card">
        <div className="focus-header-row">
          <div className="flex-center">
            <span className="topic-focus-icon">{activeTopic.icon}</span>
            <div>
              <h2 className="title-lg">{activeTopic.name}</h2>
              <span className="focus-sub">Scripture Focus: {activeTopic.verse}</span>
            </div>
          </div>
          <button className="btn btn-gold" onClick={() => setActiveTab('faithai')}>
            <Sparkles size={16} />
            <span>Ask Faith AI about {activeTopic.name}</span>
          </button>
        </div>

        <div className="focus-prompt-box">
          <span className="prompt-label">Fireside Reflection Question:</span>
          <p className="prompt-text">“{activeTopic.prompt}”</p>
        </div>

        <div className="matched-devotionals-section">
          <h4 className="title-md">Recommended Devotionals on {activeTopic.name}</h4>
          <div className="grid-2">
            {DEVOTIONALS_DATA.slice(0, 2).map(dev => (
              <div key={dev.id} className="glass-card matched-dev-item glass-card-interactive" onClick={() => onOpenReaderModal(dev)}>
                <h4 className="matched-title">{dev.title}</h4>
                <p className="matched-excerpt">{dev.excerpt}</p>
                <div className="matched-footer">
                  <span>{dev.readTime}</span>
                  <span className="gold-link">Read Devotional →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .topics-page {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .topic-card {
          display: flex;
          flex-direction: column;
          gap: 12px;
          cursor: pointer;
          border: 1px solid var(--border-color);
          transition: all 0.25s ease;
        }

        .topic-card:hover, .topic-card.active {
          border-color: #fbbf24;
          background: rgba(20, 34, 66, 0.85);
          box-shadow: 0 0 25px rgba(251, 191, 36, 0.2);
          transform: translateY(-3px);
        }

        .topic-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .topic-icon {
          font-size: 1.8rem;
        }

        .topic-name {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          font-weight: 700;
          color: #ffffff;
        }

        .topic-verse {
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        .topic-focus-card {
          display: flex;
          flex-direction: column;
          gap: 24px;
          border: 1px solid var(--border-glow);
        }

        .focus-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        .flex-center {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .topic-focus-icon {
          font-size: 2.2rem;
        }

        .focus-sub {
          font-size: 0.88rem;
          color: var(--text-muted);
        }

        .focus-prompt-box {
          background: rgba(251, 191, 36, 0.08);
          border: 1px solid rgba(251, 191, 36, 0.3);
          border-radius: var(--radius-md);
          padding: 20px 24px;
        }

        .prompt-label {
          font-size: 0.78rem;
          font-weight: 700;
          color: #fbbf24;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          display: block;
          margin-bottom: 6px;
        }

        .prompt-text {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 1.25rem;
          color: #ffffff;
        }

        .matched-devotionals-section {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .matched-dev-item {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .matched-title {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          font-weight: 700;
          color: #ffffff;
        }

        .matched-excerpt {
          font-size: 0.86rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .matched-footer {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: var(--text-muted);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 8px;
        }

        .gold-link {
          color: #fbbf24;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}
