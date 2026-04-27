import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, BookOpen, Star, Heart, Search, ChevronRight, Baby } from 'lucide-react';
import { namesData, popularNameIds } from '../data/namesData';
import { useFavorites } from '../context/FavoritesContext';

export const Home = () => {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();
  
  const [currentNameIndex, setCurrentNameIndex] = useState(0);
  const currentName = namesData[currentNameIndex];

  const handleNewName = () => {
    setCurrentNameIndex((prev) => (prev + 1) % namesData.length);
  };

  return (
    <>
      {/* HERO SECTION */}
      <div className="hero">
        <div className="hero-baby">
          <Baby size={120} strokeWidth={1} />
        </div>
        <div className="hero-badge">
          <Sparkles size={14} style={{ marginRight: '6px' }} />
          Bebek İsimleri
        </div>
        <h1>Bebeğiniz için en <span>doğru ismi</span> bulun</h1>
        <p className="hero-desc">Anlamları, kökenleri ve özellikleriyle kız ve erkek isimlerini keşfedin.</p>
        <button className="hero-cta" onClick={() => navigate('/finder')}>İsim bulucuya git →</button>
      </div>

      {/* STATS */}
      <div className="stats">
        <div className="stat-card">
          <span className="stat-num purple">10,000+</span>
          <span className="stat-label">İsim</span>
        </div>
        <div className="stat-card">
          <span className="stat-num blue">50,000+</span>
          <span className="stat-label">Mutlu Ebeveyn</span>
        </div>
        <div className="stat-card">
          <span className="stat-num gold">Her Gün</span>
          <span className="stat-label">Güncellenmiş</span>
        </div>
      </div>

      {/* GENDER CARDS */}
        <div className="gender-cards">
        <div className="gender-card girl">
          <div className="gender-card-photo ai-bebek ai-kiz"></div>
          <h3>Kız isimleri</h3>
          <p>Anlamlı ve zarif isimler</p>
          <button className="gender-card-btn" onClick={() => navigate('/names/kiz')}>Tümünü Gör →</button>
        </div>
        <div className="gender-card boy">
          <div className="gender-card-photo ai-bebek ai-erkek"></div>
          <h3>Erkek isimleri</h3>
          <p>Güçlü ve modern isimler</p>
          <button className="gender-card-btn" onClick={() => navigate('/names/erkek')}>Tümünü Gör →</button>
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="section">
        <div className="section-header">
          <span className="section-title">Kategorilere göre isimler</span>
        </div>
        <div className="cat-grid">
          <div className="cat-card" onClick={() => navigate('/quran')}>
            <div className="cat-icon" style={{ background: '#E8F5E9', color: '#2E7D32' }}>
              <BookOpen size={24} />
            </div>
            <h4>Kur'an'da geçen</h4>
            <p>Keşfet <ChevronRight size={12} /></p>
          </div>
          <div className="cat-card" onClick={() => navigate('/popular')}>
            <div className="cat-icon" style={{ background: '#FFF8E1', color: '#F5A623' }}>
              <Star size={24} />
            </div>
            <h4>Popüler isimler</h4>
            <p>Keşfet <ChevronRight size={12} /></p>
          </div>
          <div className="cat-card" onClick={() => navigate('/finder')}>
            <div className="cat-icon" style={{ background: '#EEE8FF', color: '#6B4FBB' }}>
              <Search size={24} />
            </div>
            <h4>İsim bulucu</h4>
            <p>Keşfet <ChevronRight size={12} /></p>
          </div>
          <div className="cat-card" onClick={() => navigate('/favorites')}>
            <div className="cat-icon" style={{ background: '#FFE8EF', color: '#E0567B' }}>
              <Heart size={24} />
            </div>
            <h4>Favorilerim</h4>
            <p>Keşfet <ChevronRight size={12} /></p>
          </div>
        </div>
      </div>

      <div className="desktop-flex-row">
        {/* GUIDE SECTION */}
        <div className="guide" style={{ width: '100%' }}>
          <div className="guide-header">
            <span>İSİM REHBERİ</span>
            <a onClick={() => navigate('/guide')}>TÜMÜ</a>
          </div>
          <div className="guide-item" onClick={() => navigate('/guide')}>
            <span>Bebek ismi nasıl seçilir?</span>
            <ChevronRight size={16} />
          </div>
          <div className="guide-item" onClick={() => navigate('/guide')}>
            <span>İsimlerin anlamları neden önemlidir?</span>
            <ChevronRight size={16} />
          </div>
          <div className="guide-item" onClick={() => navigate('/guide')}>
            <span>Modern öneriler nereden başlar?</span>
            <ChevronRight size={16} />
          </div>
          <div className="guide-item" onClick={() => navigate('/guide')}>
            <span>Nadir isimler: nelere dikkat edilmeli?</span>
            <ChevronRight size={16} />
          </div>
        </div>

        {/* RANDOM NAME Gacha Section */}
        <div id="random-wrap" style={{ width: '100%' }}>
          <div className="random-section">
            <div className="random-label">
              RASTGELE İSİM KEŞFET
              <button className="new-btn" onClick={handleNewName}>Yeni isim</button>
            </div>
            <div className="name-card-inner" onClick={() => console.log('İsim detayı yakında!')} style={{ cursor: 'pointer' }}>
              <div className="name-info">
                <div className="name-title">{currentName.n}</div>
                <div className="name-tags">
                  <span className="tag tag-blue">{currentName.t1}</span>
                  <span className="tag tag-pink">{currentName.t2}</span>
                  <span className="tag tag-gold">{currentName.t3}</span>
                </div>
                <div className="name-meaning">{currentName.m}</div>
              </div>
              <div className={`baby-img-placeholder ai-bebek ${currentName.t1 === 'Kız ismi' ? 'ai-kiz' : 'ai-erkek'}`}></div>
            </div>
            <div className="name-actions">
              <button 
                className="action-btn action-fav"
                onClick={() => toggleFavorite(currentName.id)}
                style={{ 
                  background: isFavorite(currentName.id) ? "var(--pink)" : "rgba(255,255,255,.15)",
                  borderColor: isFavorite(currentName.id) ? "var(--pink)" : "rgba(255,255,255,.25)"
                }}
              >
                {isFavorite(currentName.id) ? <><Heart size={16} fill="white" style={{ marginRight: '8px' }} /> Favorilerden çıkar</> : <><Heart size={16} style={{ marginRight: '8px' }} /> Favorilere ekle</>}
              </button>
              <button className="action-btn action-detail" onClick={() => navigate('/finder')}>Daha fazla isim keşfet →</button>
            </div>
          </div>
        </div>
      </div>

      {/* POPULAR NAMES */}
      <div className="section">
        <div className="section-header">
          <span className="section-title">En Popüler İsimler</span>
          <span className="see-all" onClick={() => navigate('/popular')}>Tümünü Gör →</span>
        </div>
        <div className="popular-scroll">
          {popularNameIds.map(id => {
            const popName = namesData.find(n => n.id === id);
            if (!popName) return null;
            return (
              <div className="pop-card" key={popName.id} onClick={() => navigate('/finder')}>
                <button 
                  className={`card-fav-btn ${isFavorite(popName.id) ? 'active' : ''}`}
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(popName.id); }}
                >
                  <Heart size={14} fill={isFavorite(popName.id) ? "var(--pink)" : "none"} color={isFavorite(popName.id) ? "var(--pink)" : "currentColor"} />
                </button>
                <div className={`pop-card-img ai-bebek ${popName.g === 'Kız' ? 'ai-kiz' : 'ai-erkek'}`}></div>
                <div className="pop-card-body">
                  <div className="pop-gender">{popName.g.toUpperCase()}</div>
                  <div className="pop-name">{popName.n}</div>
                  <div className="pop-desc">{popName.desc || popName.m}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
