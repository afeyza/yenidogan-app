import { useMemo } from 'react';
import { namesData } from '../data/namesData';
import { useFavorites } from '../context/FavoritesContext';

export const PopularNames = () => {
  const { toggleFavorite, isFavorite } = useFavorites();

  // Şimdilik bütün isimleri listeler, ileride istatistiklere göre sıralanabilir.
  const listNames = useMemo(() => {
    return [...namesData].sort((a, b) => a.n.localeCompare(b.n));
  }, []);

  return (
    <div className="fav-page" style={{ padding: '24px 16px' }}>
      <div className="fav-header" style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 900 }}>⭐ Popüler İsimler</h2>
        <p style={{ fontSize: '15px', color: 'var(--muted)', marginTop: '8px' }}>
          Türkiye'de en çok tercih edilen ve sevilen bebek isimleri listesi.
        </p>
      </div>

      <div className="section-header" style={{ marginBottom: '16px' }}>
        <span className="section-title" style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 800, letterSpacing: '0.5px' }}>TOPLAM {listNames.length} İSİM</span>
      </div>

      <div className="fav-list">
        {listNames.map((item) => (
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
                <span className="fav-name" style={{ fontSize: '22px', fontWeight: 900 }}>{item.n}</span>
                <button 
                  onClick={() => toggleFavorite(item.id)}
                  style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}
                >
                  {isFavorite(item.id) ? "❤️" : "🤍"}
                </button>
              </div>
              <div className="name-tags" style={{ marginBottom: '12px' }}>
                <span className="tag" style={{ background: item.g === 'Kız' ? 'rgba(224,86,123,0.1)' : 'rgba(74,144,217,0.1)', color: item.g === 'Kız' ? 'var(--pink)' : 'var(--blue)', fontSize: '11px', padding: '5px 12px', fontWeight: 700 }}>{item.t1}</span>
                <span className="tag" style={{ background: 'rgba(245, 166, 35, 0.1)', color: 'var(--gold)', fontSize: '11px', padding: '5px 12px', fontWeight: 700, marginLeft: '8px' }}>Yılın İsimleri</span>
              </div>
              <p className="fav-desc" style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: '1.6' }}>{item.m}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
