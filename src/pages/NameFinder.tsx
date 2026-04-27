import { useState, useMemo } from 'react';
import { namesData } from '../data/namesData';
import { useFavorites } from '../context/FavoritesContext';

export const NameFinder = () => {
  const { toggleFavorite, isFavorite } = useFavorites();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState<'Hepsi' | 'Kız' | 'Erkek'>('Hepsi');
  const [originFilter, setOriginFilter] = useState<string>('Hepsi');

  const origins = useMemo(() => {
    const allOrigins = namesData.map(item => item.t3);
    return ['Hepsi', ...Array.from(new Set(allOrigins))];
  }, []);

  const filteredNames = useMemo(() => {
    return namesData.filter(item => {
      const matchesSearch = 
        item.n.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.m.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesGender = genderFilter === 'Hepsi' || item.g === genderFilter;
      const matchesOrigin = originFilter === 'Hepsi' || item.t3 === originFilter;

      return matchesSearch && matchesGender && matchesOrigin;
    });
  }, [searchTerm, genderFilter, originFilter]);

  return (
    <div className="finder-page" style={{ padding: '24px 16px' }}>
      <div className="fav-header" style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 900 }}>🔍 İsim Bulucu</h2>
        <p style={{ fontSize: '15px', color: 'var(--muted)', marginTop: '8px' }}>
          Aradığınız kriterlere en uygun ismi keşfedin.
        </p>
      </div>

      {/* REFINED FILTER CARD */}
      <div className="finder-filters" style={{ 
        background: '#fff', 
        padding: '28px', 
        borderRadius: '28px', 
        boxShadow: '0 15px 35px rgba(107, 79, 187, 0.1)',
        marginBottom: '32px',
        border: '1px solid rgba(107, 79, 187, 0.05)'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, marginBottom: '10px', color: 'var(--purple)', letterSpacing: '0.5px' }}>
            İSİM VEYA ANLAMDA ARA
          </label>
          <div className="modal-search-form" style={{ marginBottom: 0, padding: '6px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <span className="search-icon-inside" style={{ fontSize: '16px' }}>🔍</span>
              <input 
                type="text" 
                className="header-search-input" 
                placeholder="Örn: Elif, Cennet, Güçlü..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ fontSize: '15px' }}
              />
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(140px, 1fr) minmax(140px, 1fr)', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, marginBottom: '10px', color: 'var(--purple)', letterSpacing: '0.5px' }}>CİNSİYET</label>
            <div style={{ display: 'flex', gap: '4px', background: '#f0edfa', padding: '5px', borderRadius: '15px' }}>
              {['Hepsi', 'Kız', 'Erkek'].map(g => (
                <button
                  key={g}
                  onClick={() => setGenderFilter(g as any)}
                  style={{
                    flex: 1, padding: '10px', borderRadius: '12px', border: 'none', fontSize: '13px', fontWeight: 700, cursor: 'pointer',
                    background: genderFilter === g ? '#fff' : 'transparent',
                    boxShadow: genderFilter === g ? '0 4px 10px rgba(107, 79, 187, 0.1)' : 'none',
                    color: genderFilter === g ? 'var(--purple)' : 'var(--muted)',
                    transition: 'all 0.2s'
                  }}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, marginBottom: '10px', color: 'var(--purple)', letterSpacing: '0.5px' }}>KÖKEN</label>
            <select 
              value={originFilter}
              onChange={(e) => setOriginFilter(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '12px 16px', 
                borderRadius: '15px', 
                border: '2px solid #f0edfa', 
                fontSize: '14px', 
                fontWeight: 600,
                outline: 'none', 
                cursor: 'pointer',
                background: '#fff',
                color: 'var(--text)'
              }}
            >
              {origins.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="section-header" style={{ marginBottom: '16px' }}>
        <span className="section-title" style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 800 }}>BULUNAN SONUÇLAR ({filteredNames.length})</span>
      </div>

      <div className="fav-list">
        {filteredNames.length > 0 ? (
          filteredNames.map((item) => (
            <div className="fav-item" key={item.id} style={{ 
              background: '#fff', 
              borderRadius: '20px', 
              padding: '16px', 
              marginBottom: '16px', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
              display: 'flex',
              gap: '16px',
              alignItems: 'center'
            }}>
              <div className={`fav-img ai-bebek ${item.g === 'Kız' ? 'ai-kiz' : 'ai-erkek'}`} style={{ width: '70px', height: '70px', borderRadius: '16px' }}></div>
              <div className="fav-info">
                <div className="fav-name-row" style={{ marginBottom: '4px' }}>
                  <span className="fav-name" style={{ fontSize: '20px', fontWeight: 900 }}>{item.n}</span>
                  <button 
                    onClick={() => toggleFavorite(item.id)}
                    style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer' }}
                  >
                    {isFavorite(item.id) ? "❤️" : "🤍"}
                  </button>
                </div>
                <div className="name-tags" style={{ marginBottom: '10px' }}>
                  <span className="tag" style={{ background: item.g === 'Kız' ? 'rgba(224,86,123,0.1)' : 'rgba(74,144,217,0.1)', color: item.g === 'Kız' ? 'var(--pink)' : 'var(--blue)', fontSize: '10px', padding: '4px 10px' }}>{item.t1}</span>
                  <span className="tag" style={{ background: 'rgba(245,166,35,0.1)', color: 'var(--gold)', fontSize: '10px', padding: '4px 10px', marginLeft: '6px' }}>{item.t3}</span>
                </div>
                <p className="fav-desc" style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: '1.6' }}>{item.m}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-icon" style={{ fontSize: '64px' }}>🔎</div>
            <p style={{ fontWeight: 600 }}>Aradığınız kriterlere uygun isim bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  );
};
