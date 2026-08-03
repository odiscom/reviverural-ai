import React from 'react';
import { Heart, Sparkles, Cross, Flame } from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  onOpenDonateModal, 
  onOpenPrayerModal 
}) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'devotionals', label: 'Devotionals' },
    { id: 'topics', label: 'Topics' },
    { id: 'prayers', label: 'Prayer Requests' },
    { id: 'faithai', label: 'Faith Assistant', sparkle: true },
    { id: 'cms', label: 'CMS ADMIN', highlight: true }
  ];

  return (
    <header className="goddome-header">
      <div className="header-container">
        {/* Brand Logo matching screenshot */}
        <div className="brand-logo" onClick={() => setActiveTab('home')}>
          <div className="logo-shield">
            <span className="shield-cross">†</span>
            <Flame size={18} className="shield-flame" />
          </div>
          <div className="logo-text-group">
            <div className="logo-title-row">
              <span className="cross-prefix">†</span>
              <span className="brand-name">GodDome</span>
              <span className="cross-suffix">☥</span>
            </div>
            <span className="brand-byline">Words For Your Soul by Jeanna' Mead</span>
          </div>
        </div>

        {/* Center Nav Items matching screenshot */}
        <nav className="header-nav">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`nav-link ${isActive ? 'active' : ''} ${item.highlight ? 'cms-link' : ''}`}
              >
                <span>{item.label}</span>
                {item.sparkle && <Sparkles size={13} className="sparkle-icon" />}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Buttons matching screenshot */}
        <div className="header-actions">
          <button className="btn-donate-gold" onClick={onOpenDonateModal}>
            <Heart size={14} fill="#1a0f02" />
            <span>DONATE</span>
          </button>
          <button className="btn-request-crimson" onClick={onOpenPrayerModal}>
            <span>REQUEST PRAYER</span>
          </button>
        </div>
      </div>

      <style>{`
        .goddome-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(5, 10, 22, 0.88);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(251, 191, 36, 0.15);
        }

        .header-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 16px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
        }

        .logo-shield {
          width: 40px;
          height: 44px;
          border-radius: 10px;
          background: linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(217, 119, 6, 0.35) 100%);
          border: 1px solid rgba(251, 191, 36, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: 0 0 16px rgba(251, 191, 36, 0.2);
        }

        .shield-cross {
          color: #fbbf24;
          font-size: 1.2rem;
          font-weight: bold;
        }

        .shield-flame {
          position: absolute;
          top: 4px;
          right: 4px;
          color: #f59e0b;
        }

        .logo-text-group {
          display: flex;
          flex-direction: column;
        }

        .logo-title-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .cross-prefix, .cross-suffix {
          color: #fbbf24;
          font-size: 1.1rem;
        }

        .brand-name {
          font-family: var(--font-brand);
          font-size: 1.4rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.04em;
        }

        .brand-byline {
          font-size: 0.72rem;
          color: #ebd5b3;
          font-style: italic;
          letter-spacing: 0.02em;
        }

        .header-nav {
          display: flex;
          align-items: center;
          gap: 22px;
        }

        .nav-link {
          background: none;
          border: none;
          color: #ebd5b3;
          font-size: 0.92rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 6px;
          position: relative;
          padding: 6px 0;
        }

        .nav-link:hover {
          color: #fbbf24;
        }

        .nav-link.active {
          color: #ffffff;
          font-weight: 700;
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: #fbbf24;
          border-radius: 2px;
          box-shadow: 0 0 8px #fbbf24;
        }

        .cms-link {
          font-size: 0.8rem;
          letter-spacing: 0.08em;
          color: #fbbf24;
        }

        .sparkle-icon {
          color: #fbbf24;
          animation: pulseGlow 1.8s infinite ease-in-out;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .btn-donate-gold {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 9px 18px;
          border-radius: 999px;
          background: #fbbf24;
          color: #1a0f02;
          font-size: 0.82rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(251, 191, 36, 0.4);
          transition: all 0.2s ease;
        }

        .btn-donate-gold:hover {
          transform: translateY(-2px);
          background: #fef08a;
          box-shadow: 0 6px 20px rgba(251, 191, 36, 0.6);
        }

        .btn-request-crimson {
          display: inline-flex;
          align-items: center;
          padding: 9px 20px;
          border-radius: 999px;
          background: #be123c;
          color: #ffffff;
          font-size: 0.82rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(190, 18, 60, 0.4);
          transition: all 0.2s ease;
        }

        .btn-request-crimson:hover {
          transform: translateY(-2px);
          background: #e11d48;
          box-shadow: 0 6px 20px rgba(190, 18, 60, 0.6);
        }

        @media (max-width: 1024px) {
          .header-nav {
            gap: 12px;
          }
          .brand-byline {
            display: none;
          }
        }
        @media (max-width: 768px) {
          .header-nav {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
