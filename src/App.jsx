import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import MunicipalBidAnalyzer from './components/MunicipalBidAnalyzer';
import PropertyAssessmentVision from './components/PropertyAssessmentVision';
import MunicipalOpportunityHunter from './components/MunicipalOpportunityHunter';
import GrantMatcher from './components/GrantMatcher';
import AgTechHub from './components/AgTechHub';
import MicrogridPlanner from './components/MicrogridPlanner';
import MainStreetHub from './components/MainStreetHub';
import RuralIQAssistant from './components/RuralIQAssistant';
import { MapPin, Globe, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('bids'); // Default to Bid Analyzer for Municipal Mowing core workflow
  const [theme, setTheme] = useState('dark');
  const [currentCounty, setCurrentCounty] = useState('Jasper County, IA');
  const [countyModalOpen, setCountyModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const sampleCounties = [
    'Jasper County, IA',
    'Smith County, TX',
    'Harris County, TX',
    'Linn County, IA',
    'Rock County, MN',
    'Knox County, IL'
  ];

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        toggleTheme={toggleTheme}
        currentCounty={currentCounty}
        setCountyModalOpen={setCountyModalOpen}
      />

      {/* Main Tab Content */}
      <main className="main-content">
        {activeTab === 'dashboard' && <Dashboard setActiveTab={setActiveTab} />}
        {activeTab === 'bids' && <MunicipalBidAnalyzer />}
        {activeTab === 'assessments' && <PropertyAssessmentVision />}
        {activeTab === 'hunter' && <MunicipalOpportunityHunter setActiveTab={setActiveTab} />}
        {activeTab === 'grants' && <GrantMatcher setActiveTab={setActiveTab} />}
        {activeTab === 'agtech' && <AgTechHub />}
        {activeTab === 'microgrid' && <MicrogridPlanner />}
        {activeTab === 'mainstreet' && <MainStreetHub />}
        {activeTab === 'ruraliq' && <RuralIQAssistant currentCounty={currentCounty} />}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <span className="footer-title">ReviveRural<span className="brand-ai">.us</span></span>
            <span className="footer-copy">© 2026 Revive Rural AI Platform. Municipal Mowing & Land Management AI.</span>
          </div>

          <div className="footer-links">
            <span className="footer-badge badge-emerald">
              <Globe size={13} /> Target Domain: ai.reviverural.us
            </span>
          </div>
        </div>
      </footer>

      {/* County Switcher Modal */}
      {countyModalOpen && (
        <div className="modal-overlay" onClick={() => setCountyModalOpen(false)}>
          <div className="modal-content glass-card county-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="flex-center">
                <MapPin size={20} className="icon-emerald" />
                <h3 className="modal-title">Select County / Region Context</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setCountyModalOpen(false)}>×</button>
            </div>

            <p className="subtitle" style={{ marginBottom: '16px' }}>
              Select a jurisdiction to update local GIS telemetry, municipal bid listings, and parcel datasets.
            </p>

            <div className="county-list">
              {sampleCounties.map(c => (
                <button 
                  key={c}
                  className={`county-select-btn ${currentCounty === c ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentCounty(c);
                    setCountyModalOpen(false);
                  }}
                >
                  <MapPin size={16} />
                  <span>{c}</span>
                  {currentCounty === c && <Sparkles size={14} className="icon-emerald" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .app-footer {
          background: rgba(9, 19, 13, 0.9);
          border-top: 1px solid var(--border-color);
          padding: 20px 28px;
          margin-top: auto;
        }

        .footer-container {
          max-width: 1480px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .footer-title {
          font-weight: 800;
          font-size: 1.1rem;
          color: #ffffff;
        }

        .footer-copy {
          font-size: 0.82rem;
          color: var(--text-secondary);
        }

        .footer-badge {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .county-modal {
          max-width: 460px;
        }

        .county-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .county-select-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(9, 19, 13, 0.5);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          padding: 12px 16px;
          border-radius: var(--radius-md);
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .county-select-btn:hover, .county-select-btn.active {
          background: rgba(16, 185, 129, 0.2);
          border-color: rgba(16, 185, 129, 0.5);
          color: #ffffff;
        }
      `}</style>
    </div>
  );
}
