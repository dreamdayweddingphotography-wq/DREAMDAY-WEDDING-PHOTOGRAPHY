import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './HeroCarousel.css';

// Selecting the top 5 most striking images for the accordion
const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=85',
    category: 'WEDDING CINEMA',
    title: 'TIMELESS MOMENTS',
    subtitle: 'Capturing the beauty of your love story with cinematic elegance.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=85',
    category: 'DESTINATION',
    title: 'ENDLESS HORIZONS',
    subtitle: 'Breathtaking destination weddings captured in their most magical moments.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=1800&q=85',
    category: 'MODERN EDITORIAL',
    title: 'ELEGANT STORIES',
    subtitle: 'Focusing on the beauty of simplicity and clean lines.',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1800&q=85',
    category: 'ROMANCE',
    title: 'FOREVER YOURS',
    subtitle: 'Every emotion, every detail, beautifully preserved for eternity.',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1800&q=85',
    category: 'LUXURY WEDDINGS',
    title: 'DREAM DAY',
    subtitle: 'Where luxury meets love — crafting unforgettable memories.',
  }
];

const HeroCarousel = () => {
  const [activeIdx, setActiveIdx] = useState(1); // Default to the second slide (Endless Horizons)

  return (
    <div className="hero-wrap">
      <div className="accordion-container">
        {slides.map((slide, index) => {
          const isActive = index === activeIdx;

          return (
            <div
              key={slide.id}
              className={`accordion-panel ${isActive ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
              onMouseEnter={() => setActiveIdx(index)}
              onClick={() => setActiveIdx(index)}
            >
              <div className="accordion-overlay" />
              
              {/* Vertical Title for inactive state */}
              <div className="accordion-vertical-title">
                {slide.category}
              </div>

              {/* Expanded Content */}
              <div className="accordion-content">
                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div
                      className="accordion-content-inner"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
                    >
                      <div className="accordion-eyebrow">
                        <span className="accordion-diamond" />
                        <span>{slide.category}</span>
                      </div>
                      
                      <h1 className="accordion-title">{slide.title}</h1>
                      <p className="accordion-subtitle">{slide.subtitle}</p>
                      
                      <Link to="/booking" className="btn-primary hero-cta-btn accordion-btn">
                        <span>START YOUR STORY</span>
                        <ArrowRight size={16} />
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/918883621113"
        target="_blank"
        rel="noopener noreferrer"
        className="hero-whatsapp"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
};

export default HeroCarousel;