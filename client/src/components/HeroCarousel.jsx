import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './HeroCarousel.css';

// Selecting the top 5 most striking images for the accordion
const slides = [
  {
    id: 1,
    image: '/images/hero/hero1.jpg',
    category: 'WEDDING CINEMA',
    title: 'TIMELESS MOMENTS',
    subtitle: 'Capturing the beauty of your love story with cinematic elegance.',
  },
  {
    id: 2,
    image: '/images/hero/hero2.jpg',
    category: 'DESTINATION',
    bgPosition: 'center 20%', 
    title: 'ENDLESS HORIZONS',
    subtitle: 'Breathtaking destination weddings captured in their most magical moments.',
  },
  {
    id: 3,
    image: '/images/hero/hero3.jpg',
    category: 'MODERN EDITORIAL',
    bgPosition: 'center 15%',
    title: 'ELEGANT STORIES',
    subtitle: 'Focusing on the beauty of simplicity and clean lines.',
  },
  {
    id: 4,
    image: '/images/hero/hero4.jpg',
    category: 'ROMANCE',
    title: 'FOREVER YOURS',
    subtitle: 'Every emotion, every detail, beautifully preserved for eternity.',
  },
  {
    id: 5,
    image: '/images/hero/hero5.jpg',
    category: 'LUXURY WEDDINGS',
    title: 'DREAM DAY',
    subtitle: 'Where luxury meets love — crafting unforgettable memories.',
  }
];

const HeroCarousel = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  // Auto slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-wrap">
      {/* Background Images Crossfade */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeIdx}
          className="hero-bg-layer"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          style={{ 
            backgroundImage: `url("${slides[activeIdx].image}")`,
            backgroundPosition: slides[activeIdx].bgPosition || 'center',
            backgroundSize: slides[activeIdx].bgSize || 'cover'
          }}
        />
      </AnimatePresence>

      <div className="hero-overlay"></div>

      {/* Absolute Elements */}
      <div className="hero-slide-counter">
        <span>{String(activeIdx + 1).padStart(2, '0')}</span> / {String(slides.length).padStart(3, '0')}
      </div>

      <div 
        className="hero-nav-circle hero-nav-left"
        onClick={() => setActiveIdx((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6" /></svg>
      </div>

      <div 
        className="hero-nav-circle hero-nav-right"
        onClick={() => setActiveIdx((prev) => (prev + 1) % slides.length)}
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6" /></svg>
      </div>

      <div className="hero-scroll-indicator">
        <div className="hero-scroll-line"></div>
        <span className="hero-scroll-text">Scroll</span>
      </div>

      {/* Centered Content */}
      <div className="hero-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            className="hero-content-inner"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="hero-eyebrow">
              <span className="hero-diamond" />
              <span>{slides[activeIdx].category}</span>
              <span className="hero-diamond" />
            </div>
            
            <h1 className="hero-title">{slides[activeIdx].title}</h1>
            <p className="hero-subtitle">{slides[activeIdx].subtitle}</p>
            
            <Link to="/booking" className="hero-btn">
              BOOK YOUR SESSION
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Slide Indicators */}
        <div className="hero-indicators">
          {slides.map((_, idx) => (
            <div 
              key={idx} 
              className={`hero-dot ${idx === activeIdx ? 'active' : ''}`}
              onClick={() => setActiveIdx(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;