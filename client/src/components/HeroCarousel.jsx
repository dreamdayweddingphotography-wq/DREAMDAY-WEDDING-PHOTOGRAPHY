import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/effect-fade';
import './HeroCarousel.css';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=85',
    category: 'WEDDING CINEMA',
    title: 'TIMELESS\nMOMENTS',
    subtitle: 'Capturing the beauty of your love story with cinematic elegance and heartfelt artistry.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=85',
    category: 'DESTINATION',
    title: 'ENDLESS\nHORIZONS',
    subtitle: 'Breathtaking destination weddings captured in their most magical, golden moments.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=1800&q=85',
    category: 'MODERN EDITORIAL',
    title: 'ELEGANT\nSTORIES',
    subtitle: 'Focusing on the beauty of simplicity and the elegance of clean lines.',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1800&q=85',
    category: 'ROMANCE',
    title: 'FOREVER\nYOURS',
    subtitle: 'Every emotion, every detail, beautifully preserved for eternity.',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1800&q=85',
    category: 'LUXURY WEDDINGS',
    title: 'DREAM\nDAY',
    subtitle: 'Where luxury meets love — crafting unforgettable wedding memories.',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1800&q=85',
    category: 'BRIDAL PORTRAITS',
    title: 'RADIANT\nBEAUTY',
    subtitle: 'Turning the bride into a masterpiece of light, lace, and love.',
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1578774204375-826dc37d7309?auto=format&fit=crop&w=1800&q=85',
    category: 'CANDID',
    title: 'RAW\nEMOTION',
    subtitle: 'The magic of unposed moments — real, pure, and powerful.',
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1596791249761-ad8533604f14?auto=format&fit=crop&w=1800&q=85',
    category: 'HERITAGE',
    title: 'SACRED\nTRADITIONS',
    subtitle: 'Celebrating the rich traditions and vibrant colors of your heritage.',
  },
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1800&q=85',
    category: 'NATURE',
    title: 'GOLDEN\nHOUR',
    subtitle: 'Landscapes and love stories captured in the most inspiring light.',
  },
  {
    id: 10,
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1800&q=85',
    category: 'CELEBRATIONS',
    title: 'JOYFUL\nNIGHTS',
    subtitle: 'The warmth and energy of evening celebrations, beautifully preserved.',
  },
];

const HeroCarousel = () => {
  const swiperRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const current = slides[activeIdx];

  return (
    <div className="hero-wrap">

      {/* ── Background Image Slider ── */}
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, EffectFade, Navigation]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        speed={1600}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation={{ nextEl: '.hero-arrow-next', prevEl: '.hero-arrow-prev' }}
        className="hero-swiper"
        onSlideChange={(s) => setActiveIdx(s.realIndex)}
      >
        {slides.map((s) => (
          <SwiperSlide key={s.id}>
            <div className="hero-slide-img">
              <img src={s.image} alt={s.title.replace('\n', ' ')} />
              <div className="hero-scrim" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ── UI Layer ── */}
      <div className="hero-ui">

        {/* Top-right: Slide counter */}
        <div className="hero-counter">
          <AnimatePresence mode="wait">
            <motion.span
              key={`cnt-${activeIdx}`}
              className="hero-count-curr"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              O{activeIdx + 1}
            </motion.span>
          </AnimatePresence>
          <span className="hero-count-sep">/</span>
          <span className="hero-count-total">0{slides.length}</span>
        </div>

        {/* Center: Main content */}
        <div className="hero-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${activeIdx}`}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Category eyebrow */}
              <motion.div
                className="hero-eyebrow"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                <span className="hero-eyebrow-diamond" />
                <span className="hero-eyebrow-text">{current.category}</span>
                <span className="hero-eyebrow-diamond" />
              </motion.div>

              {/* Giant title */}
              <motion.h1
                className="hero-title"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                {current.title}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="hero-subtitle"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.7 }}
              >
                {current.subtitle}
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
              >
                <Link to="/booking" className="hero-cta">
                  <span>BOOK YOUR SESSION</span>
                  <span className="hero-cta-arrow"><ArrowRight size={16} /></span>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Side arrows */}
        <button className="hero-arrow hero-arrow-prev" aria-label="Previous slide">
          <ChevronLeft size={22} />
        </button>
        <button className="hero-arrow hero-arrow-next" aria-label="Next slide">
          <ChevronRight size={22} />
        </button>

        {/* Bottom: Dot pagination */}
        <div className="hero-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`hero-dot ${i === activeIdx ? 'hero-dot--active' : ''}`}
              onClick={() => swiperRef.current?.swiper.slideToLoop(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Right: Scroll indicator */}
        <div className="hero-scroll">
          <span className="hero-scroll-text">SCROLL</span>
          <span className="hero-scroll-line" />
        </div>

      </div>

      {/* WhatsApp floating button (fixed position, always visible) */}
      <a
        href="https://wa.me/919876543210"
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