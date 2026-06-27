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
                <img src="/logo.png" alt="Logo" className="vq-logo" crossOrigin="anonymous" />
                <div className="vq-header-right">
                    <h1>QUOTATION</h1>
                    <div className="vq-header-meta">
                        <strong>ID:</strong> Q-{quotation._id.substring(quotation._id.length - 4).toUpperCase()}<br/>
                        <strong>Date:</strong> {renderDate(quotation.createdAt)}
                    </div>
                </div>
            </div>

            {/* Info Boxes */}
            <div className="vq-info-row">
                <div className="vq-info-box">
                    <div className="vq-info-label">PREPARED FOR:</div>
                    <h2 className="vq-info-title">{quotation.clientInfo?.name}</h2>
                    <div className="vq-info-detail">
                        <Phone size={12} /> {quotation.clientInfo?.phone}
                    </div>
                </div>
                <div className="vq-info-box">
                    <div className="vq-info-label">EVENT DETAILS:</div>
                    <h2 className="vq-info-title">{quotation.eventDetails?.eventType}</h2>
                    {quotation.eventDetails?.events?.length > 0 && (
                        <div className="vq-info-detail">
                            <Calendar size={12} /> {renderDate(quotation.eventDetails.events[0].date)} [{quotation.eventDetails.events[0].details}]
                        </div>
                    )}
                    {quotation.eventDetails?.location && (
                        <div className="vq-info-detail">
                            <MapPin size={12} /> {quotation.eventDetails.location}
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

            {/* Terms */}
            <div className="vq-terms">
                <h4>TERMS & CONDITIONS</h4>
                <ul>
                    <li>Travel & accommodation charges will be additional for Out of Coimbatore events.</li>
                    <li>40% of amount should be paid in advance after confirmation.</li>
                    <li>50% of the total amount should be paid after the completion of the shoot.</li>
                    <li>Pending 10% should be paid after album design confirmed and before print.</li>
                </ul>
            </div>

            {/* Footer */}
            <div className="vq-footer">
                <img src="/logo.png" alt="Logo" className="vq-footer-logo" crossOrigin="anonymous" />
                <div className="vq-footer-contact">
                    <div className="vq-footer-icons">
                        <a href="https://www.instagram.com/dreamday_weddingphotography/" target="_blank" rel="noopener noreferrer" style={{color: 'inherit', textDecoration: 'none'}}>
                            <Instagram size={10} style={{display:'inline', verticalAlign:'middle'}}/> @dreamday_weddingphotography
                        </a>
                        <a href="https://www.youtube.com/@dreamdayraja" target="_blank" rel="noopener noreferrer" style={{color: 'inherit', textDecoration: 'none'}}>
                            <Youtube size={10} style={{display:'inline', verticalAlign:'middle'}}/> @dreamdayraja
                        </a>
                    </div>
                    <div>
                        Contact: <a href="tel:+918883621113" style={{color: 'inherit', textDecoration: 'none'}}>+91 88836 21113</a> | <a href="mailto:dreamdayweddingphotography@gmail.com" style={{color: 'inherit', textDecoration: 'none'}}>dreamdayweddingphotography@gmail.com</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuotationDocument;
