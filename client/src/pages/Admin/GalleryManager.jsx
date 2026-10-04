import React, { useState, useEffect, useRef } from 'react';
import { Upload, Trash2, Edit, Plus, Image as ImageIcon, X } from 'lucide-react';
import defaultGalleryData from '../../utils/galleryData.json';
import { optimizeImage } from '../../utils/imageOptimizer';
import { saveToDB, loadFromDB } from '../../utils/db';
import './GalleryManager.css';

const GalleryManager = () => {
    const galleryFileInputRef = useRef(null);

    const dataUrlToBlob = (dataUrl) => {
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    };

    const uploadToCloudinary = async (file) => {
        const optimizedDataUrl = await optimizeImage(file);
        const blob = dataUrlToBlob(optimizedDataUrl);
        const formData = new FormData();
        formData.append('image', blob, file.name);
        const res = await fetch('/api/content/upload', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        if(data.success) {
            return data.data.imageUrl;
        }
        throw new Error(data.message || "Upload failed");
    };

    const [categories, setCategories] = useState(defaultGalleryData);

    useEffect(() => {
        loadFromDB('dwp_gallery_data').then(data => {
            if (data) {
                setCategories(data);
            } else {
                const ls = localStorage.getItem('dwp_gallery_data');
                if (ls) setCategories(JSON.parse(ls));
            }
        }).catch(console.error);
    }, []);

    const [activeCategoryId, setActiveCategoryId] = useState('wedding');

    useEffect(() => {
        if (categories.length > 0 && categories !== defaultGalleryData) {
            saveToDB('dwp_gallery_data', categories).catch(err => {
                console.error("Save to DB failed", err);
                alert("Storage error! Could not save data.");
            });
        }
    }, [categories]);

    // Modal States
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingClient, setEditingClient] = useState(null); // client object or null
    const [deletingClient, setDeletingClient] = useState(null); // client object or null
    const [managingImagesClient, setManagingImagesClient] = useState(null); // client object or null

    useEffect(() => {
        if (isAddModalOpen || editingClient || deletingClient || managingImagesClient) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isAddModalOpen, editingClient, deletingClient, managingImagesClient]);

    // Form States for Add / Edit Client
    const [clientForm, setClientForm] = useState({
        name: '',
        displayTitle: '',
        description: '',
        coverImage: '',
        active: true
    });
    const [coverFileName, setCoverFileName] = useState('No file chosen');

    const activeCategory = categories.find(c => c.id === activeCategoryId) || categories[0];

    // Reset Form
    const resetForm = () => {
        setClientForm({
            name: '',
            displayTitle: '',
            description: '',
            coverImage: '',
            active: true
        });
        setCoverFileName('No file chosen');
    };

    // Open Add Modal
    const handleOpenAddModal = () => {
        resetForm();
        setIsAddModalOpen(true);
    };

    // Open Edit Modal
    const handleOpenEditModal = (client) => {
        setEditingClient(client);
        setClientForm({
            name: client.name || '',
            displayTitle: client.displayTitle || `${client.name} - COIMBATORE`,
            description: client.description || '',
            coverImage: client.coverImage || '',
            active: client.active !== false
        });
        setCoverFileName(client.coverImage ? 'Existing cover image' : 'No file chosen');
    };

    // Handle Cover Image File Selection
    const handleCoverImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setCoverFileName("Uploading...");
            try {
                const cloudUrl = await uploadToCloudinary(file);
                setClientForm(prev => ({ ...prev, coverImage: cloudUrl }));
                setCoverFileName(file.name);
            } catch (err) {
                console.error(err);
                alert("Failed to upload cover image to cloud.");
                setCoverFileName('No file chosen');
            }
        }
    };

    // Save New Client
    const handleSaveNewClient = (e) => {
        e.preventDefault();
        if (!clientForm.name.trim()) return;

        const newClient = {
            id: `client-${Date.now()}`,
            name: clientForm.name.trim(),
            displayTitle: clientForm.displayTitle.trim() || `${clientForm.name.trim()} - COIMBATORE`,
            description: clientForm.description.trim(),
            coverImage: clientForm.coverImage || '/images/Wedding CC/RAVI KARISMA- KONGU WEDDING/DWP_0008.jpg',
            active: clientForm.active,
            images: []
        };

        setCategories(prevCategories => {
            return prevCategories.map(cat => {
                if (cat.id === activeCategoryId) {
                    return {
                        ...cat,
                        clients: [newClient, ...(cat.clients || [])]
                    };
                }
                return cat;
            });
        });

        setIsAddModalOpen(false);
        resetForm();
    };

    // Save Edited Client
    const handleSaveEditClient = (e) => {
        e.preventDefault();
        if (!clientForm.name.trim() || !editingClient) return;

        setCategories(prevCategories => {
            return prevCategories.map(cat => {
                if (cat.id === activeCategoryId) {
                    return {
                        ...cat,
                        clients: (cat.clients || []).map(cli => {
                            if (cli.id === editingClient.id) {
                                return {
                                    ...cli,
                                    name: clientForm.name.trim(),
                                    displayTitle: clientForm.displayTitle.trim() || `${clientForm.name.trim()} - COIMBATORE`,
                                    description: clientForm.description.trim(),
                                    coverImage: clientForm.coverImage || cli.coverImage,
                                    active: clientForm.active
                                };
                            }
                            return cli;
                        })
                    };
                }
                return cat;
            });
        });

        setEditingClient(null);
        resetForm();
    };

    // Confirm Delete Client
    const handleConfirmDelete = () => {
        if (!deletingClient) return;

        setCategories(prevCategories => {
            return prevCategories.map(cat => {
                if (cat.id === activeCategoryId) {
                    return {
                        ...cat,
                        clients: (cat.clients || []).filter(cli => cli.id !== deletingClient.id)
                    };
                }
                return cat;
            });
        });

        setDeletingClient(null);
    };

    // Helper to process uploaded files (from file picker or drag & drop)
    const processUploadedFiles = async (filesList) => {
        const files = Array.from(filesList);
        if (!files.length || !managingImagesClient) return;
        
        try {
            const uploadPromises = files.map(file => uploadToCloudinary(file));
            const newImageUrls = await Promise.all(uploadPromises);
            
            setCategories(prevCategories => {
                return prevCategories.map(cat => {
                    if (cat.id === activeCategoryId) {
                        return {
                            ...cat,
                            clients: (cat.clients || []).map(cli => {
                                if (cli.id === managingImagesClient.id) {
                                    const updatedImages = [...(cli.images || []), ...newImageUrls];
                                    setManagingImagesClient(prev => ({ ...prev, images: updatedImages }));
                                    return { ...cli, images: updatedImages };
                                }
                                return cli;
                            })
                        };
                    }
                    return cat;
                });
            });
        } catch (err) {
            console.error(err);
            alert("Failed to upload some images to cloud.");
        }
    };

    // Handle File Input Change
    const handleAddImagesToClient = (e) => {
        if (e.target.files) {
            processUploadedFiles(e.target.files);
        }
    };

    // Handle Drag & Drop
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            processUploadedFiles(e.dataTransfer.files);
            e.dataTransfer.clearData();
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    // Delete single image from Client Gallery
    const handleDeleteImageFromClient = (imageIdx) => {
        if (!managingImagesClient) return;

        const updatedImages = managingImagesClient.images.filter((_, idx) => idx !== imageIdx);
        setManagingImagesClient(prev => ({ ...prev, images: updatedImages }));

        setCategories(prevCategories => {
            return prevCategories.map(cat => {
                if (cat.id === activeCategoryId) {
                    return {
                        ...cat,
                        clients: (cat.clients || []).map(cli => {
                            if (cli.id === managingImagesClient.id) {
                                return { ...cli, images: updatedImages };
                            }
                            return cli;
                        })
                    };
                }
                return cat;
            });
        });
    };

    return (
        <div className="gm-container">
            <div className="gm-header">
                <h1>GALLERY MANAGEMENT</h1>
            </div>

            <div className="gm-tabs-container">
                {categories.map(category => (
                    <button 
                        key={category.id}
                        className={`gm-tab ${activeCategoryId === category.id ? 'active' : ''}`}
                        onClick={() => setActiveCategoryId(category.id)}
                    >
                        {category.title.toUpperCase()}
                    </button>
                ))}
            </div>

            <div className="gm-content-header">
                <h2>Clients / Events in {activeCategory?.title}</h2>
                <button className="gm-add-btn" onClick={handleOpenAddModal}>
                    <Plus size={16} /> ADD CLIENT
                </button>
            </div>

            <div className="gm-table-wrapper">
                <table className="gm-table">
                    <thead>
                        <tr>
                            <th>COVER</th>
                            <th>CLIENT / EVENT NAME</th>
                            <th>IMAGES</th>
                            <th>STATUS</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activeCategory?.clients?.length === 0 ? (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: '#888' }}>
                                    No clients found in this category. Click "+ ADD CLIENT" to create one.
                                </td>
                            </tr>
                        ) : (
                            activeCategory?.clients?.map(client => (
                                <tr key={client.id}>
                                    <td>
                                        <div className="gm-cover-img">
                                            <img src={client.coverImage} alt={client.name} />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="gm-client-name">{client.name}</div>
                                        <div className="gm-client-sub">{client.displayTitle || `${client.name} - COIMBATORE`}</div>
                                    </td>
                                    <td>
                                        <span className="gm-images-count">{client.images?.length || 0}</span>
                                    </td>
                                    <td>
                                        <span className={`gm-status ${client.active !== false ? 'active' : 'inactive'}`}>
                                            {client.active !== false ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="gm-actions">
                                            <button 
                                                className="gm-action-btn view" 
                                                title="Manage Images"
                                                onClick={() => setManagingImagesClient(client)}
                                            >
                                                <ImageIcon size={16} />
                                            </button>
                                            <button 
                                                className="gm-action-btn edit" 
                                                title="Edit Client"
                                                onClick={() => handleOpenEditModal(client)}
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button 
                                                className="gm-action-btn delete" 
                                                title="Delete Client"
                                                onClick={() => setDeletingClient(client)}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* ADD CLIENT MODAL */}
            {isAddModalOpen && (
                <div className="gm-modal-overlay" onClick={() => setIsAddModalOpen(false)}>
                    <div className="gm-modal" onClick={e => e.stopPropagation()}>
                        <div className="gm-modal-header">
                            <h3>Add New Client</h3>
                            <button className="gm-modal-close" onClick={() => setIsAddModalOpen(false)}>
                                <X size={18} />
                            </button>
                        </div>
                        <form onSubmit={handleSaveNewClient} className="gm-modal-body">
                            <div className="gm-form-group">
                                <label>CLIENT NAME (REQUIRED)</label>
                                <input 
                                    type="text" 
                                    required 
                                    value={clientForm.name}
                                    onChange={e => setClientForm({ ...clientForm, name: e.target.value })}
                                />
                            </div>



                            <div className="gm-form-group">
                                <label>SHORT DESCRIPTION</label>
                                <textarea 
                                    rows="3"
                                    value={clientForm.description}
                                    onChange={e => setClientForm({ ...clientForm, description: e.target.value })}
                                />
                            </div>

                            <div className="gm-form-group">
                                <label>COVER IMAGE</label>
                                <div className="gm-file-input-wrapper">
                                    <label className="gm-choose-btn">
                                        CHOOSE FILE
                                        <input 
                                            type="file" 
                                            accept="image/*"
                                            onChange={handleCoverImageChange}
                                        />
                                    </label>
                                    <span className="gm-file-name">{coverFileName}</span>
                                </div>
                            </div>

                            <div className="gm-checkbox-group">
                                <label className="gm-checkbox-label">
                                    <input 
                                        type="checkbox" 
                                        checked={clientForm.active}
                                        onChange={e => setClientForm({ ...clientForm, active: e.target.checked })}
                                    />
                                    <span>ACTIVE (VISIBLE ON WEBSITE)</span>
                                </label>
                            </div>

                            <div className="gm-modal-footer">
                                <button type="button" className="gm-btn-cancel" onClick={() => setIsAddModalOpen(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="gm-btn-save">
                                    SAVE CLIENT
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* EDIT CLIENT MODAL */}
            {editingClient && (
                <div className="gm-modal-overlay" onClick={() => setEditingClient(null)}>
                    <div className="gm-modal" onClick={e => e.stopPropagation()}>
                        <div className="gm-modal-header">
                            <h3>Edit Client</h3>
                            <button className="gm-modal-close" onClick={() => setEditingClient(null)}>
                                <X size={18} />
                            </button>
                        </div>
                        <form onSubmit={handleSaveEditClient} className="gm-modal-body">
                            <div className="gm-form-group">
                                <label>CLIENT NAME (REQUIRED)</label>
                                <input 
                                    type="text" 
                                    required 
                                    value={clientForm.name}
                                    onChange={e => setClientForm({ ...clientForm, name: e.target.value })}
                                />
                            </div>



                            <div className="gm-form-group">
                                <label>SHORT DESCRIPTION</label>
                                <textarea 
                                    rows="3"
                                    value={clientForm.description}
                                    onChange={e => setClientForm({ ...clientForm, description: e.target.value })}
                                />
                            </div>

                            <div className="gm-form-group">
                                <label>COVER IMAGE (LEAVE EMPTY TO KEEP EXISTING)</label>
                                <div className="gm-file-input-wrapper">
                                    <label className="gm-choose-btn">
                                        CHOOSE FILE
                                        <input 
                                            type="file" 
                                            accept="image/*"
                                            onChange={handleCoverImageChange}
                                        />
                                    </label>
                                    <span className="gm-file-name">{coverFileName}</span>
                                </div>
                            </div>

                            <div className="gm-checkbox-group">
                                <label className="gm-checkbox-label">
                                    <input 
                                        type="checkbox" 
                                        checked={clientForm.active}
                                        onChange={e => setClientForm({ ...clientForm, active: e.target.checked })}
                                    />
                                    <span>ACTIVE (VISIBLE ON WEBSITE)</span>
                                </label>
                            </div>

                            <div className="gm-modal-footer">
                                <button type="button" className="gm-btn-cancel" onClick={() => setEditingClient(null)}>
                                    Cancel
                                </button>
                                <button type="submit" className="gm-btn-save">
                                    SAVE CLIENT
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* DELETE CLIENT MODAL */}
            {deletingClient && (
                <div className="gm-modal-overlay" onClick={() => setDeletingClient(null)}>
                    <div className="gm-modal gm-modal-sm" onClick={e => e.stopPropagation()}>
                        <div className="gm-modal-header">
                            <h3 className="gm-title-danger">Delete Client</h3>
                            <button className="gm-modal-close" onClick={() => setDeletingClient(null)}>
                                <X size={18} />
                            </button>
                        </div>
                        <div className="gm-modal-body">
                            <p className="gm-delete-msg">
                                Are you sure you want to delete this client? All images will also be removed. This action cannot be undone.
                            </p>
                            <div className="gm-modal-footer">
                                <button type="button" className="gm-btn-cancel" onClick={() => setDeletingClient(null)}>
                                    Cancel
                                </button>
                                <button type="button" className="gm-btn-delete" onClick={handleConfirmDelete}>
                                    DELETE
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* MANAGE IMAGES MODAL */}
            {managingImagesClient && (
                <div className="gm-modal-overlay" onClick={() => setManagingImagesClient(null)}>
                    <div className="gm-modal gm-modal-lg" onClick={e => e.stopPropagation()}>
                        <div className="gm-modal-header">
                            <h3>Manage Images - {managingImagesClient.name}</h3>
                            <button className="gm-modal-close" onClick={() => setManagingImagesClient(null)}>
                                <X size={18} />
                            </button>
                        </div>
                        <div className="gm-modal-body">
                            <label 
                                className="gm-dropzone"
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                            >
                                <Upload size={32} className="gm-dropzone-icon" />
                                <span>Click to browse or drag and drop images here</span>
                                <input 
                                    type="file" 
                                    multiple 
                                    accept="image/*" 
                                    onChange={handleAddImagesToClient}
                                    style={{ display: 'none' }}
                                />
                            </label>

                            <div className="gm-image-grid">
                                {managingImagesClient.images?.length === 0 ? (
                                    <div className="gm-no-images">No gallery images added yet.</div>
                                ) : (
                                    managingImagesClient.images?.map((imgUrl, idx) => (
                                        <div key={idx} className="gm-grid-item">
                                            <img src={imgUrl} alt={`Gallery ${idx + 1}`} />
                                            <button 
                                                type="button"
                                                className="gm-img-delete-btn"
                                                title="Delete Image"
                                                onClick={() => handleDeleteImageFromClient(idx)}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GalleryManager;
