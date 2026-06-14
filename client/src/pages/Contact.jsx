import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import './Contact.css';

const vUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] },
});

const Contact = () => (
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
          <p className="pg-hero-eyebrow">Get In Touch</p>
          <h1 className="pg-hero-title">Connect <em>With Us</em></h1>
          <p className="pg-hero-sub">
            Ready to start your next visual journey? Fill out the form below
            or reach out to us directly via phone or email.
          </p>
        </motion.div>
      </div>
    </section>

    {/* ── Main Layout ── */}
    <div className="pg-container">
      <div className="contact-layout">

        {/* Sidebar */}
        <motion.aside {...vUp(0)} className="contact-sidebar">

          {[
            { icon: <Phone size={18} />, label: 'Call Us',    value: '+91 88836 21113' },
            { icon: <Mail size={18} />, label: 'Email Us',   value: 'studio@dreamdayweddingphotography.com' },
            { icon: <MapPin size={18} />, label: 'Our Studio', value: 'Colaba, Mumbai, India' },
          ].map((item, i) => (
            <motion.div key={i} {...vUp(i * 0.1)} className="contact-info-item">
              <div className="contact-icon-box">{item.icon}</div>
              <div>
                <h4>{item.label}</h4>
                <p>{item.value}</p>
              </div>
            </motion.div>
          ))}

          <motion.div {...vUp(0.3)} className="contact-hours">
            <h3>Operating Hours</h3>
            <p><span>Mon – Fri</span>&nbsp;&nbsp;10:00 AM – 7:00 PM</p>
            <p><span>Saturday</span>&nbsp;&nbsp;11:00 AM – 4:00 PM</p>
            <p><span>Sunday</span>&nbsp;&nbsp;Available for Shoots</p>
          </motion.div>

        </motion.aside>

        {/* Form */}
        <motion.div {...vUp(0.15)} className="contact-form-card">
          <h2>Send a Message</h2>
          <form>
            <div className="contact-form-grid">
              <div className="pg-form-group">
                <label>Full Name</label>
                <input type="text" placeholder="John Doe" required />
              </div>
              <div className="pg-form-group">
                <label>Email Address</label>
                <input type="email" placeholder="john@example.com" required />
              </div>
              <div className="pg-form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="+91 XXX XXX XXXX" />
              </div>
              <div className="pg-form-group">
                <label>Service Type</label>
                <select>
                  <option>Wedding Photography</option>
                  <option>Portrait Session</option>
                  <option>Commercial Shoot</option>
                  <option>Event Coverage</option>
                </select>
              </div>
              <div className="pg-form-group full">
                <label>Your Message / Project Vision</label>
                <textarea rows={6} placeholder="Tell us about your upcoming project…" />
              </div>
              <div className="pg-form-group full">
                <button type="submit" className="pg-btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '13px' }}>
                  Send Inquiry <Send size={14} />
                </button>
              </div>
            </div>
          </form>
        </motion.div>

      </div>
    </div>

    {/* ── Map ── */}
    <div className="map-section">
      <div className="map-placeholder">
        <MapPin size={36} color="var(--pg-gold)" />
        <h3>Studio Location</h3>
        <p>Google Maps integration will appear here.</p>
      </div>
    </div>

  </div>
);

export default Contact;