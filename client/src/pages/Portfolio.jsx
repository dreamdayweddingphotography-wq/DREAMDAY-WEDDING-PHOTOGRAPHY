import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories, portfolioItems } from '../utils/galleryData';
import { X, Maximize2 } from 'lucide-react';
import './Portfolio.css';

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const filtered = activeCategory === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <div className="page-wrapper">

      {/* ── Hero ── */}
      <section className="pg-hero">
        <div className="pg-container">
          <motion.div
            className="pg-hero-inner"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="pg-hero-eyebrow">Visual Archive</p>
            <h1 className="pg-hero-title">Portfolio <em>Gallery</em></h1>
            <p className="pg-hero-sub">
              A curated collection of our best work across various genres,
              capturing the timeless beauty of life's most precious moments.
            </p>

            <div className="gallery-filter-bar" style={{ marginTop: 48 }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`gallery-filter-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Masonry ── */}
      <div className="pg-container">
        <motion.div layout className="portfolio-masonry">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4, delay: (i % 8) * 0.04 }}
                className="portfolio-masonry-item"
                onClick={() => setSelectedImage(item)}
              >
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="portfolio-item-overlay">
                  <div className="portfolio-item-expand"><Maximize2 size={28} /></div>
                  <div className="portfolio-item-text">
                    <span>{item.category}</span>
                    <h3>{item.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="pg-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <button className="pg-lightbox-close" onClick={() => setSelectedImage(null)}>
              <X size={32} />
            </button>
            <motion.div
              className="pg-lightbox-content"
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
            >
              <img src={selectedImage.image} alt={selectedImage.title} />
              <div className="pg-lightbox-info">
                <h3>{selectedImage.title}</h3>
                <p>{selectedImage.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Portfolio;