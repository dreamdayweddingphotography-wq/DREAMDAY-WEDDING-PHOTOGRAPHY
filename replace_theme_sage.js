const fs = require('fs');
const path = require('path');

const replacements = [
  // Dark Cinematic & Gold to Sage Green & Pearl
  { old: /#0F0E13/gi, new: '#F7F8F6' }, // Primary BG
  { old: /#1A1822/gi, new: '#FFFFFF' }, // Secondary BG (Cards)
  { old: /#F5F2F0/gi, new: '#2C362F' }, // Primary Text (Deep green/charcoal)
  { old: /#A6A098/gi, new: '#6F7A73' }, // Secondary Text
  { old: /#D4AF37/gi, new: '#7B907B' }, // Primary Accent (Sage Green)
  { old: /#B39247/gi, new: '#637863' }, // Hover Accent (Darker Sage)
  { old: /#2D2A35/gi, new: '#E5EAE5' }, // Borders
  { old: /#E5C672/gi, new: '#A1B5A1' }, // Accent (Lighter sage for gradients)
  
  // rgba replacements
  { old: /rgba\(0,\s*0,\s*0/g, new: 'rgba(44, 54, 47' }, // Shadow base
  { old: /rgba\(212,\s*175,\s*55/g, new: 'rgba(123, 144, 123' }, // Glow base (Sage)
  { old: /rgba\(179,\s*146,\s*71/g, new: 'rgba(99, 120, 99' },
  { old: /rgba\(15,\s*14,\s*19/g, new: 'rgba(247, 248, 246' }
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
