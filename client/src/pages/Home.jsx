import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import HeroCarousel from '../components/HeroCarousel';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
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
  { initial: 'P', name: 'PRAVEEN KUMAR', text: 'Positive: Responsiveness, Quality, Professionalism, Value', color: '#A44A4A' },
  { initial: 'M', name: 'MITHUN RAGU', text: 'Thank you for capturing our wedding memories so beautifully. The team was friendly, punctual, and incredibly talented. Every photo reflects genuine emotions and special moments. The editing quality and album design were excellent. We are extremely happy with the service and would highly recommend them to anyone looking for professional wedding photography.', color: '#A44A4A' },
  { initial: 'S', name: 'SEKAR', text: 'We had an amazing experience with the photography team. From the initial discussion to the final delivery of photos and videos, everything was handled professionally. The team was punctual, friendly, and captured every special moment beautifully.', color: '#A44A4A' },
  { initial: 'Y', name: 'YAMLIN FACTS', text: 'Positive: Quality, Value', color: '#A44A4A' },
  { initial: 'N', name: 'NEGATIVE FILM', text: 'Exceptional photography service! The team was professional, creative, and easy to work with. They captured every important moment perfectly and delivered stunning photos. Highly recommended!', color: '#A44A4A' },
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

        <div className="reel-track-wrap reel-track-wrap--fade" style={{ marginTop: '40px' }}>
          <div className="reel-track reel-track--left">
            {[...row1, ...row2, ...row1, ...row2].map((src, i) => (
              <a 
                key={i} 
                href="https://www.instagram.com/dreamday_weddingphotography/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="reel-card"
              >
                <img src={src} alt={`Instagram capture ${i + 1}`} />
                <div className="reel-card-overlay">
                  <div className="insta-strip-icon" style={{ transform: 'scale(1)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

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

      {/* ── 3. Kind Words (Glassmorphic Parallax) ── */}
      <section 
        className="home-section reviews-section parallax-reviews"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1920&q=80')` }}
      >
        <div className="parallax-overlay"></div>
        <div className="pg-container relative-z">
          <motion.div {...vUp(0)} className="reviews-header parallax-header">
            <span className="editorial-eyebrow light-eyebrow">HEARTFELT EXPERIENCES</span>
            <h2 className="reviews-title light-title">Kind Words</h2>
          </motion.div>

          <motion.div {...vUp(0.2)} className="glass-carousel-wrapper">
            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              spaceBetween={40}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="glass-swiper"
            >
              {reviews.filter(r => !r.isSummary).map((rev, i) => (
                <SwiperSlide key={i} className="glass-slide">
                  <div className="glass-review-card">
                    <div className="glass-stars">★★★★★</div>
                    <p className="glass-review-text">"{rev.text}"</p>
                    <div className="glass-review-author">
                      <div className="glass-avatar">{rev.initial}</div>
                      <div className="glass-author-meta">
                        <h4>{rev.name}</h4>
                        <span>Google Review</span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="editorial-google-link">
              <a 
                href="https://www.google.com/maps/place/DREAMDAY+WEDDING+PHOTOGRAPHY/@11.0188648,76.9551384,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba85943a8c48c9f:0xce215e2f7a9dfbbe!8m2!3d11.0188595!4d76.9577133!16s%2Fg%2F11lkj34ryh?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-read-reviews"
              >
                Read all our 5-Star Reviews
              </a>
              <a 
                href="https://www.google.com/maps/place/DREAMDAY+WEDDING+PHOTOGRAPHY/@11.0188648,76.9551384,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba85943a8c48c9f:0xce215e2f7a9dfbbe!8m2!3d11.0188595!4d76.9577133!16s%2Fg%2F11lkj34ryh?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-write-review"
              >
                Write a Review
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 4. CTA Banner ── */}
      <section className="home-section cta-section">
        <div className="pg-container">
          <motion.div {...vUp(0)} className="cta-banner">
            <h2 className="cta-title">Ready to capture your story?</h2>
            <p className="cta-desc">Book a consultation today and let's discuss your vision.</p>
            <Link to="/booking" className="cta-btn">START YOUR STORY</Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;