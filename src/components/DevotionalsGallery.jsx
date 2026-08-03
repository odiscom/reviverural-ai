import React, { useState } from 'react';
import { Search, BookOpen, Volume2, Sparkles, Heart, Bookmark } from 'lucide-react';
import { DEVOTIONALS_DATA } from '../data/devotionalsData';

export default function DevotionalsGallery({ onOpenReaderModal }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Peace & Rest', 'Faith & Trust', 'Daily Wisdom', 'Hope in Trials'];

  const filteredDevotionals = DEVOTIONALS_DATA.filter(dev => {
    const matchesCategory = selectedCategory === 'All' || dev.category === selectedCategory;
    const matchesSearch = dev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dev.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dev.verse.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="gallery-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <span className="badge-gold-pill">Words For Your Soul</span>
          <h1 className="title-xl" style={{ marginTop: '8px' }}>Devotionals & Fireside Stories</h1>
          <p className="subtitle">
            Explore uplifting meditations, scripture reflections, and audio narration by Jeanna' Mead.
          </p>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="glass-card controls-card">
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by scripture verse, title, or topic..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

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

      {/* Devotionals Grid */}
      <div className="grid-2 gallery-grid">
        {filteredDevotionals.map(dev => (
          <div 
            key={dev.id} 
            className="glass-card gallery-card glass-card-interactive"
            onClick={() => onOpenReaderModal(dev)}
          >
            <div className="gallery-card-header">
              <span className="badge-gold-pill">{dev.category}</span>
              <div className="meta-pills">
                <span className="audio-pill"><Volume2 size={13} /> {dev.audioDuration}</span>
                <span className="time-pill">{dev.readTime}</span>
              </div>
            </div>

            <h3 className="gallery-card-title">{dev.title}</h3>
            <p className="gallery-card-verse">{dev.verse}</p>
            <p className="gallery-card-excerpt">{dev.excerpt}</p>

            <div className="gallery-card-footer">
              <span className="author-name">By {dev.author}</span>
              <button className="btn btn-gold btn-sm">
                <BookOpen size={14} />
                <span>Read Story</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .gallery-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .controls-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          padding: 16px 24px;
        }

        .search-bar {
          position: relative;
          flex: 1;
          min-width: 280px;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .search-input {
          padding-left: 42px;
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

        .gallery-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 14px;
        }

        .gallery-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .meta-pills {
          display: flex;
          gap: 8px;
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .audio-pill {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #fbbf24;
        }

        .gallery-card-title {
          font-family: var(--font-serif);
          font-size: 1.45rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.3;
        }

        .gallery-card-verse {
          font-size: 0.88rem;
          color: #ebd5b3;
          font-style: italic;
          background: rgba(251, 191, 36, 0.06);
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          border-left: 2px solid #fbbf24;
        }

        .gallery-card-excerpt {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .gallery-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 12px;
        }

        .author-name {
          font-size: 0.82rem;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}
