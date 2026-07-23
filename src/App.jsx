import Popup2 from './Popup2';
import PopupA from './PopupA';
import PopupB from './PopupB';

export default function App() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '40px auto', padding: '0 20px' }}>
      <h2>DOM Detection & Blocking Test</h2>
      <PopupA />
      <PopupB />
      <Popup2 />
    </div>
  );
}