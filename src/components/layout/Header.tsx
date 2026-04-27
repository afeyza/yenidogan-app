import { useState, useMemo } from 'react';
import { namesData } from '../../data/namesData';

const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');

  // Arama filtresi: Sadece 'Ara' butonuna basıldığında (submittedQuery güncellendiğinde) çalışır
  const filteredResults = useMemo(() => {
    if (submittedQuery.trim().length === 0) return [];
    
    const query = submittedQuery.toLowerCase().trim();
    return namesData.filter(item => 
      item.n.toLowerCase().includes(query) || 
      item.m.toLowerCase().includes(query) ||
      item.t3.toLowerCase().includes(query)
    ).sort((a, b) => {
      // İsmi tam eşleşenleri veya isimle başlayanları öne çıkaralım
      const aName = a.n.toLowerCase();
      const bName = b.n.toLowerCase();
      const aStarts = aName.startsWith(query);
      const bStarts = bName.startsWith(query);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return 0;
    }).slice(0, 10); // Daha fazla sonuç gösterebiliriz artık
  }, [submittedQuery]);

  const handleSearchTrigger = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSubmittedQuery(searchQuery);
  };

  const handleResultClick = (name: string) => {
    console.log("Arama sonucuna tıklandı:", name);
  };

  return (
    <>
      <div className="header">
        <button className="header-btn menu-btn">☰</button>
        <div className="logo">
          <div className="logo-icon">🌸</div>
          <div>
            <span className="logo-text">yenidoğan.net</span>
            <span className="logo-sub">En güzel başlangıç, en özel isimle…</span>
          </div>
        </div>
        <button 
          className="header-btn search-btn"
          onClick={() => {
            setIsSearchOpen(!isSearchOpen);
            if (!isSearchOpen) {
              setSearchQuery('');
              setSubmittedQuery('');
            }
          }}
        >
          {isSearchOpen ? '✕' : '🔍'}
        </button>
      </div>

      {/* SEARCH OVERLAY */}
      <div className={`search-container ${isSearchOpen ? 'active' : ''}`}>
        <form className="search-input-wrapper" onSubmit={handleSearchTrigger} style={{ display: 'flex', gap: '8px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <span className="search-icon-inside">🔍</span>
            <input 
              type="text" 
              className="search-input" 
              placeholder="İsim, anlam veya köken yazın..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus={isSearchOpen}
            />
          </div>
          <button 
            type="submit"
            className="hero-cta" 
            style={{ padding: '0 20px', borderRadius: '12px', fontSize: '13px', whiteSpace: 'nowrap' }}
          >
            Ara
          </button>
        </form>
        
        {submittedQuery.length > 0 && (
          <div className="search-results" style={{ display: 'block' }}>
            <div style={{ padding: '10px 16px', fontSize: '11px', color: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>
              "{submittedQuery}" için sonuçlar:
            </div>
            {filteredResults.length > 0 ? (
              filteredResults.map(result => (
                <div 
                  key={result.id} 
                  className="search-result-item"
                  onClick={() => handleResultClick(result.n)}
                >
                  <div>
                    <div className="sr-name">{result.n}</div>
                    <div className="sr-meaning">{result.m}</div>
                  </div>
                  <span className={`sr-tag ${result.g === 'Kız' ? 'girl' : 'boy'}`}>
                    {result.g}
                  </span>
                </div>
              ))
            ) : (
              <div className="search-result-item" style={{ cursor: 'default', opacity: 0.7 }}>
                <div className="sr-meaning">Eşleşen isim bulunamadı.</div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
