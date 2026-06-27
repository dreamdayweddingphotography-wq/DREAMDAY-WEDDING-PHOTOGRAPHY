import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Eye, EyeOff } from 'lucide-react';
import './AdminLogin.css';

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (login(password)) {
            navigate('/admin');
        } else {
            setError('Invalid password');
        }
    };

    return (
        <div className="admin-login-wrapper">
            <div className="admin-login-card">
                
                {/* Header */}
                <div className="al-header">
                    <img src="/logo.png" alt="Logo" className="al-logo" />
                    <h1 className="al-title">Admin Portal</h1>
                    <p className="al-subtitle">DREAMDAY WEDDING PHOTOGRAPHY</p>
                </div>
                
                <div className="al-divider"></div>

                <p className="al-description">
                    Authorized personnel only. Enter your credentials to continue.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="al-form">
                    <div className="al-input-group">
                        <label><Lock size={12} style={{marginRight: 6}} />PASSWORD</label>
                        <div className="al-input-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter admin password"
                                required
                            />
                            <button 
                                type="button" 
                                className="al-eye-btn"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>
                    
                    {error && <p className="al-error">{error}</p>}
                    
                    <button type="submit" className="al-submit-btn">
                        <Lock size={14} style={{marginRight: 8}} /> ACCESS DASHBOARD
                    </button>
                </form>

                <p className="al-footer">
                    &copy; 2026 Dreamday Wedding Photography — Internal Use Only
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;
