import React, { useState } from 'react';
import { Heart, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RequestPrayerModal({ onClose, onAddPrayer }) {
  const [author, setAuthor] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('Healing');
  const [title, setTitle] = useState('');
  const [request, setRequest] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !request.trim()) return;

    const newPrayer = {
      id: `prayer-${Date.now()}`,
      author: author.trim() || 'Anonymous Friend',
      location: location.trim() || 'Global Believer',
      category: category,
      title: title,
      request: request,
      prayedCount: 1,
      date: 'Just now',
      status: 'Active'
    };

    onAddPrayer(newPrayer);
    setSubmitted(true);

    confetti({
      particleCount: 60,
      spread: 60,
      colors: ['#be123c', '#fbbf24', '#ffffff'],
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-card prayer-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="flex-center">
            <Heart size={20} fill="#be123c" className="icon-crimson" />
            <h3 className="modal-title">Submit a Prayer Request</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>

        {submitted ? (
          <div className="prayer-success">
            <Check size={32} className="icon-gold" />
            <h4>Your Prayer Request has been Posted</h4>
            <p>Our global fireside community will stand in prayer with you.</p>
          </div>
        ) : (
          <form className="prayer-form" onSubmit={handleSubmit}>
            <div className="form-row-2">
              <div className="form-group">
                <label className="input-label">Your Name (or Anonymous):</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="e.g. Sarah M." 
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="input-label">Location / State:</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="e.g. Ohio, USA" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="input-label">Prayer Category:</label>
              <select 
                className="input-field select-field"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Healing">Healing & Health</option>
                <option value="Family">Family & Relationships</option>
                <option value="Peace & Rest">Peace & Mental Rest</option>
                <option value="Praise & Thanksgiving">Praise & Thanksgiving</option>
              </select>
            </div>

            <div className="form-group">
              <label className="input-label">Short Title:</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="e.g. Prayer for my mother's surgery tomorrow" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="input-label">Prayer Request Details:</label>
              <textarea 
                className="input-field textarea-field" 
                rows="4"
                placeholder="Share your heart's desire..."
                value={request}
                onChange={(e) => setRequest(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-crimson btn-lg w-full">
              <span>Submit Request to Prayer Wall</span>
            </button>
          </form>
        )}
      </div>

      <style>{`
        .prayer-modal {
          max-width: 540px;
        }

        .icon-crimson { color: #be123c; }

        .prayer-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-top: 14px;
        }

        .prayer-success {
          text-align: center;
          padding: 30px 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          color: #ffffff;
        }
      `}</style>
    </div>
  );
}
