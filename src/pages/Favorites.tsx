import { useFavorites } from '../context/FavoritesContext';
import { Link } from 'react-router-dom';

export const Favorites = () => {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="fav-page">
      <div className="fav-header">
        <h2>❤️ Favorilerim</h2>
        <p>{favorites.length} isim kaydedildi</p>
      </div>

      {favorites.length > 0 ? (
        <div className="fav-list">
          {favorites.map((fav) => (
            <div className="fav-item" key={fav.id}>
              <div 
                className={`fav-img ai-bebek ${fav.g === 'Kız' ? 'ai-kiz' : 'ai-erkek'}`} 
                style={{ alignSelf: 'flex-start' }}
              ></div>
              
              <div className="fav-info">
                <div className="fav-name-row">
                  <span className="fav-name">{fav.n}</span>
                </div>
                
                {/* Ana sayfadaki gibi zenginleştirilmiş etiketler */}
                <div className="name-tags" style={{ marginBottom: '8px' }}>
                  {fav.t1 && <span className="tag tag-blue">{fav.t1}</span>}
                  {fav.t2 && <span className="tag tag-pink">{fav.t2}</span>}
                  {fav.t3 && <span className="tag tag-gold">{fav.t3}</span>}
                </div>
                
                <p className="fav-desc">{fav.m}</p>
              </div>

              <button 
                className="remove-fav-btn" 
                onClick={() => toggleFavorite(fav.id)}
                title="Favorilerden Çıkar"
                style={{ alignSelf: 'flex-start' }}
              >
                ✖
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <p style={{marginBottom: "20px"}}>Henüz favorilere eklediğiniz bir isim bulunmuyor.</p>
          <Link to="/" style={{
            display: 'inline-block', background: 'var(--purple)', color: '#fff', 
            padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', 
            fontWeight: 600, fontSize: '14px'
          }}>İsim Keşfetmeye Başla →</Link>
        </div>
      )}
    </div>
  );
};
