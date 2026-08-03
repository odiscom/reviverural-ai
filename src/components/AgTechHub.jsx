import React, { useState } from 'react';
import { 
  Sprout, 
  Droplets, 
  Thermometer, 
  Wind, 
  AlertCircle, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  Activity, 
  Layers, 
  Wrench 
} from 'lucide-react';
import { AGTECH_DATA } from '../data/mockData';

export default function AgTechHub() {
  const [selectedDiagnosis, setSelectedDiagnosis] = useState(AGTECH_DATA.cropDiagnoses[0]);
  const [customImageUploaded, setCustomImageUploaded] = useState(false);
  const [analyzingImage, setAnalyzingImage] = useState(false);

  // Yield Predictor Simulator State
  const [nitrogenLbs, setNitrogenLbs] = useState(140);
  const [irrigationInches, setIrrigationInches] = useState(18);
  const [seedDensity, setSeedDensity] = useState(34); // k seeds/acre

  // Calculated Yield Output
  const predictedYield = Math.round(180 + (nitrogenLbs * 0.22) + (irrigationInches * 1.8) + (seedDensity * 0.4));
  const estimatedRevenuePerAcre = Math.round(predictedYield * 4.65); // $4.65 / bushel corn benchmark

  const handleSimulateScan = () => {
    setAnalyzingImage(true);
    setTimeout(() => {
      setAnalyzingImage(false);
      setCustomImageUploaded(true);
      setSelectedDiagnosis({
        id: "diag-custom",
        name: "Early Stage Gray Leaf Spot (Cercospora zeae-maydis)",
        severity: "Low to Moderate",
        confidence: "98.1%",
        symptoms: "Rectangular, tan to brown lesions restricted by leaf veins.",
        treatment: "Fungicide application recommended at VT (tasseling) stage if weather remains humid.",
        imageKey: "crop_diagnostic"
      });
    }, 1200);
  };

  return (
    <div className="agtech-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="badge badge-emerald">
            <Sparkles size={13} /> Precision AgTech Intelligence
          </div>
          <h1 className="title-xl" style={{ marginTop: '8px' }}>Smart Soil, Weather & AI Crop Doctor</h1>
          <p className="subtitle">
            Real-time IoT telemetry, AI pest & crop diagnostic vision system, and yield prediction calculator.
          </p>
        </div>
      </div>

      {/* Telemetry Summary Cards */}
      <div className="grid-4 telemetry-grid">
        <div className="glass-card telemetry-card">
          <div className="card-top">
            <Droplets className="telemetry-icon icon-cyan" size={20} />
            <span className="telemetry-label">Soil Moisture</span>
          </div>
          <span className="telemetry-val">{AGTECH_DATA.currentSoil.moisture}</span>
          <span className="telemetry-status badge badge-emerald">{AGTECH_DATA.currentSoil.moistureStatus}</span>
        </div>

        <div className="glass-card telemetry-card">
          <div className="card-top">
            <Activity className="telemetry-icon icon-emerald" size={20} />
            <span className="telemetry-label">Nitrogen (N)</span>
          </div>
          <span className="telemetry-val">{AGTECH_DATA.currentSoil.nitrogen}</span>
          <span className="telemetry-sub">Phosphorus: {AGTECH_DATA.currentSoil.phosphorus}</span>
        </div>

        <div className="glass-card telemetry-card">
          <div className="card-top">
            <Thermometer className="telemetry-icon icon-amber" size={20} />
            <span className="telemetry-label">Soil Temp & pH</span>
          </div>
          <span className="telemetry-val">{AGTECH_DATA.currentSoil.temperature}</span>
          <span className="telemetry-sub">pH {AGTECH_DATA.currentSoil.ph} • OM {AGTECH_DATA.currentSoil.organicMatter}</span>
        </div>

        <div className="glass-card telemetry-card">
          <div className="card-top">
            <Wind className="telemetry-icon icon-purple" size={20} />
            <span className="telemetry-label">Micro-Climate</span>
          </div>
          <span className="telemetry-val">{AGTECH_DATA.weatherAlert.temp}</span>
          <span className="telemetry-sub">{AGTECH_DATA.weatherAlert.wind}</span>
        </div>
      </div>

      {/* Weather Recommendation Alert */}
      <div className="glass-card weather-alert-card">
        <AlertCircle size={20} className="alert-icon" />
        <div>
          <h4 className="alert-title">Agronomic Weather Advisory for Jasper County:</h4>
          <p className="alert-body">{AGTECH_DATA.weatherAlert.recommendation}</p>
        </div>
      </div>

      {/* Split Section: AI Crop Doctor & Yield Predictor */}
      <div className="agtech-main-split">
        {/* Left: AI Crop & Machinery Doctor */}
        <div className="glass-card diagnostic-card">
          <div className="card-header-row">
            <div>
              <h3 className="title-lg">AI Crop & Equipment Doctor</h3>
              <p className="subtitle">Diagnose crop diseases or engine fault codes with AI computer vision</p>
            </div>
            <button className="btn btn-primary" onClick={handleSimulateScan} disabled={analyzingImage}>
              {analyzingImage ? (
                <>
                  <Sparkles size={16} className="spin-icon" />
                  <span>Scanning Field Image...</span>
                </>
              ) : (
                <>
                  <Upload size={16} />
                  <span>Simulate Crop Scan</span>
                </>
              )}
            </button>
          </div>

          <div className="diagnostic-body-split">
            {/* Visual Image Scanner Box */}
            <div className="scanner-preview-box">
              <img 
                src="/images/crop_diagnostic_1785737951776.jpg" 
                alt="Crop Scan Diagnostic" 
                className="scanner-img"
              />
              <div className="scan-overlay">
                <div className="scan-line" />
                <span className="scan-badge">AI Confidence: {selectedDiagnosis.confidence}</span>
              </div>
            </div>

            {/* Diagnosis Report Details */}
            <div className="report-details">
              <div className="report-title-row">
                <h4 className="report-name">{selectedDiagnosis.name}</h4>
                <span className="badge badge-amber">{selectedDiagnosis.severity} Severity</span>
              </div>

              <div className="report-block">
                <span className="block-label">Observed Symptoms:</span>
                <p className="block-text">{selectedDiagnosis.symptoms}</p>
              </div>

              <div className="report-block highlight-block">
                <span className="block-label">Recommended AI Treatment Plan:</span>
                <p className="block-text">{selectedDiagnosis.treatment}</p>
              </div>

              <div className="sample-selector">
                <span className="selector-label">Or select recent field samples:</span>
                <div className="sample-buttons">
                  {AGTECH_DATA.cropDiagnoses.map((diag) => (
                    <button 
                      key={diag.id}
                      className={`sample-btn ${selectedDiagnosis.id === diag.id ? 'active' : ''}`}
                      onClick={() => setSelectedDiagnosis(diag)}
                    >
                      {diag.name.split('(')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Yield Predictor Calculator */}
        <div className="glass-card yield-calculator-card">
          <div className="card-header-row">
            <h3 className="title-md">Interactive Yield Predictor</h3>
            <span className="badge badge-emerald">ML Forecast</span>
          </div>

          <div className="calculator-controls">
            <div className="slider-group">
              <div className="slider-header">
                <span>Nitrogen Side-Dress (lbs/acre):</span>
                <span className="slider-val">{nitrogenLbs} lbs</span>
              </div>
              <input 
                type="range" 
                min="80" 
                max="220" 
                value={nitrogenLbs}
                onChange={(e) => setNitrogenLbs(Number(e.target.value))}
                className="range-slider"
              />
            </div>

            <div className="slider-group">
              <div className="slider-header">
                <span>Seasonal Irrigation (inches):</span>
                <span className="slider-val">{irrigationInches} in</span>
              </div>
              <input 
                type="range" 
                min="8" 
                max="28" 
                value={irrigationInches}
                onChange={(e) => setIrrigationInches(Number(e.target.value))}
                className="range-slider"
              />
            </div>

            <div className="slider-group">
              <div className="slider-header">
                <span>Planting Density (1,000 seeds/acre):</span>
                <span className="slider-val">{seedDensity}k</span>
              </div>
              <input 
                type="range" 
                min="24" 
                max="42" 
                value={seedDensity}
                onChange={(e) => setSeedDensity(Number(e.target.value))}
                className="range-slider"
              />
            </div>
          </div>

          <div className="yield-output-box">
            <div className="output-row">
              <span className="output-label">Predicted Harvest Yield:</span>
              <span className="output-value">{predictedYield} bu/acre</span>
            </div>
            <div className="output-row">
              <span className="output-label">Est. Revenue ($4.65/bu):</span>
              <span className="output-value highlight">${estimatedRevenuePerAcre.toLocaleString()} / acre</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .agtech-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .telemetry-card {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .card-top {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .telemetry-icon {
          padding: 4px;
          border-radius: 6px;
        }

        .icon-cyan { color: #38bdf8; background: rgba(6, 182, 212, 0.15); }
        .icon-emerald { color: #34d399; background: rgba(16, 185, 129, 0.15); }
        .icon-amber { color: #fbbf24; background: rgba(245, 158, 11, 0.15); }
        .icon-purple { color: #c084fc; background: rgba(168, 85, 247, 0.15); }

        .telemetry-label {
          font-size: 0.8rem;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .telemetry-val {
          font-size: 1.5rem;
          font-weight: 800;
          color: #ffffff;
        }

        .telemetry-sub {
          font-size: 0.76rem;
          color: var(--text-muted);
        }

        .weather-alert-card {
          display: flex;
          align-items: center;
          gap: 14px;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.3);
          padding: 16px 20px;
        }

        .alert-icon {
          color: #fbbf24;
          flex-shrink: 0;
        }

        .alert-title {
          font-size: 0.9rem;
          font-weight: 700;
          color: #ffffff;
        }

        .alert-body {
          font-size: 0.86rem;
          color: var(--text-secondary);
        }

        .agtech-main-split {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 20px;
        }

        .diagnostic-body-split {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 20px;
          margin-top: 20px;
        }

        .scanner-preview-box {
          position: relative;
          border-radius: var(--radius-md);
          overflow: hidden;
          border: 1px solid var(--border-color);
          height: 240px;
        }

        .scanner-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .scan-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(16, 185, 129, 0.1) 0%, rgba(9, 19, 13, 0.7) 100%);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 12px;
        }

        .scan-line {
          width: 100%;
          height: 2px;
          background: #34d399;
          box-shadow: 0 0 10px #34d399;
          animation: scanMotion 2.5s infinite ease-in-out;
        }

        @keyframes scanMotion {
          0% { transform: translateY(0); }
          50% { transform: translateY(180px); }
          100% { transform: translateY(0); }
        }

        .scan-badge {
          align-self: flex-start;
          background: rgba(9, 19, 13, 0.85);
          border: 1px solid #10b981;
          color: #34d399;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 6px;
        }

        .report-details {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .report-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .report-name {
          font-size: 1.1rem;
          font-weight: 700;
          color: #ffffff;
        }

        .report-block {
          background: rgba(9, 19, 13, 0.5);
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .highlight-block {
          background: rgba(16, 185, 129, 0.12);
          border-color: rgba(16, 185, 129, 0.3);
        }

        .block-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: #34d399;
          display: block;
          margin-bottom: 4px;
        }

        .block-text {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .sample-selector {
          margin-top: 6px;
        }

        .selector-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          display: block;
          margin-bottom: 6px;
        }

        .sample-buttons {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .sample-btn {
          text-align: left;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 0.78rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .sample-btn:hover, .sample-btn.active {
          background: rgba(16, 185, 129, 0.2);
          border-color: rgba(16, 185, 129, 0.5);
          color: #ffffff;
        }

        .yield-calculator-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 20px;
        }

        .calculator-controls {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .slider-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .slider-header {
          display: flex;
          justify-content: space-between;
          font-size: 0.82rem;
          color: var(--text-secondary);
        }

        .slider-val {
          font-weight: 700;
          color: #34d399;
        }

        .range-slider {
          width: 100%;
          accent-color: #10b981;
          cursor: pointer;
        }

        .yield-output-box {
          background: rgba(9, 19, 13, 0.8);
          border: 1px solid var(--border-glow);
          padding: 16px;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .output-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .output-label {
          font-size: 0.84rem;
          color: var(--text-secondary);
        }

        .output-value {
          font-size: 1.1rem;
          font-weight: 800;
          color: #ffffff;
        }

        .output-value.highlight {
          color: #34d399;
          font-size: 1.2rem;
        }

        @media (max-width: 1024px) {
          .agtech-main-split {
            grid-template-columns: 1fr;
          }
          .diagnostic-body-split {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
