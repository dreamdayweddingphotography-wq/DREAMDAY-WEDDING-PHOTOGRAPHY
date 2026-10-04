import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Edit, X } from 'lucide-react';
import { optimizeImage } from '../../utils/imageOptimizer';
import './ImageManager.css';

const ImageManager = () => {
    // Home Cards State
    const [homeCards, setHomeCards] = useState(() => {
        const saved = localStorage.getItem('dwp_home_cards_v2');
        if (saved) return JSON.parse(saved);
        return [
            { id: 1, category: 'WEDDING', title: 'A Celebration of Love & Traditions', image: '/images/Wedding CC/VINESH MANJUBASHINI- KONGU WEDDING/DWP_0005.jpg' },
            { id: 2, category: 'RECEPTION', title: 'Moments of joy, laughter, and togetherness.', image: '/images/RECEPTION CC/RAVI KARISMA- KONGU RECEPTION/DWP_0009.jpg' },
            { id: 3, category: 'CEREMONY', title: 'Celebrating the miracle of life and traditions.', image: '/images/Cermony CC/VIKASHINI SAREE CEREMONY/DWP_1272.JPG' },
            { id: 4, category: 'OUTDOOR SHOOT', title: 'The Promise of Always — Framed under open skies.', image: '/images/OUTDOOR CC/SANTHOSH EMILIYA/DWP_1129.JPG' }
        ];
    });
    
    const [editingHomeCard, setEditingHomeCard] = useState(null);

    useEffect(() => {
        try {
            localStorage.setItem('dwp_home_cards_v2', JSON.stringify(homeCards));
        } catch (e) {
            console.error("Failed to save home cards:", e);
            if (e.name === 'QuotaExceededError') {
                toast.error("Storage limit exceeded! Image is too large.");
            }
        }
    }, [homeCards]);

    const saveHomeCard = () => {
        if (!editingHomeCard) return;
        setHomeCards(homeCards.map(c => c.id === editingHomeCard.id ? editingHomeCard : c));
        setEditingHomeCard(null);
        toast.success('Home card updated successfully');
    };

    const handleHomeCardImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                // Compress and resize image client-side before base64
                const optimizedDataUrl = await optimizeImage(file);
                setEditingHomeCard({ ...editingHomeCard, image: optimizedDataUrl });
            } catch (err) {
                toast.error("Failed to process image.");
            }
        }
    };

    return (
        <div className="im-container">
            <div className="im-home-cards-section">
                <h2 className="im-section-title">Home Story Cards (Edit Only)</h2>
                <div className="im-home-cards-grid">
                    {homeCards.map(card => (
                        <div className="im-home-card" key={card.id}>
                            <div className="im-hc-img">
                                <img src={card.image} alt={card.category} />
                            </div>
                            <div className="im-hc-content">
                                <span className="im-hc-category">{card.category}</span>
                                <p className="im-hc-title">{card.title}</p>
                            </div>
                            <button 
                                className="im-hc-manage-btn"
                                onClick={() => setEditingHomeCard(card)}
                            >
                                <Edit size={14} /> Manage Details
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* HOME CARD EDIT MODAL */}
            {editingHomeCard && (
                <div className="im-modal-overlay" onClick={() => setEditingHomeCard(null)}>
                    <div className="im-modal" onClick={e => e.stopPropagation()}>
                        <div className="im-modal-header">
                            <h3>Edit Home Card</h3>
                            <button className="im-modal-close" onClick={() => setEditingHomeCard(null)}>
                                <X size={18} />
                            </button>
                        </div>
                        <div className="im-modal-body">
                            <div className="im-form-group">
                                <label>CLIENT NAME / TITLE</label>
                                <textarea 
                                    rows="3"
                                    value={editingHomeCard.title}
                                    onChange={(e) => setEditingHomeCard({...editingHomeCard, title: e.target.value})}
                                />
                            </div>
                            <div className="im-form-group">
                                <label>COVER IMAGE</label>
                                <div className="im-file-input-wrapper">
                                    <label className="im-choose-btn">
                                        CHOOSE FILE
                                        <input 
                                            type="file" 
                                            accept="image/*"
                                            onChange={handleHomeCardImageChange}
                                        />
                                    </label>
                                    <span className="im-file-name">Change cover image</span>
                                </div>
                                {editingHomeCard.image && (
                                    <div style={{marginTop: '10px', width: '100px', height: '60px', borderRadius: '4px', overflow: 'hidden'}}>
                                        <img src={editingHomeCard.image} alt="Preview" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                                    </div>
                                )}
                            </div>
                            <div className="im-modal-footer">
                                <button className="im-btn-cancel" onClick={() => setEditingHomeCard(null)}>Cancel</button>
                                <button className="im-btn-save" onClick={saveHomeCard}>SAVE CHANGES</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageManager;
