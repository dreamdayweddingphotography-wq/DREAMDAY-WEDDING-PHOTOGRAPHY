import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
    Plus, 
    FileText, 
    TrendingUp, 
    ArrowRight,
    Calendar,
    ChevronRight,
    Clock
} from 'lucide-react';
import './Admin.css';

const MainDashboard = () => {
    const navigate = useNavigate();
    const [quotations, setQuotations] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchQuotations = async () => {
        try {
            const res = await axios.get('/api/quotations');
            setQuotations(res.data.data);
        } catch (error) {
            console.error("Error fetching quotations:", error);
            toast.error("Failed to fetch dashboard data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuotations();
    }, []);

    // Stats calculations
    const totalCount = quotations.length;
    const draftCount = quotations.filter(q => q.status?.toUpperCase() === 'DRAFT').length;
    const confirmedCount = quotations.filter(q => q.status?.toUpperCase() === 'CONFIRMED').length;
    
    // Revenue calculations (mocked or derived from confirmed quotes)
    const totalRevenue = quotations
        .filter(q => q.status?.toUpperCase() === 'CONFIRMED' || q.status?.toUpperCase() === 'COMPLETED')
        .reduce((sum, q) => sum + (q.pricing?.finalTotal || 0), 0);

    // Get 5 most recent quotations
    const recentQuotations = [...quotations].reverse().slice(0, 5);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(value);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'TBD';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const getInitials = (name) => {
        if (!name) return '??';
        return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    };

    if (loading) {
        return <div className="al-ql-loading">Loading Dashboard...</div>;
    }

    return (
        <div className="al-db-container">
            {/* Header Greeting */}
            <div className="al-db-header-premium">
                <div className="al-db-greeting-premium">
                    <span className="al-db-date-badge"><Calendar size={12} /> {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                    <h1>Welcome back, Rajarajan <span>👋</span></h1>
                    <p>Here is what's happening with your studio today.</p>
                </div>
                <button onClick={() => navigate('/admin/quotation/new')} className="al-db-create-btn-premium">
                    <Plus size={18} /> <span>Create New Quotation</span>
                </button>
            </div>

            {/* Stats Cards */}
            <div className="al-db-stats-grid-premium">
                {/* Total Quotations Card */}
                <div className="al-db-stat-card-premium al-stat-wine" onClick={() => navigate('/admin')}>
                    <div className="al-stat-bg-shape"></div>
                    <div className="al-db-stat-top">
                        <div className="al-db-stat-icon-wrapper-premium">
                            <FileText size={22} />
                        </div>
                        <ArrowRight className="al-db-stat-arrow-premium" size={20} />
                    </div>
                    <div className="al-db-stat-info-premium">
                        <span className="al-db-stat-number-premium">{totalCount}</span>
                        <span className="al-db-stat-label-premium">Total Quotations</span>
                        <span className="al-db-stat-sub-premium">{draftCount} pending drafts</span>
                    </div>
                </div>

                {/* Confirmed Quotations Card */}
                <div className="al-db-stat-card-premium al-stat-gold" onClick={() => navigate('/admin')}>
                    <div className="al-stat-bg-shape"></div>
                    <div className="al-db-stat-top">
                        <div className="al-db-stat-icon-wrapper-premium">
                            <TrendingUp size={22} />
                        </div>
                        <ArrowRight className="al-db-stat-arrow-premium" size={20} />
                    </div>
                    <div className="al-db-stat-info-premium">
                        <span className="al-db-stat-number-premium">{confirmedCount}</span>
                        <span className="al-db-stat-label-premium">Confirmed Events</span>
                        <span className="al-db-stat-sub-premium">Successfully booked</span>
                    </div>
                </div>
                
                {/* Revenue Card (New) */}
                <div className="al-db-stat-card-premium al-stat-light">
                    <div className="al-stat-bg-shape"></div>
                    <div className="al-db-stat-top">
                        <div className="al-db-stat-icon-wrapper-premium">
                            <Clock size={22} />
                        </div>
                    </div>
                    <div className="al-db-stat-info-premium">
                        <span className="al-db-stat-number-premium">{formatCurrency(totalRevenue)}</span>
                        <span className="al-db-stat-label-premium">Estimated Revenue</span>
                        <span className="al-db-stat-sub-premium">From confirmed quotes</span>
                    </div>
                </div>
            </div>

            {/* Recent Quotations List */}
            <div className="al-db-recent-section-premium">
                <div className="al-db-section-header-premium">
                    <div className="al-db-section-title">
                        <h2>Recent Quotations</h2>
                        <span className="al-db-section-badge">{recentQuotations.length}</span>
                    </div>
                    <Link to="/admin" className="al-db-view-all-btn-premium">
                        View all records <ChevronRight size={16} />
                    </Link>
                </div>

                <div className="al-db-list-wrapper">
                    {recentQuotations.length === 0 ? (
                        <div className="al-ql-empty">No quotations created yet.</div>
                    ) : (
                        <div className="al-db-modern-list">
                            {recentQuotations.map((quote) => {
                                const primaryEvent = quote.eventDetails?.events?.[0];
                                const eventDateStr = primaryEvent ? formatDate(primaryEvent.date) : 'TBD';
                                const status = quote.status || 'SENT';
                                
                                return (
                                    <div key={quote._id} className="al-db-list-item" onClick={() => navigate(`/admin/quotation/${quote._id}`)}>
                                        <div className="al-db-list-item-left">
                                            <div className="al-db-avatar">
                                                {getInitials(quote.clientInfo?.name)}
                                            </div>
                                            <div className="al-db-item-details">
                                                <h4 className="al-db-client-name-premium">{quote.clientInfo?.name}</h4>
                                                <div className="al-db-item-meta">
                                                    <span className="al-db-id-pill-premium">Q-{quote.quotationId || quote._id.substring(18)}</span>
                                                    <span className="al-db-meta-dot">•</span>
                                                    <span className="al-db-event-type-premium">{quote.eventDetails?.eventType || 'Wedding Photography'}</span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="al-db-list-item-center">
                                            <div className="al-db-date-info">
                                                <Calendar size={14} />
                                                <span>{eventDateStr}</span>
                                            </div>
                                        </div>

                                        <div className="al-db-list-item-right">
                                            <div className="al-db-price-premium">
                                                {formatCurrency(quote.pricing?.finalTotal || 0)}
                                            </div>
                                            <div className={`al-db-status-badge status-${status.toLowerCase()}`}>
                                                <span className="status-dot"></span>
                                                {status}
                                            </div>
                                            <button className="al-db-item-action">
                                                <ChevronRight size={20} />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MainDashboard;
