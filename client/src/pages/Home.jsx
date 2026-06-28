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
  { initial: 'P', name: 'PRAVEEN KUMAR', text: 'Positive: Responsiveness, Quality, Professionalism, Value', color: '#111111' },
  { initial: 'M', name: 'MITHUN RAGU', text: 'Thank you for capturing our wedding memories so beautifully. The team was friendly, punctual, and incredibly talented. Every photo reflects genuine emotions and special moments. The editing quality and album design were excellent. We are extremely happy with the service and would highly recommend them to anyone looking for professional wedding photography.', color: '#111111' },
  { initial: 'S', name: 'SEKAR', text: 'We had an amazing experience with the photography team. From the initial discussion to the final delivery of photos and videos, everything was handled professionally. The team was punctual, friendly, and captured every special moment beautifully.', color: '#111111' },
  { initial: 'Y', name: 'YAMLIN FACTS', text: 'Positive: Quality, Value', color: '#111111' },
  { initial: 'N', name: 'NEGATIVE FILM', text: 'Exceptional photography service! The team was professional, creative, and easy to work with. They captured every important moment perfectly and delivered stunning photos. Highly recommended!', color: '#111111' },
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
              <p className="grid-label" style={{ marginTop: '28px', textAlign: 'center', fontWeight: '600', color: '#333333' }}>WEDDING EXPERIENCES</p>
            </motion.div>
            
            <motion.div {...vUp(0.2)} className="grid-item">
              <div className="scrapbook-polaroid" style={{ transform: 'rotate(1.5deg)' }}>
                <div className="scrapbook-tape"></div>
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80" alt="Outdoor" />
                <span className="scrapbook-caption">Moments under Open Skies</span>
              </div>
              <p className="grid-label" style={{ marginTop: '28px', textAlign: 'center', fontWeight: '600', color: '#333333' }}>OUTDOOR STORIES</p>
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
        <div className="pg-container" style={{ marginTop: '60px', marginBottom: '40px' }}>
          <div className="ig-theme-container">
            {/* Instagram Profile Header */}
            <div className="ig-profile-header">
              <div className="ig-profile-pic-col">
                <div className="ig-story-ring-none">
                  <div className="ig-profile-pic">
                    {/* Placeholder image, representing the profile pic in screenshot */}
                    <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80" alt="Dreamday Profile" />
                  </div>
                </div>
              </div>
              
              <div className="ig-profile-info-col">
                <div className="ig-username-row">
                  <h2 className="ig-ig-username">dreamday_weddingphotography</h2>
                  <svg aria-label="Options" color="var(--text-primary)" fill="var(--text-primary)" height="24" role="img" viewBox="0 0 24 24" width="24" style={{ cursor: 'pointer', marginLeft: '8px' }}><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
                </div>
                
                <div className="ig-stats-row">
                  <div className="ig-stat"><strong>556</strong> posts</div>
                  <div className="ig-stat"><strong>9,097</strong> followers</div>
                  <div className="ig-stat"><strong>242</strong> following</div>
                </div>
                
                <div className="ig-bio">
                  <span className="ig-bio-name">DREAMDAY WEDDING PHOTOGRAPHY</span>
                  <span className="ig-bio-category">Photographer</span>
                  <p className="ig-bio-text">
                    CANDID-WEDDING | PRE-POST WEDDING | MATERNITY<br/>
                    Premium Wedding Photography & Cinematography<br/>
                    Ring us: +918883621113... more
                  </p>
                  <a href="#" className="ig-bio-link">
                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                    youtube.com/@dreamdayraja?si=ycmJV9xReZZZ1cHN
                  </a>
                </div>

                <div className="ig-large-actions">
                  <a href="https://www.instagram.com/dreamday_weddingphotography/" target="_blank" rel="noopener noreferrer" className="ig-btn-primary ig-btn-large">Follow</a>
                  <a href="https://www.instagram.com/direct/t/100395641365204/" target="_blank" rel="noopener noreferrer" className="ig-btn-secondary ig-btn-large">Message</a>
                </div>
              </div>
            </div>

            {/* Instagram Tabs */}
            <div className="ig-profile-tabs">
              <div className="ig-tab ig-tab-active">
                <svg aria-label="Posts" color="currentColor" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><rect fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="18" x="3" y="3"></rect><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="9.015" x2="9.015" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="14.985" x2="14.985" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="9.015" y2="9.015"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="14.985" y2="14.985"></line></svg>
                <span>POSTS</span>
              </div>
              <div className="ig-tab">
                <svg aria-label="Reels" color="currentColor" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><line fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" x1="2.049" x2="21.95" y1="7.002" y2="7.002"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="13.504" x2="16.362" y1="2.001" y2="7.002"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="7.207" x2="10.002" y1="2.11" y2="7.002"></line><path d="M2 12.001v3.449c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45v-3.449c0-2.849-.698-4.006-1.606-4.945C19.454 6.146 18.3 5.448 15.45 5.448H8.552c-2.848 0-4.006.699-4.946 1.608C2.698 8.005 2 9.152 2 12.001Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><path d="M9.763 17.664a.908.908 0 0 1-.454-.787V11.63a.909.909 0 0 1 1.364-.788l4.545 2.624a.909.909 0 0 1 0 1.575l-4.545 2.624a.91.91 0 0 1-.91 0Z" fillRule="evenodd"></path></svg>
                <span>REELS</span>
              </div>
              <div className="ig-tab">
                <svg aria-label="Tagged" color="currentColor" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><path d="M10.201 3.797 12 1.997l1.799 1.8a1.59 1.59 0 0 0 1.124.465h5.259A1.818 1.818 0 0 1 22 6.08v14.104a1.818 1.818 0 0 1-1.818 1.818H3.818A1.818 1.818 0 0 1 2 20.184V6.08a1.818 1.818 0 0 1 1.818-1.818h5.26a1.59 1.59 0 0 0 1.123-.465Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><path d="M18.598 22.002V21.4a3.949 3.949 0 0 0-3.948-3.949H9.495A3.949 3.949 0 0 0 5.546 21.4v.603" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><circle cx="12.072" cy="11.075" fill="none" r="3.556" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle></svg>
                <span>TAGGED</span>
              </div>
            </div>

            {/* Instagram Grid (Perfect 3-column squares) */}
            <div className="ig-photo-grid">
              {[...row1, ...row2].slice(0, 6).map((src, i) => (
                <a 
                  key={i} 
                  href="https://www.instagram.com/dreamday_weddingphotography/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="ig-grid-item"
                >
                  <img src={src} alt={`Instagram capture ${i + 1}`} />
                  <div className="ig-grid-overlay">
                    <div className="ig-overlay-stats">
                      <div className="ig-overlay-stat">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                        <span>{Math.floor(Math.random() * 500) + 100}</span>
                      </div>
                      <div className="ig-overlay-stat">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z"/></svg>
                        <span>{Math.floor(Math.random() * 50) + 5}</span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Kind Words (Google Widget Style) ── */}
      <section className="home-section reviews-section google-widget-section">
        <div className="pg-container">
          <motion.div {...vUp(0)} className="reviews-header" style={{ marginBottom: '40px' }}>
            <h2 className="reviews-title" style={{ textAlign: 'center' }}>Kind Words</h2>
          </motion.div>

          <motion.div {...vUp(0.2)} className="google-reviews-container">
            {/* Fixed Summary Card on the Left */}
            <div className="google-summary-card">
              <div className="summary-top">
                <div className="summary-logo">DW</div>
                <div className="summary-info">
                  <h3>Dreamday Wedding Photography</h3>
                  <div className="summary-rating-row">
                    <span className="summary-score">5.0</span>
                    <div className="google-stars">
                      ★★★★★
                    </div>
                  </div>
                  <span className="summary-count">5 Google reviews</span>
                </div>
              </div>
              <a 
                href="https://www.google.com/maps/place/DREAMDAY+WEDDING+PHOTOGRAPHY/@11.0188648,76.9551384,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba85943a8c48c9f:0xce215e2f7a9dfbbe!8m2!3d11.0188595!4d76.9577133!16s%2Fg%2F11lkj34ryh?entry=ttu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="summary-write-btn"
              >
                Write a review
              </a>
            </div>

            {/* Moving Carousel on the Right */}
            <div className="google-carousel-wrapper">
              <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 1, spaceBetween: 20 },
                  768: { slidesPerView: 2, spaceBetween: 20 },
                  1280: { slidesPerView: 3, spaceBetween: 24 },
                }}
                className="google-swiper"
              >
                {/* Review Cards */}
                {reviews.filter(r => !r.isSummary).map((rev, i) => {
                  const colors = ['#7b1fa2', '#c62828', '#f57c00', '#388e3c', '#1976d2'];
                  const avatarColor = colors[i % colors.length];

                  return (
                    <SwiperSlide key={i} className="google-slide">
                      <div className="google-review-card">
                        <div className="google-card-header">
                          <div className="google-avatar" style={{ backgroundColor: avatarColor }}>{rev.initial}</div>
                          <div className="google-author-info">
                            <h4>{rev.name}</h4>
                            <span>Recent</span>
                          </div>
                          <div className="google-g-icon">
                            <svg viewBox="0 0 24 24" width="16" height="16">
                              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                          </div>
                        </div>
                        
                        <div className="google-card-rating">
                          <div className="google-stars">★★★★★</div>
                          <svg className="google-verified-icon" viewBox="0 0 24 24" width="14" height="14">
                             <path fill="#1976d2" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                          </svg>
                        </div>
                        
                        <p className="google-review-text">{rev.text}</p>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
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