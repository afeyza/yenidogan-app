import { useState, useMemo, useRef, useEffect } from 'react';
import { Search, ChevronDown, Heart } from 'lucide-react';
import { namesData } from '../data/namesData';
import { useFavorites } from '../context/FavoritesContext';

export const NameFinder = () => {
  const { toggleFavorite, isFavorite } = useFavorites();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState<'Hepsi' | 'Kız' | 'Erkek'>('Hepsi');
  const [originFilter, setOriginFilter] = useState<string>('Hepsi');
  const [isOriginOpen, setIsOriginOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOriginOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="finder-page" style={{ padding: '24px 16px' }}>
      <div className="fav-header" style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Search size={32} /> İsim Bulucu
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--muted)', marginTop: '8px' }}>
          Aradığınız kriterlere en uygun ismi keşfedin.
        </p>
      </div>

      {/* FILTER CARD */}
      <div className="finder-filters" style={{ 
        background: '#fff', 
        padding: '28px', 
        borderRadius: '28px', 
        boxShadow: '0 15px 35px rgba(107, 79, 18, 0.08)',
        marginBottom: '32px',
        border: '1px solid rgba(107, 79, 187, 0.05)'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, marginBottom: '10px', color: 'var(--purple)', letterSpacing: '0.5px' }}>
            İSİM VEYA ANLAMDA ARA
          </label>
          <div className="modal-search-form" style={{ marginBottom: 0, padding: '6px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <span className="search-icon-inside" style={{ top: '50%', transform: 'translateY(-50%)' }}>
                <Search size={18} />
              </span>
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

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, marginBottom: '10px', color: 'var(--purple)', letterSpacing: '0.5px' }}>CİNSİYET</label>
            <div style={{ display: 'flex', gap: '4px', background: '#f0edfa', padding: '5px', borderRadius: '15px' }}>
              {['Hepsi', 'Kız', 'Erkek'].map(g => (
                <button
                  key={g}
                  onClick={() => setGenderFilter(g as any)}
                  style={{
                    flex: 1, padding: '10px', borderRadius: '12px', border: 'none', fontSize: '12px', fontWeight: 700, cursor: 'pointer',
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
          
          <div style={{ position: 'relative' }} ref={dropdownRef}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, marginBottom: '10px', color: 'var(--purple)', letterSpacing: '0.5px' }}>KÖKEN</label>
            <div 
              onClick={() => setIsOriginOpen(!isOriginOpen)}
              style={{ 
                width: '100%', 
                padding: '12px 16px', 
                borderRadius: '15px', 
                border: isOriginOpen ? '2px solid var(--purple-light)' : '2px solid #f0edfa', 
                fontSize: '14px', 
                fontWeight: 700,
                cursor: 'pointer',
                background: '#fff',
                color: 'var(--purple)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.2s'
              }}
            >
              <span>{originFilter}</span>
              <ChevronDown size={14} style={{ opacity: 0.6, transform: isOriginOpen ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
            </div>

            {isOriginOpen && (
              <div style={{ 
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                marginTop: '8px',
                background: '#fff',
                borderRadius: '18px',
                boxShadow: '0 10px 30px rgba(107, 79, 187, 0.2)',
                border: '1px solid var(--border)',
                zIndex: 100,
                maxHeight: '200px',
                overflowY: 'auto',
                padding: '8px',
                animation: 'slideDown 0.2s ease-out'
              }}>
                {origins.map(o => (
                  <div 
                    key={o}
                    onClick={() => {
                      setOriginFilter(o);
                      setIsOriginOpen(false);
                    }}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontWeight: originFilter === o ? 700 : 500,
                      color: originFilter === o ? 'var(--purple)' : 'var(--text)',
                      background: originFilter === o ? 'var(--purple-light)' : 'transparent',
                      cursor: 'pointer',
                      transition: '0.15s'
                    }}
                  >
                    {o}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="section-header" style={{ marginBottom: '16px' }}>
        <span className="section-title" style={{ fontSize: '11px', color: 'var(--muted)', fontWeight: 800, letterSpacing: '0.5px' }}>BULUNAN SONUÇLAR ({filteredNames.length})</span>
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
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 5px' }}
                  >
                    <Heart size={22} fill={isFavorite(item.id) ? "var(--pink)" : "none"} color={isFavorite(item.id) ? "var(--pink)" : "#ccc"} />
                  </button>
                </div>
                <div className="name-tags" style={{ marginBottom: '12px' }}>
                  <span className="tag" style={{ background: item.g === 'Kız' ? 'rgba(224,86,123,0.1)' : 'rgba(74,144,217,0.1)', color: item.g === 'Kız' ? 'var(--pink)' : 'var(--blue)', fontSize: '11px', padding: '5px 12px', fontWeight: 700 }}>{item.t1}</span>
                  <span className="tag" style={{ background: 'rgba(245, 166, 35, 0.1)', color: 'var(--gold)', fontSize: '11px', padding: '5px 12px', fontWeight: 700, marginLeft: '8px' }}>{item.t3}</span>
                </div>
                <p className="fav-desc" style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: '1.6' }}>{item.m}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <Search size={64} style={{ opacity: 0.1, marginBottom: '16px' }} />
            <p style={{ fontWeight: 600 }}>Aradığınız kriterlere uygun isim bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  );
};
