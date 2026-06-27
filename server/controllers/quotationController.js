const Quotation = require('../models/Quotation');

// @desc    Create new quotation
// @route   POST /api/quotations
// @access  Public (for now) or Private (if using auth middleware)
exports.createQuotation = async (req, res) => {
    try {
        const quotation = new Quotation(req.body);
        const savedQuotation = await quotation.save();
        res.status(201).json({
            success: true,
            data: savedQuotation
        });
    } catch (error) {
        console.error('Error creating quotation:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error: Could not save quotation'
        });
    }
};

// @desc    Get all quotations
// @route   GET /api/quotations
// @access  Public (for now)
exports.getQuotations = async (req, res) => {
    try {
        const quotations = await Quotation.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: quotations.length,
            data: quotations
        });
    } catch (error) {
        console.error('Error fetching quotations:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// @desc    Get quotation by ID
// @route   GET /api/quotations/:id
// @access  Public (for now)
exports.getQuotationById = async (req, res) => {
    try {
        const quotation = await Quotation.findById(req.params.id);
        if (!quotation) {
            return res.status(404).json({ success: false, message: 'Quotation not found' });
        }
        res.status(200).json({ success: true, data: quotation });
    } catch (error) {
        console.error('Error fetching quotation by ID:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Update quotation by ID
// @route   PUT /api/quotations/:id
// @access  Public (for now)
exports.updateQuotation = async (req, res) => {
    try {
        const quotation = await Quotation.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!quotation) {
            return res.status(404).json({ success: false, message: 'Quotation not found' });
        }
        res.status(200).json({ success: true, data: quotation });
    } catch (error) {
        console.error('Error updating quotation:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc    Delete quotation by ID
// @route   DELETE /api/quotations/:id
// @access  Public (for now)
exports.deleteQuotation = async (req, res) => {
    try {
        const quotation = await Quotation.findByIdAndDelete(req.params.id);
        if (!quotation) {
            return res.status(404).json({ success: false, message: 'Quotation not found' });
        }
        res.status(200).json({ success: true, message: 'Quotation deleted successfully' });
    } catch (error) {
        console.error('Error deleting quotation:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
