import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { HospitalProvider } from './context/HospitalContext';
import BrandSplashLoader from './components/common/BrandSplashLoader';
import EmergencyBanner from './components/common/EmergencyBanner';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import FloatingActions from './components/common/FloatingActions';

// Public Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import DoctorsPage from './pages/DoctorsPage';
import GalleryPage from './pages/GalleryPage';
import BookingPage from './pages/BookingPage';
import ContactPage from './pages/ContactPage';

// Admin Pages
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';

// Helper to determine active tab from window.location.pathname with alias support
const resolveTabFromPath = () => {
  const rawPath = window.location.pathname.toLowerCase().split('?')[0].replace(/^\/+|\/+$/g, '');
  if (rawPath === 'admin' || rawPath.startsWith('admin')) {
    return 'admin-route';
  }
  if (['about', 'about-us'].includes(rawPath)) return 'about';
  if (['services', 'service', 'treatments', 'departments'].includes(rawPath)) return 'services';
  if (['doctors', 'doctor', 'specialists', 'team'].includes(rawPath)) return 'doctors';
  if (['gallery', 'photos', 'infrastructure', 'facilities'].includes(rawPath)) return 'gallery';
  if (['booking', 'book', 'appointment', 'appointments', 'book-appointment', 'opd'].includes(rawPath)) return 'booking';
  if (['contact', 'contact-us', 'emergency', 'help', 'location'].includes(rawPath)) return 'contact';
  if (rawPath === 'home' || rawPath === '') return 'home';
  return 'home';
};

function HospitalApp() {
  const { isAuthenticated } = useAuth();
  
  const [activeTab, setActiveTab] = useState(() => {
    const init = resolveTabFromPath();
    if (init === 'admin-route') {
      return isAuthenticated ? 'admin-dashboard' : 'admin-login';
    }
    return init;
  });

  const [preselectedDoctor, setPreselectedDoctor] = useState(null);
  const [splashFinished, setSplashFinished] = useState(() => {
    // If user lands directly on subpages like /doctors or /admin, skip splash for faster UX
    const init = resolveTabFromPath();
    return init !== 'home';
  });

  // Sync tab with browser URL history
  const navigateTo = (tab) => {
    setActiveTab(tab);
    let targetPath = '/';
    if (tab === 'admin-login' || tab === 'admin-dashboard') {
      targetPath = '/admin';
    } else if (tab !== 'home') {
      targetPath = `/${tab}`;
    }
    
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ tab }, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen to browser popstate (back / forward buttons) and direct URL changes
  useEffect(() => {
    const handlePopState = () => {
      const tab = resolveTabFromPath();
      if (tab === 'admin-route') {
        setActiveTab(isAuthenticated ? 'admin-dashboard' : 'admin-login');
      } else {
        setActiveTab(tab);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isAuthenticated]);

  // If path is /admin on load or reload, ensure correct admin tab
  useEffect(() => {
    const tab = resolveTabFromPath();
    if (tab === 'admin-route') {
      setActiveTab(isAuthenticated ? 'admin-dashboard' : 'admin-login');
    }
  }, [isAuthenticated]);

  const handleOpenBookingWithDoctor = (doctor) => {
    setPreselectedDoctor(doctor);
    navigateTo('booking');
  };

  const handleOpenBooking = () => {
    setPreselectedDoctor(null);
    navigateTo('booking');
  };

  const isAdminRoute = activeTab === 'admin-login' || activeTab === 'admin-dashboard';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 w-full">
      
      {/* 1. Brand Splash Intro Animation (1.8s) */}
      {!splashFinished && !isAdminRoute && (
        <BrandSplashLoader onFinish={() => setSplashFinished(true)} />
      )}

      {/* 2. Public Top Bars (Hidden on Admin Routes) */}
      {!isAdminRoute && (
        <>
          <EmergencyBanner />
          <Navbar activeTab={activeTab} setActiveTab={navigateTo} />
        </>
      )}

      {/* 3. Main Page Body */}
      <main className="flex-1 w-full overflow-x-clip">
        {activeTab === 'home' && (
          <HomePage
            setActiveTab={navigateTo}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage
            onOpenBooking={handleOpenBooking}
            setActiveTab={navigateTo}
          />
        )}

        {activeTab === 'services' && (
          <ServicesPage
            onOpenBooking={handleOpenBooking}
            setActiveTab={navigateTo}
          />
        )}

        {activeTab === 'doctors' && (
          <DoctorsPage
            onSelectDoctorForBooking={handleOpenBookingWithDoctor}
          />
        )}

        {activeTab === 'gallery' && (
          <GalleryPage />
        )}

        {activeTab === 'booking' && (
          <BookingPage
            preselectedDoctor={preselectedDoctor}
            onBookingSuccess={() => {}}
          />
        )}

        {activeTab === 'contact' && (
          <ContactPage />
        )}

        {/* Admin Flow */}
        {activeTab === 'admin-login' && (
          <AdminLoginPage
            onLoginSuccess={() => navigateTo('admin-dashboard')}
            onBackToSite={() => navigateTo('home')}
          />
        )}

        {activeTab === 'admin-dashboard' && (
          isAuthenticated ? (
            <AdminDashboardPage onBackToSite={() => navigateTo('home')} />
          ) : (
            <AdminLoginPage
              onLoginSuccess={() => navigateTo('admin-dashboard')}
              onBackToSite={() => navigateTo('home')}
            />
          )
        )}
      </main>

      {/* 4. Public Footer (Hidden on Admin Routes) */}
      {!isAdminRoute && (
        <Footer setActiveTab={navigateTo} />
      )}

      {/* 5. Floating Actions: AI Chatbot, 24x7 Call, WhatsApp (Hidden on Admin) */}
      <FloatingActions
        activeTab={activeTab}
        onOpenBooking={handleOpenBooking}
      />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <HospitalProvider>
        <HospitalApp />
      </HospitalProvider>
    </AuthProvider>
  );
}
