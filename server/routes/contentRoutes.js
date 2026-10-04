const express = require('express');
const router = express.Router();
const { GalleryImage, TeamMember, HomeCard, SectionCover } = require('../models/WebsiteContent');
const DataStore = require('../models/DataStore');
const { upload } = require('../config/cloudinary');
const cloudinary = require('../config/cloudinary').cloudinary;

// ==========================================
// DATA STORE ENDPOINTS
// ==========================================
router.get('/store/:key', async (req, res) => {
    try {
        const store = await DataStore.findOne({ key: req.params.key });
        res.json({ success: true, data: store ? store.data : null });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

router.post('/store/:key', async (req, res) => {
    try {
        const store = await DataStore.findOneAndUpdate(
            { key: req.params.key },
            { data: req.body.data },
            { upsert: true, new: true }
        );
        res.json({ success: true, data: store.data });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// ==========================================
// IMAGE UPLOAD ENDPOINT
// ==========================================
// This endpoint expects a form-data field named "image"
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }
        // req.file contains the cloudinary URL and public_id
        res.status(200).json({
            success: true,
            data: {
                imageUrl: req.file.path,
                publicId: req.file.filename // multer-storage-cloudinary uses filename for public_id
            }
        });
    } catch (err) {
        console.error('Upload Error:', err);
        res.status(500).json({ success: false, message: 'Server error during upload' });
    }
});

// ==========================================
// GALLERY ENDPOINTS
// ==========================================
router.get('/gallery', async (req, res) => {
    try {
        const images = await GalleryImage.find().sort({ order: 1, createdAt: -1 });
        res.json({ success: true, data: images });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

router.post('/gallery', async (req, res) => {
    try {
        const newImage = new GalleryImage(req.body);
        await newImage.save();
        res.status(201).json({ success: true, data: newImage });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

router.put('/gallery/:id', async (req, res) => {
    try {
        const updated = await GalleryImage.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, data: updated });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

router.delete('/gallery/:id', async (req, res) => {
    try {
        const image = await GalleryImage.findById(req.params.id);
        if (!image) return res.status(404).json({ success: false, message: 'Not found' });
        
        // Optionally delete from cloudinary
        if (image.publicId) {
            await cloudinary.uploader.destroy(image.publicId).catch(err => console.error("Cloudinary delete error:", err));
        }
        
        await image.deleteOne();
        res.json({ success: true, message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// ==========================================
// TEAM ENDPOINTS
// ==========================================
router.get('/team', async (req, res) => {
    try {
        const team = await TeamMember.find().sort({ order: 1, createdAt: -1 });
        res.json({ success: true, data: team });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

router.post('/team', async (req, res) => {
    try {
        const member = new TeamMember(req.body);
        await member.save();
        res.status(201).json({ success: true, data: member });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

router.put('/team/:id', async (req, res) => {
    try {
        const updated = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, data: updated });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

router.delete('/team/:id', async (req, res) => {
    try {
        const member = await TeamMember.findById(req.params.id);
        if (!member) return res.status(404).json({ success: false, message: 'Not found' });
        
        if (member.publicId) {
            await cloudinary.uploader.destroy(member.publicId).catch(e => console.error(e));
        }
        await member.deleteOne();
        res.json({ success: true, message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// ==========================================
// HOME CARDS ENDPOINTS
// ==========================================
router.get('/home-cards', async (req, res) => {
    try {
        const cards = await HomeCard.find().sort({ cardId: 1 });
        res.json({ success: true, data: cards });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// Create or update a home card
router.post('/home-cards', async (req, res) => {
    try {
        const { cardId } = req.body;
        let card = await HomeCard.findOne({ cardId });
        
        if (card) {
            // Update existing
            if (card.publicId && card.publicId !== req.body.publicId) {
                // Delete old image if it changed
                await cloudinary.uploader.destroy(card.publicId).catch(e => console.error(e));
            }
            card = await HomeCard.findOneAndUpdate({ cardId }, req.body, { new: true });
        } else {
            // Create new
            card = new HomeCard(req.body);
            await card.save();
        }
        res.json({ success: true, data: card });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// ==========================================
// SECTION COVERS ENDPOINTS
// ==========================================
router.get('/sections', async (req, res) => {
    try {
        const sections = await SectionCover.find();
        res.json({ success: true, data: sections });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

router.get('/sections/:sectionId', async (req, res) => {
    try {
        const section = await SectionCover.findOne({ sectionId: req.params.sectionId });
        if (!section) return res.status(404).json({ success: false, message: 'Not found' });
        res.json({ success: true, data: section });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

router.post('/sections', async (req, res) => {
    try {
        const { sectionId } = req.body;
        let section = await SectionCover.findOne({ sectionId });
        
        if (section) {
            section = await SectionCover.findOneAndUpdate({ sectionId }, req.body, { new: true });
        } else {
            section = new SectionCover(req.body);
            await section.save();
        }
        res.json({ success: true, data: section });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

module.exports = router;
