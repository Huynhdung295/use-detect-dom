import { useState } from 'react';
import { useDetectDOM } from './useDetectDOM';

export default function PopupB() {
  const [isOpen, setIsOpen] = useState(false);
  const isBlocked = useDetectDOM('.block-popup-B');

  return (
    <div style={{ border: '1px solid blue', padding: '15px', margin: '10px 0', borderRadius: '4px' }}>
      <strong>Popup B</strong>
      <div style={{ marginTop: '10px' }}>
        <button onClick={() => setIsOpen(!isOpen)} disabled={isBlocked}>
          {isOpen ? 'Close Popup B' : 'Open Popup B'}
        </button>
        {isBlocked && (
          <span style={{ color: 'red', marginLeft: '10px', fontSize: '14px' }}>
            (Blocked by Popup A)
          </span>
        )}
      </div>

      {isOpen && !isBlocked && (
        <div 
          className="xyz block-popup-2" 
          style={{ background: '#cce5ff', padding: '10px', marginTop: '10px', borderRadius: '4px' }}
        >
          Popup B is Active (Blocking Popup 2)
        </div>
      )}
    </div>
  );
}