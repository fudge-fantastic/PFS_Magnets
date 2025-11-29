import { Outlet } from 'react-router';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-beige-50">
      <Navigation />
      <main id="main-content" className="pt-16 sm:pt-20 md:pt-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
