import { Outlet } from 'react-router-dom';
import Header from './Header';
import BottomNav from './BottomNav';

const Layout: React.FC = () => {
  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-content">
        <Outlet /> {/* Burası aktif olan sayfayı (Home, Search vb.) render eder */}
      </main>
      <BottomNav />
    </div>
  );
};

export default Layout;
