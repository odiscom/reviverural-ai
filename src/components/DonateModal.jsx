import React, { useState } from 'react';
import { Heart, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DonateModal({ onClose }) {
  const [amount, setAmount] = useState('25');
  const [donated, setDonated] = useState(false);

  const handleDonateSubmit = (e) => {
    e.preventDefault();
    setDonated(true);
    confetti({
      particleCount: 80,
      spread: 70,
      colors: ['#fbbf24', '#f59e0b', '#be123c', '#ffffff'],
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      setDonated(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-card donate-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="flex-center">
            <Heart size={22} fill="#fbbf24" className="icon-gold" />
            <h3 className="modal-title">Support GodDome Ministry</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>

        {donated ? (
          <div className="donate-success">
            <Check size={32} className="icon-gold" />
            <h4>Thank You for Your Generous Heart!</h4>
            <p>Your support helps bring fireside devotionals and free prayer fellowship to readers around the world.</p>
          </div>
        ) : (
          <form className="donate-body" onSubmit={handleDonateSubmit}>
            <p className="subtitle">
              GodDome is a non-profit devotional ministry dedicated to sharing words for the soul by Jeanna' Mead.
            </p>

            <div className="amount-pills">
              {['10', '25', '50', '100'].map(val => (
                <button 
                  key={val} 
                  type="button"
                  className={`amount-btn ${amount === val ? 'active' : ''}`}
                  onClick={() => setAmount(val)}
                >
                  ${val}
                </button>
              ))}
            </div>

            <button type="submit" className="btn btn-gold btn-lg w-full">
              <Heart size={18} fill="#1a0f02" />
              <span>Donate ${amount} to Support Ministry</span>
            </button>
          </form>
        )}
      </div>

      <style>{`
        .donate-modal {
          max-width: 480px;
        }

        .flex-center {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .modal-title {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          font-weight: 700;
          color: #ffffff;
        }

        .donate-body {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-top: 14px;
        }

        .amount-pills {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }

        .amount-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          color: #ffffff;
          padding: 12px;
          border-radius: var(--radius-md);
          font-family: var(--font-serif);
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .amount-btn:hover, .amount-btn.active {
          background: rgba(251, 191, 36, 0.2);
          border-color: #fbbf24;
          color: #fbbf24;
        }

        .w-full { width: 100%; }

        .donate-success {
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
