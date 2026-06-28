const fs = require('fs');
const path = require('path');

const replacements = [
  // Sage Green & Pearl to Warm Ivory & Charcoal
  { old: /#F7F8F6/gi, new: '#FAF8F5' }, // Primary BG (Warm Ivory)
  { old: /#FFFFFF/gi, new: '#FFFFFF' }, // Secondary BG (Cards)
  { old: /#2C362F/gi, new: '#222222' }, // Primary Text (Deep Charcoal)
  { old: /#6F7A73/gi, new: '#666666' }, // Secondary Text (Medium Gray)
  { old: /#7B907B/gi, new: '#D4B895' }, // Primary Accent (Champagne Gold)
  { old: /#637863/gi, new: '#C2A47F' }, // Hover Accent (Darker Champagne)
  { old: /#E5EAE5/gi, new: '#EAE5DF' }, // Borders
  { old: /#A1B5A1/gi, new: '#EAD3B3' }, // Accent (Lighter champagne for gradients)
  
  // rgba replacements
  { old: /rgba\(44,\s*54,\s*47/g, new: 'rgba(34, 34, 34' }, // Shadow base
  { old: /rgba\(123,\s*144,\s*123/g, new: 'rgba(212, 184, 149' }, // Glow base (Champagne)
  { old: /rgba\(99,\s*120,\s*99/g, new: 'rgba(194, 164, 127' },
  { old: /rgba\(247,\s*248,\s*246/g, new: 'rgba(250, 248, 245' }
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
