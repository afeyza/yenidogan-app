import { useState } from 'react';

// Şimdilik arayüzü görmek için sahte (mock) veri kullanıyoruz.
// İleride burayı Context API veya Global State (Zustand/Redux) ile besleyeceğiz.
const initialFavorites = [
  { id: 1, n: "Aylin", g: "Kız", m: "Ayın etrafını saran hale anlamına gelir. Türkçe kökenli, şiirsel ve zarif bir isimdir." },
  { id: 2, n: "Miraç", g: "Erkek", m: "Hz. Muhammed'in göğe yükselişini ifade eden Arapça kökenli, maneviyatı yüksek bir isimdir." },
  { id: 3, n: "Defne", g: "Kız", m: "Defne bitkisinin adından gelen, zafer ve şeref simgesi olan, doğa temalı güzel bir isimdir." }
];

export const Favorites = () => {
  const [favorites, setFavorites] = useState(initialFavorites);

  // Favorilerden silme fonksiyonu
  const handleRemove = (id: number) => {
    setFavorites(favorites.filter(fav => fav.id !== id));
  };

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
                onClick={() => handleRemove(fav.id)}
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
