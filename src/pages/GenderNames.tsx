import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { namesData } from '../data/namesData';
import { useFavorites } from '../context/FavoritesContext';
import { User, Heart } from 'lucide-react';

export const GenderNames = () => {
  const { gender } = useParams<{ gender: string }>();
  const { toggleFavorite, isFavorite } = useFavorites();

  const isGirl = gender === 'kiz';
  const displayGender = isGirl ? 'Kız' : 'Erkek';

  const listNames = useMemo(() => {
    return namesData.filter(item => item.g === displayGender);
  }, [displayGender]);

  return (
    <div className="fav-page" style={{ padding: '24px 16px' }}>
      <div className="fav-header" style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '12px' }}>
          <User size={32} color={isGirl ? 'var(--pink)' : 'var(--blue)'} /> {displayGender} İsimleri
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--muted)', marginTop: '8px' }}>
          En popüler ve anlamlı {displayGender.toLowerCase()} bebek isimleri listesi.
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
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 5px' }}
                >
                  <Heart size={22} fill={isFavorite(item.id) ? "var(--pink)" : "none"} color={isFavorite(item.id) ? "var(--pink)" : "#ccc"} />
                </button>
              </div>
              <div className="name-tags" style={{ marginBottom: '12px' }}>
                <span className="tag" style={{ background: isGirl ? 'rgba(224,86,123,0.1)' : 'rgba(74,144,217,0.1)', color: isGirl ? 'var(--pink)' : 'var(--blue)', fontSize: '11px', padding: '5px 12px', fontWeight: 700 }}>{item.t1}</span>
                <span className="tag" style={{ background: 'rgba(107, 79, 187, 0.05)', color: 'var(--purple)', fontSize: '11px', padding: '5px 12px', fontWeight: 700, marginLeft: '8px' }}>{item.t3}</span>
              </div>
              <p className="fav-desc" style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: '1.6' }}>{item.m}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
