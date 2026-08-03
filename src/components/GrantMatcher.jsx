import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Building2, 
  Copy, 
  Check, 
  Download, 
  SlidersHorizontal,
  ArrowUpRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GRANTS_DATA } from '../data/mockData';

export default function GrantMatcher({ setActiveTab, onOpenGrantModal }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeGrantModal, setActiveGrantModal] = useState(null);
  const [generatingGrant, setGeneratingGrant] = useState(false);
  const [generatedDraft, setGeneratedDraft] = useState(null);
  const [copied, setCopied] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');

  const categories = ['All', 'Clean Energy', 'Infrastructure', 'Healthcare', 'Agribusiness', 'Economic Revitalization'];

  const filteredGrants = GRANTS_DATA.filter(grant => {
    const matchesCategory = selectedCategory === 'All' || grant.category === selectedCategory;
    const matchesSearch = grant.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          grant.agency.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          grant.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenGenerator = (grant) => {
    setActiveGrantModal(grant);
    setCustomPrompt(grant.samplePrompt);
    setGeneratedDraft(null);
  };

  const handleGenerateDraft = () => {
    if (!activeGrantModal) return;
    setGeneratingGrant(true);

    setTimeout(() => {
      setGeneratingGrant(false);
      setGeneratedDraft({
        projectTitle: `${activeGrantModal.title} - Proposal for Jasper County`,
        executiveSummary: `This application requests funding under the ${activeGrantModal.agency} (${activeGrantModal.title}) to execute: "${customPrompt}". By deploying smart AI IoT monitoring, localized clean energy infrastructure, and community co-op partnerships, this initiative will directly benefit 450 rural households and family farms across Jasper County.`,
        budgetTable: [
          { item: "Hardware & IoT Telemetry Sensor Deployment", cost: "$420,000" },
          { item: "AI Platform Integration & Microgrid Control", cost: "$180,000" },
          { item: "Local Electrical Co-op & Engineering Labor", cost: "$250,000" },
          { item: "Community Training & Maintenance Reserve", cost: "$150,000" }
        ],
        totalBudget: "$1,000,000 ($750k Grant / $250k Local Match)",
        narrative: `1. PROJECT NEED & RURAL IMPACT:\nJasper County currently experiences an average energy cost burden 28% higher than state averages due to peak transmission charges. Implementing this project reduces line loss, locks in predictable solar generation rates, and preserves agricultural profit margins.\n\n2. AI IMPLEMENTATION & REVENUE STABILITY:\nReviveRural AI's real-time telemetry will optimize grid dispatch, predicting energy storage release during high-demand crop drying windows. This guarantees an expected ROI payback period of 3.8 years.`
      });

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1200);
  };

  const handleCopyDraft = () => {
    if (!generatedDraft) return;
    const textToCopy = `PROJECT TITLE: ${generatedDraft.projectTitle}\n\nEXECUTIVE SUMMARY:\n${generatedDraft.executiveSummary}\n\nBUDGET OVERVIEW:\n${generatedDraft.budgetTable.map(b => `- ${b.item}: ${b.cost}`).join('\n')}\nTOTAL: ${generatedDraft.totalBudget}\n\nNARRATIVE:\n${generatedDraft.narrative}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grant-matcher-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <div className="badge badge-emerald">
            <Sparkles size={13} /> AI Federal & State Funding Engine
          </div>
          <h1 className="title-xl" style={{ marginTop: '8px' }}>Rural Grant Matcher & Proposal Generator</h1>
          <p className="subtitle">
            Match your community's needs with active USDA, BEAD, HHS, and State grants. Generate complete AI grant proposals in seconds.
          </p>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="glass-card controls-card">
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search grants by keyword, agency, or focus area..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="category-pills">
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`cat-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grant Cards Grid */}
      <div className="grid-2 grants-grid">
        {filteredGrants.map(grant => (
          <div key={grant.id} className="glass-card grant-card">
            <div className="grant-card-header">
              <div className="grant-badge-wrap">
                <span className="badge badge-emerald">{grant.category}</span>
                <span className="badge badge-amber">
                  <Sparkles size={12} /> {grant.aiMatchScore}% AI Match
                </span>
              </div>
              <span className="grant-agency"><Building2 size={14} /> {grant.agency}</span>
            </div>

            <h3 className="grant-title">{grant.title}</h3>
            <p className="grant-description">{grant.description}</p>

            <div className="grant-details-row">
              <div className="detail-item">
                <span className="detail-label">Max Funding</span>
                <span className="detail-val highlight">{grant.amount}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Match Req.</span>
                <span className="detail-val">{grant.matchReq}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Deadline</span>
                <span className="detail-val flex-align"><Clock size={13} /> {grant.deadline}</span>
              </div>
            </div>

            <div className="grant-tags">
              {grant.keyFocus.map(tag => (
                <span key={tag} className="tag-item">#{tag}</span>
              ))}
            </div>

            <div className="grant-card-footer">
              <button 
                className="btn btn-primary w-full"
                onClick={() => handleOpenGenerator(grant)}
              >
                <Sparkles size={16} />
                <span>Generate AI Proposal Draft</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* AI Proposal Generator Modal */}
      {activeGrantModal && (
        <div className="modal-overlay" onClick={() => setActiveGrantModal(null)}>
          <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="badge badge-emerald">AI Grant Application Generator</span>
                <h3 className="modal-title">{activeGrantModal.title}</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setActiveGrantModal(null)}>×</button>
            </div>

            <div className="modal-body">
              <div className="prompt-input-group">
                <label className="input-label">Describe your specific project goal or use prompt template:</label>
                <textarea 
                  className="input-field textarea-field" 
                  rows="3"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="e.g. Expand high-speed fiber internet to 300 agricultural sensor nodes..."
                />
              </div>

              {!generatedDraft ? (
                <button 
                  className="btn btn-primary btn-lg w-full" 
                  onClick={handleGenerateDraft}
                  disabled={generatingGrant}
                >
                  {generatingGrant ? (
                    <>
                      <Sparkles size={18} className="spin-icon" />
                      <span>Drafting Grant Application with RuralIQ AI...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} />
                      <span>Generate Complete Grant Proposal Draft</span>
                    </>
                  )}
                </button>
              ) : (
                <div className="generated-draft-container">
                  <div className="draft-header-actions">
                    <span className="badge badge-emerald">Draft Ready & Validated</span>
                    <div className="action-buttons">
                      <button className="btn btn-secondary btn-sm" onClick={handleCopyDraft}>
                        {copied ? <Check size={15} /> : <Copy size={15} />}
                        <span>{copied ? 'Copied!' : 'Copy Draft'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="draft-section">
                    <h4 className="draft-sub-title">1. Executive Summary</h4>
                    <p className="draft-text">{generatedDraft.executiveSummary}</p>
                  </div>

                  <div className="draft-section">
                    <h4 className="draft-sub-title">2. Itemized Budget & Local Match</h4>
                    <table className="budget-table">
                      <thead>
                        <tr>
                          <th>Expense Category</th>
                          <th>Allocated Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {generatedDraft.budgetTable.map((row, idx) => (
                          <tr key={idx}>
                            <td>{row.item}</td>
                            <td className="cost-col">{row.cost}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="total-budget-badge">
                      Total Requested: <strong>{generatedDraft.totalBudget}</strong>
                    </div>
                  </div>

                  <div className="draft-section">
                    <h4 className="draft-sub-title">3. Project Justification & ROI Narrative</h4>
                    <pre className="draft-narrative">{generatedDraft.narrative}</pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .grant-matcher-page {
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

        .category-pills {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .cat-pill {
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

        .cat-pill:hover, .cat-pill.active {
          background: rgba(16, 185, 129, 0.2);
          border-color: rgba(16, 185, 129, 0.5);
          color: #ffffff;
        }

        .grant-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 16px;
        }

        .grant-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
        }

        .grant-badge-wrap {
          display: flex;
          gap: 8px;
        }

        .grant-agency {
          font-size: 0.8rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .grant-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.3;
        }

        .grant-description {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .grant-details-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          background: rgba(9, 19, 13, 0.5);
          padding: 12px;
          border-radius: var(--radius-md);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .detail-item {
          display: flex;
          flex-direction: column;
        }

        .detail-label {
          font-size: 0.72rem;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .detail-val {
          font-size: 0.92rem;
          font-weight: 700;
          color: #ffffff;
          margin-top: 2px;
        }

        .detail-val.highlight {
          color: #34d399;
        }

        .flex-align {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .grant-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .tag-item {
          font-size: 0.75rem;
          color: #a7f3d0;
          background: rgba(16, 185, 129, 0.1);
          padding: 3px 10px;
          border-radius: 6px;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(4, 12, 8, 0.85);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 200;
          padding: 20px;
        }

        .modal-content {
          width: 100%;
          max-width: 720px;
          max-height: 90vh;
          overflow-y: auto;
          border: 1px solid var(--border-glow);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
        }

        .modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .modal-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #ffffff;
          margin-top: 6px;
        }

        .modal-close-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          font-size: 1.8rem;
          cursor: pointer;
        }

        .prompt-input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 20px;
        }

        .input-label {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .textarea-field {
          resize: vertical;
        }

        .btn-lg {
          padding: 14px 24px;
          font-size: 1rem;
        }

        .spin-icon {
          animation: spin 1.5s linear infinite;
        }

        @keyframes spin {
          100% { transform: rotate(360deg); }
        }

        .generated-draft-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
          background: rgba(9, 19, 13, 0.8);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 20px;
          margin-top: 16px;
        }

        .draft-header-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .draft-sub-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #34d399;
          margin-bottom: 6px;
        }

        .draft-text {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .budget-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.85rem;
          margin-top: 8px;
        }

        .budget-table th, .budget-table td {
          padding: 8px 12px;
          text-align: left;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .budget-table th {
          color: var(--text-muted);
          font-weight: 600;
        }

        .cost-col {
          font-family: var(--font-mono);
          color: #34d399;
          font-weight: 600;
        }

        .total-budget-badge {
          margin-top: 10px;
          font-size: 0.88rem;
          color: #ffffff;
          background: rgba(16, 185, 129, 0.15);
          padding: 8px 12px;
          border-radius: 6px;
        }

        .draft-narrative {
          font-family: var(--font-mono);
          font-size: 0.82rem;
          color: var(--text-secondary);
          white-space: pre-wrap;
          line-height: 1.5;
          background: rgba(0, 0, 0, 0.4);
          padding: 12px;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
}
