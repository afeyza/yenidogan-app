import { useFavorites } from '../context/FavoritesContext';

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
              {/* Cinsiyete göre resmi ayarlayan generic CSS yapımız */}
              <div className={`fav-img ai-bebek ${fav.g === 'Kız' ? 'ai-kiz' : 'ai-erkek'}`}></div>
              
              <div className="fav-info">
                <div className="fav-name-row">
                  <span className="fav-name">{fav.n}</span>
                  <span className={`tag ${fav.g === 'Kız' ? 'tag-pink' : 'tag-blue'}`}>{fav.g}</span>
                </div>
                <p className="fav-desc">{fav.m}</p>
              </div>

              <button 
                className="remove-fav-btn" 
                onClick={() => toggleFavorite(fav.id)}
                title="Favorilerden Çıkar"
              >
                ✖
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <p>Henüz favorilere eklediğiniz bir isim bulunmuyor.</p>
        </div>
      )}
    </div>
  );
};
