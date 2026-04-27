import { useState, useMemo } from 'react';
import { namesData } from '../../data/namesData';

const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');

  const filteredResults = useMemo(() => {
    if (submittedQuery.trim().length === 0) return [];
    
    const query = submittedQuery.toLowerCase().trim();
    return namesData.filter(item => 
      item.n.toLowerCase().includes(query)
    ).sort((a, b) => {
      const aName = a.n.toLowerCase();
      const bName = b.n.toLowerCase();
      const aStarts = aName.startsWith(query);
      const bStarts = bName.startsWith(query);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return 0;
    }).slice(0, 10);
  }, [submittedQuery]);

  const handleSearchTrigger = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSubmittedQuery(searchQuery);
  };

  const toggleSearch = () => {
    if (isSearchOpen) {
      setSearchQuery('');
      setSubmittedQuery('');
    }
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <>
      <div className="header">
        {/* LOGO AREA - Hides when search is open on mobile */}
        {!isSearchOpen && (
          <>
            <button className="header-btn menu-btn">☰</button>
            <div className="logo">
              <div className="logo-icon">🌸</div>
              <div>
                <span className="logo-text">yenidoğan.net</span>
                <span className="logo-sub">En güzel başlangıç...</span>
              </div>
            </div>
          </>
        )}

        {/* INLINE SEARCH BAR - Slides from right to left */}
        <div className={`header-search-wrapper ${isSearchOpen ? 'active' : ''}`}>
          {isSearchOpen && (
            <form onSubmit={handleSearchTrigger} className="header-search-form">
              <input 
                type="text" 
                className="header-search-input" 
                placeholder="İsim veya anlam ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button type="submit" className="header-search-submit">Ara</button>
            </form>
          )}
        </div>

        <button 
          className={`header-btn search-btn ${isSearchOpen ? 'active-close' : ''}`}
          onClick={toggleSearch}
        >
          {isSearchOpen ? '✕' : '🔍'}
        </button>
      </div>

      {/* SEARCH RESULTS - Stays as a dropdown beneath the header */}
      {isSearchOpen && submittedQuery.length > 0 && (
        <div className="search-results" style={{ display: 'block', position: 'fixed', top: '61px', left: 0, right: 0, zIndex: 97, margin: '0 16px', borderRadius: '0 0 16px 16px' }}>
          <div style={{ padding: '10px 16px', fontSize: '11px', color: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>
            "{submittedQuery}" için sonuçlar:
          </div>
          {filteredResults.length > 0 ? (
            filteredResults.map(result => (
              <div 
                key={result.id} 
                className="search-result-item"
                onClick={() => console.log("Seçildi:", result.n)}
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
    </>
  );
};

export default Header;
