import React, { useState } from 'react';
import StarryBackground from './components/StarryBackground';
import Navbar from './components/Navbar';
import HomeHub from './components/HomeHub';
import DevotionalsGallery from './components/DevotionalsGallery';
import DevotionalReaderModal from './components/DevotionalReaderModal';
import TopicExplorer from './components/TopicExplorer';
import PrayerWall from './components/PrayerWall';
import FaithAssistant from './components/FaithAssistant';
import CMSAdmin from './components/CMSAdmin';
import DonateModal from './components/DonateModal';
import RequestPrayerModal from './components/RequestPrayerModal';
import { DEVOTIONALS_DATA } from './data/devotionalsData';
import { PRAYERS_DATA } from './data/prayersData';
import { Flame, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [devotionalsList, setDevotionalsList] = useState(DEVOTIONALS_DATA);
  const [selectedDevotional, setSelectedDevotional] = useState(null);
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [prayerModalOpen, setPrayerModalOpen] = useState(false);

  const handlePublishNewDevotional = (newDev) => {
    setDevotionalsList(prev => [newDev, ...prev]);
  };

  return (
    <div className="app-container">
      {/* Dynamic Starry Canvas Background */}
      <StarryBackground />

      {/* Header Navigation */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDonateModal={() => setDonateModalOpen(true)}
        onOpenPrayerModal={() => setPrayerModalOpen(true)}
      />

      {/* Main Tab Content */}
      <main className="main-content">
        {activeTab === 'home' && (
          <HomeHub 
            setActiveTab={setActiveTab}
            onOpenReaderModal={(dev) => setSelectedDevotional(dev)}
            onOpenDonateModal={() => setDonateModalOpen(true)}
          />
        )}

        {activeTab === 'devotionals' && (
          <DevotionalsGallery 
            onOpenReaderModal={(dev) => setSelectedDevotional(dev)}
          />
        )}

        {activeTab === 'topics' && (
          <TopicExplorer 
            onOpenReaderModal={(dev) => setSelectedDevotional(dev)}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'prayers' && (
          <PrayerWall 
            onOpenPrayerModal={() => setPrayerModalOpen(true)}
          />
        )}

        {activeTab === 'faithai' && (
          <FaithAssistant 
            onOpenReaderModal={(dev) => setSelectedDevotional(dev)}
          />
        )}

        {activeTab === 'cms' && (
          <CMSAdmin 
            onPublishNewDevotional={handlePublishNewDevotional}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <span className="footer-title">† GodDome ☥</span>
            <span className="footer-byline">Words For Your Soul by Jeanna' Mead</span>
          </div>

          <p className="footer-copyright">
            © 2026 GodDome.org • Fireside Devotionals & Christian Stories. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Devotional Reader Modal */}
      {selectedDevotional && (
        <DevotionalReaderModal 
          devotional={selectedDevotional}
          onClose={() => setSelectedDevotional(null)}
        />
      )}

      {/* Donate Modal */}
      {donateModalOpen && (
        <DonateModal 
          onClose={() => setDonateModalOpen(false)}
        />
      )}

      {/* Request Prayer Modal */}
      {prayerModalOpen && (
        <RequestPrayerModal 
          onClose={() => setPrayerModalOpen(false)}
          onAddPrayer={() => {}}
        />
      )}

      <style>{`
        .app-footer {
          position: relative;
          z-index: 10;
          background: rgba(5, 10, 22, 0.92);
          border-top: 1px solid rgba(251, 191, 36, 0.15);
          padding: 24px 28px;
          margin-top: auto;
        }

        .footer-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .footer-title {
          font-family: var(--font-brand);
          font-weight: 700;
          font-size: 1.2rem;
          color: #ffffff;
        }

        .footer-byline {
          font-size: 0.8rem;
          color: #ebd5b3;
          font-style: italic;
        }

        .footer-copyright {
          font-size: 0.82rem;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}
