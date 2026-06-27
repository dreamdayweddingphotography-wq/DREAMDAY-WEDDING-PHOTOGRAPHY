import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Loader.css';

const Loader = ({ onLoaded }) => {
  const [loading, setLoading] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    // Attempt to play sound automatically (may be blocked by browser autoplay policy)
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch(e => console.log("Auto-play blocked by browser:", e));
    }

    // Loader timeout
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(onLoaded, 1000);
    }, 2800);

    return () => clearTimeout(timer);
  }, [onLoaded]);

  return (
    <>
      {/* Hidden Audio Element - Using Google's Free Sound Library */}
      <audio ref={audioRef} src="https://actions.google.com/sounds/v1/foley/camera_shutter.ogg" preload="auto" />

      <AnimatePresence>
        {loading && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Corner frame */}
          <div className="loading-frame" />

          <motion.div
            className="loading-content"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Pulsing Camera Logo with CSS Magic */}
            <motion.div 
              className="loading-camera-pulse"
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.7, 1, 0.7],
                filter: ["drop-shadow(0 0 10px rgba(200, 161, 101, 0.3))", "drop-shadow(0 0 30px rgba(200, 161, 101, 0.8))", "drop-shadow(0 0 10px rgba(200, 161, 101, 0.3))"]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <img src="/logo.png" alt="Dream Day Logo" className="loading-magic-logo" />
            </motion.div>

            {/* Subtle Text */}
            <motion.h2
              className="loading-subtitle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              style={{ marginTop: '40px' }}
            >
              DREAMDAY WEDDING PHOTOGRAPHY
            </motion.h2>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};

export default Loader;