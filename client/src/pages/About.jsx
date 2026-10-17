import React, { useState, useEffect } from 'react';
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

const defaultTeam = [
  { name: 'Rajarajan Vetrivendhan', role: 'Founder & Lead Photographer', image: '/images/Meet our Team/rajarajan.png' },
  { name: 'Arun Kumar', role: 'Cinematographer', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80' },
  { name: 'Priya Sharma', role: 'Creative Director', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' },
  { name: 'Karthik Raj', role: 'Candid Specialist', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' }
];

const About = () => {
  const [team, setTeam] = useState(defaultTeam);

  useEffect(() => {
    const saved = localStorage.getItem('dwp_team_data');
    if (saved) {
      try {
        setTeam(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse team data");
      }
    }
  }, []);

  return (
  <div className="page-wrapper">

    {/* ── Minimalist About Hero ── */}
    <section className="about-minimal-hero">
      <div className="pg-container about-minimal-container">
        <div className="about-minimal-grid">
          
          {/* Logo Side (Left) */}
          <motion.div {...vUp(0)} className="about-logo-col">
             {/* Actual Image Logo */}
             <img src="/logo.png" alt="Dreamday Logo" className="about-logo-img" />

             {/* Premium Text Logo to mimic the reference image */}
             <div className="about-logo-text">
               <div className="about-logo-brand">
                 DREAMDAY
               </div>
               <div className="about-logo-sub">
                 WEDDINGS
               </div>
             </div>
          </motion.div>

          {/* Content Side (Right) */}
          <motion.div {...vUp(0.2)} className="about-content-col">
            <h2 className="about-hero-title">
              About Dreamday<br/>Weddings
            </h2>
            <div className="about-hero-body">
              <p className="about-hero-desc">
                Established in 2007, Our Photography has been dedicated to capturing life's most precious moments with creativity, passion, and professionalism. From weddings and engagements to family celebrations and special events, we transform memories into timeless visual stories.
              </p>
              <p className="about-hero-highlight">
                18+ Years of Excellence in Photography & Videography
              </p>
              <p className="about-hero-motto">
                Capturing Emotions &bull; Preserving Memories &bull; Creating Legacy
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
    {/* ── The Visionary Section ── */}
    <section className="pg-container">
      <div className="visionary-split">
        <motion.div {...vUp(0)} className="visionary-text-col">
          <p className="pg-section-eyebrow">The Visionary</p>
          <h2>Rajarajan Vetrivendhan</h2>
          <p className="visionary-subtitle">Founder & Lead Photographer</p>
          <p>
            With a profound eye for detail and an unwavering passion for visual storytelling, Rajarajan Vetrivendhan founded DREAMDAY WEDDING PHOTOGRAPHY to redefine how love stories are captured. His artistic approach blends cinematic techniques with authentic documentary photography, ensuring every frame is a timeless piece of art.
          </p>
          <p>
            "My goal is not just to take pictures, but to craft a visual legacy that you and your loved ones will cherish for generations."
          </p>
        </motion.div>

        <motion.div {...vUp(0.15)} className="visionary-img-col">
          <img src="/images/Meet our Team/rajarajan.png" alt="Rajarajan Vetrivendhan" className="visionary-real-img" />
          <div className="visionary-img-backdrop"></div>
        </motion.div>
      </div>
    </section>

    {/* ── Meet Our Team ── */}
    <section className="team-section">
      <div className="pg-container">
        <motion.div {...vUp(0)} className="pg-section-header centered">
          <p className="pg-section-eyebrow">The Creatives</p>
          <h2 className="pg-section-title">Meet Our Team</h2>
        </motion.div>

        <div className="team-grid">
          {team.map((member, i) => (
            <motion.div key={i} {...vUp(i * 0.1)} className="team-card">
              <div className="team-img-wrap">
                <img src={member.image} alt={member.name} />
                <div className="team-info-overlay">
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    {/* ── Office Location ── */}
    <section className="location-section">
      <div className="pg-container">
        <motion.div {...vUp(0)} className="pg-section-header centered">
          <p className="pg-section-eyebrow">Visit Us</p>
          <h2 className="pg-section-title">Our Studio</h2>
        </motion.div>

        <div className="location-split">
          <motion.div {...vUp(0.1)} className="location-info-col">
            <div className="location-detail-box">
              <h3>DREAMDAY WEDDING PHOTOGRAPHY</h3>
              <p>Gopal swamy, 9, Gopalasamy Koil St, Sridevi Nagar, Ganapathy, Coimbatore, Tamil Nadu 641006</p>
              
              <div className="location-contact-links">
                <a href="tel:+918883621113" className="location-link">Phone: +91 88836 21113</a>
                <a href="mailto:dreamdayweddingphotography@gmail.com" className="location-link">Email: dreamdayweddingphotography@gmail.com</a>
                <a href="https://www.google.com/maps/place/THE+LUMORA+WEDDINGS/@11.0358754,76.9732985,17z/data=!3m1!4b1!4m6!3m5!1s0x4537a6db43a3b135:0x2e884bb09d63a14e!8m2!3d11.0358701!4d76.9758734!16s%2Fg%2F11zbbx7v7r?entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer" className="location-btn">Get Directions</a>
              </div>
            </div>
          </motion.div>

          <motion.div {...vUp(0.2)} className="location-map-col">
            <iframe 
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=11.0358701,76.9758734+(DREAMDAY%20WEDDING%20PHOTOGRAPHY)&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" 
              width="100%" 
              height="450" 
              style={{border:0}} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="DREAMDAY WEDDING PHOTOGRAPHY Location"
              className="location-map-iframe"
            ></iframe>
          </motion.div>
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
          <blockquote 
            className="about-quote-text" 
            style={{ 
              fontFamily: 'var(--font-script)', 
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
              fontWeight: 400, 
              color: 'var(--accent-color)',
              lineHeight: 1.3,
              textTransform: 'none',
              letterSpacing: 'normal'
            }}
          >
            "Preserving the poetry of your most beautiful day."
          </blockquote>
          <p className="about-quote-sub">
            Let us write the next chapter of your journey. Connect with us to craft timeless artwork from your most treasured moments.
          </p>
          <Link to="/booking" className="pg-btn-primary">Start Your Story</Link>
        </motion.div>
      </div>
    </section>

  </div>
  );
};

export default About;