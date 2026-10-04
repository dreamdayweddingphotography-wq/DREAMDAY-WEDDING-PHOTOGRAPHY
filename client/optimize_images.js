import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const directoryPath = path.join(process.cwd(), 'public', 'images');

const MAX_WIDTH = 1920;
const QUALITY = 85;

async function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            await processDirectory(fullPath);
        } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
            // Only process if larger than 1MB
            if (stat.size > 1 * 1024 * 1024) {
                console.log(`Processing: ${fullPath} (${(stat.size / 1024 / 1024).toFixed(2)} MB)`);
                const tempPath = fullPath + '.tmp';
                try {
                    await sharp(fullPath)
                        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
                        .jpeg({ quality: QUALITY, progressive: true })
                        .toFile(tempPath);
                    
                    fs.renameSync(tempPath, fullPath);
                    const newStat = fs.statSync(fullPath);
                    console.log(`  -> Reduced to ${(newStat.size / 1024 / 1024).toFixed(2)} MB`);
                } catch (err) {
                    console.error(`Error processing ${fullPath}:`, err.message);
                    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
                }
            }
        }
    }
}

async function run() {
    console.log('Starting image optimization. This may take a minute...');
    await processDirectory(directoryPath);
    console.log('\nOptimization complete! All images are now web-ready.');
}

run();
