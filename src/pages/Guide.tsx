import { BookOpen, CheckCircle2, Lightbulb, Star, ShieldAlert, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Guide = () => {
  const navigate = useNavigate();

  const articles = [
    {
      id: "secim",
      icon: <CheckCircle2 size={32} className="text-purple" />,
      title: "Bebek ismi nasıl seçilir?",
      desc: "İsim seçerken dikkat etmeniz gereken 5 temel kural.",
      content: [
        "Soyadınızla olan fonetik uyumuna mutlaka dikkat edin.",
        "İsmin sadece çocukken değil, yetişkin olduğunda da karizmatik duracağından emin olun.",
        "Anlamının pozitif ve ilham verici olması çocuğun karakter gelişimini etkiler.",
        "Telaffuzu zor orjinal isimler ileride çocuğunuz için yorucu olabilir.",
        "Aile büyüklerinin isimlerini koyarken eşinizle ortak bir karara varın."
      ]
    },
    {
      id: "anlam",
      icon: <Lightbulb size={32} className="text-gold" />,
      title: "İsimlerin anlamları neden önemlidir?",
      desc: "İsimlerin çocuklar üzerindeki psikolojik etkisi.",
      content: [
        "İsim, bir çocuğun kimliğinin ilk parçasıdır.",
        "Pozitif anlamı olan isimler, özgüven gelişimini destekler.",
        "Kötü veya hüzünlü anlamları olan isimlerden kaçınmak geleneksel olarak da tercih edilir.",
        "İsmin hikayesi, çocuğun aidiyet duygusunu güçlendirir."
      ]
    },
    {
      id: "modern",
      icon: <Star size={32} className="text-blue" />,
      title: "Modern ve farklı isim önerileri",
      desc: "Trendlere takılmadan kalıcı isim bulma rehberi.",
      content: [
        "Sadece moda olduğu için isim seçmeyin, 10 yıl sonra da güzel duracak mı düşünün.",
        "Doğa olayları, evren veya sanat dallarından ilham alan isimler zamansızdır.",
        "İki isim koyacaksanız, isimlerin birbirini ezmemesine (uzunluk ve vurgu bakımından) dikkat edin."
      ]
    },
    {
      id: "nadir",
      icon: <ShieldAlert size={32} className="text-pink" />,
      title: "Nadir isimler: nelere dikkat edilmeli?",
      desc: "Sıradışı isimlerin beraberinde getirdiği sorumluluklar.",
      content: [
        "Sözlük anlamını mutlaka birden fazla kaynaktan teyit edin.",
        "İsmin başka dillerde veya sosyal medyada farklı (olumsuz) bir karşılığı olup olmadığını kontrol edin.",
        "Nadir bir ismin her zaman 'anlamlı' bir isim demek olmadığını unutmayın."
      ]
    }
  ];

  return (
    <div className="fav-page" style={{ padding: '24px 16px' }}>
      <div className="fav-header" style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '16px' }}>
          <BookOpen size={36} color="var(--purple)" /> İsim Rehberi
        </h2>
        <p style={{ fontSize: '16px', color: 'var(--muted)', marginTop: '8px', lineHeight: '1.6' }}>
          Bebeğiniz için en doğru ismi seçerken size eşlik edecek uzman ipuçları ve rehber içerikler.
        </p>
      </div>

      <div className="guide-articles-list" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {articles.map((art) => (
          <div key={art.id} className="guide-article-card" style={{ 
            background: '#fff', 
            borderRadius: '28px', 
            padding: '32px', 
            boxShadow: '0 15px 35px rgba(107, 79, 187, 0.06)',
            border: '1px solid rgba(107, 79, 187, 0.03)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
              <div style={{ 
                width: '64px', 
                height: '64px', 
                borderRadius: '18px', 
                background: '#f8f7ff', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                {art.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--purple)' }}>{art.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--muted)', fontWeight: 500 }}>{art.desc}</p>
              </div>
            </div>

            <div className="article-content" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {art.content.map((point, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ marginTop: '4px' }}>
                    <ChevronRight size={14} color="var(--purple)" />
                  </div>
                  <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#444' }}>{point}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '48px', textAlign: 'center', background: 'var(--purple)', padding: '40px', borderRadius: '32px', color: '#fff' }}>
        <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '12px' }}>Hala karar veremediniz mi?</h3>
        <p style={{ opacity: 0.9, marginBottom: '24px', fontSize: '15px' }}>Binlerce isim arasından kriterlerinize en uygun olanı bulmak için isim bulucuyu kullanın.</p>
        <button 
          onClick={() => navigate('/finder')}
          style={{ 
            background: '#fff', 
            color: 'var(--purple)', 
            border: 'none', 
            padding: '14px 32px', 
            borderRadius: '16px', 
            fontWeight: 800, 
            cursor: 'pointer',
            fontSize: '15px'
          }}
        >
          İsim Bulucuya Git
        </button>
      </div>
    </div>
  );
};
