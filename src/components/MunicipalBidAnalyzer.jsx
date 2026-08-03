import React, { useState } from 'react';
import { FileText, Upload, Sparkles, AlertTriangle, CheckCircle2, DollarSign, Clock, Layers, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MUNICIPAL_BID_ANALYSIS_SYSTEM_PROMPT } from '../lib/ai/prompts/bid-analysis';

export default function MunicipalBidAnalyzer() {
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const [copied, setCopied] = useState(false);

  const sampleRfps = [
    { name: "Jasper County MUD #2 Mowing RFP.pdf", size: "2.4 MB" },
    { name: "City of Tyler Code Enforcement Abatement Contract 2026.pdf", size: "4.1 MB" },
    { name: "TxDOT Highway 14 ROW Slope Mowing Bid Packet.pdf", size: "3.8 MB" }
  ];

  const handleSimulateAnalysis = (fileName) => {
    setSelectedFile(fileName || "Jasper County MUD #2 Mowing RFP.pdf");
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      setExtractedData({
        contractTitle: "Jasper County MUD #2 Retention Levee & Drainage District Mowing",
        issuingAgency: "Jasper County MUD #2",
        contractCategory: "Municipal Mowing & Drainage District",
        totalAcreage: 184.50,
        mowingFrequency: "Bi-weekly (14 cycles / year)",
        estimatedBidAmount: "$142,800 / year",
        keyRequirements: [
          "Trash & debris pickup within 25ft of water line prior to mowing",
          "Line-of-sight intersection trim at 4 main culvert access points",
          "Stubble height strictly maintained between 3.5 inches and 4.0 inches",
          "Traffic control flaggers required when mowing roadside easement segments"
        ],
        pricingRisks: [
          {
            riskType: "Liquidated Damages",
            severity: "Critical",
            clauseSummary: "$500 / day penalty for uncompleted cycle segments post 48-hour rain window.",
            suggestedMultiplier: 1.25
          },
          {
            riskType: "Steep Slopes",
            severity: "High",
            clauseSummary: "35% of levee acreage exceeds 3:1 slope grade requiring specialized remote/skidsteer mowers.",
            suggestedMultiplier: 1.35
          },
          {
            riskType: "Hidden Debris Hazard",
            severity: "Medium",
            clauseSummary: "Submerged tire and concrete hazards flagged near North Retention Basin #3.",
            suggestedMultiplier: 1.15
          }
        ],
        recommendedEquipment: [
          "72-inch Commercial Zero-Turn Mowers (2 Units)",
          "15ft Flex-wing Bushhog for open retention areas",
          "Skidsteer with Flail Mower Attachment for 3:1 Slopes",
          "String Trimmers & Trash Pickup Crew"
        ]
      });

      confetti({
        particleCount: 60,
        spread: 60,
        colors: ['#34d399', '#fbbf24', '#ffffff'],
        origin: { y: 0.6 }
      });
    }, 1200);
  };

  const handleCopySummary = () => {
    if (!extractedData) return;
    const summaryText = `MUNICIPAL BID ANALYSIS REPORT:\nTitle: ${extractedData.contractTitle}\nAgency: ${extractedData.issuingAgency}\nAcreage: ${extractedData.totalAcreage} acres\nFrequency: ${extractedData.mowingFrequency}\nEst. Value: ${extractedData.estimatedBidAmount}\n\nRISKS:\n${extractedData.pricingRisks.map(r => `- [${r.severity}] ${r.riskType}: ${r.clauseSummary}`).join('\n')}`;
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bid-analyzer-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="badge badge-emerald">
            <Sparkles size={13} /> AI RFP & Contract Extraction Engine
          </div>
          <h1 className="title-xl" style={{ marginTop: '8px' }}>Municipal Bid Analyzer</h1>
          <p className="subtitle">
            Upload RFPs, contracts, or bid packets to instantly extract acreage, mowing frequencies, slope constraints, and pricing penalty risks.
          </p>
        </div>
      </div>

      {/* Main Split: Uploader & Extraction Results */}
      <div className="analyzer-split">
        {/* Left: Drag and Drop Upload Card */}
        <div className="glass-card uploader-card">
          <h3 className="title-md">Upload Bid Packet or RFP</h3>
          <p className="subtitle" style={{ fontSize: '0.85rem' }}>Supports PDF, DOCX, and scanned contract specs up to 50MB</p>

          <div className="dropzone-box" onClick={() => handleSimulateAnalysis()}>
            <Upload size={36} className="upload-icon" />
            <span className="drop-title">Drag and drop RFP file here</span>
            <span className="drop-sub">or click to browse files</span>
          </div>

          <div className="sample-rfps-section">
            <span className="sample-label">Or test sample municipal RFP packets:</span>
            <div className="sample-list">
              {sampleRfps.map((rfp, i) => (
                <button key={i} className="sample-rfp-btn" onClick={() => handleSimulateAnalysis(rfp.name)}>
                  <FileText size={16} className="icon-emerald" />
                  <div className="rfp-text-col">
                    <span className="rfp-name">{rfp.name}</span>
                    <span className="rfp-size">{rfp.size}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Extracted Analysis Dashboard */}
        <div className="glass-card results-card">
          {!extractedData && !analyzing && (
            <div className="empty-analysis-state">
              <FileText size={48} className="empty-icon" />
              <h4 className="empty-title">No RFP Selected</h4>
              <p className="empty-sub">Upload an RFP document or select a sample packet on the left to extract bidding intelligence.</p>
            </div>
          )}

          {analyzing && (
            <div className="analyzing-state">
              <Sparkles size={40} className="spin-icon icon-emerald" />
              <h4>Extracting Municipal Bidding Requirements...</h4>
              <p className="subtitle">Parsing acreage, frequency clauses, and pricing penalty risks...</p>
            </div>
          )}

          {extractedData && !analyzing && (
            <div className="analysis-results">
              <div className="results-header">
                <div>
                  <span className="badge badge-emerald">{extractedData.contractCategory}</span>
                  <h3 className="contract-title">{extractedData.contractTitle}</h3>
                  <span className="agency-name">Issuing Body: {extractedData.issuingAgency}</span>
                </div>

                <button className="btn btn-secondary btn-sm" onClick={handleCopySummary}>
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copied ? 'Copied Report' : 'Copy Summary'}</span>
                </button>
              </div>

              {/* KPI Metrics */}
              <div className="grid-3 kpi-grid">
                <div className="kpi-box">
                  <span className="kpi-label">Total Acreage</span>
                  <span className="kpi-val">{extractedData.totalAcreage} Acres</span>
                </div>
                <div className="kpi-box">
                  <span className="kpi-label">Mowing Cycle</span>
                  <span className="kpi-val">{extractedData.mowingFrequency}</span>
                </div>
                <div className="kpi-box">
                  <span className="kpi-label">Est. Contract Value</span>
                  <span className="kpi-val highlight">{extractedData.estimatedBidAmount}</span>
                </div>
              </div>

              {/* Pricing Risks & Penalty Clauses */}
              <div className="analysis-section">
                <h4 className="section-title flex-center">
                  <AlertTriangle size={18} className="icon-amber" /> AI Pricing Risks & Penalty Clauses
                </h4>
                <div className="risks-list">
                  {extractedData.pricingRisks.map((risk, idx) => (
                    <div key={idx} className={`risk-item severity-${risk.severity.toLowerCase()}`}>
                      <div className="risk-top">
                        <span className="risk-type">{risk.riskType}</span>
                        <span className="risk-severity-badge">{risk.severity} Risk</span>
                      </div>
                      <p className="risk-summary">{risk.clauseSummary}</p>
                      <span className="risk-multiplier">Suggested Price Multiplier: <strong>+{Math.round((risk.suggestedMultiplier - 1) * 100)}%</strong></span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Constraints & Requirements */}
              <div className="analysis-section">
                <h4 className="section-title flex-center">
                  <CheckCircle2 size={18} className="icon-emerald" /> Mandatory Contract Constraints
                </h4>
                <ul className="requirements-list">
                  {extractedData.keyRequirements.map((req, idx) => (
                    <li key={idx} className="req-item">• {req}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .bid-analyzer-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .analyzer-split {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 20px;
        }

        .dropzone-box {
          margin-top: 16px;
          border: 2px dashed var(--border-color);
          border-radius: var(--radius-md);
          padding: 32px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          background: rgba(9, 19, 13, 0.4);
        }

        .dropzone-box:hover {
          border-color: #10b981;
          background: rgba(16, 185, 129, 0.08);
        }

        .upload-icon {
          color: #34d399;
        }

        .drop-title {
          font-weight: 700;
          color: #ffffff;
        }

        .drop-sub {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .sample-rfps-section {
          margin-top: 20px;
        }

        .sample-label {
          font-size: 0.8rem;
          color: var(--text-muted);
          display: block;
          margin-bottom: 8px;
        }

        .sample-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .sample-rfp-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-color);
          padding: 10px 12px;
          border-radius: var(--radius-sm);
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .sample-rfp-btn:hover {
          background: rgba(16, 185, 129, 0.15);
          border-color: #10b981;
        }

        .rfp-text-col {
          display: flex;
          flex-direction: column;
        }

        .rfp-name {
          font-size: 0.84rem;
          font-weight: 600;
          color: #ffffff;
        }

        .rfp-size {
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        .results-card {
          min-height: 520px;
        }

        .empty-analysis-state, .analyzing-state {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 12px;
          padding: 40px;
        }

        .empty-icon {
          color: var(--text-muted);
          opacity: 0.5;
        }

        .empty-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #ffffff;
        }

        .analysis-results {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .contract-title {
          font-size: 1.3rem;
          font-weight: 800;
          color: #ffffff;
          margin-top: 6px;
        }

        .agency-name {
          font-size: 0.84rem;
          color: var(--text-secondary);
        }

        .kpi-grid {
          margin-top: 6px;
        }

        .kpi-box {
          background: rgba(9, 19, 13, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 14px;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
        }

        .kpi-label {
          font-size: 0.74rem;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .kpi-val {
          font-size: 1.15rem;
          font-weight: 800;
          color: #ffffff;
          margin-top: 2px;
        }

        .kpi-val.highlight {
          color: #34d399;
        }

        .analysis-section {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .section-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #ffffff;
        }

        .risks-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .risk-item {
          background: rgba(9, 19, 13, 0.6);
          border-radius: var(--radius-sm);
          padding: 12px;
          border-left: 4px solid #f59e0b;
        }

        .risk-item.severity-critical { border-left-color: #ef4444; }
        .risk-item.severity-high { border-left-color: #f97316; }
        .risk-item.severity-medium { border-left-color: #f59e0b; }

        .risk-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.85rem;
          font-weight: 700;
          color: #ffffff;
        }

        .risk-severity-badge {
          font-size: 0.72rem;
          padding: 2px 8px;
          border-radius: 4px;
          background: rgba(239, 68, 68, 0.2);
          color: #fca5a5;
        }

        .risk-summary {
          font-size: 0.82rem;
          color: var(--text-secondary);
          margin-top: 4px;
        }

        .risk-multiplier {
          font-size: 0.76rem;
          color: #34d399;
          margin-top: 4px;
          display: block;
        }

        .requirements-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 6px;
          background: rgba(9, 19, 13, 0.6);
          padding: 14px;
          border-radius: var(--radius-md);
        }

        .req-item {
          font-size: 0.86rem;
          color: var(--text-secondary);
        }

        @media (max-width: 1024px) {
          .analyzer-split {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
