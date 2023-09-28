import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './component/navbar';
import Scan from './component/scan';
import Calculator from './component/calculator';
import History from './component/history';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Scan />} />
          <Route path="Calculator" element={<Calculator />} />
          <Route path="History" element={<History />} />
        </Routes>
      </div>
      </BrowserRouter>
  );
}

export default App;
