import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, Bookmark, Heart, BookOpen, Sparkles, ArrowRight, Flame } from 'lucide-react';
import { DEVOTIONALS_DATA } from '../data/devotionalsData';

export default function HomeHub({ setActiveTab, onOpenReaderModal, onOpenDonateModal }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(35); // 35%
  const audioRef = useRef(null);

  const featuredDevotional = DEVOTIONALS_DATA[0];

  const togglePlayAudio = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="home-hub-page">
      {/* Screenshot Hero Banner */}
      <section className="hero-section">
        <div className="hero-pill-wrap">
          <span className="badge-gold-pill">
            <span className="cross-symbol">†</span> WORDS FOR YOUR SOUL <span className="cross-symbol">☥</span>
          </span>
        </div>

        <h1 className="hero-main-title">Fireside Devotionals & Stories</h1>

        {/* Screenshot Quote Box */}
        <div className="screenshot-quote-box">
          <p className="screenshot-quote-text">
            “God's love is like starry nights. Too vast and beautiful... comforting and magnified into infinity.”
          </p>
          <span className="screenshot-quote-author">— JEANNA' MEAD</span>
        </div>

        <p className="hero-subtext">
          Take a quiet moment to pause, rest, and pull up a chair with uplifting Christian stories and meditations.
        </p>

        <div className="hero-cta-group">
          <button className="btn btn-gold" onClick={() => onOpenReaderModal(featuredDevotional)}>
            <BookOpen size={16} />
            <span>Read Today's Devotional</span>
          </button>
          <button className="btn btn-outline-gold" onClick={() => setActiveTab('faithai')}>
            <Sparkles size={16} />
            <span>Ask Faith Assistant</span>
          </button>
        </div>
      </section>

      {/* Featured Audio Spotlight Player */}
      <section className="glass-card audio-spotlight-card">
        <div className="spotlight-badge-row">
          <span className="badge-gold-pill"><Flame size={12} /> Today's Fireside Audio Meditation</span>
          <span className="spotlight-date">{featuredDevotional.date}</span>
        </div>

        <div className="audio-spotlight-split">
          <div className="audio-cover-wrapper">
            <img src="/images/fireside_audio_cover_1785739251853.jpg" alt="Fireside Hearth" className="cover-img" />
            <button className="audio-play-floating-btn" onClick={togglePlayAudio}>
              {isPlaying ? <Pause size={24} fill="#1a0f02" /> : <Play size={24} fill="#1a0f02" style={{ marginLeft: '4px' }} />}
            </button>
          </div>

          <div className="audio-info-col">
            <h2 className="audio-devotional-title">{featuredDevotional.title}</h2>
            <p className="audio-devotional-verse">{featuredDevotional.verse}</p>

            {/* Custom Interactive Scrub Bar */}
            <div className="audio-scrub-container">
              <div className="scrub-time-row">
                <span>0:45</span>
                <span>{featuredDevotional.audioDuration}</span>
              </div>
              <div className="scrub-track" onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pct = ((e.clientX - rect.left) / rect.width) * 100;
                setAudioProgress(pct);
              }}>
                <div className="scrub-fill" style={{ width: `${audioProgress}%` }} />
              </div>
            </div>

            <div className="audio-bottom-actions">
              <button className="btn btn-gold btn-sm" onClick={() => onOpenReaderModal(featuredDevotional)}>
                <BookOpen size={15} />
                <span>Read Full Devotional</span>
              </button>
              <div className="audio-meta-icons">
                <span className="meta-icon-item"><Heart size={16} className="icon-gold" /> {featuredDevotional.likesCount}</span>
                <span className="meta-icon-item"><Bookmark size={16} className="icon-gold" /> {featuredDevotional.bookmarksCount}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Devotionals Gallery Section */}
      <section className="section-block">
        <div className="section-header-row">
          <div>
            <span className="badge-gold-pill">Spiritual Refreshment</span>
            <h2 className="title-lg" style={{ marginTop: '6px' }}>Recent Fireside Devotionals</h2>
          </div>
          <button className="btn btn-outline-gold" onClick={() => setActiveTab('devotionals')}>
            <span>View All Library</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid-3 devotionals-grid">
          {DEVOTIONALS_DATA.slice(1).map(dev => (
            <div 
              key={dev.id} 
              className="glass-card devotional-card glass-card-interactive"
              onClick={() => onOpenReaderModal(dev)}
            >
              <div className="devotional-card-top">
                <span className="badge-gold-pill">{dev.category}</span>
                <span className="read-time">{dev.readTime}</span>
              </div>

              <h3 className="card-dev-title">{dev.title}</h3>
              <p className="card-dev-excerpt">{dev.excerpt}</p>

              <div className="card-dev-footer">
                <span className="author-tag">By {dev.author}</span>
                <span className="read-link">Read Story →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Author Warm Welcome Banner */}
      <section className="glass-card author-spotlight-card">
        <div className="author-img-wrapper">
          <img src="/images/jeanna_portrait_1785739261110.jpg" alt="Jeanna' Mead" className="author-img" />
        </div>
        <div className="author-bio-content">
          <span className="badge-gold-pill">A Personal Note</span>
          <h2 className="title-lg" style={{ marginTop: '8px' }}>Welcome to GodDome, My Dear Friend</h2>
          <p className="author-text">
            “Whether you are coming in from a stormy season or simply seeking a quiet cup of peace in your morning, my prayer is that these fireside stories remind your heart of one unshakeable truth: God’s grace is bigger than your biggest night.”
          </p>
          <span className="author-signature">— Jeanna' Mead</span>
        </div>
      </section>

      <style>{`
        .home-hub-page {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .hero-section {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          padding: 30px 20px 10px;
        }

        .hero-main-title {
          font-family: var(--font-serif);
          font-size: 3.4rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.01em;
          line-height: 1.1;
        }

        .hero-subtext {
          font-size: 1.05rem;
          color: var(--text-secondary);
          max-width: 600px;
          line-height: 1.6;
        }

        .hero-cta-group {
          display: flex;
          gap: 14px;
          margin-top: 10px;
          flex-wrap: wrap;
          justify-content: center;
        }

        /* Audio Spotlight */
        .audio-spotlight-card {
          border: 1px solid var(--border-glow);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6), var(--shadow-glow);
        }

        .spotlight-badge-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .spotlight-date {
          font-size: 0.84rem;
          color: var(--text-muted);
        }

        .audio-spotlight-split {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 28px;
          align-items: center;
        }

        .audio-cover-wrapper {
          position: relative;
          width: 200px;
          height: 200px;
          border-radius: var(--radius-md);
          overflow: hidden;
          border: 1px solid var(--border-color);
        }

        .cover-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .audio-play-floating-btn {
          position: absolute;
          inset: 0;
          margin: auto;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #fbbf24;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 0 25px rgba(251, 191, 36, 0.7);
          transition: transform 0.2s ease;
        }

        .audio-play-floating-btn:hover {
          transform: scale(1.1);
        }

        .audio-info-col {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .audio-devotional-title {
          font-family: var(--font-serif);
          font-size: 1.7rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.35;
        }

        .audio-devotional-verse {
          font-size: 0.92rem;
          color: #ebd5b3;
          font-style: italic;
          line-height: 1.5;
        }

        .audio-scrub-container {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-top: 8px;
        }

        .scrub-time-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .scrub-track {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          cursor: pointer;
          overflow: hidden;
        }

        .scrub-fill {
          height: 100%;
          background: linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%);
          border-radius: 4px;
          box-shadow: 0 0 10px #fbbf24;
        }

        .audio-bottom-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 10px;
        }

        .audio-meta-icons {
          display: flex;
          gap: 16px;
        }

        .meta-icon-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .icon-gold { color: #fbbf24; }

        .btn-sm {
          padding: 8px 16px;
          font-size: 0.82rem;
        }

        /* Section Block */
        .section-block {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .section-header-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
        }

        .devotional-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 14px;
        }

        .devotional-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .read-time {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .card-dev-title {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.35;
        }

        .card-dev-excerpt {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .card-dev-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.82rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 10px;
        }

        .author-tag {
          color: var(--text-muted);
        }

        .read-link {
          color: #fbbf24;
          font-weight: 700;
        }

        /* Author Spotlight */
        .author-spotlight-card {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 32px;
          align-items: center;
          border: 1px solid rgba(251, 191, 36, 0.3);
        }

        .author-img-wrapper {
          height: 220px;
          border-radius: var(--radius-md);
          overflow: hidden;
          border: 1px solid var(--border-color);
        }

        .author-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .author-bio-content {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .author-text {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: 1.05rem;
          color: #ebd5b3;
          line-height: 1.6;
        }

        .author-signature {
          font-size: 0.9rem;
          font-weight: 700;
          color: #fbbf24;
          letter-spacing: 0.05em;
        }

        @media (max-width: 900px) {
          .hero-main-title {
            font-size: 2.4rem;
          }
          .audio-spotlight-split, .author-spotlight-card {
            grid-template-columns: 1fr;
          }
          .audio-cover-wrapper {
            margin: 0 auto;
          }
        }
      `}</style>
    </div>
  );
}
