import './App.css';
import TopNavBar from './components/TopNavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RawMaterialPage from './components/raw-material/RawMaterialPage';
import ProductPage from './components/product/ProductPage';
import SupplyPage from './components/supply/SupplyPage';

function App() {
  return (
    <div className="App">
      <Router>
        <TopNavBar />
        <Routes>
          <Route path='/home' element={<SupplyPage />}></Route>
          <Route path='/materia-prima' element={<RawMaterialPage />}></Route>
          <Route path='/produto' element={<ProductPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
