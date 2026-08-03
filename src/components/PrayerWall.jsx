import React, { useState } from 'react';
import { Heart, Flame, Sparkles, Plus, Check, MessageSquare, Shield } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PRAYERS_DATA } from '../data/prayersData';

export default function PrayerWall({ onOpenPrayerModal }) {
  const [prayersList, setPrayersList] = useState(PRAYERS_DATA);
  const [prayedIds, setPrayedIds] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Healing', 'Family', 'Praise & Thanksgiving', 'Peace & Rest'];

  const handlePrayForUser = (prayerId) => {
    if (prayedIds.includes(prayerId)) return;

    setPrayedIds(prev => [...prev, prayerId]);
    setPrayersList(prev => prev.map(item => {
      if (item.id === prayerId) {
        return { ...item, prayedCount: item.prayedCount + 1 };
      }
      return item;
    }));

    // Trigger golden sparkles confetti
    confetti({
      particleCount: 50,
      spread: 60,
      colors: ['#fbbf24', '#f59e0b', '#ffffff'],
      origin: { y: 0.7 }
    });
  };

  const filteredPrayers = prayersList.filter(p => selectedCategory === 'All' || p.category === selectedCategory);

  return (
    <div className="prayer-wall-page">
      {/* Header */}
      <div className="page-header flex-header">
        <div>
          <span className="badge-gold-pill">Fireside Fellowship</span>
          <h1 className="title-xl" style={{ marginTop: '8px' }}>Community Prayer Wall</h1>
          <p className="subtitle">
            Stand in agreement with brothers and sisters around the globe. Lift one another up in prayer.
          </p>
        </div>

        <button className="btn btn-crimson" onClick={onOpenPrayerModal}>
          <Plus size={16} />
          <span>Submit Prayer Request</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="glass-card category-bar">
        <div className="category-pills">
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`cat-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Prayer Request Cards Grid */}
      <div className="grid-2 prayers-grid">
        {filteredPrayers.map(prayer => {
          const hasPrayed = prayedIds.includes(prayer.id);
          return (
            <div key={prayer.id} className="glass-card prayer-card">
              <div className="prayer-card-header">
                <div>
                  <h4 className="author-title">{prayer.author}</h4>
                  <span className="location-tag">{prayer.location} • {prayer.date}</span>
                </div>
                <span className={`badge-status ${prayer.status === 'Answered' ? 'answered' : 'active'}`}>
                  {prayer.status === 'Answered' ? '✨ Answered Praise' : '🙏 Active Prayer'}
                </span>
              </div>

              <h3 className="request-title">{prayer.title}</h3>
              <p className="request-body">{prayer.request}</p>

              <div className="prayer-card-footer">
                <div className="prayed-counter-group">
                  <span className="prayed-count-number">{prayer.prayedCount}</span>
                  <span className="prayed-count-label">Believers Prayed</span>
                </div>

                <button 
                  className={`btn ${hasPrayed ? 'btn-prayed-done' : 'btn-pray-action'}`}
                  onClick={() => handlePrayForUser(prayer.id)}
                  disabled={hasPrayed}
                >
                  {hasPrayed ? (
                    <>
                      <Check size={16} />
                      <span>Prayed!</span>
                    </>
                  ) : (
                    <>
                      <Heart size={16} fill="#1a0f02" />
                      <span>I Prayed for You</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .prayer-wall-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .flex-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        .category-bar {
          padding: 14px 20px;
        }

        .category-pills {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .cat-pill {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          padding: 8px 16px;
          border-radius: 99px;
          font-size: 0.84rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .cat-pill:hover, .cat-pill.active {
          background: rgba(251, 191, 36, 0.2);
          border-color: #fbbf24;
          color: #ffffff;
        }

        .prayer-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 16px;
        }

        .prayer-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .author-title {
          font-size: 1rem;
          font-weight: 700;
          color: #ffffff;
        }

        .location-tag {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .badge-status {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 99px;
        }

        .badge-status.active {
          background: rgba(251, 191, 36, 0.15);
          color: #fbbf24;
          border: 1px solid rgba(251, 191, 36, 0.3);
        }

        .badge-status.answered {
          background: rgba(16, 185, 129, 0.15);
          color: #34d399;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .request-title {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.3;
        }

        .request-body {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
          background: rgba(5, 10, 22, 0.6);
          padding: 14px;
          border-radius: var(--radius-md);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .prayer-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 12px;
        }

        .prayed-counter-group {
          display: flex;
          flex-direction: column;
        }

        .prayed-count-number {
          font-family: var(--font-serif);
          font-size: 1.3rem;
          font-weight: 800;
          color: #fbbf24;
          line-height: 1;
        }

        .prayed-count-label {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .btn-pray-action {
          background: linear-gradient(135deg, #fbbf24 0%, #d97706 100%);
          color: #1a0f02;
          font-weight: 800;
          box-shadow: 0 4px 14px rgba(251, 191, 36, 0.35);
        }

        .btn-pray-action:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(251, 191, 36, 0.55);
        }

        .btn-prayed-done {
          background: rgba(16, 185, 129, 0.2);
          color: #34d399;
          border: 1px solid rgba(16, 185, 129, 0.4);
          cursor: default;
        }
      `}</style>
    </div>
  );
}
