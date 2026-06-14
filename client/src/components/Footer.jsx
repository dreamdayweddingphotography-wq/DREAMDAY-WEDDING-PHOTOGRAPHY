import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';
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
                            DREAMDAY WEDDING PHOTOGRAPHY <span>Photography</span>
                        </Link>
                        <p className="mt-6 pr-10">
                            A premier luxury photography studio specializing in cinematic storytelling.
                            Based in Mumbai, serving worldwide commissions with heart and artistry.
                        </p>
                        <div className="footer-social-modern mt-8">
                            <a href="https://www.instagram.com/dreamday_weddingphotography/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={20} /></a>
                            <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
                            <a href="https://www.youtube.com/@dreamdayraja" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><Youtube size={20} /></a>
                        </div>
                    </div>

                    {/* Nav Col 1 */}
                    <div className="col-span-2">
                        <h4 className="footer-heading-modern">Studio</h4>
                        <ul className="footer-list-modern">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">Our Story</Link></li>
                            <li><Link to="/portfolio">Portfolio</Link></li>
                        </ul>
                    </div>

                    {/* Nav Col 2 */}
                    <div className="col-span-2">
                        <h4 className="footer-heading-modern">Explore</h4>
                        <ul className="footer-list-modern">
                            <li><Link to="/gallery">Gallery</Link></li>
                            <li><Link to="/booking">Enquire</Link></li>
                            <li><Link to="/testimonials">Testimonials</Link></li>
                        </ul>
                    </div>

                    {/* Contact Col */}
                    <div className="col-span-4">
                        <h4 className="footer-heading-modern">Get In Touch</h4>
                        <ul className="footer-contact-list">
                            <li>
                                <Phone size={18} color="#C8A165" />
                                <span>+91 88836 21113</span>
                            </li>
                            <li>
                                <Mail size={18} color="#C8A165" />
                                <span>studio@dreamdayweddingphotography.com</span>
                            </li>
                            <li>
                                <MapPin size={18} color="#C8A165" />
                                <span>Colaba, Mumbai, India</span>
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
