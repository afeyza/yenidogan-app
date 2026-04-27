import { useState } from 'react';

const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
          onClick={() => setIsSearchOpen(!isSearchOpen)}
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
          />
        </div>
        
        {searchQuery.length > 0 && (
          <div className="search-results" style={{ display: 'block' }}>
            <div className="search-result-item">
              <div>
                <div className="sr-name">Arya</div>
                <div className="sr-meaning">Soyluluk, asaleti ifade eder.</div>
              </div>
              <span className="sr-tag girl">Kız</span>
            </div>
            <div className="search-result-item">
              <div>
                <div className="sr-name">Aras</div>
                <div className="sr-meaning">Kalın yün, sahip çıkılan buluntu.</div>
              </div>
              <span className="sr-tag boy">Erkek</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
