import { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, ArrowLeft, Search, X } from 'lucide-react';
import { namesData } from '../../data/namesData';

const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

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

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSubmittedQuery('');
  };

  return (
    <>
      <div className="header-outer">
        <div className="header">
          {/* LEFT BUTTON */}
          {isHomePage ? (
            <button className="header-btn menu-btn">
              <Menu size={20} />
            </button>
          ) : (
            <button className="header-btn back-btn" onClick={() => navigate('/')}>
              <ArrowLeft size={20} />
            </button>
          )}

          <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <div className="logo-icon">
              <span style={{ fontSize: '18px' }}>✨</span>
            </div>
            <div className="logo-text-group">
              <span className="logo-text">yenidoğan.net</span>
              <span className="logo-sub">En güzel başlangıç...</span>
            </div>
          </div>

          {/* SEARCH TRIGGER BUTTON */}
          <button 
            className="header-btn search-btn"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search size={20} />
          </button>
        </div>
      </div>

      {/* SEARCH POPUP / MODAL */}
      {isSearchOpen && (
        <div className="search-modal-overlay">
          <div className="search-modal-content">
            <div className="search-modal-header">
              <h3>İsimlerde Ara</h3>
              <button className="modal-close-btn" onClick={closeSearch}>
                <X size={18} />
              </button>
            </div>
            
            <form onSubmit={handleSearchTrigger} className="modal-search-form">
              <div style={{ position: 'relative', flex: 1 }}>
                <span className="search-icon-inside">
                  <Search size={16} />
                </span>
                <input 
                  type="text" 
                  className="header-search-input" 
                  placeholder="İsim yazın..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </div>
              <button type="submit" className="header-search-submit">Ara</button>
            </form>

            <div className="modal-results-area">
              {submittedQuery.length > 0 ? (
                <>
                  <div style={{ padding: '12px 0', fontSize: '12px', color: 'var(--muted)' }}>
                    "{submittedQuery}" için sonuçlar:
                  </div>
                  {filteredResults.length > 0 ? (
                    <div className="modal-scroll-list">
                      {filteredResults.map(result => (
                        <div 
                          key={result.id} 
                          className="search-result-item"
                          onClick={() => {
                            console.log("Seçildi:", result.n);
                            closeSearch();
                          }}
                        >
                          <div>
                            <div className="sr-name">{result.n}</div>
                            <div className="sr-meaning">{result.m}</div>
                          </div>
                          <span className={`sr-tag ${result.g === 'Kız' ? 'girl' : 'boy'}`}>
                            {result.g}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-search">
                      <Search size={40} style={{ opacity: 0.1, marginBottom: '16px' }} />
                      <p>Aradığınız isim bulunamadı.</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="search-hint">
                  <Search size={40} style={{ opacity: 0.1, marginBottom: '16px' }} />
                  <p>Aramanızı yapın, en güzel bebek isimlerini listeleyelim. ✨</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
