import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
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

const defaultHomeCards = [
    { id: 1, category: 'WEDDING', title: 'A Celebration of Love & Traditions', image: '/images/Wedding CC/VINESH MANJUBASHINI- KONGU WEDDING/DWP_0005.jpg', link: '/gallery/wedding/vinesh-manjubashini-kongu-wedding' },
    { id: 2, category: 'RECEPTION', title: 'Moments of joy, laughter, and togetherness.', image: '/images/RECEPTION CC/RAVI KARISMA- KONGU RECEPTION/DWP_0009.jpg', link: '/gallery/reception/ravi-karisma-kongu-reception' },
    { id: 3, category: 'CEREMONY', title: 'Celebrating the miracle of life and traditions.', image: '/images/Cermony CC/VIKASHINI SAREE CEREMONY/DWP_1272.JPG', link: '/gallery/ceremony/vikashini-saree-ceremony' },
    { id: 4, category: 'OUTDOOR SHOOT', title: 'The Promise of Always — Framed under open skies.', image: '/images/OUTDOOR CC/SANTHOSH EMILIYA/DWP_1129.JPG', link: '/gallery/outdoor/santhosh-emiliya' }
];

const row1 = [
  '/images/Wedding CC/VIJAY JEEVITHA- KONGU WEDDING/DWP_0007.jpg',
  '/images/RECEPTION CC/RAVI KARISMA- KONGU RECEPTION/DWP_0006.JPG',
  '/images/Cermony CC/VIKASHINI SAREE CEREMONY/DWP_1277.JPG',
  '/images/OUTDOOR CC/SANTHOSH EMILIYA/DWP_0892.JPG',
  '/images/Wedding CC/VINESH MANJUBASHINI- KONGU WEDDING/DWP_0010.jpg',
  '/images/RECEPTION CC/SAGAPTHA AISHWARYA RECEPTION/DWP_0113.JPG',
];
const row2 = [
  '/images/OUTDOOR CC/SANTHOSH EMILIYA/DWP_1147.JPG',
  '/images/Wedding CC/VIJAY JEEVITHA- KONGU WEDDING/IMG_2501.jpg',
  '/images/Cermony CC/VIKASHINI SAREE CEREMONY/DWP_1532.JPG',
  '/images/RECEPTION CC/RAVI KARISMA- KONGU RECEPTION/DWP_0003.JPG',
  '/images/Wedding CC/VINESH MANJUBASHINI- KONGU WEDDING/DWP_0008.jpg',
  '/images/OUTDOOR CC/SANTHOSH EMILIYA/DWP_1348.JPG',
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
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [homeCards, setHomeCards] = useState(defaultHomeCards);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const saved = localStorage.getItem('dwp_home_cards_v2');
    if (saved) {
      try {
        setHomeCards(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse home cards");
      }
    }
  }, []);

  // Elfsight Badge Remover (MutationObserver to handle dynamic rendering)
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      // Look for the Elfsight free widget badge text and remove it
      const allLinks = document.querySelectorAll('a');
      allLinks.forEach(link => {
        if (link.innerText && link.innerText.includes('Free Instagram Feed Widget')) {
          link.style.display = 'none';
          link.style.opacity = '0';
          link.style.pointerEvents = 'none';
        }
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-wrapper paper-texture">
      {/* ── Full-screen hero ── */}
      <HeroCarousel />

      {/* ── 1. Introduction & Arch Triptych Layout ── */}
      <section className="home-section intro-section">
        <div className="pg-container">
          <div className="intro-triptych-layout">
            
            <motion.div {...vUp(0)} className="triptych-header">
              <h4 className="intro-subtitle" style={{ textAlign: 'center' }}>Welcome to</h4>
              <h2 className="intro-title" style={{ textAlign: 'center' }}>
                <span className="title-line1">YOUR LOVE, OUR PASSION,</span>
                <br/>
                <span className="title-script">Timeless Frames</span>
              </h2>
            </motion.div>

            <div className="four-card-cross-layout">
              {/* Left Column (1 card vertically centered) */}
              <div className="cross-col cross-col-side">
                {homeCards[0] && (
                  <motion.div {...vUp(0.2)} className="rect-card" onClick={() => navigate(homeCards[0].link || '/gallery')} style={{ cursor: 'pointer' }}>
                    <img src={homeCards[0].image} alt={homeCards[0].category} />
                    <div className="card-info">
                      <h3>{homeCards[0].title}</h3>
                      <p>{homeCards[0].category}</p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Middle Column (2 cards stacked) */}
              <div className="cross-col cross-col-mid">
                {homeCards[1] && (
                  <motion.div {...vUp(0.4)} className="rect-card" onClick={() => navigate(homeCards[1].link || '/gallery')} style={{ cursor: 'pointer' }}>
                    <img src={homeCards[1].image} alt={homeCards[1].category} />
                    <div className="card-info">
                      <h3>{homeCards[1].title}</h3>
                      <p>{homeCards[1].category}</p>
                    </div>
                  </motion.div>
                )}
                {homeCards[2] && (
                  <motion.div {...vUp(0.6)} className="rect-card" onClick={() => navigate(homeCards[2].link || '/gallery')} style={{ cursor: 'pointer' }}>
                    <img src={homeCards[2].image} alt={homeCards[2].category} />
                    <div className="card-info">
                      <h3>{homeCards[2].title}</h3>
                      <p>{homeCards[2].category}</p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Right Column (1 card vertically centered) */}
              <div className="cross-col cross-col-side">
                {homeCards[3] && (
                  <motion.div {...vUp(0.8)} className="rect-card" onClick={() => navigate(homeCards[3].link || '/gallery')} style={{ cursor: 'pointer' }}>
                    <img src={homeCards[3].image} alt={homeCards[3].category} />
                    <div className="card-info">
                      <h3>{homeCards[3].title}</h3>
                      <p>{homeCards[3].category}</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            <motion.div {...vUp(0.8)} className="triptych-footer">
              <div className="intro-separator" style={{ margin: '0 auto 30px' }}></div>
              <p className="intro-desc-center">
                Welcome to <span style={{ color: 'var(--accent-color)', fontWeight: 500 }}>DREAMDAY WEDDING PHOTOGRAPHY</span>, where elegance meets emotion. We specialize in capturing weddings
                with a refined, cinematic approach that transforms fleeting moments into timeless memories. Your wedding is not
                just a day—it's a masterpiece of love, and we are here to preserve it with grace and artistry.
              </p>
              
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
        <div className="pg-container" style={{ marginTop: '30px', marginBottom: '20px', position: 'relative' }}>
          <div className="elfsight-app-cc9a5b7c-0e8a-4870-b1a7-00155536efc4" data-elfsight-app-lazy></div>
          
          {/* Cover for the Free Badge */}
          <div style={{
            position: 'absolute',
            bottom: '-10px',
            left: '0',
            width: '100%',
            height: '60px',
            backgroundColor: 'var(--bg-primary)',
            zIndex: 9999,
            pointerEvents: 'none'
          }}></div>
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