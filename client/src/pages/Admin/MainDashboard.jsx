import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
    Plus, 
    FileText, 
    TrendingUp, 
    ArrowRight 
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

    if (loading) {
        return <div className="al-ql-loading">Loading Dashboard...</div>;
    }

    return (
        <div className="al-db-container">
            {/* Header Greeting */}
            <div className="al-db-header">
                <div className="al-db-greeting">
                    <h1>Good to see you, Rajarajan Vetrivendhan 👋</h1>
                    <p>Here's a snapshot of your studio activity.</p>
                </div>
                <button onClick={() => navigate('/admin/quotation/new')} className="al-db-create-btn">
                    <Plus size={16} /> CREATE QUOTATION
                </button>
            </div>

            {/* Stats Cards */}
            <div className="al-db-stats-grid">
                {/* Total Quotations Card */}
                <div className="al-db-stat-card" onClick={() => navigate('/admin')}>
                    <div className="al-db-stat-left">
                        <div className="al-db-stat-icon-wrapper blue">
                            <FileText size={24} />
                        </div>
                        <div className="al-db-stat-info">
                            <span className="al-db-stat-number">{totalCount}</span>
                            <span className="al-db-stat-label">Quotations</span>
                            <span className="al-db-stat-sub">{draftCount} drafts</span>
                        </div>
                    </div>
                    <ArrowRight className="al-db-stat-arrow" size={18} />
                </div>

                {/* Confirmed Quotations Card */}
                <div className="al-db-stat-card" onClick={() => navigate('/admin')}>
                    <div className="al-db-stat-left">
                        <div className="al-db-stat-icon-wrapper green">
                            <TrendingUp size={24} />
                        </div>
                        <div className="al-db-stat-info">
                            <span className="al-db-stat-number">{confirmedCount}</span>
                            <span className="al-db-stat-label">Confirmed</span>
                            <span className="al-db-stat-sub">of all quotes</span>
                        </div>
                    </div>
                    <ArrowRight className="al-db-stat-arrow" size={18} />
                </div>
            </div>

            {/* Recent Quotations List Table */}
            <div className="al-db-recent-section">
                <div className="al-db-section-header">
                    <h2>Recent Quotations</h2>
                    <Link to="/admin" className="al-db-view-all-btn">
                        View all <ArrowRight size={14} />
                    </Link>
                </div>

                <div className="al-db-table-wrapper">
                    {recentQuotations.length === 0 ? (
                        <div className="al-ql-empty">No quotations created yet.</div>
                    ) : (
                        <table className="al-db-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Client</th>
                                    <th>Event Type</th>
                                    <th>Event Date</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentQuotations.map((quote) => {
                                    const primaryEvent = quote.eventDetails?.events?.[0];
                                    const eventDateStr = primaryEvent ? formatDate(primaryEvent.date) : 'TBD';
                                    const totalEvents = quote.eventDetails?.events?.length || 0;
                                    const eventDateText = totalEvents > 1 
                                        ? `${eventDateStr} (+${totalEvents - 1} more)`
                                        : eventDateStr;

                                    return (
                                        <tr key={quote._id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/admin/quotation/${quote._id}`)}>
                                            <td>
                                                <span className="al-db-id-pill">Q-{quote.quotationId || quote._id.substring(18)}</span>
                                            </td>
                                            <td>
                                                <span className="al-db-client-name">{quote.clientInfo?.name}</span>
                                            </td>
                                            <td>
                                                {quote.eventDetails?.eventType || 'Wedding Photography'}
                                            </td>
                                            <td>
                                                {eventDateText}
                                            </td>
                                            <td>
                                                <span className="al-db-price">{formatCurrency(quote.pricing?.finalTotal || 0)}</span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MainDashboard;
