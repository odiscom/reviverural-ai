import React from 'react';
import { 
  Sprout, 
  BarChart3, 
  FileText, 
  Camera,
  Target,
  Zap, 
  Store, 
  Bot, 
  MapPin, 
  Sun, 
  Moon, 
  Sparkles 
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, theme, toggleTheme, currentCounty, setCountyModalOpen }) {
  const navItems = [
    { id: 'dashboard', label: 'Vitality Dashboard', icon: BarChart3 },
    { id: 'bids', label: 'Bid Analyzer', icon: FileText, highlight: true },
    { id: 'assessments', label: 'Property Vision', icon: Camera, highlight: true },
    { id: 'hunter', label: 'Opportunity Hunter', icon: Target, highlight: true },
    { id: 'grants', label: 'Grant Matcher', icon: Sparkles },
    { id: 'agtech', label: 'Precision AgTech', icon: Sprout },
    { id: 'microgrid', label: 'Microgrid Planner', icon: Zap },
    { id: 'mainstreet', label: 'Main Street', icon: Store },
    { id: 'ruraliq', label: 'RuralIQ AI', icon: Bot }
  ];

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand */}
        <div className="brand-logo" onClick={() => setActiveTab('dashboard')}>
          <div className="logo-icon-wrapper">
            <Sprout className="logo-icon" size={24} />
          </div>
          <div className="logo-text-group">
            <span className="brand-title">ReviveRural<span className="brand-ai">.us</span></span>
            <span className="brand-tagline">Municipal Mowing & Land AI</span>
          </div>
        </div>

        {/* Location / County Selector */}
        <div className="county-badge" onClick={() => setCountyModalOpen(true)} title="Click to switch county context">
          <MapPin size={15} className="pin-icon" />
          <span>{currentCounty}</span>
          <span className="live-indicator">LIVE</span>
        </div>

        {/* Navigation Tabs */}
        <nav className="nav-menu">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`nav-link ${isActive ? 'active' : ''} ${item.highlight ? 'featured-nav' : ''}`}
              >
                <Icon size={17} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Utility Buttons */}
        <div className="nav-actions">
          <button className="theme-toggle-btn" onClick={toggleTheme} title="Toggle Dark/Light Mode">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button className="btn btn-primary nav-cta-btn" onClick={() => setActiveTab('bids')}>
            <FileText size={16} />
            <span>Analyze RFP</span>
          </button>
        </div>
      </div>

      <style>{`
        .navbar-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(9, 19, 13, 0.88);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-color);
        }

        .navbar-container {
          max-width: 1480px;
          margin: 0 auto;
          padding: 12px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
        }

        .logo-icon-wrapper {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(5, 150, 105, 0.4) 100%);
          border: 1px solid rgba(16, 185, 129, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #34d399;
          box-shadow: 0 0 15px rgba(16, 185, 129, 0.3);
        }

        .brand-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.01em;
          line-height: 1;
        }

        .brand-ai {
          color: #10b981;
        }

        .brand-tagline {
          font-size: 0.7rem;
          color: var(--text-secondary);
          display: block;
          margin-top: 2px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .county-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.25);
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #a7f3d0;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .county-badge:hover {
          background: rgba(16, 185, 129, 0.2);
          border-color: rgba(16, 185, 129, 0.5);
        }

        .pin-icon { color: #10b981; }

        .live-indicator {
          background: #10b981;
          color: #042f2e;
          font-size: 0.65rem;
          font-weight: 800;
          padding: 1px 6px;
          border-radius: 4px;
        }

        .nav-menu {
          display: flex;
          align-items: center;
          gap: 4px;
          background: rgba(14, 28, 20, 0.6);
          padding: 4px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          overflow-x: auto;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 12px;
          border-radius: var(--radius-sm);
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .nav-link:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
        }

        .nav-link.active {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(5, 150, 105, 0.3) 100%);
          color: #ffffff;
          border: 1px solid rgba(16, 185, 129, 0.4);
          box-shadow: 0 0 12px rgba(16, 185, 129, 0.2);
        }

        .featured-nav {
          color: #34d399;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .theme-toggle-btn {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: var(--bg-glass);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .theme-toggle-btn:hover {
          background: rgba(34, 197, 94, 0.15);
          border-color: var(--border-glow);
        }

        @media (max-width: 1200px) {
          .nav-link span { display: none; }
          .nav-link { padding: 7px 9px; }
          .brand-tagline { display: none; }
        }
        @media (max-width: 768px) {
          .county-badge { display: none; }
          .navbar-container { padding: 10px 16px; }
        }
      `}</style>
    </header>
  );
}
