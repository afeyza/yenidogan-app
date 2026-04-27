import { useState, useMemo } from 'react';
import { namesData } from '../data/namesData';
import { useFavorites } from '../context/FavoritesContext';
import { Link } from 'react-router-dom';

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
      <div className="fav-header">
        <h2 style={{ fontSize: '28px' }}>🔍 İsim Bulucu</h2>
        <p>Aradığınız kriterlere en uygun ismi keşfedin.</p>
      </div>

      <div className="finder-filters" style={{ background: '#fff', padding: '20px', borderRadius: '20px', border: '1px solid var(--border)', marginBottom: '24px', marginTop: '16px' }}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '8px', color: 'var(--muted)' }}>İSİM VEYA ANLAMDA ARA</label>
          <input 
            type="text" 
            className="header-search-input" 
            placeholder="Örn: Elif, Cennet, Güçlü..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', background: '#fff', border: '1px solid var(--border)' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '8px', color: 'var(--muted)' }}>CİNSİYET</label>
            <div style={{ display: 'flex', gap: '4px', background: '#F5F5F7', padding: '4px', borderRadius: '10px' }}>
              {['Hepsi', 'Kız', 'Erkek'].map(g => (
                <button
                  key={g}
                  onClick={() => setGenderFilter(g as any)}
                  style={{
                    flex: 1, padding: '8px', borderRadius: '8px', border: 'none', fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                    background: genderFilter === g ? '#fff' : 'transparent',
                    boxShadow: genderFilter === g ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                    color: genderFilter === g ? 'var(--purple)' : 'var(--muted)'
                  }}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '8px', color: 'var(--muted)' }}>KÖKEN</label>
            <select 
              value={originFilter}
              onChange={(e) => setOriginFilter(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid var(--border)', fontSize: '13px', outline: 'none', cursor: 'pointer' }}
            >
              {origins.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="section-header">
        <span className="section-title">Sonuçlar ({filteredNames.length})</span>
      </div>

      <div className="fav-list">
        {filteredNames.length > 0 ? (
          filteredNames.map((item) => (
            <div className="fav-item" key={item.id}>
              <div className={`fav-img ai-bebek ${item.g === 'Kız' ? 'ai-kiz' : 'ai-erkek'}`} style={{ alignSelf: 'flex-start' }}></div>
              <div className="fav-info">
                <div className="fav-name-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="fav-name">{item.n}</span>
                  <button 
                    onClick={() => toggleFavorite(item.id)}
                    style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', padding: '0 5px' }}
                  >
                    {isFavorite(item.id) ? "❤️" : "🤍"}
                  </button>
                </div>
                <div className="name-tags" style={{ marginBottom: '8px' }}>
                  <span className="tag tag-blue" style={{ background: item.g === 'Kız' ? 'rgba(224,86,123,0.15)' : 'rgba(74,144,217,0.15)', color: item.g === 'Kız' ? 'var(--pink)' : 'var(--blue)' }}>{item.t1}</span>
                  <span className="tag tag-pink" style={{ background: 'rgba(224,86,123,0.15)', color: 'var(--pink)' }}>{item.t2}</span>
                  <span className="tag tag-gold" style={{ background: 'rgba(245,166,35,0.15)', color: 'var(--gold)' }}>{item.t3}</span>
                </div>
                <p className="fav-desc">{item.m}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🔎</div>
            <p>Aradığınız kriterlere uygun isim bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  );
};
