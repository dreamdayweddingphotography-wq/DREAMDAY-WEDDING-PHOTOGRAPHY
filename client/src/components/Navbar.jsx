import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const navLinks = [
  { name: 'Home',      path: '/'          },
  { name: 'About Us',  path: '/about'     },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Gallery',   path: '/gallery'   },
  { name: 'Enquire',   path: '/booking'   },
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

          {/* Hamburger */}
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
      <div
        className={`nb-backdrop ${menuOpen ? 'nb-backdrop--visible' : ''}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* ── Right Drawer ── */}
      <div className={`nb-drawer ${menuOpen ? 'nb-drawer--open' : ''}`}>

        {/* Close button */}
        <button className="nb-drawer__close" onClick={() => setMenuOpen(false)}>
          <span className="nb-drawer__close-text">CLOSE</span>
          <span className="nb-drawer__close-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </span>
        </button>

        {/* Nav Links */}
        <nav className="nb-drawer__nav">
          {navLinks.map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nb-drawer__link ${location.pathname === link.path ? 'nb-drawer__link--active' : ''}`}
              style={{ transitionDelay: menuOpen ? `${i * 0.06 + 0.1}s` : '0s' }}
              onClick={() => setMenuOpen(false)}
            >
              <span className="nb-drawer__link-num">0{i + 1}</span>
              <span className="nb-drawer__link-name">{link.name}</span>
              <span className="nb-drawer__link-arrow">→</span>
            </Link>
          ))}
        </nav>
        {/* Decorative Watermark */}
        <div className="nb-drawer__watermark">DREAMDAY</div>

      </div>
    </>
  );
};

export default Navbar;