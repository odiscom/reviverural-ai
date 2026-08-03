import React from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Zap, 
  Sprout, 
  Wifi, 
  Store, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  Award,
  Sparkles
} from 'lucide-react';
import { RVI_METRICS } from '../data/mockData';
import CommunityMap from './CommunityMap';

export default function Dashboard({ setActiveTab }) {
  return (
    <div className="dashboard-page">
      {/* Hero Section */}
      <div className="dashboard-hero glass-card">
        <div className="hero-content">
          <div className="hero-badge-group">
            <span className="badge badge-emerald">
              <Sparkles size={13} /> Jasper County Rural Vitality Index
            </span>
            <span className="badge badge-amber">USDA District 4</span>
          </div>

          <h1 className="hero-title">
            Empowering Rural Growth with <span className="highlight-text">Intelligence</span>
          </h1>

          <p className="hero-description">
            ReviveRural AI synthesizes real-time satellite imagery, IoT soil telemetry, federal grant data, and local market trends to drive economic prosperity for family farms and rural small towns.
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => setActiveTab('grants')}>
              <span>Explore AI Grants</span>
              <ArrowRight size={16} />
            </button>
            <button className="btn btn-secondary" onClick={() => setActiveTab('agtech')}>
              <Sprout size={16} />
              <span>AgTech Crop Doctor</span>
            </button>
            <button className="btn btn-secondary" onClick={() => setActiveTab('microgrid')}>
              <Zap size={16} />
              <span>Microgrid ROI Planner</span>
            </button>
          </div>
        </div>

        {/* Hero Score Widget */}
        <div className="rvi-score-widget">
          <div className="score-ring">
            <svg className="score-svg" viewBox="0 0 100 100">
              <circle className="circle-bg" cx="50" cy="50" r="42" />
              <circle 
                className="circle-fill" 
                cx="50" 
                cy="50" 
                r="42" 
                strokeDasharray="263.8"
                strokeDashoffset={263.8 * (1 - RVI_METRICS.score / 100)}
              />
            </svg>
            <div className="score-inner">
              <span className="score-number">{RVI_METRICS.score}</span>
              <span className="score-denom">/100</span>
              <span className="score-label">RVI SCORE</span>
            </div>
          </div>
          <div className="score-trend">
            <TrendingUp size={16} className="trend-icon" />
            <span>{RVI_METRICS.change} vs Last Quarter</span>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid-4 metrics-grid">
        <div className="glass-card metric-card glass-card-interactive" onClick={() => setActiveTab('grants')}>
          <div className="metric-icon-box bg-emerald">
            <DollarSign size={22} />
          </div>
          <div className="metric-details">
            <span className="metric-value">{RVI_METRICS.grantsSecured}</span>
            <span className="metric-title">Secured Grants</span>
            <span className="metric-sub">{RVI_METRICS.grantsSecuredCount} Active Federal Grants</span>
          </div>
        </div>

        <div className="glass-card metric-card glass-card-interactive" onClick={() => setActiveTab('agtech')}>
          <div className="metric-icon-box bg-amber">
            <Sprout size={22} />
          </div>
          <div className="metric-details">
            <span className="metric-value">{RVI_METRICS.cropYieldIncrease}</span>
            <span className="metric-title">AgTech Yield Boost</span>
            <span className="metric-sub">Soil Moisture: {RVI_METRICS.broadbandCoverage}</span>
          </div>
        </div>

        <div className="glass-card metric-card glass-card-interactive" onClick={() => setActiveTab('microgrid')}>
          <div className="metric-icon-box bg-cyan">
            <Zap size={22} />
          </div>
          <div className="metric-details">
            <span className="metric-value">{RVI_METRICS.microgridEnergy}</span>
            <span className="metric-title">Microgrid Output</span>
            <span className="metric-sub">{RVI_METRICS.microgridOffset} Offset</span>
          </div>
        </div>

        <div className="glass-card metric-card glass-card-interactive" onClick={() => setActiveTab('mainstreet')}>
          <div className="metric-icon-box bg-purple">
            <Store size={22} />
          </div>
          <div className="metric-details">
            <span className="metric-value">{RVI_METRICS.activeBusinesses}</span>
            <span className="metric-title">Active Local Businesses</span>
            <span className="metric-sub">+{RVI_METRICS.newJobsCreated} New Jobs Year-to-Date</span>
          </div>
        </div>
      </div>

      {/* Main Map & Live Feeds Layout */}
      <div className="dashboard-content-split">
        {/* Left: GIS Community Map */}
        <div className="map-column">
          <CommunityMap />
        </div>

        {/* Right: Live AI Feeds & Recommended Actions */}
        <div className="feeds-column">
          <div className="glass-card feeds-card">
            <div className="card-header-row">
              <h3 className="title-md">Live Rural Intelligence Feed</h3>
              <span className="badge badge-emerald">Real-time</span>
            </div>

            <div className="feed-list">
              <div className="feed-item item-emerald">
                <div className="feed-icon">
                  <CheckCircle2 size={16} />
                </div>
                <div className="feed-text">
                  <span className="feed-title">USDA REAP Grant Application Approved</span>
                  <p className="feed-body">$500,000 awarded for Jasper Co-op Solar Microgrid extension project.</p>
                  <span className="feed-time">2 hours ago</span>
                </div>
              </div>

              <div className="feed-item item-amber">
                <div className="feed-icon">
                  <AlertTriangle size={16} />
                </div>
                <div className="feed-text">
                  <span className="feed-title">Micro-Climate Rainfall Advisory</span>
                  <p className="feed-body">0.65 in expected tonight. Pause nitrogen side-dressing until tomorrow morning.</p>
                  <span className="feed-time">5 hours ago</span>
                </div>
              </div>

              <div className="feed-item item-cyan">
                <div className="feed-icon">
                  <Wifi size={16} />
                </div>
                <div className="feed-text">
                  <span className="feed-title">BEAD Broadband Mesh Node #4 Online</span>
                  <p className="feed-body">High-speed gigabit fiber extended to 85 unserved farmsteads in North Sector.</p>
                  <span className="feed-time">1 day ago</span>
                </div>
              </div>
            </div>

            <button className="btn btn-secondary w-full" onClick={() => setActiveTab('ruraliq')}>
              <Sparkles size={16} />
              <span>Consult RuralIQ Assistant</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .dashboard-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .dashboard-hero {
          position: relative;
          background: linear-gradient(135deg, rgba(9, 19, 13, 0.9) 0%, rgba(15, 30, 20, 0.8) 100%), 
                      url('/images/farm_drone_hero_1785737942845.jpg') center/cover no-repeat;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 36px 40px;
          gap: 32px;
          border: 1px solid var(--border-glow);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
        }

        .hero-content {
          max-width: 720px;
        }

        .hero-badge-group {
          display: flex;
          gap: 10px;
          margin-bottom: 16px;
        }

        .hero-title {
          font-size: 2.3rem;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.2;
          margin-bottom: 14px;
        }

        .highlight-text {
          background: linear-gradient(135deg, #34d399 0%, #10b981 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-description {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .rvi-score-widget {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(14, 28, 20, 0.85);
          backdrop-filter: blur(20px);
          border: 1px solid var(--border-glow);
          padding: 24px 28px;
          border-radius: var(--radius-xl);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .score-ring {
          position: relative;
          width: 130px;
          height: 130px;
        }

        .score-svg {
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }

        .circle-bg {
          fill: none;
          stroke: rgba(255, 255, 255, 0.08);
          stroke-width: 8;
        }

        .circle-fill {
          fill: none;
          stroke: #10b981;
          stroke-width: 8;
          stroke-linecap: round;
          transition: stroke-dashoffset 1s ease-in-out;
          filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.6));
        }

        .score-inner {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .score-number {
          font-size: 2.2rem;
          font-weight: 800;
          color: #ffffff;
          line-height: 1;
        }

        .score-denom {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .score-label {
          font-size: 0.68rem;
          font-weight: 700;
          color: #34d399;
          letter-spacing: 0.08em;
          margin-top: 2px;
        }

        .score-trend {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 14px;
          font-size: 0.82rem;
          font-weight: 600;
          color: #34d399;
          background: rgba(16, 185, 129, 0.15);
          padding: 4px 12px;
          border-radius: 99px;
        }

        /* Metric Cards */
        .metric-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
        }

        .metric-icon-box {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .bg-emerald { background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.4); }
        .bg-amber { background: rgba(245, 158, 11, 0.2); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.4); }
        .bg-cyan { background: rgba(6, 182, 212, 0.2); color: #38bdf8; border: 1px solid rgba(6, 182, 212, 0.4); }
        .bg-purple { background: rgba(168, 85, 247, 0.2); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.4); }

        .metric-details {
          display: flex;
          flex-direction: column;
        }

        .metric-value {
          font-size: 1.45rem;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.2;
        }

        .metric-title {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .metric-sub {
          font-size: 0.76rem;
          color: var(--text-secondary);
          margin-top: 2px;
        }

        /* Content Split */
        .dashboard-content-split {
          display: grid;
          grid-template-columns: 2.2fr 1fr;
          gap: 20px;
        }

        .feeds-card {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 20px;
        }

        .card-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .feed-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .feed-item {
          display: flex;
          gap: 12px;
          padding: 12px;
          border-radius: var(--radius-sm);
          background: rgba(9, 19, 13, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .feed-icon {
          margin-top: 2px;
        }

        .item-emerald .feed-icon { color: #34d399; }
        .item-amber .feed-icon { color: #fbbf24; }
        .item-cyan .feed-icon { color: #38bdf8; }

        .feed-title {
          font-size: 0.86rem;
          font-weight: 700;
          color: #ffffff;
          display: block;
        }

        .feed-body {
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.4;
          margin-top: 2px;
        }

        .feed-time {
          font-size: 0.7rem;
          color: var(--text-muted);
          margin-top: 4px;
          display: block;
        }

        .w-full { width: 100%; }

        @media (max-width: 1024px) {
          .dashboard-hero {
            flex-direction: column;
            text-align: center;
          }
          .hero-badge-group, .hero-actions {
            justify-content: center;
          }
          .dashboard-content-split {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
