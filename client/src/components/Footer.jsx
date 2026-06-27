import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-modern section-padding">
            <div className="container">
                <div className="grid-container mb-12">
                    {/* Brand Col */}
                    <div className="col-span-4">
                        <Link to="/" className="footer-logo-modern">
                            <img src="/logo.png" alt="DREAMDAY WEDDING PHOTOGRAPHY Logo" className="footer-logo-img" />
                            <div className="footer-logo-text">
                                <span className="footer-logo-name">DREAMDAY WEDDING PHOTOGRAPHY</span>
                                <span className="footer-logo-sub">Photography</span>
                            </div>
                        </Link>
                        <p className="mt-6" style={{ lineHeight: '1.8' }}>
                            Premium Wedding Photography & Cinematography.<br />
                            <strong>CANDID-WEDDING | PRE-POST WEDDING | MATERNITY</strong><br />
                            Coimbatore & Tirupur
                        </p>
                        <div className="footer-social-modern mt-8" style={{ display: 'flex', flexDirection: 'row', gap: '15px' }}>
                            <a href="https://www.instagram.com/dreamday_weddingphotography/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={20} /></a>
                            <a href="https://www.youtube.com/@dreamdayraja" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Youtube size={20} /></a>
                        </div>
                    </div>

                    {/* Nav Col 1 */}
                    <div className="col-span-2">
                        <h4 className="footer-heading-modern">Studio</h4>
                        <ul className="footer-list-modern">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">Our Story</Link></li>
                        </ul>
                    </div>

                    {/* Nav Col 2 */}
                    <div className="col-span-2">
                        <h4 className="footer-heading-modern">Explore</h4>
                        <ul className="footer-list-modern">
                            <li><Link to="/gallery">Gallery</Link></li>
                            <li><Link to="/booking">Enquire</Link></li>
                        </ul>
                    </div>

                    {/* Contact Col */}
                    <div className="col-span-4">
                        <h4 className="footer-heading-modern">Get In Touch</h4>
                        <ul className="footer-contact-list">
                            <li>
                                <Phone size={18} color="#C8A165" />
                                <span>Ring us: <a href="tel:+918883621113" style={{ color: 'inherit', textDecoration: 'none' }}>+91 88836 21113</a></span>
                            </li>
                            <li>
                                <Mail size={18} color="#C8A165" />
                                <span><a href="mailto:dreamdayweddingphotography@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>dreamdayweddingphotography@gmail.com</a></span>
                            </li>
                            <li>
                                <MapPin size={18} color="#C8A165" />
                                <span>Coimbatore & Tirupur, India</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom-modern">
                    <p>&copy; {new Date().getFullYear()} DREAMDAY WEDDING PHOTOGRAPHY Studio. All rights reserved.</p>
                    <div className="footer-legal-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
