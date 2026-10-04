import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Services from './pages/Services';
import Booking from './pages/Booking';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Testimonials from './pages/Testimonials';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import ScrollToTop from './components/ScrollToTop';
import Gallery from './pages/Gallery';
import CategoryGalleryPage from './pages/CategoryGalleryPage';
import ClientGalleryPage from './pages/ClientGalleryPage';
import { Toaster } from 'react-hot-toast';

import TamilWedding from './pages/work/TamilWedding';
import TeluguWedding from './pages/work/TeluguWedding';
import BrahminWedding from './pages/work/BrahminWedding';
import ChristianWedding from './pages/work/ChristianWedding';
import MuslimWedding from './pages/work/MuslimWedding';
import Engagement from './pages/work/Engagement';

// Admin Pages
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard'; // This is actually the Quotations list
import MainDashboard from './pages/Admin/MainDashboard';
import GalleryManager from './pages/Admin/GalleryManager';
import BookingManager from './pages/Admin/BookingManager';
import BlogManager from './pages/Admin/BlogManager';
import ServiceManager from './pages/Admin/ServiceManager';
import TestimonialManager from './pages/Admin/TestimonialManager';
import AdminLayout from './pages/Admin/AdminLayout';
import CreateQuotation from './pages/Admin/CreateQuotation';
import ViewQuotation from './pages/Admin/ViewQuotation';
import ImageManager from './pages/Admin/ImageManager';
import TeamManager from './pages/Admin/TeamManager';

const ProtectedRoute = ({ children }) => {
  const { isAdmin, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return isAdmin ? children : <Navigate to="/admin/login" />;
};

function App() {
  const [appLoaded, setAppLoaded] = useState(false);

  return (
    <ThemeProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <AuthProvider>
        {!appLoaded && <Loader onLoaded={() => setAppLoaded(true)} />}
        {appLoaded && (
          <Router>
            <ScrollToTop />
            <Routes>
              {/* MAIN WEBSITE — Navbar + Footer on every public page */}
              <Route path="/*" element={
                <>
                  <Navbar />
                  <main>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/portfolio" element={<Portfolio />} />
                      <Route path="/gallery" element={<Navigate to="/gallery/wedding" />} />
                      <Route path="/gallery/:categoryId" element={<CategoryGalleryPage />} />
                      <Route path="/gallery/:categoryId/:clientId" element={<ClientGalleryPage />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/booking" element={<Booking />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/testimonials" element={<Testimonials />} />
                      
                      {/* === CATEGORY WORK PAGES === */}
                      <Route path="/work/tamil-wedding" element={<TamilWedding />} />
                      <Route path="/work/telugu-wedding" element={<TeluguWedding />} />
                      <Route path="/work/brahmin-wedding" element={<BrahminWedding />} />
                      <Route path="/work/christian-wedding" element={<ChristianWedding />} />
                      <Route path="/work/muslim-wedding" element={<MuslimWedding />} />
                      <Route path="/work/engagement" element={<Engagement />} />
                    </Routes>
                  </main>
                  <Footer />
                  
                  {/* Global WhatsApp floating button */}
                  <a
                    href="https://wa.me/918883621113"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="global-whatsapp"
                    aria-label="Chat on WhatsApp"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </a>
                </>
              } />

              {/* Admin Routes — without public Navbar/Footer */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route index element={<AdminDashboard />} />
                <Route path="dashboard" element={<MainDashboard />} />
                <Route path="quotation/new" element={<CreateQuotation />} />
                <Route path="quotation/:id" element={<ViewQuotation />} />
                <Route path="quotation/:id/edit" element={<CreateQuotation />} />
                <Route path="gallery" element={<GalleryManager />} />
                <Route path="bookings" element={<BookingManager />} />
                <Route path="blogs" element={<BlogManager />} />
                <Route path="services" element={<ServiceManager />} />
                <Route path="testimonials" element={<TestimonialManager />} />
                <Route path="images" element={<ImageManager />} />
                <Route path="team" element={<TeamManager />} />
              </Route>
            </Routes>
          </Router>
        )}
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;




