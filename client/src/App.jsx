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
                      <Route path="/gallery" element={<Gallery />} />
                      <Route path="/gallery/:categoryId" element={<CategoryGalleryPage />} />
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
              </Route>
            </Routes>
          </Router>
        )}
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;




