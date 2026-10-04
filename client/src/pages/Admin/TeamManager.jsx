import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, UploadCloud, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import { optimizeImage } from '../../utils/imageOptimizer';
import './TeamManager.css';

const defaultTeam = [
  { id: '1', name: 'Rajarajan Vetrivendhan', role: 'Founder & Lead Photographer', image: '/images/Meet our Team/rajarajan.png' },
  { id: '2', name: 'Arun Kumar', role: 'Cinematographer', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80' },
  { id: '3', name: 'Priya Sharma', role: 'Creative Director', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' },
  { id: '4', name: 'Karthik Raj', role: 'Candid Specialist', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' }
];

const TeamManager = () => {
    const [team, setTeam] = useState(() => {
        const saved = localStorage.getItem('dwp_team_data');
        if (saved) return JSON.parse(saved);
        return defaultTeam;
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState(null);
    const [form, setForm] = useState({ name: '', role: '', image: '' });
    
    useEffect(() => {
        try {
            localStorage.setItem('dwp_team_data', JSON.stringify(team));
        } catch (e) {
            console.error("Failed to save team data:", e);
            if (e.name === 'QuotaExceededError') {
                toast.error("Storage limit exceeded! Image is too large.");
            }
        }
    }, [team]);

    const handleOpenModal = (member = null) => {
        if (member) {
            setEditingMember(member);
            setForm({ name: member.name, role: member.role, image: member.image });
        } else {
            setEditingMember(null);
            setForm({ name: '', role: '', image: '' });
        }
        setIsModalOpen(true);
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const optimizedDataUrl = await optimizeImage(file);
                setForm({ ...form, image: optimizedDataUrl });
            } catch (err) {
                toast.error("Failed to process image.");
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.role || !form.image) {
            toast.error('Please fill all fields');
            return;
        }

        if (editingMember) {
            setTeam(team.map(t => t.id === editingMember.id ? { ...t, ...form } : t));
            toast.success('Team member updated');
        } else {
            setTeam([...team, { id: Date.now().toString(), ...form }]);
            toast.success('Team member added');
        }
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to remove this team member?")) {
            setTeam(team.filter(t => t.id !== id));
            toast.success("Team member removed");
        }
    };

    return (
        <div className="tm-container">
            <div className="tm-header">
                <div>
                    <h1>Meet Our Team</h1>
                    <p>Manage the team members displayed on the website.</p>
                </div>
                <button className="tm-add-btn" onClick={() => handleOpenModal()}>
                    <Plus size={16} /> ADD TEAM MEMBER
                </button>
            </div>

            <div className="tm-grid">
                {team.length === 0 ? (
                    <div className="tm-empty">No team members found. Click "Add Team Member" to add one.</div>
                ) : (
                    team.map(member => (
                        <div className="tm-card" key={member.id}>
                            <div className="tm-img-wrapper">
                                <img src={member.image} alt={member.name} />
                                <div className="tm-card-overlay">
                                    <button className="tm-action-btn edit" onClick={() => handleOpenModal(member)}>
                                        <Edit size={16} />
                                    </button>
                                    <button className="tm-action-btn delete" onClick={() => handleDelete(member.id)}>
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="tm-info">
                                <h3>{member.name}</h3>
                                <p>{member.role}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {isModalOpen && (
                <div className="tm-modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="tm-modal" onClick={e => e.stopPropagation()}>
                        <div className="tm-modal-header">
                            <h2>{editingMember ? 'Edit Team Member' : 'Add New Team Member'}</h2>
                            <button className="tm-close-btn" onClick={() => setIsModalOpen(false)}>
                                <X size={18} />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="tm-modal-body">
                            <div className="tm-form-group">
                                <label>MEMBER NAME</label>
                                <input 
                                    type="text" 
                                    value={form.name} 
                                    onChange={(e) => setForm({...form, name: e.target.value})} 
                                    placeholder="e.g. Rajarajan Vetrivendhan"
                                />
                            </div>
                            
                            <div className="tm-form-group">
                                <label>ROLE / POSITION</label>
                                <input 
                                    type="text" 
                                    value={form.role} 
                                    onChange={(e) => setForm({...form, role: e.target.value})} 
                                    placeholder="e.g. Lead Photographer"
                                />
                            </div>

                            <div className="tm-form-group">
                                <label>PROFILE PHOTO</label>
                                <label className="tm-upload-box">
                                    {form.image ? (
                                        <div className="tm-image-preview">
                                            <img src={form.image} alt="Preview" />
                                            <span>Click to change</span>
                                        </div>
                                    ) : (
                                        <div className="tm-upload-placeholder">
                                            <UploadCloud size={24} />
                                            <span>Browse Image</span>
                                        </div>
                                    )}
                                    <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                                </label>
                            </div>
                            
                            <div className="tm-modal-footer">
                                <button type="button" className="tm-btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" className="tm-btn-save">{editingMember ? 'SAVE CHANGES' : 'ADD MEMBER'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeamManager;
