import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
    Plus, 
    Search, 
    User, 
    MapPin, 
    Eye, 
    Edit, 
    Printer, 
    Download, 
    Trash2,
    LayoutGrid,
    Calendar,
    FileText
} from 'lucide-react';
import html2pdf from 'html2pdf.js';
import QuotationDocument from './QuotationDocument';
import './Admin.css';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [quotations, setQuotations] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Filtering states
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    
    // Custom Dropdown State
    const [openDropdownId, setOpenDropdownId] = useState(null);

    // Delete Modal State
    const [quotationToDelete, setQuotationToDelete] = useState(null);

    // Direct Download State
    const [downloadingQuote, setDownloadingQuote] = useState(null);
    const downloadRef = React.useRef();

    const fetchQuotations = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/quotations');
            setQuotations(res.data.data);
        } catch (error) {
            console.error("Error fetching quotations:", error);
            toast.error("Failed to fetch quotations");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuotations();
    }, []);

    const handleDelete = (id) => {
        // Open the custom modal instead of window.confirm
        setQuotationToDelete(id);
    };

    const confirmDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/quotations/${id}`);
            toast.success('Quotation deleted successfully');
            fetchQuotations();
        } catch (error) {
            toast.error('Failed to delete quotation');
        } finally {
            setQuotationToDelete(null); // Close modal
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await axios.put(`http://localhost:5000/api/quotations/${id}`, { status: newStatus });
            toast.success(`Status updated to ${newStatus}`);
            fetchQuotations();
        } catch (error) {
            toast.error('Failed to update status');
        }
        setOpenDropdownId(null); // Close dropdown after selection
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.al-custom-dropdown')) {
                setOpenDropdownId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const triggerDirectDownload = (quote) => {
        const toastId = toast.loading('Generating PDF...');
        setDownloadingQuote(quote);
        
        // Wait a bit for DOM to render the hidden component
        setTimeout(() => {
            if (downloadRef.current) {
                const opt = {
                    margin:       0,
                    filename:     `Quotation_${quote._id.substring(quote._id.length - 4).toUpperCase()}.pdf`,
                    image:        { type: 'jpeg', quality: 0.98 },
                    html2canvas:  { scale: 2, useCORS: true },
                    jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
                };
                html2pdf().set(opt).from(downloadRef.current).save().then(() => {
                    toast.success('Download Complete', { id: toastId });
                    setDownloadingQuote(null);
                });
            } else {
                toast.error('Failed to generate PDF', { id: toastId });
                setDownloadingQuote(null);
            }
        }, 500);
    };

    const filters = ['All', 'DRAFT', 'SENT', 'CONFIRMED', 'COMPLETED'];

    // Filter Logic
    const filteredQuotations = quotations.filter(q => {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch = 
            (q.clientInfo?.name || '').toLowerCase().includes(searchLower) ||
            (q._id || '').toLowerCase().includes(searchLower) ||
            (q.eventDetails?.eventType || '').toLowerCase().includes(searchLower);
            
        const qStatus = q.status || 'SENT';
        const matchesStatus = activeFilter === 'All' || qStatus === activeFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="al-dashboard">
            {/* Hidden PDF Generator */}
            {downloadingQuote && (
                <div style={{ display: 'none' }}>
                    <QuotationDocument quotation={downloadingQuote} printRef={downloadRef} />
                </div>
            )}

            {/* Custom Delete Confirmation Modal */}
            {quotationToDelete && (
                <div className="al-modal-overlay">
                    <div className="al-modal-content">
                        <div className="al-modal-icon">
                            <Trash2 size={32} />
                        </div>
                        <h3>Delete Quotation?</h3>
                        <p>Are you sure you want to permanently delete this quotation? This action cannot be undone.</p>
                        <div className="al-modal-actions">
                            <button className="al-modal-btn-cancel" onClick={() => setQuotationToDelete(null)}>Cancel</button>
                            <button className="al-modal-btn-delete" onClick={() => confirmDelete(quotationToDelete)}>Yes, Delete</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Header Area */}
            <div className="al-ql-header">
                <div className="al-ql-title-row">
                    <h1 className="al-ql-title">Quotations</h1>
                    <span className="al-ql-badge">{quotations.length} TOTAL</span>
                </div>
                <button className="al-btn-primary" onClick={() => navigate('/admin/quotation/new')}>
                    <Plus size={16} /> CREATE QUOTATION
                </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="al-ql-toolbar">
                <div className="al-ql-search">
                    <Search size={16} className="al-ql-search-icon" />
                    <input 
                        type="text" 
                        placeholder="Search by client, ID, event..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="al-ql-filters">
                    {filters.map(f => (
                        <button 
                            key={f}
                            className={`al-ql-filter-btn ${activeFilter === f ? 'active' : ''}`}
                            onClick={() => setActiveFilter(f)}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Quotations List */}
            {loading ? (
                <div className="al-ql-loading">Loading quotations...</div>
            ) : filteredQuotations.length === 0 ? (
                <div className="al-ql-empty">
                    <FileText size={48} />
                    <p>No quotations found matching your criteria.</p>
                    <span onClick={() => { setSearchQuery(''); setActiveFilter('All'); }}>Clear filters</span>
                </div>
            ) : (
                <div className="al-ql-grid">
                    {filteredQuotations.map(quote => (
                        <div key={quote._id} className="al-ql-card">
                            
                            <div className="al-ql-card-header">
                                <span className="al-ql-id">Q-{quote._id.substring(quote._id.length - 4).toUpperCase()}</span>
                                <div className="al-custom-dropdown" onClick={() => setOpenDropdownId(openDropdownId === quote._id ? null : quote._id)}>
                                    <div className="al-custom-dropdown-selected">
                                        <span className={`al-status-dot status-${quote.status?.toLowerCase() || 'sent'}`}></span>
                                        {quote.status || 'SENT'}
                                    </div>
                                    {openDropdownId === quote._id && (
                                        <div className="al-custom-dropdown-menu">
                                            {['DRAFT', 'SENT', 'CONFIRMED', 'COMPLETED'].map(status => (
                                                <div 
                                                    key={status} 
                                                    className={`al-custom-dropdown-item ${quote.status === status ? 'active' : ''}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleStatusChange(quote._id, status);
                                                    }}
                                                >
                                                    <span className={`al-status-dot status-${status.toLowerCase()}`}></span>
                                                    {status}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="al-ql-card-body">
                                <h3 className="al-ql-client-name">{quote.clientInfo?.name || 'Untitled Client'}</h3>
                                <div className="al-ql-event-type">{quote.eventDetails?.eventType || 'General Event'}</div>
                                
                                <div className="al-ql-details-list">
                                    <div className="al-ql-detail-row">
                                        <Calendar size={14} className="al-ql-icon" />
                                        <span>
                                            {quote.eventDetails?.events?.[0]?.date ? 
                                                `${new Date(quote.eventDetails.events[0].date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`
                                                : 'Date not set'
                                            }
                                            {quote.eventDetails?.events?.length > 1 && ` (+${quote.eventDetails.events.length - 1} more)`}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="al-ql-card-footer">
                                <div className="al-ql-price">
                                    ₹{quote.pricing?.finalTotal?.toLocaleString() || '0'}
                                </div>
                                <div className="al-ql-actions">
                                    <button title="View" onClick={() => navigate(`/admin/quotation/${quote._id}`)}><Eye size={16} /></button>
                                    <button title="Edit" onClick={() => navigate(`/admin/quotation/${quote._id}/edit`)}><Edit size={16} /></button>
                                    <button title="Print" onClick={() => navigate(`/admin/quotation/${quote._id}`)}><Printer size={16} /></button>
                                    <button title="Download PDF" onClick={() => triggerDirectDownload(quote)}><Download size={16} /></button>
                                    <button title="Delete" className="al-ql-action-danger" onClick={() => handleDelete(quote._id)}><Trash2 size={16} /></button>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
