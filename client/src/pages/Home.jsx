import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode } from 'swiper/modules';
import HeroCarousel from '../components/HeroCarousel';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import './Home.css';

const vUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] },
});

const reviews = [
  { isSummary: true, name: 'DREAMDAY WEDDING PHOTOGRAPHY', rating: '5.0', total: '5 Google reviews' },
  { initial: 'K', name: 'KARTHIK M', text: 'Excellent studio with a great environment and professional setup. Friendly service and attention to detail make it a wonderful experience. Highly recommended!', color: '#A44A4A' },
  { initial: 'P', name: 'PRABAVATHI M', text: 'Excellent service and stunning wedding photography. DREAMDAY WEDDING PHOTOGRAPHY captured every moment beautifully. Highly recommended!', color: '#A44A4A' },
  { initial: 'J', name: 'JOTHIKA J', text: 'A friendly cameraman and excellent photography skills that make you feel comfortable. The output was stunning!', color: '#A44A4A' },
  { initial: 'S', name: 'SURESH K', text: 'Very professional team. They captured all the right moments without being intrusive. The album quality is top notch.', color: '#A44A4A' },
];

const row1 = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=400&q=80',
];
const row2 = [
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1505934333218-8fe21ff8cece?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1533148301552-09411f185c15?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1578774204375-826dc37d7309?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=400&q=80',
];

const StarRating = () => (
  <div className="star-rating">
    {[1,2,3,4,5].map(i => <span key={i}>★</span>)}
  </div>
);

const instaContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    }
  }
};

const instaItemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const ruleLeftVariants = {
  hidden: { scaleX: 0, originX: 1 },
  visible: { scaleX: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

const ruleRightVariants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: { scaleX: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

const Home = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="home-wrapper paper-texture">
      {/* ── Full-screen hero ── */}
      <HeroCarousel />

      {/* ── 1. Introduction & 2-Column Grid ── */}
      <section className="home-section intro-section">
        <div className="pg-container">
          <motion.div {...vUp(0)} className="intro-header">
            <h2 className="intro-title">YOUR LOVE, OUR PASSION,<br/>TIMELESS FRAMES</h2>
            <p className="intro-desc">
              Welcome to DREAMDAY WEDDING PHOTOGRAPHY, where elegance meets emotion. We specialize in capturing weddings
              with a refined, cinematic approach that transforms fleeting moments into timeless memories. Your wedding is not
              just a day—it's a masterpiece of love, and we are here to preserve it with grace and artistry.
            </p>
          </motion.div>

          <div className="intro-grid">
            <motion.div {...vUp(0.1)} className="grid-item">
              <div className="scrapbook-polaroid">
                <div className="scrapbook-tape"></div>
                <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80" alt="Wedding" />
                <span className="scrapbook-caption">A Celebration of Love</span>
              </div>
              <p className="grid-label" style={{ marginTop: '28px', textAlign: 'center', fontWeight: '600', color: '#8B3A3A' }}>WEDDING EXPERIENCES</p>
            </motion.div>
            
            <motion.div {...vUp(0.2)} className="grid-item">
              <div className="scrapbook-polaroid" style={{ transform: 'rotate(1.5deg)' }}>
                <div className="scrapbook-tape"></div>
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80" alt="Outdoor" />
                <span className="scrapbook-caption">Moments under Open Skies</span>
              </div>
              <p className="grid-label" style={{ marginTop: '28px', textAlign: 'center', fontWeight: '600', color: '#8B3A3A' }}>OUTDOOR STORIES</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 2. Instagram Clean Strip ── */}
      <section className="home-section instagram-clean-section" style={{ paddingBottom: '0', overflow: 'hidden' }}>
        <div className="container">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="insta-clean-header"
          >
            <motion.div variants={ruleLeftVariants} className="insta-clean-rule"></motion.div>
            <div className="insta-clean-center">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="insta-clean-icon"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </motion.div>
              <p className="insta-clean-label">Follow our journey</p>
              <h2 className="insta-clean-handle">@dreamday_weddingphotography</h2>
            </div>
            <motion.div variants={ruleRightVariants} className="insta-clean-rule"></motion.div>
          </motion.div>
        </div>

        <motion.div 
          variants={instaContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="insta-strip"
        >
          {row1.map((src, i) => (
            <motion.a 
              key={i} 
              variants={instaItemVariants}
              href="https://www.instagram.com/dreamday_weddingphotography/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="insta-strip-item"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                opacity: hoveredIndex !== null && hoveredIndex !== i ? 0.55 : 1,
                transform: hoveredIndex === i ? 'scale(1.025)' : 'scale(1)',
                transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                zIndex: hoveredIndex === i ? 10 : 1,
              }}
            >
              <div className="insta-strip-img">
                <img src={src} alt={`Instagram capture ${i + 1}`} />
                <div className="insta-strip-hover">
                  <div className="insta-strip-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  </div>
                </div>
              </div>
              <p className="insta-strip-tag">#dreamdaywedding</p>
            </motion.a>
          ))}
        </motion.div>

        <div className="container">
          <motion.div {...vUp(0.2)} className="insta-clean-footer">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              href="https://www.instagram.com/dreamday_weddingphotography/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="insta-clean-btn"
            >
              Follow on Instagram
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ── 3. Kind Words ── */}
      <section className="home-section reviews-section bg-alt">
        <div className="pg-container">
          <motion.div {...vUp(0)} className="reviews-header">
            <h2 className="reviews-title">KIND WORDS</h2>
          </motion.div>

          <motion.div {...vUp(0.2)} className="reviews-carousel-wrapper">
            <Swiper
              modules={[Pagination]}
              pagination={{ clickable: true }}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              className="reviews-swiper"
            >
              {reviews.map((rev, i) => (
                <SwiperSlide key={i} className="review-slide">
                  {rev.isSummary ? (
                    <div className="review-card summary-card">
                      <div className="review-logo-placeholder">DREAMDAY</div>
                      <h4 className="review-brand-name">{rev.name}</h4>
                      <div className="summary-rating-row">
                        <span className="summary-score">{rev.rating}</span>
                        <StarRating />
                      </div>
                      <p className="summary-total">{rev.total}</p>
                      <button className="write-review-btn">Write a review</button>
                    </div>
                  ) : (
                    <div className="review-card">
                      <div className="review-author-row">
                        <div className="review-avatar" style={{ backgroundColor: rev.color }}>{rev.initial}</div>
                        <div className="review-meta">
                          <h4 className="review-name">{rev.name}</h4>
                          <p className="review-date">Recent</p>
                        </div>
                        <div className="review-google-icon">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" width="16" />
                        </div>
                      </div>
                      <div className="review-stars-row">
                        <StarRating />
                      </div>
                      <p className="review-text">{rev.text}</p>
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </section>

      {/* ── 4. CTA Banner ── */}
      <section className="home-section cta-section">
        <div className="pg-container">
          <motion.div {...vUp(0)} className="cta-banner">
            <h2 className="cta-title">Ready to capture your story?</h2>
            <p className="cta-desc">Book a consultation today and let's discuss your vision.</p>
            <Link to="/booking" className="cta-btn">ENQUIRE NOW</Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;