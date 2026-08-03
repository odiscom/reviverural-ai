import React, { useState } from 'react';
import { Zap, Sun, Wind, BatteryCharging, ShieldCheck, Sparkles, DollarSign, Leaf, Wifi } from 'lucide-react';
import { MICROGRID_DATA } from '../data/mockData';

export default function MicrogridPlanner() {
  const [solarKw, setSolarKw] = useState(850);
  const [windKw, setWindKw] = useState(420);
  const [batteryMwh, setBatteryMwh] = useState(2.4);

  // Dynamic ROI Calculations
  const calculatedOutputGwh = ((solarKw * 1.5 + windKw * 2.8) * 365 / 1000000).toFixed(2);
  const calculatedSavingsUsd = Math.round((solarKw * 110) + (windKw * 140) + (batteryMwh * 15000));
  const calculatedCo2Offset = Math.round((solarKw * 0.7) + (windKw * 0.9));
  const calculatedIndependencePct = Math.min(99, Math.round(60 + (solarKw * 0.02) + (windKw * 0.03) + (batteryMwh * 4)));

  return (
    <div className="microgrid-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="badge badge-cyan">
            <Sparkles size={13} /> Clean Energy & Grid Resiliency
          </div>
          <h1 className="title-xl" style={{ marginTop: '8px' }}>Rural Microgrid & Infrastructure Planner</h1>
          <p className="subtitle">
            Simulate community solar array expansion, wind micro-turbines, battery storage ROI, and broadband mesh coverage.
          </p>
        </div>
      </div>

      {/* Dynamic ROI Metrics Bar */}
      <div className="grid-4 roi-metrics-grid">
        <div className="glass-card roi-card">
          <div className="roi-icon-box icon-amber">
            <Sun size={20} />
          </div>
          <div>
            <span className="roi-label">Annual Clean Output</span>
            <span className="roi-val">{calculatedOutputGwh} GWh</span>
            <span className="roi-sub">Solar & Wind Combined</span>
          </div>
        </div>

        <div className="glass-card roi-card">
          <div className="roi-icon-box icon-emerald">
            <DollarSign size={20} />
          </div>
          <div>
            <span className="roi-label">Annual Utility Savings</span>
            <span className="roi-val highlight">${calculatedSavingsUsd.toLocaleString()}</span>
            <span className="roi-sub">For Township & Co-op</span>
          </div>
        </div>

        <div className="glass-card roi-card">
          <div className="roi-icon-box icon-cyan">
            <Leaf size={20} />
          </div>
          <div>
            <span className="roi-label">CO₂ Offset</span>
            <span className="roi-val">{calculatedCo2Offset} Tons / yr</span>
            <span className="roi-sub">Clean Air Equivalent</span>
          </div>
        </div>

        <div className="glass-card roi-card">
          <div className="roi-icon-box icon-purple">
            <ShieldCheck size={20} />
          </div>
          <div>
            <span className="roi-label">Grid Independence</span>
            <span className="roi-val">{calculatedIndependencePct}%</span>
            <span className="roi-sub">Outage Resiliency</span>
          </div>
        </div>
      </div>

      {/* Main Split: Interactive Simulator & Node Health */}
      <div className="microgrid-split">
        {/* Left: Interactive Infrastructure Simulator */}
        <div className="glass-card simulator-card">
          <div className="card-header-row">
            <h3 className="title-lg">Capacity ROI Simulator</h3>
            <span className="badge badge-amber">Interactive Model</span>
          </div>

          <div className="sliders-wrapper">
            <div className="slider-box">
              <div className="slider-label-row">
                <span className="flex-center"><Sun size={16} className="icon-amber" /> Solar Array Capacity:</span>
                <span className="slider-number">{solarKw} kW</span>
              </div>
              <input 
                type="range" 
                min="200" 
                max="2500" 
                value={solarKw}
                onChange={(e) => setSolarKw(Number(e.target.value))}
                className="range-slider"
              />
              <span className="slider-hint">Qualifies for 50% USDA REAP Grant + 30% Tax Credit</span>
            </div>

            <div className="slider-box">
              <div className="slider-label-row">
                <span className="flex-center"><Wind size={16} className="icon-cyan" /> Wind Turbine Capacity:</span>
                <span className="slider-number">{windKw} kW</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="1500" 
                value={windKw}
                onChange={(e) => setWindKw(Number(e.target.value))}
                className="range-slider"
              />
              <span className="slider-hint">High yield for nocturnal wind currents across valley ridge</span>
            </div>

            <div className="slider-box">
              <div className="slider-label-row">
                <span className="flex-center"><BatteryCharging size={16} className="icon-emerald" /> Battery Storage:</span>
                <span className="slider-number">{batteryMwh} MWh</span>
              </div>
              <input 
                type="range" 
                min="0.5" 
                max="10.0" 
                step="0.1"
                value={batteryMwh}
                onChange={(e) => setBatteryMwh(Number(e.target.value))}
                className="range-slider"
              />
              <span className="slider-hint">Provides emergency power backup for hospital & grain elevators</span>
            </div>
          </div>
        </div>

        {/* Right: Asset Health Monitor */}
        <div className="glass-card nodes-card">
          <div className="card-header-row">
            <h3 className="title-md">Active Microgrid Assets</h3>
            <span className="badge badge-emerald">5 Online</span>
          </div>

          <div className="nodes-list">
            {MICROGRID_DATA.nodes.map((node, i) => (
              <div key={i} className="node-row-item">
                <div className="node-top-row">
                  <span className="node-name">{node.name}</span>
                  <span className="node-capacity">{node.capacity}</span>
                </div>
                <div className="node-bottom-row">
                  <span className="node-status">{node.status}</span>
                  <div className="health-bar-container" title={`Health: ${node.health}%`}>
                    <div className="health-bar-fill" style={{ width: `${node.health}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .microgrid-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .roi-card {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .roi-icon-box {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .roi-label {
          font-size: 0.78rem;
          color: var(--text-secondary);
          display: block;
        }

        .roi-val {
          font-size: 1.3rem;
          font-weight: 800;
          color: #ffffff;
          display: block;
        }

        .roi-val.highlight {
          color: #34d399;
        }

        .roi-sub {
          font-size: 0.74rem;
          color: var(--text-muted);
        }

        .microgrid-split {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 20px;
        }

        .sliders-wrapper {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-top: 20px;
        }

        .slider-box {
          background: rgba(9, 19, 13, 0.5);
          padding: 16px;
          border-radius: var(--radius-md);
          border: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .slider-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.9rem;
          color: #ffffff;
          font-weight: 600;
        }

        .flex-center {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .slider-number {
          font-family: var(--font-mono);
          color: #34d399;
          font-size: 1rem;
        }

        .slider-hint {
          font-size: 0.76rem;
          color: var(--text-muted);
        }

        .nodes-card {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .nodes-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .node-row-item {
          background: rgba(9, 19, 13, 0.5);
          padding: 12px 14px;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .node-top-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.88rem;
          font-weight: 700;
          color: #ffffff;
        }

        .node-capacity {
          color: #34d399;
          font-family: var(--font-mono);
          font-size: 0.82rem;
        }

        .node-bottom-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .node-status {
          font-size: 0.78rem;
          color: var(--text-secondary);
        }

        .health-bar-container {
          width: 80px;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          overflow: hidden;
        }

        .health-bar-fill {
          height: 100%;
          background: #10b981;
          border-radius: 3px;
        }

        @media (max-width: 1024px) {
          .microgrid-split {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
