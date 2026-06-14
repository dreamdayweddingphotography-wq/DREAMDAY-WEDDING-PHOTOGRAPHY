import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const navLinks = [
  { name: 'Home',          path: '/'          },
  { name: 'About Us',      path: '/about'     },
  { name: 'Gallery',       path: '/gallery'   },
  { name: 'Wedding Films', path: '/portfolio' },
  { name: 'Book Us',       path: '/booking'   },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => { setMenuOpen(false); }, [location]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Framer Motion variants for elegant menu links stagger load
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <>
      {/* ── Top Bar ── */}
      <nav className={[
        'nb-bar',
        scrolled || !isHome ? 'nb-bar--solid' : '',
        menuOpen ? 'nb-bar--open' : '',
      ].join(' ')}>
        <div className="nb-bar__inner">

          {/* Logo */}
          <Link to="/" className="nb-logo" onClick={() => setMenuOpen(false)}>
            <img src="/logo.png" alt="DREAMDAY" className="nb-logo__img" />
            <div className="nb-logo__text">
              <span className="nb-logo__name">DREAMDAY WEDDING PHOTOGRAPHY</span>
              <span className="nb-logo__sub">Photography</span>
            </div>
          </Link>

          {/* Hamburger Menu Toggle */}
          <button
            className={`nb-burger ${menuOpen ? 'nb-burger--active' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className="nb-burger__line" />
            <span className="nb-burger__line" />
            <span className="nb-burger__line" />
          </button>
        </div>
      </nav>

      {/* ── Backdrop ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="nb-backdrop nb-backdrop--visible"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Left/Right Drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: [0.76, 0, 0.24, 1], duration: 0.65 }}
            className="nb-drawer nb-drawer--open"
          >
            {/* Close button */}
            <button className="nb-drawer__close" onClick={() => setMenuOpen(false)}>
              <span className="nb-drawer__close-text">CLOSE</span>
              <span className="nb-drawer__close-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </span>
            </button>

            {/* Central content wrapper */}
            <div className="nb-drawer__content">
              <motion.nav 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="nb-drawer__nav"
              >
                {navLinks.map((link) => (
                  <motion.div key={link.path} variants={itemVariants}>
                    <Link
                      to={link.path}
                      className={`nb-drawer__link ${location.pathname === link.path ? 'nb-drawer__link--active' : ''}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                {/* Admin Link */}
                <motion.div variants={itemVariants}>
                  <Link 
                    to="/admin" 
                    className={`nb-drawer__admin ${location.pathname.startsWith('/admin') ? 'nb-drawer__admin--active' : ''}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <svg className="nb-drawer__lock-icon" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    <span>ADMIN</span>
                  </Link>
                </motion.div>
              </motion.nav>

              {/* Divider Line */}
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="nb-drawer__rule"
              />

              {/* Tagline */}
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="nb-drawer__tagline"
              >
                Artistic wedding photography company<br />in Coimbatore and Chennai.
              </motion.p>

              {/* Instagram Handle info */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="nb-drawer__social"
              >
                <p className="nb-drawer__social-label">INSTAGRAM</p>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="nb-drawer__social-link"
                >
                  @ TheLumoraWeddings
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;