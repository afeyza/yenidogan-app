import { useState, useMemo } from 'react';
import { namesData } from '../../data/namesData';

const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Arama filtresi: İsim, anlam veya köken (t3) içinde arama yapar
  const filteredResults = useMemo(() => {
    if (searchQuery.trim().length < 2) return [];
    
    const query = searchQuery.toLowerCase().trim();
    return namesData.filter(item => 
      item.n.toLowerCase().includes(query) || 
      item.m.toLowerCase().includes(query) ||
      item.t3.toLowerCase().includes(query)
    ).slice(0, 6); // Maksimum 6 sonuç gösterelim
  }, [searchQuery]);

  const handleResultClick = (name: string) => {
    console.log("Arama sonucuna tıklandı:", name);
    // Şimdilik sadece tıklama efekti, ilerde detay sayfasına yönlendirebiliriz
    // setIsSearchOpen(false); // Opsiyonel: seçince arama kapansın mı?
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
            if (!isSearchOpen) setSearchQuery(''); // Açılırken temizle
          }}
        >
          🔍
        </button>
      </div>

      {/* SEARCH OVERLAY */}
      <div className={`search-container ${isSearchOpen ? 'active' : ''}`}>
        <div className="search-input-wrapper">
          <span className="search-icon-inside">🔍</span>
          <input 
            type="text" 
            className="search-input" 
            placeholder="İsim, anlam veya köken ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus={isSearchOpen}
          />
        </div>
        
        {searchQuery.trim().length >= 2 && (
          <div className="search-results" style={{ display: 'block' }}>
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
