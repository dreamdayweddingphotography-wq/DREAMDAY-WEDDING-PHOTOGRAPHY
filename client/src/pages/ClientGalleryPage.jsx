import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ArrowLeft } from 'lucide-react';
import defaultGalleryCategories from '../utils/galleryData.json';
import { loadFromDB } from '../utils/db';
import './CategoryGallery.css';

const ClientGalleryPage = () => {
  const { categoryId, clientId } = useParams();
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [galleryCategories, setGalleryCategories] = useState(defaultGalleryCategories);

  useEffect(() => {
    loadFromDB('dwp_gallery_data').then(data => {
      if (data) setGalleryCategories(data);
      else {
        const ls = localStorage.getItem('dwp_gallery_data');
        if (ls) setGalleryCategories(JSON.parse(ls));
      }
    }).catch(console.error);
  }, []);
  
  const category = galleryCategories.find(c => c.id === categoryId);
  const client = category ? category.clients.find(c => c.id === clientId) : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
        if ((!category || !client) && galleryCategories !== defaultGalleryCategories) {
          navigate('/');
        }
    }, 100);
    return () => clearTimeout(timer);
  }, [category, client, galleryCategories, navigate]);

  if (!category || !client) return null;

  const images = client.images || [];

  const openLightbox = (index) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);
  const nextImage = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };
  const prevImage = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <motion.div 
      className="page-wrapper category-gallery-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="pg-container">
        <header className="client-header-elegant">
          <Link to={`/gallery/${categoryId}`} className="client-back-link">
            <ArrowLeft size={14} /> BACK TO {category.title.toUpperCase()}
          </Link>
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="client-title-wrapper"
          >
            <p className="client-eyebrow">A BEAUTIFUL LOVE STORY</p>
            <h1 className="client-elegant-title">{client.name.replace(/-/g, ' ')}</h1>
          </motion.div>
        </header>

        {/* Masonry or Grid Layout for Client Images */}
        <div className="client-gallery-grid">
          {images.map((src, i) => (
            <motion.div
              key={i}
              className="client-grid-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '50px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              onClick={() => openLightbox(i)}
            >
              <img src={src} alt={`${client.name} - ${i + 1}`} loading="lazy" />
              <div className="client-img-overlay">
                <span className="expand-text">VIEW FULLSCREEN</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="pg-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button className="pg-lightbox-close" onClick={closeLightbox}>
              <X size={32} />
            </button>
            <button className="pg-lightbox-arrow prev" onClick={prevImage}>
              <ChevronLeft size={32} />
            </button>
            <motion.img 
              key={selectedIndex}
              src={images[selectedIndex]} 
              alt="Fullscreen view"
              className="pg-lightbox-img"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            />
            <button className="pg-lightbox-arrow next" onClick={nextImage}>
              <ChevronRight size={32} />
            </button>
            <div className="pg-lightbox-counter">
              {selectedIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ClientGalleryPage;
