import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ArrowLeft } from 'lucide-react';
import { galleryCategories } from '../utils/galleryConfig';
import CategoryLoader from '../components/CategoryLoader';
import './CategoryGallery.css';

const CategoryGalleryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const category = galleryCategories.find(c => c.id === categoryId);

  // Scroll to top and validate category
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!category) {
      navigate('/gallery');
    }
  }, [category, navigate]);

  if (!category) return null;

  // Generate image paths
  const images = category.customNames 
    ? category.customNames.map(name => `/images/${category.folder}/${name}`)
    : Array.from({ length: category.count }, (_, i) => {
        const num = i + 1;
        const fileName = `${category.prefix}${num}.jpg`;
        return `/images/${category.folder}/${fileName}`;
      });

  // Image Pre-loading Logic
  useEffect(() => {
    setLoading(true);
    let loadedCount = 0;
    const targetCount = Math.min(images.length, 8); // At least 8 or all images to show content
    
    // Safety timeout in case images don't load
    const safetyTimer = setTimeout(() => {
      setLoading(false);
    }, 4500);

    images.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount >= targetCount) {
          setTimeout(() => setLoading(false), 800); // Small extra delay for smoothness
        }
      };
      img.onerror = () => {
        loadedCount++; // Count err as load to avoid sticking
        if (loadedCount >= targetCount) setLoading(false);
      };
    });

    return () => clearTimeout(safetyTimer);
  }, [categoryId, images.length]);

  const openLightbox = (index) => {
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    document.body.style.overflow = '';
  };

  const showNext = (e) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const showPrev = (e) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  return (
    <div className="page-wrapper category-gallery-page">
      <AnimatePresence>
        {loading && (
          <CategoryLoader categoryName={category.title} />
        )}
      </AnimatePresence>

      <motion.div 
        className="pg-container"
        initial={{ opacity: 0, y: 30 }}
        animate={!loading ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        
        {/* Header Section */}
        <header className="cat-gallery-header">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link to="/gallery" className="back-link">
              <ArrowLeft size={16} /> Back to Categories
            </Link>
          </motion.div>
          
          <motion.div
            className="cat-gallery-title-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="cat-eyebrow">Collection</span>
            <h1 className="cat-title">{category.title}</h1>
            <p className="cat-desc">{category.description}</p>
          </motion.div>
        </header>

        {/* Masonry Grid */}
        <div className="gallery-masonry-container">
          <div className="gallery-masonry">
            <AnimatePresence mode="popLayout">
              {images.map((src, i) => (
                <motion.div
                  key={i}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: (i % 12) * 0.05 }}
                  className="gallery-item"
                  onClick={() => openLightbox(i)}
                >
                  <div className="gallery-img-wrap">
                    <img src={src} alt={`${category.title} moment ${i+1}`} loading="lazy" />
                    <div className="gallery-img-overlay">
                      <span className="expand-text">View Fullscreen</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

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

            <button className="pg-lightbox-arrow prev" onClick={showPrev}>
              <ChevronLeft size={24} />
            </button>
            <button className="pg-lightbox-arrow next" onClick={showNext}>
              <ChevronRight size={24} />
            </button>

            <motion.div
              className="pg-lightbox-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={images[selectedIndex]} alt="Fullscreen" />
              <div className="pg-lightbox-info">
                <h3>{category.title}</h3>
                <p>Frame {selectedIndex + 1} of {images.length}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryGalleryPage;

