export const saveToDB = async (key, data) => {
    try {
        const res = await fetch(`/api/content/store/${key}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data })
        });
        if (!res.ok) throw new Error("Failed to save to server");
    } catch (err) {
        console.error("API Save Failed:", err);
        throw err;
    }
};

export const loadFromDB = async (key) => {
    try {
        const res = await fetch(`/api/content/store/${key}`);
        if (!res.ok) return null;
        const result = await res.json();
        return result.data || null;
    } catch (err) {
        console.error("API Load Failed:", err);
        return null;
    }
};
