import React, { useState } from 'react';
import { MapPin, Sun, Wifi, Activity, Filter, Layers, Navigation } from 'lucide-react';

export default function CommunityMap() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedNode, setSelectedNode] = useState(null);

  const mapNodes = [
    { id: 1, name: 'Jasper Central Co-op Solar Array', type: 'energy', lat: 38, lng: 28, status: 'Active (480 kW)', details: '100% capacity, powering 120 regional farms and grain drying elevators.' },
    { id: 2, name: 'Oak Ridge Wind Turbine Node', type: 'energy', lat: 22, lng: 65, status: 'Active (375 kW)', details: 'Clean wind energy offset supplying county hospital grid backup.' },
    { id: 3, name: 'Prairie View Smart Farm Soil Station', type: 'farm', lat: 55, lng: 42, status: 'Optimal Soil (pH 6.7)', details: 'Nitrogen: 84ppm, Moisture: 42%, Yield Forecast: 215 bu/acre.' },
    { id: 4, name: 'Cedar Creek Grain Elevator & IoT Hub', type: 'farm', lat: 70, lng: 75, status: 'Active Drying Node', details: 'Automated temperature and moisture grain bin monitoring active.' },
    { id: 5, name: 'County Hospital AI Telehealth Kiosk', type: 'health', lat: 45, lng: 55, status: 'Online (24/7)', details: 'Connected to State Medical Center via 1Gbps BEAD fiber line.' },
    { id: 6, name: '5G Agri-Mesh Broadband Tower #4', type: 'broadband', lat: 30, lng: 80, status: '99.9% Uptime', details: 'Providing last-mile 5G connection to 85 rural households and autonomous tractors.' }
  ];

  const filteredNodes = mapNodes.filter(node => activeFilter === 'all' || node.type === activeFilter);

  return (
    <div className="community-map-container">
      {/* Map Header Controls */}
      <div className="map-toolbar">
        <div className="map-title-group">
          <Layers size={18} className="map-icon" />
          <span className="map-title">County Interactive GIS Map</span>
          <span className="map-subtitle">Live IoT Sensors & Infrastructure Layer</span>
        </div>

        <div className="filter-pill-group">
          <button 
            className={`filter-pill ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Layer Nodes
          </button>
          <button 
            className={`filter-pill ${activeFilter === 'energy' ? 'active' : ''}`}
            onClick={() => setActiveFilter('energy')}
          >
            <Sun size={14} /> Microgrids
          </button>
          <button 
            className={`filter-pill ${activeFilter === 'farm' ? 'active' : ''}`}
            onClick={() => setActiveFilter('farm')}
          >
            <Activity size={14} /> Ag Sensors
          </button>
          <button 
            className={`filter-pill ${activeFilter === 'broadband' ? 'active' : ''}`}
            onClick={() => setActiveFilter('broadband')}
          >
            <Wifi size={14} /> Broadband
          </button>
        </div>
      </div>

      {/* Simulated Interactive GIS Visualizer */}
      <div className="map-viewport">
        {/* Topographic & Field Grid Background */}
        <div className="map-bg-grid" />
        
        {/* Topo Contour Simulation */}
        <svg className="map-topo-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M 0 30 Q 30 10 60 40 T 100 20" fill="none" stroke="rgba(16, 185, 129, 0.12)" strokeWidth="0.5" />
          <path d="M 0 60 Q 40 80 70 50 T 100 70" fill="none" stroke="rgba(16, 185, 129, 0.12)" strokeWidth="0.5" />
          <path d="M 10 0 Q 50 40 30 100" fill="none" stroke="rgba(245, 158, 11, 0.08)" strokeWidth="0.5" />
        </svg>

        {/* Map Nodes */}
        {filteredNodes.map(node => {
          const isSelected = selectedNode?.id === node.id;
          return (
            <div 
              key={node.id}
              className={`map-node-marker type-${node.type} ${isSelected ? 'selected' : ''}`}
              style={{ top: `${node.lat}%`, left: `${node.lng}%` }}
              onClick={() => setSelectedNode(node)}
            >
              <div className="marker-ping" />
              <div className="marker-icon-box">
                {node.type === 'energy' && <Sun size={16} />}
                {node.type === 'farm' && <Activity size={16} />}
                {node.type === 'health' && <MapPin size={16} />}
                {node.type === 'broadband' && <Wifi size={16} />}
              </div>
              <span className="marker-label">{node.name}</span>
            </div>
          );
        })}

        {/* Selected Node Details Popup Card */}
        {selectedNode && (
          <div className="map-popup-card">
            <div className="popup-header">
              <div className="popup-title-group">
                <Navigation size={16} className="popup-icon" />
                <h4>{selectedNode.name}</h4>
              </div>
              <button className="popup-close-btn" onClick={() => setSelectedNode(null)}>×</button>
            </div>
            <p className="popup-status">
              <span className="status-dot" /> {selectedNode.status}
            </p>
            <p className="popup-details">{selectedNode.details}</p>
          </div>
        )}
      </div>

      <style>{`
        .community-map-container {
          background: rgba(9, 19, 13, 0.7);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-card);
        }

        .map-toolbar {
          padding: 16px 20px;
          background: rgba(15, 29, 21, 0.85);
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .map-title-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .map-icon {
          color: var(--accent-emerald);
        }

        .map-title {
          font-size: 1rem;
          font-weight: 700;
          color: #ffffff;
        }

        .map-subtitle {
          font-size: 0.8rem;
          color: var(--text-secondary);
          margin-left: 8px;
        }

        .filter-pill-group {
          display: flex;
          gap: 6px;
        }

        .filter-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          padding: 6px 12px;
          border-radius: 99px;
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-pill:hover, .filter-pill.active {
          background: rgba(16, 185, 129, 0.2);
          border-color: rgba(16, 185, 129, 0.5);
          color: #ffffff;
        }

        .map-viewport {
          position: relative;
          height: 380px;
          width: 100%;
          background: radial-gradient(circle at 50% 50%, #0d2118 0%, #07120c 100%);
          overflow: hidden;
        }

        .map-bg-grid {
          position: absolute;
          inset: 0;
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, rgba(16, 185, 129, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(16, 185, 129, 0.05) 1px, transparent 1px);
        }

        .map-topo-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .map-node-marker {
          position: absolute;
          transform: translate(-50%, -50%);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          z-index: 10;
          transition: all 0.25s ease;
        }

        .marker-icon-box {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
          border: 2px solid #ffffff;
          transition: transform 0.2s ease;
        }

        .map-node-marker:hover .marker-icon-box {
          transform: scale(1.2);
        }

        .type-energy .marker-icon-box { background: #f59e0b; border-color: #fef08a; }
        .type-farm .marker-icon-box { background: #10b981; border-color: #a7f3d0; }
        .type-health .marker-icon-box { background: #ea580c; border-color: #fed7aa; }
        .type-broadband .marker-icon-box { background: #06b6d4; border-color: #bae6fd; }

        .marker-ping {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: currentColor;
          opacity: 0.4;
          animation: pulseGlow 2s infinite ease-out;
        }

        .marker-label {
          background: rgba(9, 19, 13, 0.9);
          border: 1px solid var(--border-color);
          color: #ffffff;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          white-space: nowrap;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
        }

        .map-popup-card {
          position: absolute;
          bottom: 20px;
          right: 20px;
          width: 300px;
          background: rgba(14, 28, 20, 0.95);
          backdrop-filter: blur(16px);
          border: 1px solid var(--border-glow);
          border-radius: var(--radius-md);
          padding: 16px;
          z-index: 20;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
        }

        .popup-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .popup-title-group {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .popup-icon { color: var(--accent-emerald); }

        .popup-header h4 {
          font-size: 0.9rem;
          font-weight: 700;
          color: #ffffff;
        }

        .popup-close-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          font-size: 1.2rem;
          cursor: pointer;
        }

        .popup-status {
          font-size: 0.8rem;
          font-weight: 600;
          color: #34d399;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
        }

        .popup-details {
          font-size: 0.82rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
}
