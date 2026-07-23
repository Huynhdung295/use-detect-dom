import { useState } from 'react';
import { useDetectDOM } from './useDetectDOM';

export default function Popup2() {
  const [isOpen, setIsOpen] = useState(false);
  const isBlocked = useDetectDOM('.block-popup-2');

  return (
    <div style={{ border: '1px solid green', padding: '15px', margin: '10px 0', borderRadius: '4px' }}>
      <strong>Popup 2</strong>
      <div style={{ marginTop: '10px' }}>
        <button onClick={() => setIsOpen(!isOpen)} disabled={isBlocked}>
          {isOpen ? 'Close Popup 2' : 'Open Popup 2'}
        </button>
        {isBlocked && (
          <span style={{ color: 'red', marginLeft: '10px', fontSize: '14px' }}>
            (Blocked by A or B)
          </span>
        )}
      </div>

      {isOpen && !isBlocked && (
        <div style={{ background: '#d4edda', padding: '10px', marginTop: '10px', borderRadius: '4px' }}>
          Popup 2 is Active
        </div>
      )}
    </div>
  );
}