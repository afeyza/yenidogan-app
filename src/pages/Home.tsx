import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const namesData = [
  { n: "Aylin", t1: "Kız ismi", t2: "Popüler", t3: "Türkçe", m: "Ayın etrafını saran hale anlamına gelir. Türkçe kökenli, şiirsel bir isimdir." },
  { n: "Miraç", t1: "Erkek ismi", t2: "Dini", t3: "Arapça", m: "Hz. Muhammed'in göğe yükselişini ifade eden Arapça kökenli bir isimdir." },
  { n: "Defne", t1: "Kız ismi", t2: "Doğa", t3: "Türkçe", m: "Defne bitkisinin adından gelen, zafer ve şeref simgesi olan güzel bir isimdir." },
  { n: "Kaan", t1: "Erkek ismi", t2: "Güçlü", t3: "Türkçe", m: "Hükümdar, han anlamına gelen Türkçe kökenli güçlü bir isimdir." },
  { n: "İrem", t1: "Kız ismi", t2: "Popüler", t3: "Arapça", m: "Cennet bahçesi anlamına gelen, Arapça kökenli hoş bir isimdir." },
  { n: "Alp", t1: "Erkek ismi", t2: "Nadir", t3: "Türkçe", m: "Yiğit, cesur, kahraman anlamına gelen saf Türkçe bir isimdir." },
  { n: "Nisan", t1: "Kız ismi", t2: "Mevsim", t3: "Türkçe", m: "İlkbaharın güzel ayı, yağmur ve tazelik simgesi bir isimdir." },
];

export const Home = () => {
  const navigate = useNavigate();
  const [currentNameIndex, setCurrentNameIndex] = useState(0);
  const currentName = namesData[currentNameIndex];

  const handleNewName = () => {
    setCurrentNameIndex((prev) => (prev + 1) % namesData.length);
  };

  const handleAction = (prompt: string) => {
    console.log("Action Triggered:", prompt);
  };

  return (
    <>
      {/* HERO SECTION */}
      <div className="hero">
        <div className="hero-baby">👶</div>
        <div className="hero-badge">🌟 Bebek İsimleri</div>
        <h1>Bebeğiniz için en <span>doğru ismi</span> bulun</h1>
        <p className="hero-desc">Anlamları, kökenleri ve özellikleriyle kız ve erkek isimlerini keşfedin.</p>
        <button className="hero-cta" onClick={() => handleAction('İsim bulucu nasıl çalışıyor?')}>İsim bulucuya git →</button>
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
          <span className="stat-label">Güncellenen Veritabanı</span>
        </div>
      </div>

      {/* GENDER CARDS */}
      <div className="gender-cards">
        <div className="gender-card girl">
          <div className="gender-card-photo ai-bebek ai-kiz"></div>
          <h3>Kız isimleri</h3>
          <p>250+ anlamlı ve güzel isim</p>
          <button className="gender-card-btn" onClick={() => handleAction('Kız bebek isimleri öner')}>Tümünü Gör →</button>
        </div>
        <div className="gender-card boy">
          <div className="gender-card-photo ai-bebek ai-erkek"></div>
          <h3>Erkek isimleri</h3>
          <p>350+ modern ve özel erkek ismi</p>
          <button className="gender-card-btn" onClick={() => handleAction('Erkek bebek isimleri öner')}>Tümünü Gör →</button>
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="section">
        <div className="section-header">
          <span className="section-title">Kategorilere göre isimler</span>
        </div>
        <div className="cat-grid">
          <div className="cat-card" onClick={() => handleAction("Kur'an'da geçen bebek isimleri")}>
            <div className="cat-icon" style={{ background: '#E8F5E9' }}>📖</div>
            <h4>Kur'an'da geçen</h4>
            <p>Keşfet →</p>
          </div>
          <div className="cat-card" onClick={() => handleAction('Popüler bebek isimleri')}>
            <div className="cat-icon" style={{ background: '#FFF8E1' }}>⭐</div>
            <h4>Popüler isimler</h4>
            <p>Keşfet →</p>
          </div>
          <div className="cat-card" onClick={() => handleAction('İsim bulucu ile isim ara')}>
            <div className="cat-icon" style={{ background: '#EEE8FF' }}>🔍</div>
            <h4>İsim bulucu</h4>
            <p>Keşfet →</p>
          </div>
          <div className="cat-card" onClick={() => navigate('/favorites')}>
            <div className="cat-icon" style={{ background: '#FFE8EF' }}>❤️</div>
            <h4>Favorilerim</h4>
            <p>Keşfet →</p>
          </div>
        </div>
      </div>

      <div className="desktop-flex-row">
        {/* GUIDE SECTION */}
        <div className="guide" style={{ width: '100%' }}>
          <div className="guide-header">
            <span>İSİM REHBERİ</span>
            <a onClick={() => handleAction('İsim rehberinin tümünü göster')}>TÜMÜ</a>
          </div>
          <div className="guide-item" onClick={() => handleAction('Bebek ismi nasıl seçilir?')}>
            <span>Bebek ismi nasıl seçilir?</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
          <div className="guide-item" onClick={() => handleAction('İsimlerin anlamları neden önemlidir?')}>
            <span>İsimlerin anlamları neden önemlidir?</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
          <div className="guide-item" onClick={() => handleAction('Modern ve farklı isim önerileri nereden başlar?')}>
            <span>Modern ve farklı isim önerileri nereden başlar?</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
          <div className="guide-item" onClick={() => handleAction('Nadir isimler: nelere dikkat edilmeli?')}>
            <span>Nadir isimler: nelere dikkat edilmeli?</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </div>
        </div>

        {/* RANDOM NAME Gacha Section */}
        <div id="random-wrap" style={{ width: '100%' }}>
          <div className="random-section">
            <div className="random-label">
              RASTGELE İSİM KEŞFET
              <button className="new-btn" onClick={handleNewName}>Yeni isim</button>
            </div>
            <div className="name-card-inner">
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
              <button className="action-btn action-fav">♡ Favorilere ekle</button>
              <button className="action-btn action-detail" onClick={() => handleAction(`${currentName.n} ismi hakkında detaylı bilgi ver`)}>Detayı gör</button>
            </div>
          </div>
        </div>
      </div>

      {/* POPULAR NAMES */}
      <div className="section">
        <div className="section-header">
          <span className="section-title">Türkiye'de En Popüler İsimler</span>
          <span className="see-all" onClick={() => handleAction("Türkiye'de en popüler bebek isimlerini listele")}>Tümünü Gör →</span>
        </div>
        <div className="popular-scroll">
          <div className="pop-card" onClick={() => handleAction('Efe ismi anlamı ve kökeni')}>
            <div className="pop-card-img ai-bebek ai-erkek"></div>
            <div className="pop-card-body">
              <div className="pop-gender">ERKEK</div>
              <div className="pop-name">Efe</div>
              <div className="pop-desc">Ege bölgesinde yiğit, kabadayı anlamında...</div>
            </div>
          </div>
          <div className="pop-card" onClick={() => handleAction('Berkay ismi anlamı ve kökeni')}>
            <div className="pop-card-img ai-bebek ai-erkek"></div>
            <div className="pop-card-body">
              <div className="pop-gender">ERKEK</div>
              <div className="pop-name">Berkay</div>
              <div className="pop-desc">Berkay, Arapça kökenli sağlam ve güçlü anlamı...</div>
            </div>
          </div>
          <div className="pop-card" onClick={() => handleAction('Zeynep ismi anlamı ve kökeni')}>
            <div className="pop-card-img ai-bebek ai-kiz"></div>
            <div className="pop-card-body">
              <div className="pop-gender">KIZ</div>
              <div className="pop-name">Zeynep</div>
              <div className="pop-desc">Güzel kokulu çiçek, babanın süsü anlamında...</div>
            </div>
          </div>
          <div className="pop-card" onClick={() => handleAction('Yusuf ismi anlamı ve kökeni')}>
            <div className="pop-card-img ai-bebek ai-erkek"></div>
            <div className="pop-card-body">
              <div className="pop-gender">ERKEK</div>
              <div className="pop-name">Yusuf</div>
              <div className="pop-desc">İbranice kökenli, Allah artırsın anlamında...</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
