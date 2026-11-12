import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X, UploadCloud } from 'lucide-react';
import toast from 'react-hot-toast';
import { DEFAULT_TEAM, loadTeamMembers, saveTeamMembers, uploadTeamPhoto } from '../../utils/teamService';
import './TeamManager.css';

const TeamManager = () => {
    const [team, setTeam] = useState(DEFAULT_TEAM);
    const [loading, setLoading] = useState(true);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [saving, setSaving] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState(null);
    const [form, setForm] = useState({ name: '', role: '', image: '' });

    useEffect(() => {
        let mounted = true;
        loadTeamMembers({ migrateLocalToDb: true })
            .then((members) => {
                if (mounted) setTeam(members);
            })
            .catch((err) => {
                console.error('Failed to load team data:', err);
                toast.error('Failed to load team members from server.');
            })
            .finally(() => {
                if (mounted) setLoading(false);
            });
        return () => {
            mounted = false;
        };
    }, []);

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
        if (!file) return;
        const toastId = toast.loading('Uploading photo...');
        try {
            setUploadingImage(true);
            const imageUrl = await uploadTeamPhoto(file);
            setForm((prev) => ({ ...prev, image: imageUrl }));
            toast.success('Photo uploaded', { id: toastId });
        } catch (err) {
            console.error(err);
            toast.error('Failed to upload image.', { id: toastId });
        } finally {
            setUploadingImage(false);
        }
    };

    const persistTeam = async (updatedTeam, successMessage) => {
        const previousTeam = team;
        setTeam(updatedTeam);
        try {
            setSaving(true);
            await saveTeamMembers(updatedTeam);
            toast.success(successMessage);
        } catch (err) {
            console.error('Failed to save team data:', err);
            setTeam(previousTeam);
            toast.error('Failed to save changes to server.');
        } finally {
            setSaving(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (uploadingImage) {
            toast.error('Please wait for image upload to finish.');
            return;
        }
        if (!form.name.trim() || !form.role.trim() || !form.image) {
            toast.error('Please fill all fields');
            return;
        }

        const updatedTeam = editingMember
            ? team.map((t) => (t.id === editingMember.id ? { ...t, ...form } : t))
            : [...team, { id: Date.now().toString(), ...form }];

        setIsModalOpen(false);
        await persistTeam(
            updatedTeam,
            editingMember ? 'Team member updated' : 'Team member added'
        );
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to remove this team member?')) {
            const updatedTeam = team.filter((t) => t.id !== id);
            await persistTeam(updatedTeam, 'Team member removed');
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
                {loading ? (
                    <div className="tm-empty">Loading team members...</div>
                ) : team.length === 0 ? (
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
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    placeholder="e.g. Rajarajan Vetrivendhan"
                                />
                            </div>

                            <div className="tm-form-group">
                                <label>ROLE / POSITION</label>
                                <input
                                    type="text"
                                    value={form.role}
                                    onChange={(e) => setForm({ ...form, role: e.target.value })}
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
                                <button type="submit" className="tm-btn-save" disabled={uploadingImage || saving}>
                                    {uploadingImage ? 'UPLOADING...' : saving ? 'SAVING...' : (editingMember ? 'SAVE CHANGES' : 'ADD MEMBER')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeamManager;
