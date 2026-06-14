import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, MessageCircle, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import './Booking.css';

const Booking = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventType: 'Wedding Photography',
    date: '',
    location: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Inquiry sent successfully!');
        setSubmitted(true);
      } else {
        const errorData = await response.json();
        const msg = errorData.message || 'Something went wrong. Please try again.';
        setError(msg);
        toast.error(msg);
      }
    } catch (err) {
      const msg = 'Network error. Please check your connection.';
      setError(msg);
      toast.error(msg);
      console.error('Booking submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <AnimatePresence mode="wait">

        {submitted ? (
          /* ── Success ── */
          <motion.div
            key="success"
            className="booking-success pg-container"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="booking-success-card">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="booking-success-icon"
              >
                <CheckCircle2 size={72} />
              </motion.div>
              <h2>Inquiry Sent!</h2>
              <p>Thank you for reaching out. We will review your request and get back to you within 24 hours.</p>
              <button onClick={() => setSubmitted(false)} className="pg-btn-primary">
                Back to Booking
              </button>
            </div>
          </motion.div>

        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

            {/* ── Hero ── */}
            <section className="pg-hero">
              <div className="pg-container">
                <motion.div
                  className="pg-hero-inner"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="pg-hero-eyebrow">Reservation</p>
                  <h1 className="pg-hero-title">Book Your <em>Session</em></h1>
                  <p className="pg-hero-sub">
                    Ready to capture your story? Select your preferred date and tell us
                    more about your vision. Let's create something beautiful together.
                  </p>
                </motion.div>
              </div>
            </section>

            {/* ── Form ── */}
            <div className="pg-container booking-layout">
              <motion.div
                className="booking-form-wrap"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="booking-form-card">
                  {error && <div className="pg-error-message" style={{ color: 'var(--pg-gold)', marginBottom: '20px', textAlign: 'center' }}>{error}</div>}
                  <form onSubmit={handleSubmit}>

                    {/* Step 1 */}
                    <div className="booking-step-label">Personal Information</div>
                    <div className="booking-form-grid">
                      <div className="pg-form-group">
                        <label><User size={12} style={{ display: 'inline', marginRight: 6 }} />Full Name</label>
                        <input name="name" type="text" placeholder="Your full name" value={formData.name} onChange={handleChange} required />
                      </div>
                      <div className="pg-form-group">
                        <label><Calendar size={12} style={{ display: 'inline', marginRight: 6 }} />Email Address</label>
                        <input name="email" type="email" placeholder="email@example.com" value={formData.email} onChange={handleChange} required />
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="booking-step-label">Event / Session Details</div>
                    <div className="booking-form-grid">
                      <div className="pg-form-group">
                        <label>Inquiry Type</label>
                        <select name="eventType" value={formData.eventType} onChange={handleChange}>
                          <option>Wedding Photography</option>
                          <option>Portrait Session</option>
                          <option>Commercial / Editorial</option>
                          <option>Engagement / Pre-Wedding</option>
                        </select>
                      </div>
                      <div className="pg-form-group">
                        <label>Preferred Date</label>
                        <input name="date" type="date" value={formData.date} onChange={handleChange} required />
                      </div>
                      <div className="pg-form-group full">
                        <label><Clock size={12} style={{ display: 'inline', marginRight: 6 }} />Event Location</label>
                        <input name="location" type="text" placeholder="City or venue name" value={formData.location} onChange={handleChange} />
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="booking-step-label">Your Vision</div>
                    <div className="booking-form-grid">
                      <div className="pg-form-group full">
                        <label><MessageCircle size={12} style={{ display: 'inline', marginRight: 6 }} />Message / Requirements</label>
                        <textarea name="message" rows={5} placeholder="Tell us more about what you're looking for…" value={formData.message} onChange={handleChange} />
                      </div>
                      <div className="pg-form-group full" style={{ marginTop: 16 }}>
                        <button type="submit" className="pg-btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '13px' }}>
                          {loading ? 'Processing...' : 'Confirm Inquiry Request'}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>

          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default Booking;