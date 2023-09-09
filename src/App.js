import './App.css';
import MemberRoatations from './MemberRotations'
import VendorRotations from './VendorRotations'

const RENDER_MEMBERS = true // false for vendors

function App() {
  return (
    <div className="App">
      {RENDER_MEMBERS && <MemberRoatations />}
      {!RENDER_MEMBERS && <VendorRotations />}
    </div>
  );
}

export default App;
