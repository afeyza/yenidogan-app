import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import { namesData } from '../data/namesData';
import { CheckCircle2, Heart } from 'lucide-react';

interface FavoritesContextType {
  favorites: number[]; // Sadece ID'leri tutuyoruz
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  favoriteNames: any[]; // Hesaplamış isim listesi
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('yenidogan_fav_ids');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [toast, setToast] = useState<{ message: string; type: 'add' | 'remove' } | null>(null);

  useEffect(() => {
    localStorage.setItem('yenidogan_fav_ids', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const toggleFavorite = (id: number) => {
    const nameItem = namesData.find(n => n.id === id);
    const nameLabel = nameItem ? nameItem.n : "İsim";

    setFavorites(prev => {
      const isAlreadyFav = prev.includes(id);
      if (isAlreadyFav) {
        setToast({ message: `${nameLabel} favorilerden çıkarıldı`, type: 'remove' });
        return prev.filter(favId => favId !== id);
      } else {
        setToast({ message: `${nameLabel} favorilere eklendi!`, type: 'add' });
        return [...prev, id];
      }
    });
  };

  const isFavorite = (id: number) => favorites.includes(id);

  const favoriteNames = useMemo(() => {
    return namesData.filter(n => favorites.includes(n.id));
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, favoriteNames }}>
      {children}
      
      {toast && (
        <div className={`global-toast ${toast.type}`}>
          <div className="toast-content">
            {toast.type === 'add' ? <Heart size={18} fill="white" /> : <CheckCircle2 size={18} />}
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
