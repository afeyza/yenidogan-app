import { Link } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const handleAction = (prompt: string) => {
    console.log("Nav Triggered:", prompt);
  };

  return (
    <div className="bottom-nav">
      <Link to="/" className="nav-item active" style={{textDecoration: 'none'}}>
        <span className="nav-icon">🏠</span>
        <span className="nav-label">Ana Sayfa</span>
      </Link>
      <div className="nav-item" onClick={() => handleAction('İsim ara')}>
        <span className="nav-icon">🔍</span>
        <span className="nav-label">Ara</span>
      </div>
      <Link to="/favorites" className="nav-item" style={{textDecoration: 'none'}}>
        <span className="nav-icon">❤️</span>
        <span className="nav-label">Favoriler</span>
      </Link>
      <div className="nav-item" onClick={() => handleAction('Profil sayfası')}>
        <span className="nav-icon">👤</span>
        <span className="nav-label">Profil</span>
      </div>
    </div>
  );
};

export default BottomNav;
