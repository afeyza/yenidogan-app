import { useFavorites } from '../context/FavoritesContext';
import { namesData } from '../data/namesData';
import { Heart, Trash2 } from 'lucide-react';

export const Favorites = () => {
  const { favorites, toggleFavorite } = useFavorites();

  const favoriteNames = namesData.filter(item => favorites.includes(item.id));

  return (
    <div className="fav-page">
      <div className="fav-header">
        <h2 style={{ fontSize: '32px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Heart size={32} fill="var(--purple)" color="var(--purple)" /> Favorilerim
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--muted)', marginTop: '8px' }}>
          Beğendiğiniz ve kaydettiğiniz en güzel isimler burada listelenir.
        </p>
      </div>

      <div className="fav-list">
        {favoriteNames.length > 0 ? (
          favoriteNames.map((item) => (
            <div className="fav-item" key={item.id} style={{ 
              background: '#fff', 
              borderRadius: '24px', 
              padding: '18px', 
              marginBottom: '16px', 
              boxShadow: '0 4px 15px rgba(107, 79, 187, 0.04)',
              display: 'flex',
              gap: '18px',
              alignItems: 'center',
              border: '1px solid rgba(107, 79, 187, 0.03)'
            }}>
              <div className={`fav-img ai-bebek ${item.g === 'Kız' ? 'ai-kiz' : 'ai-erkek'}`} style={{ width: '74px', height: '74px', borderRadius: '18px' }}></div>
              <div className="fav-info">
                <div className="fav-name-row" style={{ marginBottom: '4px' }}>
                  <span className="fav-name" style={{ fontSize: '22px', fontWeight: 900, color: 'var(--purple)' }}>{item.n}</span>
                  <button 
                    className="remove-fav-btn" 
                    onClick={() => toggleFavorite(item.id)}
                    style={{ background: 'var(--pink-light)', padding: '8px', borderRadius: '12px', border: 'none', color: 'var(--pink)', cursor: 'pointer' }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="name-tags" style={{ marginBottom: '10px' }}>
                  <span className="tag" style={{ background: item.g === 'Kız' ? 'rgba(224,86,123,0.1)' : 'rgba(74,144,217,0.1)', color: item.g === 'Kız' ? 'var(--pink)' : 'var(--blue)', fontSize: '11px', padding: '4px 10px', fontWeight: 700 }}>{item.t1}</span>
                  <span className="tag" style={{ background: 'rgba(107, 79, 187, 0.05)', color: 'var(--purple)', fontSize: '11px', padding: '4px 10px', fontWeight: 700, marginLeft: '6px' }}>{item.t3}</span>
                </div>
                <p className="fav-desc" style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: '1.6' }}>{item.m}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <Heart size={64} style={{ opacity: 0.1, marginBottom: '16px' }} />
            <p style={{ fontWeight: 600 }}>Henüz favori isminiz bulunmuyor.</p>
          </div>
        )}
      </div>
    </div>
  );
};
