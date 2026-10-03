const fs = require('fs');
const path = require('path');

const replacements = [
  // Champagne to Soft Lavender & White
  { old: /#FAF8F5/gi, new: '#F8F7FA' }, // bg-primary
  { old: /#2A2421/gi, new: '#2C2A35' }, // text-primary
  { old: /#7A706B/gi, new: '#746F82' }, // text-secondary
  { old: /#C5A880/gi, new: '#9B8BBA' }, // accent-color (Soft Lavender)
  { old: /#D4BA95/gi, new: '#B2A4CC' }, // accent-hover
  { old: /#EAE3DB/gi, new: '#EBE9F0' }, // border-color
  
  // rgb values
  { old: /rgba\(250,\s*248,\s*245/gi, new: 'rgba(248, 247, 250' }, // glass-bg
  { old: /rgba\(197,\s*168,\s*128/gi, new: 'rgba(155, 139, 186' }, // glass-border / shadow-glow
  { old: /rgba\(42,\s*36,\s*33/g, new: 'rgba(44, 42, 53' }, // shadow-premium
  
  // Button gradient colors from Champagne script
  { old: /#E6D5B8/gi, new: '#C2B8D9' },
  { old: /#937A50/gi, new: '#7E6DA3' }
];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.css') || fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      for (const rule of replacements) {
        content = content.replace(rule.old, rule.new);
      }
      
      if (content !== originalContent) {
        console.log(`Updated ${fullPath}`);
        fs.writeFileSync(fullPath, content, 'utf8');
      }
    }
  }
}

processDirectory(path.join(__dirname, 'client', 'src'));
console.log('Done applying Soft Lavender & White theme.');
