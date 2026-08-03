import React, { useState } from 'react';
import { Camera, Upload, Sparkles, CheckCircle2, AlertTriangle, Layers, ShieldAlert, Wrench, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PROPERTY_ASSESSMENT_SYSTEM_PROMPT } from '../lib/ai/prompts/property-assessment';

export default function PropertyAssessmentVision() {
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState({
    id: "assess-1",
    parcelId: "PARCEL-JASPER-48201",
    address: "4820 County Road 14, Jasper County, IA",
    primaryClassification: "Heavy Mow",
    confidenceScore: "96.8%",
    estimatedVegetationHeight: "18 inches",
    estimatedCrewHours: 4.5,
    riskRating: 6,
    hazardFlagged: true,
    hazardDetails: "Submerged tire stack and hidden wire fence fragments in southeast corner.",
    recommendedEquipment: [
      "72-inch Commercial Bushhog Mower",
      "Skidsteer with Grapple Bucket",
      "Heavy Duty String Trimmer Crew"
    ],
    secondaryClassifications: ["Brush Cleanup", "Debris Removal"],
    imageKey: "farm_drone_hero"
  });

  const sampleAssessments = [
    {
      id: "assess-1",
      parcelId: "PARCEL-JASPER-48201",
      address: "4820 County Road 14, Jasper County, IA",
      primaryClassification: "Heavy Mow",
      confidenceScore: "96.8%",
      estimatedVegetationHeight: "18 inches",
      estimatedCrewHours: 4.5,
      riskRating: 6,
      hazardFlagged: true,
      hazardDetails: "Submerged tire stack and hidden wire fence fragments in southeast corner.",
      recommendedEquipment: ["72-inch Commercial Bushhog", "Skidsteer with Grapple"],
      secondaryClassifications: ["Brush Cleanup", "Debris Removal"],
      imageKey: "farm_drone_hero"
    },
    {
      id: "assess-2",
      parcelId: "PARCEL-TYLER-10294",
      address: "1090 West Main St, City of Tyler Code Enforcement",
      primaryClassification: "Debris Removal",
      confidenceScore: "98.4%",
      estimatedVegetationHeight: "24 inches",
      estimatedCrewHours: 6.0,
      riskRating: 8,
      hazardFlagged: true,
      hazardDetails: "Illegal dumping: 12 passenger tires, broken concrete, discarded furniture.",
      recommendedEquipment: ["Dump Trailer Crew", "Skidsteer", "Zero-Turn Finishing Mower"],
      secondaryClassifications: ["Heavy Mow", "Brush Cleanup"],
      imageKey: "main_street_rural"
    },
    {
      id: "assess-3",
      parcelId: "PARCEL-DRAINAGE-5501",
      address: "North Retention Basin #3, Drainage District 4",
      primaryClassification: "Brush Cleanup",
      confidenceScore: "94.2%",
      estimatedVegetationHeight: "36 inches (Woody Saplings)",
      estimatedCrewHours: 8.0,
      riskRating: 7,
      hazardFlagged: false,
      hazardDetails: "3:1 Slope levee grade requiring remote flail mower.",
      recommendedEquipment: ["Remote Slope Flail Mower", "Chainsaw Crew"],
      secondaryClassifications: ["Tree Removal"],
      imageKey: "crop_diagnostic"
    }
  ];

  const handleSimulateUpload = (item) => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      if (item) setSelectedAssessment(item);
      confetti({
        particleCount: 50,
        spread: 50,
        colors: ['#10b981', '#fbbf24', '#ffffff'],
        origin: { y: 0.6 }
      });
    }, 1100);
  };

  const getBadgeClass = (cat) => {
    switch (cat) {
      case 'Light Mow': return 'badge-emerald';
      case 'Heavy Mow': return 'badge-amber';
      case 'Brush Cleanup': return 'badge-cyan';
      case 'Debris Removal': return 'badge-crimson';
      case 'Tree Removal': return 'badge-purple';
      default: return 'badge-emerald';
    }
  };

  return (
    <div className="property-assessment-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="badge badge-amber">
            <Sparkles size={13} /> AI Computer Vision Vegetation Classifier
          </div>
          <h1 className="title-xl" style={{ marginTop: '8px' }}>Property Assessment Vision Tool</h1>
          <p className="subtitle">
            Upload parcel photos or aerial imagery to automatically classify property maintenance into 5 municipal categories.
          </p>
        </div>
      </div>

      {/* Categories Badge Strip */}
      <div className="glass-card categories-strip">
        <span className="strip-title">Classification Categories:</span>
        <div className="strip-pills">
          <span className="badge badge-emerald">Light Mow</span>
          <span className="badge badge-amber">Heavy Mow</span>
          <span className="badge badge-cyan">Brush Cleanup</span>
          <span className="badge badge-crimson">Debris Removal</span>
          <span className="badge badge-purple">Tree Removal</span>
        </div>
      </div>

      {/* Main Split: Uploader & AI Classification Details */}
      <div className="assessment-split">
        {/* Left: Upload Box & Sample Parcel Selector */}
        <div className="glass-card upload-side">
          <h3 className="title-md">Upload Parcel Photo or Aerial Image</h3>

          <div className="image-dropzone" onClick={() => handleSimulateUpload()}>
            <Camera size={38} className="camera-icon" />
            <span className="drop-title">Drop property inspection image</span>
            <span className="drop-sub">JPG, PNG, TIFF, or GIS Satellite Imagery</span>
          </div>

          <div className="sample-parcels-section">
            <span className="sample-label">Or select recent parcel inspections:</span>
            <div className="parcels-list">
              {sampleAssessments.map(item => (
                <button 
                  key={item.id}
                  className={`parcel-btn ${selectedAssessment.id === item.id ? 'active' : ''}`}
                  onClick={() => handleSimulateUpload(item)}
                >
                  <div className="parcel-top">
                    <span className="parcel-id">{item.parcelId}</span>
                    <span className={`badge ${getBadgeClass(item.primaryClassification)}`}>
                      {item.primaryClassification}
                    </span>
                  </div>
                  <span className="parcel-addr">{item.address}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: AI Vision Assessment Analysis */}
        <div className="glass-card analysis-side">
          {analyzing ? (
            <div className="analyzing-state">
              <Sparkles size={40} className="spin-icon icon-emerald" />
              <h4>Running AI Vision Classification...</h4>
              <p className="subtitle">Analyzing vegetation density, height, and hazards...</p>
            </div>
          ) : (
            <div className="assessment-details">
              <div className="assessment-header">
                <div>
                  <div className="badge-row">
                    <span className={`badge ${getBadgeClass(selectedAssessment.primaryClassification)} badge-lg`}>
                      {selectedAssessment.primaryClassification}
                    </span>
                    <span className="badge badge-amber">AI Confidence: {selectedAssessment.confidenceScore}</span>
                  </div>
                  <h3 className="parcel-title">{selectedAssessment.address}</h3>
                  <span className="parcel-sub-id">Parcel Reference: {selectedAssessment.parcelId}</span>
                </div>
              </div>

              {/* Assessment Metrics Bar */}
              <div className="grid-3 metrics-bar">
                <div className="metric-box">
                  <span className="metric-lbl">Est. Crew Hours</span>
                  <span className="metric-num flex-align"><Clock size={15} /> {selectedAssessment.estimatedCrewHours} hrs</span>
                </div>
                <div className="metric-box">
                  <span className="metric-lbl">Vegetation Height</span>
                  <span className="metric-num">{selectedAssessment.estimatedVegetationHeight}</span>
                </div>
                <div className="metric-box">
                  <span className="metric-lbl">Site Risk Rating</span>
                  <span className="metric-num highlight">{selectedAssessment.riskRating} / 10</span>
                </div>
              </div>

              {/* Hazard Alert Notice */}
              {selectedAssessment.hazardFlagged && (
                <div className="hazard-notice-card">
                  <ShieldAlert size={20} className="icon-crimson" />
                  <div>
                    <h4 className="hazard-title">Site Hazard Flagged by AI Vision:</h4>
                    <p className="hazard-body">{selectedAssessment.hazardDetails}</p>
                  </div>
                </div>
              )}

              {/* Recommended Equipment */}
              <div className="details-block">
                <h4 className="block-title flex-align">
                  <Wrench size={16} className="icon-emerald" /> Recommended Equipment & Crew Dispatch:
                </h4>
                <div className="equip-tags">
                  {selectedAssessment.recommendedEquipment.map((eq, i) => (
                    <span key={i} className="equip-tag">🔧 {eq}</span>
                  ))}
                </div>
              </div>

              {/* Secondary Classifications */}
              <div className="details-block">
                <h4 className="block-title">Secondary Conditions Detected:</h4>
                <div className="secondary-pills">
                  {selectedAssessment.secondaryClassifications.map((sec, i) => (
                    <span key={i} className="badge badge-secondary">{sec}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .property-assessment-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .categories-strip {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 20px;
          flex-wrap: wrap;
        }

        .strip-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: #ffffff;
        }

        .strip-pills {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .badge-crimson {
          background: rgba(239, 68, 68, 0.2);
          color: #fca5a5;
          border: 1px solid rgba(239, 68, 68, 0.4);
        }

        .badge-lg {
          padding: 6px 16px;
          font-size: 0.9rem;
        }

        .assessment-split {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 20px;
        }

        .image-dropzone {
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

        .image-dropzone:hover {
          border-color: #f59e0b;
          background: rgba(245, 158, 11, 0.08);
        }

        .camera-icon {
          color: #fbbf24;
        }

        .sample-parcels-section {
          margin-top: 20px;
        }

        .sample-label {
          font-size: 0.8rem;
          color: var(--text-muted);
          display: block;
          margin-bottom: 8px;
        }

        .parcels-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .parcel-btn {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-color);
          padding: 12px;
          border-radius: var(--radius-sm);
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .parcel-btn:hover, .parcel-btn.active {
          background: rgba(16, 185, 129, 0.15);
          border-color: #10b981;
        }

        .parcel-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .parcel-id {
          font-size: 0.84rem;
          font-weight: 700;
          color: #ffffff;
        }

        .parcel-addr {
          font-size: 0.78rem;
          color: var(--text-secondary);
        }

        .assessment-details {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .badge-row {
          display: flex;
          gap: 8px;
          margin-bottom: 8px;
        }

        .parcel-title {
          font-size: 1.3rem;
          font-weight: 800;
          color: #ffffff;
        }

        .parcel-sub-id {
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        .metrics-bar {
          margin-top: 4px;
        }

        .metric-box {
          background: rgba(9, 19, 13, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 12px;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
        }

        .metric-lbl {
          font-size: 0.74rem;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .metric-num {
          font-size: 1.1rem;
          font-weight: 800;
          color: #ffffff;
          margin-top: 2px;
        }

        .hazard-notice-card {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          padding: 14px 18px;
          border-radius: var(--radius-md);
        }

        .icon-crimson { color: #fca5a5; flex-shrink: 0; margin-top: 2px; }

        .hazard-title {
          font-size: 0.88rem;
          font-weight: 700;
          color: #ffffff;
        }

        .hazard-body {
          font-size: 0.84rem;
          color: #fca5a5;
        }

        .details-block {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .block-title {
          font-size: 0.88rem;
          font-weight: 700;
          color: #ffffff;
        }

        .equip-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .equip-tag {
          font-size: 0.8rem;
          background: rgba(16, 185, 129, 0.15);
          color: #34d399;
          padding: 6px 12px;
          border-radius: 6px;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .secondary-pills {
          display: flex;
          gap: 8px;
        }

        .badge-secondary {
          background: rgba(255, 255, 255, 0.08);
          color: var(--text-secondary);
        }

        @media (max-width: 1024px) {
          .assessment-split {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
