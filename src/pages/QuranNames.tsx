import { useMemo } from 'react';
import { namesData } from '../data/namesData';
import { useFavorites } from '../context/FavoritesContext';

export const QuranNames = () => {
  const { toggleFavorite, isFavorite } = useFavorites();

  const quranNames = useMemo(() => {
    return namesData.filter(item => item.quran === true);
  }, []);

  return (
    <div className="fav-page" style={{ padding: '24px 16px' }}>
      <div className="fav-header" style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 900 }}>📖 Kur'an'da Geçenler</h2>
        <p style={{ fontSize: '15px', color: 'var(--muted)', marginTop: '8px' }}>
          Kur'an-ı Kerim'de yer alan, anlamlarıyla ilham veren en güzel bebek isimleri.
        </p>
      </div>

      <div className="fav-list">
        {quranNames.length > 0 ? (
          quranNames.map((item) => (
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
                  <span className="tag" style={{ background: 'rgba(232, 245, 233, 1)', color: '#2E7D32', fontSize: '11px', padding: '5px 12px', fontWeight: 700, marginLeft: '8px' }}>Dini</span>
                </div>
                <p className="fav-desc" style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: '1.6' }}>{item.m}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-icon" style={{ fontSize: '64px' }}>📖</div>
            <p style={{ fontWeight: 600 }}>Şu an bu kategoride isim bulunmamaktadır.</p>
          </div>
        )}
      </div>
    </div>
  );
};
