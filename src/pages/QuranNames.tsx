import { useState, useMemo } from 'react';
import { namesData } from '../data/namesData';
import { useFavorites } from '../context/FavoritesContext';

export const QuranNames = () => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const [genderFilter, setGenderFilter] = useState<'Hepsi' | 'Kız' | 'Erkek'>('Hepsi');

  const filteredNames = useMemo(() => {
    return namesData.filter(item => {
      const isQuran = item.quran === true;
      const matchesGender = genderFilter === 'Hepsi' || item.g === genderFilter;
      return isQuran && matchesGender;
    });
  }, [genderFilter]);

  return (
    <div className="fav-page" style={{ padding: '24px 16px' }}>
      <div className="fav-header" style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 900 }}>📖 Kur'an'da Geçenler</h2>
        <p style={{ fontSize: '15px', color: 'var(--muted)', marginTop: '8px' }}>
          Kur'an-ı Kerim'de yer alan, anlamlarıyla ilham veren en güzel bebek isimleri.
        </p>
      </div>

      {/* GENDER FILTER BUTTONS */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', gap: '6px', background: '#f0edfa', padding: '6px', borderRadius: '18px', maxWidth: '320px' }}>
          {['Hepsi', 'Kız', 'Erkek'].map(g => (
            <button
              key={g}
              onClick={() => setGenderFilter(g as any)}
              style={{
                flex: 1, padding: '12px', borderRadius: '14px', border: 'none', fontSize: '14px', fontWeight: 700, cursor: 'pointer',
                background: genderFilter === g ? '#fff' : 'transparent',
                boxShadow: genderFilter === g ? '0 4px 12px rgba(107, 79, 187, 0.12)' : 'none',
                color: genderFilter === g ? 'var(--purple)' : 'var(--muted)',
                transition: 'all 0.2s'
              }}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="section-header" style={{ marginBottom: '16px' }}>
        <span className="section-title" style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 800, letterSpacing: '0.5px' }}>LİSTELENEN İSİMLER ({filteredNames.length})</span>
      </div>

      <div className="fav-list">
        {filteredNames.length > 0 ? (
          filteredNames.map((item) => (
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
          <div className="empty-state" style={{ padding: '40px 20px' }}>
            <div className="empty-icon" style={{ fontSize: '64px' }}>🔎</div>
            <p style={{ fontWeight: 600 }}>Aradığınız kriterde isim bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  );
};
