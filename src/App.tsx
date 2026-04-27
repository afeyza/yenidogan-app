import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { Home } from './pages/Home';
import { Favorites } from './pages/Favorites'; // Yeni bileşeni import et

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="favorites" element={<Favorites />} /> {/* Yeni rotamız */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
