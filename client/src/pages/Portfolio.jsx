import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Film } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Portfolio.css';

const filmsData = [
  {
    id: 'lHwBpa4dIcI',
    number: '01',
    title: 'DHANUSH ❤️ ELLAKKIYA',
    category: 'PRE WEDDING',
    filter: 'SAVE THE DATE'
  },
  {
    id: 'SY5HNPPhfrA',
    number: '02',
    title: 'DHANUSH ❤️ ELLAKKIYA',
    category: 'KERALA PRE WEDDING',
    filter: 'SAVE THE DATE'
  },
  {
    id: 'ahEiQds4o2E',
    number: '03',
    title: 'VIHASHINI',
    category: 'SAREE CEREMONY',
    filter: 'WEDDING & RECEPTION'
  },
  {
    id: 'VfGrPXj-XOw',
    number: '04',
    title: 'VIJAI ❤️ JEEVITHA',
    category: 'A GRAND KONGU WEDDING',
    filter: 'WEDDING & RECEPTION'
  },
  {
    id: 'XvZaTr2ODk0',
    number: '05',
    title: 'SANTHOSH BABU ❤️ JASMINE VINCY',
    category: 'GRAND CHRISTIAN WEDDING',
    filter: 'WEDDING & RECEPTION'
  }
];

const filters = ['ALL', 'SAVE THE DATE', 'WEDDING & RECEPTION', 'BABYSHOWER & MATERNITY'];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [activeFilmId, setActiveFilmId] = useState(filmsData[0].id);
  const [shouldAutoplay, setShouldAutoplay] = useState(false);

  const filteredFilms = activeFilter === 'ALL' 
    ? filmsData 
    : filmsData.filter(film => film.filter === activeFilter);
    
  const activeFilm = filmsData.find(f => f.id === activeFilmId) || filmsData[0];

  const handleFilterChange = (f) => {
    setActiveFilter(f);
    setShouldAutoplay(false);
    const newFiltered = f === 'ALL' ? filmsData : filmsData.filter(film => film.filter === f);
    if (newFiltered.length > 0) {
      setActiveFilmId(newFiltered[0].id);
    }
  };

  return (
    <div className="wf-page">
      {/* Hero Section */}
      <section className="wf-hero">
        <motion.div 
          className="wf-hero-inner"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="wf-eyebrow">
            <span></span>
            <p>VISUAL NARRATIVE</p>
            <span></span>
          </div>
          <h1 className="wf-title">Wedding <em>Films</em></h1>
          <p className="wf-subtitle">
            Cinematic storytelling that captures the essence of your love,<br/>
            preserving every heartbeat and whispered promise in motion.
          </p>
        </motion.div>
      </section>

      {/* Filter Section */}
      <section className="wf-filter-section">
        <h3 className="wf-filter-heading">Explore Our Films</h3>
        <div className="wf-filters">
          {filters.map(f => (
            <button 
              key={f}
              className={`wf-filter-btn ${activeFilter === f ? 'active' : ''}`}
              onClick={() => handleFilterChange(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Cinematic Theater Section */}
      <section className="wf-theater-section">
        <div className="wf-container">
          
          {/* Main Spotlight */}
          <div className="wf-spotlight">
            <div className="wf-spotlight-video">
              <iframe
                src={`https://www.youtube.com/embed/${activeFilm.id}?rel=0&modestbranding=1${shouldAutoplay ? '&autoplay=1' : ''}`}
                title={activeFilm.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <div className="wf-spotlight-info">
              <h2 className="wf-spotlight-title">{activeFilm.title}</h2>
              <div className="wf-spotlight-meta">
                <span className="wf-spotlight-number">{activeFilm.number}</span>
                <span className="wf-spotlight-divider"></span>
                <span className="wf-spotlight-category">{activeFilm.category}</span>
              </div>
            </div>
          </div>

          {/* Film Strip Gallery */}
          <div className="wf-film-strip-container">
            <h4 className="wf-strip-heading">More Films</h4>
            <div className="wf-film-strip">
              <AnimatePresence mode="popLayout">
                {filteredFilms.map((film, i) => (
                  <motion.div 
                    layout
                    key={film.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: (i % 6) * 0.1 }}
                    className={`wf-strip-card ${activeFilmId === film.id ? 'active' : ''}`}
                    onClick={() => {
                      setActiveFilmId(film.id);
                      setShouldAutoplay(true);
                      window.scrollTo({ top: document.querySelector('.wf-theater-section').offsetTop - 100, behavior: 'smooth' });
                    }}
                  >
                    <div className="wf-strip-thumb">
                      <img 
                        src={`https://img.youtube.com/vi/${film.id}/hqdefault.jpg`} 
                        alt={film.title} 
                      />
                      <div className="wf-strip-overlay">
                        <Play fill="white" size={20} />
                      </div>
                    </div>
                    <div className="wf-strip-info">
                      <h3 className="wf-strip-title">{film.title}</h3>
                      <p className="wf-strip-category">{film.category}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="wf-cta-section">
        <div className="wf-container">
          <div className="wf-cta-card">
            <p className="wf-cta-eyebrow">YOUR LOVE STORY</p>
            <h2 className="wf-cta-title">Ready for your cinematic journey?</h2>
            <p className="wf-cta-text">
              We don't just record events; we craft an immersive cinematic experience that lets you<br/>
              relive the magic, the tears, and the joy of your most treasured moments forever.
            </p>
            <a 
              href="https://www.youtube.com/@dreamdayraja" 
              target="_blank" 
              rel="noopener noreferrer"
              className="wf-cta-btn youtube-btn"
            >
              <Play fill="white" size={16} style={{ marginRight: '8px' }} /> SUBSCRIBE ON YOUTUBE
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;