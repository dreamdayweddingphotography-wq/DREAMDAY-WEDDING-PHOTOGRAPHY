import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ArrowLeft } from 'lucide-react';
import defaultGalleryCategories from '../utils/galleryData.json';
import { loadFromDB } from '../utils/db';
import CategoryLoader from '../components/CategoryLoader';
import './CategoryGallery.css';

const CategoryGalleryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [galleryCategories, setGalleryCategories] = useState(defaultGalleryCategories);

  useEffect(() => {
    loadFromDB('dwp_gallery_data').then(data => {
      if (data) setGalleryCategories(data);
      else {
        const ls = localStorage.getItem('dwp_gallery_data');
        if (ls) setGalleryCategories(JSON.parse(ls));
      }
    }).catch(console.error);
  }, []);

  const category = galleryCategories.find(c => c.id === categoryId);

  // Scroll to top and validate category (only redirect if data is fully loaded and no category exists)
  useEffect(() => {
    window.scrollTo(0, 0);
    // Give it a moment to load from DB before redirecting
    const timer = setTimeout(() => {
        if (!category && galleryCategories !== defaultGalleryCategories) {
          navigate('/');
        }
    }, 100);
    return () => clearTimeout(timer);
  }, [category, galleryCategories, navigate]);

  if (!category) return null;

  // Extract images from clients
  const images = category.clients ? category.clients.map(client => client.coverImage) : [];

  // Image Pre-loading Logic
  useEffect(() => {
    setLoading(true);
    let loadedCount = 0;
    const targetCount = Math.min(images.length, 8); // At least 8 or all images to show content
    
    // Safety timeout in case images don't load
    const safetyTimer = setTimeout(() => {
      setLoading(false);
    }, 4500);

    images.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount >= targetCount) {
          setTimeout(() => setLoading(false), 800); // Small extra delay for smoothness
        }
      };
      img.onerror = () => {
        loadedCount++; // Count err as load to avoid sticking
        if (loadedCount >= targetCount) setLoading(false);
      };
    });

    return () => clearTimeout(safetyTimer);
  }, [categoryId, images.length]);

  const openLightbox = (index) => {
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    document.body.style.overflow = '';
  };

  const showNext = (e) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const showPrev = (e) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  return (
    <div className="page-wrapper category-gallery-page">
      <AnimatePresence>
        {loading && (
          <CategoryLoader categoryName={category.title} />
        )}
      </AnimatePresence>

      <motion.div 
        className="pg-container"
        initial={{ opacity: 0, y: 30 }}
        animate={!loading ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        
        {/* Header Section */}
        <header className="cat-gallery-header">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link to="/gallery" className="back-link">
              <ArrowLeft size={16} /> Back to Categories
            </Link>
          </motion.div>
          
          <motion.div
            className="cat-gallery-title-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="cat-eyebrow">Collection</span>
            <h1 className="cat-title">{category.title}</h1>
            <p className="cat-desc">{category.description}</p>
          </motion.div>
        </header>

        {/* Alternating Rows Layout */}
        <div className="cat-gallery-rows-container">
          {images.map((src, i) => {
            const quoteDictionary = {
              'ceremony': [
                "EMBRACING TRADITIONS, CELEBRATING LOVE",
                "A BEAUTIFUL BEGINNING ROOTED IN HERITAGE",
                "SACRED MOMENTS, TIMELESS MEMORIES",
                "WHERE CULTURE MEETS LOVE AND JOY",
                "HONORING THE PAST, CELEBRATING THE FUTURE",
                "A CELEBRATION OF FAMILY, TRADITION, AND LOVE"
              ],
              'baby-shower': [
                "A NEW LIFE BEGINS, A NEW LOVE BLOSSOMS",
                "THE TINIEST FEET LEAVE THE BIGGEST FOOTPRINTS IN OUR HEARTS",
                "WAITING FOR OUR LITTLE MIRACLE",
                "FIRST WE HAD EACH OTHER, THEN WE HAD YOU"
              ],
              'wedding': [
                "TWO SOULS, ONE HEART, A LIFETIME OF LOVE",
                "THE START OF OUR FOREVER",
                "A LOVE STORY WRITTEN IN THE STARS",
                "TOGETHER IS A BEAUTIFUL PLACE TO BE",
                "ALL OF ME LOVES ALL OF YOU",
                "OUR HAPPILY EVER AFTER STARTS NOW"
              ],
              'reception': [
                "DANCING INTO FOREVER TOGETHER",
                "A NIGHT OF LOVE, LAUGHTER, AND HAPPILY EVER AFTER",
                "SURROUNDED BY LOVE, CELEBRATING FOREVER",
                "TO LOVE, LAUGHTER, AND OUR HAPPILY EVER AFTER",
                "THE PERFECT END TO A PERFECT DAY",
                "CHEERS TO A LIFETIME OF MEMORIES"
              ],
              'default': [
                "ALL THE WORLD THERE IS NO HEART FOR ME LIKE YOURS",
                "A HUNDRED HEARTS WOULD BE TOO FEW TO CARRY ALL MY LOVE FOR YOU",
                "YOU ARE MY TODAY AND ALL OF MY TOMORROWS",
                "TO LOVE AND BE LOVED IS TO FEEL THE SUN FROM BOTH SIDES",
                "I HAVE FOUND THE ONE WHOM MY SOUL LOVES",
                "EVERY LOVE STORY IS BEAUTIFUL, BUT OURS IS MY FAVORITE",
                "GROW OLD ALONG WITH ME, THE BEST IS YET TO BE"
              ]
            };
            
            const quotes = quoteDictionary[category.id] || quoteDictionary['default'];
            const quote = quotes[i % quotes.length];

            return (
            <motion.div
              key={i}
              className={`cat-row-item ${i % 2 !== 0 ? 'reverse' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="cat-row-polaroid">
                <div className="cat-row-img-wrap" onClick={() => navigate(`/gallery/${category.id}/${category.clients[i].id}`)}>
                  <img src={src} alt={`${category.title} moment ${i+1}`} loading="lazy" />
                </div>
                <p className="polaroid-text">{quote}</p>
              </div>
              <div className="cat-row-text elegant-row-text">
                <div className="cat-row-top">
                  <span className="cat-row-num">{i + 1 < 10 ? `0${i + 1}` : i + 1}</span>
                  <div className="cat-row-line"></div>
                </div>
                <h3>{category.clients ? category.clients[i].name.replace(/-/g, ' & ') : `${category.title} Moment ${i + 1}`}</h3>
                <span className="explore-story-btn" onClick={() => navigate(`/gallery/${category.id}/${category.clients[i].id}`)}>
                  EXPLORE STORY
                </span>
              </div>
            </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="pg-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button className="pg-lightbox-close" onClick={closeLightbox}>
              <X size={32} />
            </button>

            <button className="pg-lightbox-arrow prev" onClick={showPrev}>
              <ChevronLeft size={24} />
            </button>
            <button className="pg-lightbox-arrow next" onClick={showNext}>
              <ChevronRight size={24} />
            </button>

            <motion.div
              className="pg-lightbox-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={images[selectedIndex]} alt="Fullscreen" />
              <div className="pg-lightbox-info">
                <h3>{category.title}</h3>
                <p>Frame {selectedIndex + 1} of {images.length}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryGalleryPage;

