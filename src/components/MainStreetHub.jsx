import React, { useState } from 'react';
import { Store, Calendar, Sparkles, TrendingUp, Star, Megaphone, Copy, Check } from 'lucide-react';
import { MAIN_STREET_DATA } from '../data/mockData';

export default function MainStreetHub() {
  const [bizName, setBizName] = useState('Heritage Valley Bakery');
  const [bizProduct, setBizProduct] = useState('Fresh stone-ground sourdough & organic apple tarts');
  const [generatingCampaign, setGeneratingCampaign] = useState(false);
  const [generatedCampaign, setGeneratedCampaign] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleGenerateCampaign = () => {
    setGeneratingCampaign(true);
    setTimeout(() => {
      setGeneratingCampaign(false);
      setGeneratedCampaign({
        socialPost: `🌾 Fresh from the farm to your table! At ${bizName}, we're proud to bring you ${bizProduct}. Handcrafted in Jasper County with 100% locally sourced ingredients. Stop by Main Street this weekend or order online for local pickup!\n\n#ReviveRural #ShopLocal #JasperCounty #FarmToTable #AgriTourism`,
        targetAudience: "Regional weekend travelers, local farm-to-table food enthusiasts, families within 35 miles.",
        newsletterSubject: `🎉 Weekend Special at ${bizName}: Fresh Local Delights!`,
        newsletterBody: `Hello Neighbor!\n\nThis week, our local farm partners harvested peak seasonal ingredients to craft ${bizProduct}. Support local agriculture while treating yourself to authentic rural quality.\n\nVisit us at Main Street or check out our booth at the upcoming Harvest Festival!`
      });
    }, 1000);
  };

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mainstreet-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="badge badge-purple">
            <Sparkles size={13} /> Main Street Economic & Tourism Engine
          </div>
          <h1 className="title-xl" style={{ marginTop: '8px' }}>Local Business & Agri-Tourism Hub</h1>
          <p className="subtitle">
            Boost rural small business growth, showcase local makers, and generate AI marketing campaigns.
          </p>
        </div>
      </div>

      {/* Hero Showcase Image Banner */}
      <div className="glass-card mainstreet-hero-card">
        <div className="hero-img-box">
          <img src="/images/main_street_rural_1785737964224.jpg" alt="Main Street Rural Town" className="hero-img" />
        </div>
        <div className="hero-info">
          <span className="badge badge-amber">Jasper Main Street District</span>
          <h2 className="hero-town-title">Jasper Town Square & Heritage Marketplace</h2>
          <p className="hero-town-text">
            Home to 24 independent local artisans, farm co-ops, and craft eateries. ReviveRural AI powers direct marketing, seasonal tourism events, and shop-local loyalty incentives.
          </p>
        </div>
      </div>

      {/* Main Split: Business Directory & AI Marketing Generator */}
      <div className="mainstreet-split">
        {/* Left: Local Business Spotlight */}
        <div className="glass-card business-card">
          <div className="card-header-row">
            <h3 className="title-lg">Featured Local Artisans & Co-ops</h3>
            <span className="badge badge-emerald">Growth Spotlight</span>
          </div>

          <div className="biz-list">
            {MAIN_STREET_DATA.businesses.map(biz => (
              <div key={biz.id} className="biz-item">
                <div className="biz-top">
                  <div>
                    <h4 className="biz-title">{biz.name}</h4>
                    <span className="biz-category">{biz.category}</span>
                  </div>
                  <div className="biz-badge-group">
                    <span className="growth-badge"><TrendingUp size={12} /> {biz.growth}</span>
                    <span className="rating-badge"><Star size={12} /> {biz.rating}</span>
                  </div>
                </div>
                <p className="biz-story">{biz.story}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: AI Marketing Campaign Builder */}
        <div className="glass-card campaign-card">
          <div className="card-header-row">
            <h3 className="title-md flex-center"><Megaphone size={18} className="icon-purple" /> AI Marketing Generator</h3>
            <span className="badge badge-purple">Instant Ads</span>
          </div>

          <div className="campaign-inputs">
            <div className="input-group">
              <label className="input-label">Business Name:</label>
              <input 
                type="text" 
                value={bizName}
                onChange={(e) => setBizName(e.target.value)}
                className="input-field"
              />
            </div>

            <div className="input-group">
              <label className="input-label">Featured Product / Event:</label>
              <input 
                type="text" 
                value={bizProduct}
                onChange={(e) => setBizProduct(e.target.value)}
                className="input-field"
              />
            </div>

            <button className="btn btn-amber w-full" onClick={handleGenerateCampaign} disabled={generatingCampaign}>
              {generatingCampaign ? (
                <>
                  <Sparkles size={16} className="spin-icon" />
                  <span>Drafting Rural Marketing Kit...</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>Generate Campaign Copy</span>
                </>
              )}
            </button>
          </div>

          {generatedCampaign && (
            <div className="campaign-output-box">
              <div className="output-header">
                <span className="badge badge-emerald">Social Post & Hashtags</span>
                <button className="btn btn-secondary btn-sm" onClick={() => handleCopyText(generatedCampaign.socialPost)}>
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="campaign-text">{generatedCampaign.socialPost}</p>

              <div className="output-header" style={{ marginTop: '12px' }}>
                <span className="badge badge-amber">Target Audience</span>
              </div>
              <p className="campaign-sub-text">{generatedCampaign.targetAudience}</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .mainstreet-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .mainstreet-hero-card {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 24px;
          align-items: center;
          padding: 0;
          overflow: hidden;
        }

        .hero-img-box {
          height: 220px;
          width: 100%;
        }

        .hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-info {
          padding: 24px 28px 24px 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .hero-town-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: #ffffff;
        }

        .hero-town-text {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .mainstreet-split {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 20px;
        }

        .biz-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-top: 16px;
        }

        .biz-item {
          background: rgba(9, 19, 13, 0.5);
          padding: 14px 18px;
          border-radius: var(--radius-md);
          border: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .biz-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .biz-title {
          font-size: 1rem;
          font-weight: 700;
          color: #ffffff;
        }

        .biz-category {
          font-size: 0.78rem;
          color: var(--text-secondary);
        }

        .biz-badge-group {
          display: flex;
          gap: 6px;
        }

        .growth-badge {
          background: rgba(16, 185, 129, 0.15);
          color: #34d399;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .rating-badge {
          background: rgba(245, 158, 11, 0.15);
          color: #fbbf24;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .biz-story {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .campaign-card {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .campaign-inputs {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .campaign-output-box {
          background: rgba(9, 19, 13, 0.8);
          border: 1px solid var(--border-color);
          padding: 16px;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .output-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .campaign-text {
          font-size: 0.85rem;
          color: #ffffff;
          white-space: pre-wrap;
          line-height: 1.4;
          background: rgba(0, 0, 0, 0.4);
          padding: 10px;
          border-radius: 6px;
        }

        .campaign-sub-text {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        @media (max-width: 1024px) {
          .mainstreet-hero-card, .mainstreet-split {
            grid-template-columns: 1fr;
          }
          .hero-info {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}
