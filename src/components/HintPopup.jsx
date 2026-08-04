export default function HintPopup({ hint, onClose, onReveal }) {
  return (
    <div className="modal-overlay">
      <div className="howto-window">
        <div className="howto-title-bar">
          <span>💡 Need a Hint?</span>
          <button className="close-btn" onClick={onClose} type="button">
            X
          </button>
        </div>

        <div className="howto-content">
          <p>
            You're on the 4th row and still no green letter.
          </p>
          <p>Want a little help?</p>

          <div style={{ display: "flex", gap: "8px", marginTop: "12px", justifyContent: "center" }}>
            <button className="btn-primary" onClick={onReveal} type="button">
              Show Hint
            </button>
            <button className="btn-secondary" onClick={onClose} type="button">
              Maybe Later
            </button>
          </div>

          {hint && (
            <div style={{ marginTop: "16px", fontWeight: "bold" }}>
              {hint}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}