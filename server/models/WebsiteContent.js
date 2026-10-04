const mongoose = require('mongoose');

// Gallery Schema
const gallerySchema = new mongoose.Schema({
  title: { type: String, default: 'Gallery Image' },
  category: { type: String, default: 'Uncategorized' },
  imageUrl: { type: String, required: true },
  publicId: { type: String, required: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

// Team Member Schema
const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  imageUrl: { type: String, required: true },
  publicId: { type: String, required: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

// Home Card Schema
const homeCardSchema = new mongoose.Schema({
  cardId: { type: String, required: true, unique: true }, // e.g. "card1", "card2", "card3", "card4"
  title: { type: String },
  description: { type: String },
  imageUrl: { type: String, required: true },
  publicId: { type: String, required: true },
  link: { type: String }
}, { timestamps: true });

// Section Cover & Details Schema
const sectionCoverSchema = new mongoose.Schema({
  sectionId: { type: String, required: true, unique: true }, // e.g. "about_us", "services"
  coverImageUrl: { type: String },
  coverPublicId: { type: String },
  detailImages: [{
    imageUrl: String,
    publicId: String,
    order: { type: Number, default: 0 }
  }]
}, { timestamps: true });

const GalleryImage = mongoose.model('GalleryImage', gallerySchema);
const TeamMember = mongoose.model('TeamMember', teamMemberSchema);
const HomeCard = mongoose.model('HomeCard', homeCardSchema);
const SectionCover = mongoose.model('SectionCover', sectionCoverSchema);

module.exports = { GalleryImage, TeamMember, HomeCard, SectionCover };
