import { loadFromDB, saveToDB } from './db';
import { optimizeImage } from './imageOptimizer';

export const TEAM_STORAGE_KEY = 'dwp_team_data';

export const DEFAULT_TEAM = [
    { id: '1', name: 'Rajarajan Vetrivendhan', role: 'Founder & Lead Photographer', image: '/images/Meet our Team/rajarajan.png' },
    { id: '2', name: 'Arun Kumar', role: 'Cinematographer', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80' },
    { id: '3', name: 'Priya Sharma', role: 'Creative Director', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' },
    { id: '4', name: 'Karthik Raj', role: 'Candid Specialist', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' }
];

const dataUrlToBlob = (dataUrl) => {
    const [header, base64] = dataUrl.split(',');
    const mimeMatch = header.match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) {
        bytes[i] = binary.charCodeAt(i);
    }
    return new Blob([bytes], { type: mime });
};

/**
 * Loads team members from MongoDB, falling back to localStorage or defaults.
 * When migrateLocalToDb is true and DB is empty, any cached localStorage data is synced to DB.
 */
export const loadTeamMembers = async ({ migrateLocalToDb = false } = {}) => {
    const dbData = await loadFromDB(TEAM_STORAGE_KEY);
    if (Array.isArray(dbData)) {
        try {
            localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(dbData));
        } catch (err) {
            console.warn('Could not cache team data in localStorage:', err);
        }
        return dbData;
    }

    const saved = localStorage.getItem(TEAM_STORAGE_KEY);
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed)) {
                if (migrateLocalToDb) {
                    await saveToDB(TEAM_STORAGE_KEY, parsed);
                }
                return parsed;
            }
        } catch (err) {
            console.error('Failed to parse cached team data:', err);
        }
    }

    return DEFAULT_TEAM;
};

/**
 * Persists team members to MongoDB and updates localStorage cache.
 */
export const saveTeamMembers = async (team) => {
    await saveToDB(TEAM_STORAGE_KEY, team);
    try {
        localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(team));
    } catch (err) {
        console.warn('Could not cache team data in localStorage:', err);
    }
};

/**
 * Optimizes a selected profile image and uploads it to Cloudinary via /api/content/upload.
 */
export const uploadTeamPhoto = async (file) => {
    const optimizedDataUrl = await optimizeImage(file, 1000, 1000, 0.85);
    const blob = dataUrlToBlob(optimizedDataUrl);
    const formData = new FormData();
    formData.append('image', blob, file.name || 'team-member.jpg');

    const res = await fetch('/api/content/upload', {
        method: 'POST',
        body: formData
    });
    const result = await res.json();
    if (!res.ok || !result.success) {
        throw new Error(result.message || 'Image upload failed');
    }
    return result.data.imageUrl;
};

