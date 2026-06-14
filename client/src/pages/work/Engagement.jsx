import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import './WorkPages.css';

const viewFadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
});

const Engagement = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const heroImage = 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1920&q=90';

  const photos = [
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1533148301552-09411f185c15?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1522673607200-1648832cee98?auto=format&fit=crop&w=800&q=80',
  ];

  const rowMoments = [
    { title: 'The First Glance', desc: 'The room went quiet. Just two people seeing each other for the first time.' },
    { title: 'The Ring Exchange', desc: 'A small circle of gold — and a promise that changes everything.' },
    { title: 'Together with Family', desc: 'Their joy multiplied a hundredfold by the people who love them.' },
    { title: 'Unfiltered Laughter', desc: 'The best moments are always the ones no one planned.' },
    { title: 'The New Chapter', desc: 'Every love story is beautiful. But theirs is our favourite.' },
  ];

  return (
    <div className="work-page engagement-v4">

      {/* ── HERO ── */}
      <header className="eng-hero">
        <motion.div
          className="eng-hero-bg"
          style={{ backgroundImage: `url(${heroImage})` }}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
        <div className="eng-hero-overlay" />

        <div className="eng-hero-content">
          <div className="eng-hero-top">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Link to="/" className="back-btn-shared eng-back-btn">
                <ArrowLeft size={14} /> Home
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="eng-hero-eyebrow">Beautiful Beginnings</span>
            <h1 className="eng-hero-title">
              Rings &<br /><em>Rituals</em>
            </h1>
            <p className="eng-hero-sub">
              A celebration of the first step towards forever.
            </p>
            <div className="eng-hero-meta">
              <span className="eng-meta-tag"><MapPin size={13} /> Vizag, India</span>
              <span className="eng-meta-tag"><Calendar size={13} /> June 2025</span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* ── INTRO ── */}
      <section className="container">
        <div className="eng-intro">
          <motion.div {...viewFadeUp(0)} className="eng-intro-text">
            <h2>The Spark of Forever</h2>
            <p>
              Engagements are the most intimate of celebrations. The initial promise,
              the shy smiles, and the unfettered joy of a new chapter beginning.
            </p>
            <p>
              Our photography here was to document the unfiltered connection between
              the couple, amidst the celebration of their families and loved ones.
            </p>
          </motion.div>

          <motion.div {...viewFadeUp(0.15)} className="eng-intro-img">
            <img src={photos[0]} alt="The Ring" />
          </motion.div>
        </div>
      </section>

      {/* ── ALTERNATING ROWS ── */}
      <section className="eng-rows-section">
        <div className="eng-rows-header">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>Gallery Collection</h2>
            <p>Capturing the joy of a new chapter.</p>
          </motion.div>
        </div>

        {photos.slice(1).map((src, i) => (
          <motion.div
            key={i}
            className={`eng-row-item ${i % 2 !== 0 ? 'reverse' : ''}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="eng-row-img">
              <img src={src} alt={rowMoments[i]?.title || `Moment ${i + 1}`} />
            </div>
            <div className="eng-row-text">
              <div className="eng-row-num">0{i + 1}</div>
              <h3>{rowMoments[i]?.title || `Moment ${i + 1}`}</h3>
              <p>{rowMoments[i]?.desc || 'Unfiltered joy.'}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* ── FOOTER ── */}
      <footer className="eng-footer">
        <div className="container">
          <div className="eng-footer-inner">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Link to="/" className="eng-back-portfolio">
                <span>The End</span>
                <h2>Back to Portfolio <Sparkles size={28} /></h2>
              </Link>
            </motion.div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Engagement;