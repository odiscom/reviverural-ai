import React, { useState } from 'react';
import { Target, Search, Building2, Calendar, DollarSign, Filter, Sparkles, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { MUNICIPAL_BID_HUNTING_SYSTEM_PROMPT } from '../lib/ai/prompts/municipal-hunting';

export default function MunicipalOpportunityHunter({ setActiveTab }) {
  const [selectedEntity, setSelectedEntity] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const entityTypes = ['All', 'City', 'County', 'MUD', 'Drainage District', 'Utility ROW'];

  const opportunitiesList = [
    {
      id: "opp-1",
      entityType: "MUD",
      entityName: "Harris County MUD #128",
      contractTitle: "Annual Levee & Retention Pond Mowing Contract",
      estimatedValue: "$185,000 / yr",
      deadline: "2026-09-15",
      acreage: "210 Acres",
      frequency: "Bi-weekly",
      opportunityScore: 96,
      status: "Active",
      details: "Requires specialized slope mowers for 3:1 retention pond levees and debris clearing prior to mowing."
    },
    {
      id: "opp-2",
      entityType: "City",
      entityName: "City of Tyler Code Enforcement",
      contractTitle: "2026 Abatement & Vacant Lot Overgrowth Clearing",
      estimatedValue: "$240,000 / yr",
      deadline: "2026-09-30",
      acreage: "350 Lots",
      frequency: "On-Call Abatement",
      opportunityScore: 92,
      status: "Preparing Bid",
      details: "Code enforcement property cleanups, heavy brush clearing, and tire disposal under 72-hour abatement notice."
    },
    {
      id: "opp-3",
      entityType: "Drainage District",
      entityName: "Jasper County Drainage District #4",
      contractTitle: "Main Canal & Tributary Bank Mowing",
      estimatedValue: "$130,000 / yr",
      deadline: "2026-10-10",
      acreage: "145 Miles",
      frequency: "Monthly Cycles",
      opportunityScore: 89,
      status: "Active",
      details: "Right-of-way bank mowing along 145 miles of agricultural drainage canals."
    },
    {
      id: "opp-4",
      entityType: "County",
      entityName: "Smith County Road & Bridge",
      contractTitle: "County Road Right-of-Way Mowing (District 2 & 3)",
      estimatedValue: "$310,000 / yr",
      deadline: "2026-11-01",
      acreage: "420 Miles",
      frequency: "3 Cycles / Year",
      opportunityScore: 94,
      status: "Active",
      details: "Flex-wing bushhog tractor mowing along rural county road shoulders."
    },
    {
      id: "opp-5",
      entityType: "Utility ROW",
      entityName: "Prairie Electric Cooperative",
      contractTitle: "Substation & Transmission Corridor Brush Maintenance",
      estimatedValue: "$275,000 / yr",
      deadline: "2026-10-25",
      acreage: "180 Miles",
      frequency: "Bi-annual",
      opportunityScore: 88,
      status: "Active",
      details: "High-voltage transmission line corridor clearing, tree trimming, and heavy brush mulching."
    }
  ];

  const filteredOpportunities = opportunitiesList.filter(opp => {
    const matchesEntity = selectedEntity === 'All' || opp.entityType === selectedEntity;
    const matchesSearch = opp.entityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          opp.contractTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          opp.details.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesEntity && matchesSearch;
  });

  return (
    <div className="opportunity-hunter-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="badge badge-cyan">
            <Sparkles size={13} /> AI Municipal Procurement Scanner
          </div>
          <h1 className="title-xl" style={{ marginTop: '8px' }}>Municipal Opportunity Hunter</h1>
          <p className="subtitle">
            Track and score active mowing & land maintenance contracts across Cities, Counties, MUDs, Drainage Districts, and Utility Rights-of-Way.
          </p>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="glass-card controls-card">
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by agency, county, or contract keyword..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="entity-pills">
          {entityTypes.map(ent => (
            <button 
              key={ent} 
              className={`ent-pill ${selectedEntity === ent ? 'active' : ''}`}
              onClick={() => setSelectedEntity(ent)}
            >
              {ent}
            </button>
          ))}
        </div>
      </div>

      {/* Opportunities Cards Grid */}
      <div className="grid-2 opps-grid">
        {filteredOpportunities.map(opp => (
          <div key={opp.id} className="glass-card opp-card">
            <div className="opp-header">
              <div className="opp-tags">
                <span className="badge badge-emerald">{opp.entityType}</span>
                <span className="badge badge-amber">
                  <Sparkles size={12} /> {opp.opportunityScore}% AI Match
                </span>
              </div>
              <span className="opp-status-pill">{opp.status}</span>
            </div>

            <h3 className="opp-title">{opp.contractTitle}</h3>
            <span className="opp-agency"><Building2 size={14} /> {opp.entityName}</span>
            <p className="opp-details">{opp.details}</p>

            <div className="opp-metrics-row">
              <div className="metric-col">
                <span className="lbl">Est. Value</span>
                <span className="val highlight">{opp.estimatedValue}</span>
              </div>
              <div className="metric-col">
                <span className="lbl">Scope</span>
                <span className="val">{opp.acreage}</span>
              </div>
              <div className="metric-col">
                <span className="lbl">Deadline</span>
                <span className="val">{opp.deadline}</span>
              </div>
            </div>

            <div className="opp-footer">
              <button className="btn btn-primary w-full" onClick={() => setActiveTab('bids')}>
                <span>Analyze Bid Packet</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .opportunity-hunter-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .controls-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          padding: 16px 24px;
        }

        .search-bar {
          position: relative;
          flex: 1;
          min-width: 280px;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-secondary);
        }

        .search-input {
          padding-left: 42px;
        }

        .entity-pills {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .ent-pill {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          padding: 8px 16px;
          border-radius: 99px;
          font-size: 0.84rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .ent-pill:hover, .ent-pill.active {
          background: rgba(6, 182, 212, 0.2);
          border-color: #06b6d4;
          color: #ffffff;
        }

        .opp-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 14px;
        }

        .opp-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .opp-tags {
          display: flex;
          gap: 8px;
        }

        .opp-status-pill {
          font-size: 0.76rem;
          font-weight: 700;
          color: #34d399;
          background: rgba(16, 185, 129, 0.15);
          padding: 4px 10px;
          border-radius: 6px;
        }

        .opp-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.3;
        }

        .opp-agency {
          font-size: 0.84rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .opp-details {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .opp-metrics-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          background: rgba(9, 19, 13, 0.6);
          padding: 12px;
          border-radius: var(--radius-md);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .metric-col {
          display: flex;
          flex-direction: column;
        }

        .lbl {
          font-size: 0.72rem;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .val {
          font-size: 0.92rem;
          font-weight: 700;
          color: #ffffff;
          margin-top: 2px;
        }

        .val.highlight {
          color: #34d399;
        }

        .opp-footer {
          margin-top: 4px;
        }

        @media (max-width: 1024px) {
          .opps-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
