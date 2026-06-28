import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    LayoutDashboard,
    Image,
    Calendar,
    BookOpen,
    MessageSquare,
    Star,
    Briefcase,
    ChevronLeft,
    FileText,
    LogOut,
    Menu,
    X
} from 'lucide-react';
import './Admin.css';

const AdminLayout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Close sidebar on page navigation (mobile)
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location.pathname]);

    const navItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={18} /> },
        { name: 'Quotations', path: '/admin', icon: <FileText size={18} />, badge: 'NEW' }
    ];

    const currentNav = navItems.find(i => i.path === location.pathname) || navItems[0];

    return (
        <div className="al-layout">
            {/* Sidebar Overlay (Mobile only) */}
            {isSidebarOpen && (
                <div 
                    className="al-sidebar-overlay" 
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`al-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="al-sidebar-header">
                    <img src="/logo-circle.png" alt="Logo" className="al-sidebar-logo-img" />
                    <div className="al-sidebar-logo-text">
                        <h2>DREAMDAY WEDDING</h2>
                        <span>ADMIN PORTAL</span>
                    </div>
                    {/* Close button for mobile */}
                    <button 
                        className="al-sidebar-close" 
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="al-sidebar-nav">
                    {navItems.map(item => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`al-nav-item ${location.pathname === item.path ? 'active' : ''}`}
                        >
                            <span className="al-nav-icon">{item.icon}</span>
                            <span className="al-nav-name">{item.name}</span>
                            {item.badge && <span className="al-nav-badge">{item.badge}</span>}
                        </Link>
                    ))}
                </nav>

                <div className="al-sidebar-footer">
                    <Link to="/" className="al-back-link">
                        <ChevronLeft size={16} style={{marginRight: 8}} /> Back to Site
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="al-main-area">
                {/* Topbar */}
                <header className="al-topbar">
                    {/* Hamburger toggle button for mobile */}
                    <button 
                        className="al-menu-toggle" 
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        <Menu size={22} />
                    </button>

                    <div className="al-breadcrumb">
                        <span>ADMIN</span> <span className="al-breadcrumb-sep">/</span> <span className="al-breadcrumb-current">{currentNav.name.toUpperCase()}</span>
                    </div>
                    
                    <div className="al-profile">
                        <div className="al-profile-text">
                            <span className="al-profile-name">Rajarajan Vetrivendhan</span>
                            <span className="al-profile-studio">Administrator</span>
                        </div>
                        <div className="al-profile-avatar">
                            <img src="/images/Meet our Team/rajarajan.png" alt="Rajarajan Vetrivendhan" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                        </div>
                        <button onClick={handleLogout} className="al-logout-btn" title="Logout">
                            <LogOut size={16} />
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <div className="al-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
