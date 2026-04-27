import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { Home } from './pages/Home';
import { Favorites } from './pages/Favorites'; 
import { NameFinder } from './pages/NameFinder';
import { QuranNames } from './pages/QuranNames';
import { GenderNames } from './pages/GenderNames';
import { PopularNames } from './pages/PopularNames';
import { Guide } from './pages/Guide';
import { FavoritesProvider } from './context/FavoritesContext';

function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="finder" element={<NameFinder />} />
            <Route path="quran" element={<QuranNames />} />
            <Route path="names/:gender" element={<GenderNames />} />
            <Route path="popular" element={<PopularNames />} />
            <Route path="guide" element={<Guide />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;
