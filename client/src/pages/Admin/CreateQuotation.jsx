import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
    ArrowLeft, 
    User, 
    Calendar, 
    MapPin, 
    FileText, 
    Package, 
    Plus, 
    X,
    Printer,
    Download,
    Save
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import './CreateQuotation.css';

const CreateQuotation = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = Boolean(id);
    
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    
    const [clientInfo, setClientInfo] = useState({ name: '', phone: '' });
    const [eventType, setEventType] = useState('');
    const [location, setLocation] = useState('');
    const [notes, setNotes] = useState('');
    
    // Arrays for dynamic lists
    const [events, setEvents] = useState([
        { date: '', details: '', requirements: [''] }
    ]);
    
    const [albums, setAlbums] = useState(['']);
    const [finalOut, setFinalOut] = useState(['']);
    const [complementary, setComplementary] = useState(['']);
    
    const [additionalServices, setAdditionalServices] = useState([]);
    
    // Pricing
    const [packagePrice, setPackagePrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [finalTotal, setFinalTotal] = useState(0);

    useEffect(() => {
        if (isEditMode) {
            const fetchQuotation = async () => {
                try {
                    const res = await axios.get(`/api/quotations/${id}`);
                    const q = res.data.data;
                    
                    setClientInfo(q.clientInfo || { name: '', phone: '' });
                    setEventType(q.eventDetails?.eventType || '');
                    setLocation(q.eventDetails?.location || '');
                    setEvents(q.eventDetails?.events || [{ date: '', details: '', requirements: [''] }]);
                    setNotes(q.notes || '');
                    setAlbums(q.deliverables?.albums || ['']);
                    setFinalOut(q.deliverables?.finalOut || ['']);
                    setComplementary(q.deliverables?.complementary || ['']);
                    setAdditionalServices(q.additionalServices || []);
                    setPackagePrice(q.pricing?.packagePrice || '');
                    setDiscount(q.pricing?.discountPercentage || '');
                } catch (err) {
                    toast.error('Failed to load quotation');
                }
            };
            fetchQuotation();
        }
    }, [isEditMode, id]);

    // Auto-calculate final total
    useEffect(() => {
        let total = parseFloat(packagePrice) || 0;
        
        // Add dynamic services
        additionalServices.forEach(service => {
            const price = parseFloat(service.price);
            if (!isNaN(price)) {
                total += price;
            }
        });
        
        // Apply discount
        if (discount && parseFloat(discount) > 0) {
            total = total - (total * (parseFloat(discount) / 100));
        }
        
        setFinalTotal(total);
    }, [packagePrice, discount, additionalServices]);

    // Helpers for dynamic arrays
    const handleEventChange = (index, field, value) => {
        const newEvents = [...events];
        newEvents[index][field] = value;
        setEvents(newEvents);
    };

    const handleRequirementChange = (eventIndex, reqIndex, value) => {
        const newEvents = [...events];
        newEvents[eventIndex].requirements[reqIndex] = value;
        setEvents(newEvents);
    };

    const addRequirement = (eventIndex) => {
        const newEvents = [...events];
        newEvents[eventIndex].requirements.push('');
        setEvents(newEvents);
    };

    const removeRequirement = (eventIndex, reqIndex) => {
        const newEvents = [...events];
        newEvents[eventIndex].requirements.splice(reqIndex, 1);
        setEvents(newEvents);
    };

    const addEvent = () => {
        setEvents([...events, { date: '', details: '', requirements: [''] }]);
    };

    const removeEvent = (index) => {
        const newEvents = [...events];
        newEvents.splice(index, 1);
        setEvents(newEvents);
    };

    // Generic list helpers for Deliverables
    const handleListChange = (setter, list, index, value) => {
        const newList = [...list];
        newList[index] = value;
        setter(newList);
    };
    const addListItem = (setter, list) => setter([...list, '']);
    const removeListItem = (setter, list, index) => {
        const newList = [...list];
        newList.splice(index, 1);
        setter(newList);
    };

    const handleAdditionalServiceChange = (index, field, value) => {
        const newServices = [...additionalServices];
        newServices[index][field] = value;
        setAdditionalServices(newServices);
    };

    const addAdditionalService = () => {
        setAdditionalServices([...additionalServices, { name: '', price: '' }]);
    };

    const removeAdditionalService = (index) => {
        const newServices = [...additionalServices];
        newServices.splice(index, 1);
        setAdditionalServices(newServices);
    };

    const handleSave = async () => {
        // Validation
        const newErrors = {};
        if (!clientInfo.name.trim()) newErrors.clientName = 'Client name is required';
        if (!clientInfo.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!eventType) newErrors.eventType = 'Please select an event type';
        if (!packagePrice || parseFloat(packagePrice) <= 0) newErrors.packagePrice = 'Valid package price is required';
        
        // Ensure at least one event date/detail is filled if multiple exist, or just check first one
        if (!events[0].date) newErrors.eventDate = 'At least one event date is required';
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            toast.error('Please fill in all required fields highlighted in red.');
            return;
        }
        
        // Clear errors if validation passes
        setErrors({});

        try {
            setLoading(true);
            
            const payload = {
                clientInfo,
                eventDetails: {
                    eventType,
                    events: events.filter(e => e.date), // Filter empty dates, details optional
                    location
                },
                notes,
                deliverables: {
                    albums: albums.filter(a => a.trim() !== ''),
                    finalOut: finalOut.filter(a => a.trim() !== ''),
                    complementary: complementary.filter(a => a.trim() !== '')
                },
                additionalServices: additionalServices.filter(s => s.name.trim() !== ''),
                pricing: {
                    packagePrice: parseFloat(packagePrice) || 0,
                    discountPercentage: parseFloat(discount) || 0,
                    finalTotal
                }
            };

            if (isEditMode) {
                await axios.put(`/api/quotations/${id}`, payload);
                toast.success('Quotation updated successfully!');
            } else {
                await axios.post('/api/quotations', payload);
                toast.success('Quotation saved successfully!');
            }
            navigate('/admin');
        } catch (error) {
            console.error(error);
            toast.error(isEditMode ? 'Error updating quotation.' : 'Error saving quotation.');
        } finally {
            setLoading(false);
        }
    };

    const isFormValid = 
        clientInfo.name.trim() !== '' && 
        clientInfo.phone.trim() !== '' && 
        eventType !== '' && 
        events[0]?.date &&
        parseFloat(packagePrice) > 0;

    return (
        <div className="cq-container">
            <div className="cq-header">
                <button className="cq-back-btn" onClick={() => navigate('/admin')}>
                    <ArrowLeft size={20} /> Back
                </button>
                <h1>{isEditMode ? 'Edit Quotation' : 'New Quotation'}</h1>
            </div>

            <div className="cq-grid">
                {/* Left Column */}
                <div className="cq-left">
                    
                    {/* Client Info */}
                    <div className="cq-card">
                        <div className="cq-card-title"><User size={14} /> CLIENT INFORMATION</div>
                        <div className="cq-form-group">
                            <label>Client Name *</label>
                            <input 
                                type="text" 
                                className={`cq-input ${errors.clientName ? 'error' : ''}`} 
                                placeholder="e.g. Priya & Arjun"
                                value={clientInfo.name}
                                onChange={e => {
                                    setClientInfo({...clientInfo, name: e.target.value});
                                    if(errors.clientName) setErrors({...errors, clientName: null});
                                }}
                            />
                            {errors.clientName && <div className="cq-error-text">{errors.clientName}</div>}
                        </div>
                        <div className="cq-form-group">
                            <label>Phone *</label>
                            <input 
                                type="text" 
                                className={`cq-input ${errors.phone ? 'error' : ''}`}
                                placeholder="10-digit mobile number"
                                value={clientInfo.phone}
                                maxLength="10"
                                onChange={e => {
                                    const val = e.target.value.replace(/\D/g, '');
                                    setClientInfo({...clientInfo, phone: val});
                                    if(errors.phone) setErrors({...errors, phone: null});
                                }}
                            />
                            {errors.phone && <div className="cq-error-text">{errors.phone}</div>}
                        </div>
                    </div>

                    {/* Event Details */}
                    <div className="cq-card">
                        <div className="cq-card-title"><Calendar size={14} /> EVENT DETAILS</div>
                        
                        <div className="cq-form-group">
                            <label>Event Type *</label>
                            <select 
                                className={`cq-input ${errors.eventType ? 'error' : ''}`}
                                value={eventType}
                                onChange={e => {
                                    setEventType(e.target.value);
                                    if(errors.eventType) setErrors({...errors, eventType: null});
                                }}
                            >
                                <option value="">Select event type...</option>
                                <option value="Wedding">Wedding</option>
                                <option value="Engagement">Engagement</option>
                                <option value="Pre-Wedding">Pre-Wedding</option>
                                <option value="Maternity">Maternity</option>
                                <option value="Baby Shower">Baby Shower</option>
                            </select>
                            {errors.eventType && <div className="cq-error-text">{errors.eventType}</div>}
                        </div>

                        <div className="cq-form-group">
                            <label>Event Dates & Details *</label>
                            {events.map((event, eventIdx) => (
                                <div key={eventIdx} className="cq-event-box">
                                    <div className="cq-event-row">
                                        <input 
                                            type="date" 
                                            className={`cq-input ${eventIdx === 0 && errors.eventDate ? 'error' : ''}`} 
                                            style={{flex: 1}}
                                            value={event.date}
                                            onChange={e => {
                                                handleEventChange(eventIdx, 'date', e.target.value);
                                                if(eventIdx === 0 && errors.eventDate) setErrors({...errors, eventDate: null});
                                            }}
                                        />
                                        <input 
                                            type="text" 
                                            className="cq-input" 
                                            style={{flex: 2}}
                                            placeholder="e.g. Reception, Haldi..."
                                            value={event.details}
                                            onChange={e => handleEventChange(eventIdx, 'details', e.target.value)}
                                        />
                                        {events.length > 1 && (
                                            <button className="cq-remove-btn" onClick={() => removeEvent(eventIdx)}>
                                                <X size={16} />
                                            </button>
                                        )}
                                    </div>
                                    
                                    <div style={{marginTop: 12, paddingLeft: 12, borderLeft: '2px solid var(--al-border)'}}>
                                        <label style={{fontSize: 9}}>REQUIREMENTS</label>
                                        {event.requirements.map((req, reqIdx) => (
                                            <div key={reqIdx} className="cq-req-row">
                                                <input 
                                                    type="text" 
                                                    className="cq-input" 
                                                    placeholder="Traditional Photography"
                                                    value={req}
                                                    onChange={e => handleRequirementChange(eventIdx, reqIdx, e.target.value)}
                                                />
                                                <button className="cq-remove-btn" onClick={() => removeRequirement(eventIdx, reqIdx)}>
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ))}
                                        <button className="cq-add-btn" onClick={() => addRequirement(eventIdx)}>
                                            + Add Requirement
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button className="cq-add-btn" onClick={addEvent}>+ Add Event Date</button>
                        </div>

                        <div className="cq-form-group">
                            <label><MapPin size={12} style={{display:'inline', marginRight: 4}}/> Location / Venue</label>
                            <input 
                                type="text" 
                                className="cq-input" 
                                placeholder="e.g. Grand Ballroom, Coimbatore"
                                value={location}
                                onChange={e => setLocation(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="cq-card">
                        <div className="cq-card-title"><FileText size={14} /> NOTES</div>
                        <textarea 
                            className="cq-input" 
                            placeholder="Any special requirements, instructions, or terms for this client..."
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                        />
                    </div>

                </div>

                {/* Right Column */}
                <div className="cq-right">
                    
                    {/* Deliverables */}
                    <div className="cq-card">
                        <div className="cq-card-title"><Package size={14} /> DELIVERABLES</div>
                        
                        <div className="cq-form-group">
                            <label>Albums</label>
                            {albums.map((item, i) => (
                                <div key={i} className="cq-req-row">
                                    <input type="text" className="cq-input" value={item} onChange={e => handleListChange(setAlbums, albums, i, e.target.value)} />
                                    <button className="cq-remove-btn" onClick={() => removeListItem(setAlbums, albums, i)}><X size={14} /></button>
                                </div>
                            ))}
                            <button className="cq-add-btn" onClick={() => addListItem(setAlbums, albums)}>+ Add Album</button>
                        </div>

                        <div className="cq-form-group">
                            <label>Final Out (Videos, Drives, etc)</label>
                            {finalOut.map((item, i) => (
                                <div key={i} className="cq-req-row">
                                    <input type="text" className="cq-input" value={item} onChange={e => handleListChange(setFinalOut, finalOut, i, e.target.value)} />
                                    <button className="cq-remove-btn" onClick={() => removeListItem(setFinalOut, finalOut, i)}><X size={14} /></button>
                                </div>
                            ))}
                            <button className="cq-add-btn" onClick={() => addListItem(setFinalOut, finalOut)}>+ Add Final Out</button>
                        </div>

                        <div className="cq-form-group">
                            <label>Complementary</label>
                            {complementary.map((item, i) => (
                                <div key={i} className="cq-req-row">
                                    <input type="text" className="cq-input" value={item} onChange={e => handleListChange(setComplementary, complementary, i, e.target.value)} />
                                    <button className="cq-remove-btn" onClick={() => removeListItem(setComplementary, complementary, i)}><X size={14} /></button>
                                </div>
                            ))}
                            <button className="cq-add-btn" onClick={() => addListItem(setComplementary, complementary)}>+ Add Complementary</button>
                        </div>
                    </div>

                    {/* Additional Services */}
                    <div className="cq-card">
                        <div className="cq-card-title"><Plus size={14} /> ADDITIONAL SERVICES</div>
                        
                        <div className="cq-form-group">
                            {additionalServices.map((service, i) => (
                                <div key={i} className="cq-event-row" style={{marginBottom: '8px'}}>
                                    <input 
                                        type="text" 
                                        className="cq-input" 
                                        style={{flex: 2}}
                                        placeholder="Service Name (e.g. Drone Camera)"
                                        value={service.name}
                                        onChange={e => handleAdditionalServiceChange(i, 'name', e.target.value)}
                                    />
                                    <input 
                                        type="number" 
                                        className="cq-input" 
                                        style={{flex: 1}}
                                        placeholder="Price (₹)"
                                        value={service.price}
                                        onChange={e => handleAdditionalServiceChange(i, 'price', e.target.value)}
                                    />
                                    <button className="cq-remove-btn" onClick={() => removeAdditionalService(i)}>
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                            <button className="cq-add-btn" onClick={addAdditionalService}>
                                + Add Service
                            </button>
                        </div>
                    </div>

                    {/* Pricing Summary */}
                    <div className="cq-card" style={{background: 'var(--al-surface)'}}>
                        <div className="cq-card-title">PRICING SUMMARY</div>
                        
                        <div className="cq-form-group">
                            <label>₹ PACKAGE PRICE *</label>
                            <input 
                                type="number" 
                                className={`cq-input ${errors.packagePrice ? 'error' : ''}`} 
                                placeholder="e.g. 150000"
                                style={{background: '#fff'}}
                                value={packagePrice}
                                onChange={e => {
                                    setPackagePrice(e.target.value);
                                    if(errors.packagePrice) setErrors({...errors, packagePrice: null});
                                }}
                            />
                            {errors.packagePrice && <div className="cq-error-text">{errors.packagePrice}</div>}
                        </div>
                        <div className="cq-form-group">
                            <label>% DISCOUNT (%)</label>
                            <input 
                                type="number" 
                                className="cq-input" 
                                placeholder="e.g. 10"
                                style={{background: '#fff'}}
                                value={discount}
                                onChange={e => setDiscount(e.target.value)}
                            />
                        </div>

                        <div className="cq-total-row">
                            <div className="cq-total-label">FINAL TOTAL</div>
                            <div className="cq-total-value">₹{finalTotal.toLocaleString()}</div>
                        </div>

                        <div className="cq-action-bar">
                            <button className="cq-btn-outline" type="button" onClick={() => navigate(-1)}>Cancel</button>
                            <button 
                                className="cq-btn-primary" 
                                onClick={handleSave} 
                                disabled={loading || !isFormValid}
                            >
                                <Save size={14} /> {loading ? 'Saving...' : (isEditMode ? 'Update Quotation' : 'Save Quotation')}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CreateQuotation;
