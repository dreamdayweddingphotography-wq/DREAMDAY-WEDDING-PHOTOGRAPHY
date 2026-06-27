const mongoose = require('mongoose');

const EventDateSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    details: { type: String },
    requirements: [{ type: String }]
});

const QuotationSchema = new mongoose.Schema({
    clientInfo: {
        name: { type: String, required: true },
        phone: { type: String, required: true }
    },
    eventDetails: {
        eventType: { type: String, required: true },
        events: [EventDateSchema],
        location: { type: String }
    },
    notes: { type: String },
    deliverables: {
        albums: [{ type: String }],
        finalOut: [{ type: String }],
        complementary: [{ type: String }]
    },
    additionalServices: [{
        name: { type: String },
        price: { type: Number }
    }],
    pricing: {
        packagePrice: { type: Number, required: true },
        discountPercentage: { type: Number, default: 0 },
        finalTotal: { type: Number, required: true }
    },
    status: {
        type: String,
        enum: ['DRAFT', 'SENT', 'CONFIRMED', 'COMPLETED'],
        default: 'SENT'
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quotation', QuotationSchema);
