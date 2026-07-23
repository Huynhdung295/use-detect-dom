import { useState } from 'react';

export default function PopupA() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ border: '1px solid red', padding: '15px', margin: '10px 0', borderRadius: '4px' }}>
      <strong>Popup A</strong>
      <div style={{ marginTop: '10px' }}>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'Close Popup A' : 'Open Popup A'}
        </button>
      </div>

      {isOpen && (
        <div 
          className="abc block-popup-2 block-popup-B" 
          style={{ background: '#ffcccc', padding: '10px', marginTop: '10px', borderRadius: '4px' }}
        >
          Popup A is Active (Blocking Popup B & Popup 2)
        </div>
      )}
    </div>
  );
}