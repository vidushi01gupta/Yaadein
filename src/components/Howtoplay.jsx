export default function HowToPlay({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="howto-window">
        <div className="howto-title-bar">
          <span>❓ YAADEIN Kaise Khele?</span>
          <button className="close-btn" onClick={onClose} type="button">
            X
          </button>
        </div>

        <div className="howto-content">
          <p>
            90s India se inspired ek word category ke hisab se guess karo. Tumhare paas use sahi
            pehchanne ke liye limited chances hain!
          </p>

          <div className="example">
            <div className="example-row">
              <div className="example-tile correct">D</div>
              <div className="example-tile">A</div>
              <div className="example-tile">R</div>
              <div className="example-tile">R</div>
              <div className="example-tile">A</div>
            </div>
            <p>📺 D sahi jagah hai!</p>
          </div>

          <div className="example">
            <div className="example-row">
              <div className="example-tile">D</div>
              <div className="example-tile present">A</div>
              <div className="example-tile">R</div>
              <div className="example-tile">R</div>
              <div className="example-tile">A</div>
            </div>
            <p>📻 A word mein hai, par galat jagah!</p>
          </div>

          <div className="example">
            <div className="example-row">
              <div className="example-tile">D</div>
              <div className="example-tile">A</div>
              <div className="example-tile absent">R</div>
              <div className="example-tile">R</div>
              <div className="example-tile">A</div>
            </div>
            <p>⬛ R word mein hai hi nahi!</p>
          </div>

          <div className="rules">
            <p>🔤 Word ki length roz alag ho sakti hai</p>
            <p>📅 Har roz ek naya challenge mil sakta hai</p>
            <p>📤 Share karke doston ko batao!</p>
            <p> Sab words 90s India se inspired hain</p>
          </div>

          <button className="start-btn" onClick={onClose} type="button">
            Shuru Karo! 🎮
          </button>
        </div>
      </div>
    </div>
  );
}