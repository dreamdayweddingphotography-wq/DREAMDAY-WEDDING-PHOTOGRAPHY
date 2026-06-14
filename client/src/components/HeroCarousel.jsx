import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/effect-fade';
import './HeroCarousel.css';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1800&q=85',
    titleTop: 'THE',
    titleBottom: 'STORY',
    word: 'WEDDING',
    tag: '01 — WEDDING CINEMA',
    year: '2024',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1800&q=85',
    titleTop: 'ENDLESS',
    titleBottom: 'HORIZONS',
    word: 'DESTINATION',
    tag: '02 — DESTINATION',
    year: '2024',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=1800&q=85',
    titleTop: 'MODERN',
    titleBottom: 'EDITORIAL',
    word: 'FASHION',
    tag: '03 — FASHION & ART',
    year: '2024',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1578774204375-826dc37d7309?auto=format&fit=crop&w=1800&q=85',
    titleTop: 'TIMELESS',
    titleBottom: 'MOMENTS',
    word: 'ROMANCE',
    tag: '04 — ROMANCE',
    year: '2024',
  },
];

const HeroCarousel = () => {
  const swiperRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const current = slides[activeIdx];

  return (
    <div className="mg-wrapper">

      {/* ── Background Image Slider ── */}
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, EffectFade, Navigation]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        speed={1600}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        navigation={{ nextEl: '.mg-btn-next', prevEl: '.mg-btn-prev' }}
        className="mg-swiper"
        onSlideChange={(s) => setActiveIdx(s.realIndex)}
      >
        {slides.map((s) => (
          <SwiperSlide key={s.id}>
            <div className="mg-slide-img">
              <img src={s.image} alt={s.titleTop} />
              <div className="mg-scrim" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ── UI Layer ── */}
      <div className="mg-ui">

        {/* TOP BAR */}
        <div className="mg-top-bar">
          <AnimatePresence mode="wait">
            <motion.span
              key={`tag-${activeIdx}`}
              className="mg-slide-tag"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {current.tag}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* GIANT TITLE — TOP LINE */}
        <div className="mg-title-area">
          <AnimatePresence mode="wait">
            <motion.div
              key={`title-${activeIdx}`}
              className="mg-title-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mg-title-top-row">
                <motion.span
                  className="mg-title-outline"
                  initial={{ x: -80, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  {current.titleTop}
                </motion.span>
                <motion.span
                  className="mg-title-divider-line"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                />
                <motion.span
                  className="mg-center-word"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                >
                  {current.word}
                </motion.span>
              </div>
              <motion.span
                className="mg-title-filled"
                initial={{ x: 80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                {current.titleBottom}
              </motion.span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* BOTTOM BAR */}
        <div className="mg-bottom-bar">

          {/* Left: CTA */}
          <div className="mg-bottom-left">
            <Link to="/portfolio" className="mg-cta">
              <span>Explore Collection</span>
              <span className="mg-cta-icon"><ArrowRight size={16} /></span>
            </Link>
            <p className="mg-tagline">Wedding · Portraits · Destination</p>
          </div>

          {/* Center: Thin decorative rule */}
          <div className="mg-center-rule">
            <div className="mg-rule-line" />
            <div className="mg-rule-diamond" />
            <div className="mg-rule-line" />
          </div>

          {/* Right: Counter + Nav */}
          <div className="mg-bottom-right">
            <div className="mg-nav-group">
              <button className="mg-btn-prev mg-nav-btn" aria-label="Previous">
                <ArrowLeft size={17} />
              </button>
              <div className="mg-counter">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`n-${activeIdx}`}
                    className="mg-count-curr"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    {String(activeIdx + 1).padStart(2, '0')}
                  </motion.span>
                </AnimatePresence>
                <span className="mg-count-total">/{String(slides.length).padStart(2, '0')}</span>
              </div>
              <button className="mg-btn-next mg-nav-btn" aria-label="Next">
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </div>

        {/* Vertical dots indicator */}
        <div className="mg-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`mg-dot ${i === activeIdx ? 'mg-dot--active' : ''}`}
              onClick={() => swiperRef.current?.swiper.slideTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default HeroCarousel;