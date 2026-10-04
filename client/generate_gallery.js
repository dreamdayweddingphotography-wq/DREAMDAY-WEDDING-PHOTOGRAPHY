import fs from 'fs';
import path from 'path';

const imagesDir = path.join(process.cwd(), 'public', 'images');
const outputFile = path.join(process.cwd(), 'src', 'utils', 'galleryData.json');

function getImagesInDir(dirPath) {
    if (!fs.existsSync(dirPath)) return [];
    return fs.readdirSync(dirPath)
        .filter(f => /\.(jpg|jpeg|png)$/i.test(f));
}

// Manually map our categories to their respective physical folders in public/images
const categoryMappings = [
    { id: 'wedding', title: 'Wedding', folderName: 'Wedding CC' },
    { id: 'reception', title: 'Reception', folderName: 'RECEPTION CC' },
    { id: 'outdoor', title: 'Pre/Post Wedding', folderName: 'OUTDOOR CC' },
    { id: 'baby-shower', title: 'Maternity & Baby Shower', folderName: 'MATERNITY CC' }, // Wait, there's MATERNITY CC and BABYSHOWERR CC
    { id: 'ceremony', title: 'Ceremony', folderName: 'Cermony CC' },
    { id: 'engagement', title: 'Engagement', folderName: 'ENGAGEMENT CC' }
];

const galleryData = categoryMappings.map(category => {
    const categoryPath = path.join(imagesDir, category.folderName);
    const clients = [];

    if (fs.existsSync(categoryPath)) {
        // Read client folders inside this category
        const clientFolders = fs.readdirSync(categoryPath, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);

        for (const clientName of clientFolders) {
            const clientPath = path.join(categoryPath, clientName);
            const images = getImagesInDir(clientPath).map(img => `/images/${category.folderName}/${clientName}/${img}`);
            
            if (images.length > 0) {
                clients.push({
                    id: clientName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                    name: clientName,
                    coverImage: images[0],
                    images: images
                });
            }
        }
        
        // Also check if there are raw images directly in the category folder (no client folder)
        const rootImages = getImagesInDir(categoryPath).map(img => `/images/${category.folderName}/${img}`);
        if (rootImages.length > 0) {
             clients.push({
                 id: 'misc',
                 name: 'Miscellaneous',
                 coverImage: rootImages[0],
                 images: rootImages
             });
        }
    }

    return {
        id: category.id,
        title: category.title,
        description: `Stunning memories from our ${category.title.toLowerCase()} shoots.`,
        clients: clients
    };
});

// Since Baby shower has two folders (BABYSHOWERR CC and MATERNITY CC), let's manually merge them
const babyShowerCat = galleryData.find(c => c.id === 'baby-shower');
if (fs.existsSync(path.join(imagesDir, 'BABYSHOWERR CC'))) {
     const bsPath = path.join(imagesDir, 'BABYSHOWERR CC');
     const bsClientFolders = fs.readdirSync(bsPath, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name);
     for (const clientName of bsClientFolders) {
         const clientPath = path.join(bsPath, clientName);
         const images = getImagesInDir(clientPath).map(img => `/images/BABYSHOWERR CC/${clientName}/${img}`);
         if (images.length > 0) {
             babyShowerCat.clients.push({
                 id: clientName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                 name: clientName,
                 coverImage: images[0],
                 images: images
             });
         }
     }
}

fs.writeFileSync(outputFile, JSON.stringify(galleryData, null, 2));
console.log('galleryData.json successfully generated!');
