import React from 'react';
import { motion } from 'framer-motion';
import { Award, Camera, Heart, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import './About.css';

const vUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] },
});

const values = [
  { icon: <Heart size={22} />, title: 'Passion', desc: 'We pour our heart into every frame, treating each story as our own.' },
  { icon: <ShieldCheck size={22} />, title: 'Excellence', desc: 'Uncompromising quality in every deliverable we create.' },
  { icon: <Camera size={22} />, title: 'Artistry', desc: 'Viewing every moment through a deeply creative lens.' },
  { icon: <Award size={22} />, title: 'Recognition', desc: 'Award-winning quality recognized across the industry.' },
];

const About = () => (
  <div className="page-wrapper">

    {/* ── Hero ── */}
    <section className="pg-hero">
      <div className="pg-container">
        <motion.div
          className="pg-hero-inner"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="pg-hero-eyebrow">Since 2012</p>
          <h1 className="pg-hero-title">Our <em>Studio</em> Story</h1>
          <p className="pg-hero-sub">
            Driven by passion, defined by excellence. We are a collective of visual
            storytellers dedicated to capturing the beauty in your journey.
          </p>
        </motion.div>
      </div>
    </section>

    {/* ── About Split ── */}
    <section className="pg-container">
      <div className="about-split">

        <motion.div {...vUp(0)} className="about-img-col">
          <img src="/images/about.png" alt="About Studio" />
          <div className="about-img-badge">
            12+
            <span>Years of Cinema</span>
          </div>
        </motion.div>

        <motion.div {...vUp(0.15)} className="about-text-col">
          <p className="pg-section-eyebrow">Our Philosophy</p>
          <h2>Luxury Photography for the Modern Soul</h2>
          <p>
            Founded in the heart of the art district, DREAMDAY WEDDING PHOTOGRAPHY was born from a simple
            belief: that every person and every event has a unique light that deserves to be seen.
          </p>
          <p>
            Our style is clean, modern, and cinematic. We blend classic portraiture with
            documentary spontaneity to create a visual language that is both artistic and authentic.
          </p>

          <div className="about-stats-row">
            <div className="about-stat">
              <strong>12+</strong>
              <span>Years Experience</span>
            </div>
            <div className="about-stat">
              <strong>500+</strong>
              <span>Weddings Captured</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    {/* ── Values ── */}
    <section className="values-section">
      <div className="pg-container">
        <motion.div {...vUp(0)} className="pg-section-header centered">
          <p className="pg-section-eyebrow">Our Core</p>
          <h2 className="pg-section-title">Philosophy & Values</h2>
        </motion.div>

        <div className="values-grid">
          {values.map((v, i) => (
            <motion.div key={i} {...vUp(i * 0.1)} className="value-item">
              <div className="value-icon">{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Quote ── */}
    <section className="about-quote-section">
      <div className="pg-container">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <blockquote className="about-quote-text">
            "It's not just a photo, it's a <em>legacy</em>."
          </blockquote>
          <p className="about-quote-sub">
            We are ready to tell your story. Join the hundreds of clients who have trusted
            us with their most precious moments.
          </p>
          <Link to="/booking" className="pg-btn-primary">Book Your Story</Link>
        </motion.div>
      </div>
    </section>

  </div>
);

export default About;