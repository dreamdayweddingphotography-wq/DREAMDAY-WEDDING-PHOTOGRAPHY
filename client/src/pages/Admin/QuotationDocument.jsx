import React from 'react';
import { Phone, Calendar, MapPin, Globe, Instagram, Youtube } from 'lucide-react';
import './ViewQuotation.css'; // Reuse the same CSS

const QuotationDocument = ({ quotation, printRef }) => {
    if (!quotation) return null;

    const renderDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    return (
        <div className="vq-document-wrapper" ref={printRef}>
            {/* Header */}
            <div className="vq-header">
                <img 
                    src="/images/Dream Day Logo/2026 DREAMDAY Green LOGO.jpg" 
                    alt="Dreamday Logo" 
                    className="vq-logo" 
                    crossOrigin="anonymous" 
                    onError={(e) => { e.currentTarget.src = '/logo-green.jpg'; }}
                />
                <div className="vq-header-right">
                    <h1>QUOTATION</h1>
                    <div className="vq-header-meta">
                        <strong>ID:</strong> Q-{quotation._id ? quotation._id.substring(quotation._id.length - 4).toUpperCase() : 'DRAFT'}<br/>
                        <strong>Date:</strong> {renderDate(quotation.createdAt || new Date())}
                    </div>
                </div>
            </div>

            {/* Info Boxes */}
            <div className="vq-info-row">
                <div className="vq-info-box">
                    <div className="vq-info-label">PREPARED FOR:</div>
                    <h2 className="vq-info-title">{quotation.clientInfo?.name}</h2>
                    <div className="vq-info-detail">
                        <Phone size={12} className="vq-icon-phone" /> {quotation.clientInfo?.phone}
                    </div>
                </div>
                <div className="vq-info-box">
                    <div className="vq-info-label">EVENT DETAILS:</div>
                    <h2 className="vq-info-title">{quotation.eventDetails?.eventType}</h2>
                    {quotation.eventDetails?.events?.length > 0 && (
                        <div className="vq-info-detail">
                            <Calendar size={12} className="vq-icon-calendar" /> {renderDate(quotation.eventDetails.events[0].date)} [{quotation.eventDetails.events[0].details}]
                        </div>
                    )}
                    {quotation.eventDetails?.location && (
                        <div className="vq-info-detail">
                            <MapPin size={12} className="vq-icon-location" /> {quotation.eventDetails.location}
                        </div>
                    )}
                </div>
            </div>

            {/* Main Table */}
            <table className="vq-table">
                <thead>
                    <tr>
                        <th>NO</th>
                        <th>DATE & EVENTS</th>
                        <th>REQUIREMENTS</th>
                        <th>NO'S</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Events Rows */}
                    {quotation.eventDetails?.events?.map((ev, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                <div className="vq-td-title">{renderDate(ev.date)}</div>
                                <div className="vq-td-title">[{ev.details}]</div>
                            </td>
                            <td>
                                <ul className="vq-req-list">
                                    {ev.requirements?.map((req, i) => <li key={i}>{req}</li>)}
                                </ul>
                            </td>
                            <td>
                                <ul className="vq-req-list" style={{textAlign: 'center', listStyle: 'none'}}>
                                    {ev.requirements?.map((req, i) => <li key={i}>1</li>)}
                                </ul>
                            </td>
                        </tr>
                    ))}

                    {/* Complementary Row */}
                    {quotation.deliverables?.complementary?.length > 0 && (
                        <tr>
                            <td>{quotation.eventDetails.events.length + 1}</td>
                            <td>
                                <div className="vq-td-title">COMPLEMENTARY</div>
                            </td>
                            <td>
                                <ul className="vq-req-list">
                                    {quotation.deliverables.complementary.map((c, i) => <li key={i}>{c}</li>)}
                                </ul>
                            </td>
                            <td>
                                <ul className="vq-req-list" style={{textAlign: 'center', listStyle: 'none'}}>
                                    {quotation.deliverables.complementary.map((c, i) => <li key={i}>1</li>)}
                                </ul>
                            </td>
                        </tr>
                    )}

                    {/* Albums Row */}
                    {quotation.deliverables?.albums?.length > 0 && (
                        <tr>
                            <td>{quotation.eventDetails.events.length + (quotation.deliverables?.complementary?.length > 0 ? 2 : 1)}</td>
                            <td>
                                <div className="vq-td-title">ALBUMS</div>
                            </td>
                            <td>
                                <ul className="vq-req-list">
                                    {quotation.deliverables.albums.map((a, i) => <li key={i}>{a}</li>)}
                                </ul>
                            </td>
                            <td>
                                <ul className="vq-req-list" style={{textAlign: 'center', listStyle: 'none'}}>
                                    {quotation.deliverables.albums.map((a, i) => <li key={i}>1</li>)}
                                </ul>
                            </td>
                        </tr>
                    )}

                    {/* Final Out Row */}
                    {quotation.deliverables?.finalOut?.length > 0 && (
                        <tr className="vq-bg-light">
                            <td>{quotation.eventDetails.events.length + (quotation.deliverables?.complementary?.length > 0 ? 2 : 1) + (quotation.deliverables?.albums?.length > 0 ? 1 : 0)}</td>
                            <td>
                                <div className="vq-td-title">FINAL OUT</div>
                            </td>
                            <td>
                                <ul className="vq-req-list" style={{fontWeight: '600'}}>
                                    {quotation.deliverables.finalOut.map((fo, i) => <li key={i}>{fo}</li>)}
                                </ul>
                            </td>
                            <td>
                                <ul className="vq-req-list" style={{textAlign: 'center', listStyle: 'none', fontWeight: '600'}}>
                                    {quotation.deliverables.finalOut.map((fo, i) => <li key={i}>1</li>)}
                                </ul>
                            </td>
                        </tr>
                    )}
                    
                    {/* Additional Services */}
                    {quotation.additionalServices?.length > 0 && (
                         <tr>
                            <td>{quotation.eventDetails.events.length + (quotation.deliverables?.complementary?.length > 0 ? 2 : 1) + (quotation.deliverables?.albums?.length > 0 ? 1 : 0) + (quotation.deliverables?.finalOut?.length > 0 ? 1 : 0)}</td>
                            <td>
                                <div className="vq-td-title">ADDITIONAL SERVICES</div>
                            </td>
                            <td>
                                <ul className="vq-req-list">
                                    {quotation.additionalServices.map((as, i) => <li key={i}>{as.name}</li>)}
                                </ul>
                            </td>
                            <td>
                                <ul className="vq-req-list" style={{textAlign: 'center', listStyle: 'none'}}>
                                    {quotation.additionalServices.map((as, i) => <li key={i}>₹{as.price.toLocaleString()}</li>)}
                                </ul>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Total */}
            <div className="vq-total-line"></div>
            <div className="vq-total-wrapper">
                <span className="vq-total-label">Total</span>
                <span className="vq-total-amount">₹{quotation.pricing?.finalTotal.toLocaleString()}</span>
            </div>


            {/* Footer */}
            <div className="vq-footer">
                <a 
                    href="https://www.youtube.com/@dreamdayraja" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="vq-footer-item"
                >
                    <svg viewBox="0 0 24 17" width="22" height="15.5" fill="none" xmlns="http://www.w3.org/2000/svg" className="vq-footer-svg">
                        <rect width="24" height="17" rx="4.5" fill="#FF0000" />
                        <polygon points="9.5,4.5 16,8.5 9.5,12.5" fill="#FFFFFF" />
                    </svg>
                    <span>www.youtube.com/@DreamdayRaja</span>
                </a>

                <a 
                    href="https://www.instagram.com/dreamday_weddingphotography/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="vq-footer-item"
                >
                    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg" className="vq-footer-svg">
                        <defs>
                            <linearGradient id="vqIgGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#f09433"/>
                                <stop offset="25%" stopColor="#e6683c"/>
                                <stop offset="50%" stopColor="#dc2743"/>
                                <stop offset="75%" stopColor="#cc2366"/>
                                <stop offset="100%" stopColor="#bc1888"/>
                            </linearGradient>
                        </defs>
                        <rect width="20" height="20" rx="5.5" fill="url(#vqIgGrad)"/>
                        <rect x="4" y="4" width="12" height="12" rx="3.5" stroke="#ffffff" strokeWidth="1.4" fill="none"/>
                        <circle cx="10" cy="10" r="2.8" stroke="#ffffff" strokeWidth="1.4" fill="none"/>
                        <circle cx="13.3" cy="6.7" r="0.75" fill="#ffffff"/>
                    </svg>
                    <span>instagram.com/Dreamday_weddingphotography</span>
                </a>
            </div>
        </div>
    );
};

export default QuotationDocument;
