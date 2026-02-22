import './App.css';
import TopNavBar from './components/TopNavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import RawMaterialPage from './components/raw-material/RawMaterialPage';
import ProductPage from './components/product/ProductPage';

function App() {
  return (
    <div className="App">
      <Router>
        <TopNavBar />
        <Routes>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/materia-prima' element={<RawMaterialPage />}></Route>
          <Route path='/produto' element={<ProductPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
