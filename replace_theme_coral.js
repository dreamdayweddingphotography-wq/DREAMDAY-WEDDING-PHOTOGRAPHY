const fs = require('fs');
const path = require('path');

const replacements = [
  // Lavender to Coral replacements
  { old: /#F8F7FF/gi, new: '#FFF7F4' }, // Primary BG
  { old: /#2E2A47/gi, new: '#2F2A28' }, // Primary Text / Admin Sidebar
  { old: /#6F6A8A/gi, new: '#7A7672' }, // Secondary Text
  { old: /#6C63FF/gi, new: '#FF6B6B' }, // Primary Accent
  { old: /#5A52E8/gi, new: '#E65353' }, // Hover
  { old: /#E7E4FF/gi, new: '#F1E3DA' }, // Borders
  { old: /#A78BFA/gi, new: '#FFC5A3' }, // Accent
  
  // rgba replacements
  { old: /rgba\(46,\s*42,\s*71/g, new: 'rgba(47, 42, 40' }, // Shadow base
  { old: /rgba\(108,\s*99,\s*255/g, new: 'rgba(255, 107, 107' }, // Glow base
  { old: /rgba\(90,\s*82,\s*232/g, new: 'rgba(230, 83, 83' },
  { old: /rgba\(248,\s*247,\s*255/g, new: 'rgba(255, 247, 244' }
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
