const fs = require('fs');
const path = require('path');

const replacements = [
  // Champagne to Lavender replacements
  { old: /#FCFBF9/gi, new: '#F8F7FF' }, // Primary BG
  { old: /#2A2421/gi, new: '#2E2A47' }, // Primary Text / Admin Sidebar
  { old: /#7A706B/gi, new: '#6F6A8A' }, // Secondary Text
  { old: /#D4AF37/gi, new: '#6C63FF' }, // Primary Accent
  { old: /#B8962E/gi, new: '#5A52E8' }, // Hover
  { old: /#EAE3DB/gi, new: '#E7E4FF' }, // Borders
  
  // Admin specific colors (from Champagne script)
  { old: /#F8F6F0/gi, new: '#F8F7FF' }, // Any stray light pearl to light lavender
  { old: /#F0EBE1/gi, new: '#E7E4FF' }, // Soft borders
  
  // rgba replacements
  { old: /rgba\(42,\s*36,\s*33/g, new: 'rgba(46, 42, 71' }, // Shadow base
  { old: /rgba\(212,\s*175,\s*55/g, new: 'rgba(108, 99, 255' }, // Glow base
  { old: /rgba\(184,\s*150,\s*46/g, new: 'rgba(90, 82, 232' },
  { old: /rgba\(252,\s*251,\s*249/g, new: 'rgba(248, 247, 255' }
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
console.log('Done replacing theme colors.');
