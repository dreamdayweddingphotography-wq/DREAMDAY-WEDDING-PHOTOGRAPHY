const fs = require('fs');
const path = require('path');

const replacements = [
  // Clean White to Dark Cinematic & Gold
  { old: /#FAFAFA/gi, new: '#0F0E13' }, // Primary BG (Very dark charcoal)
  { old: /#FFFFFF/gi, new: '#1A1822' }, // Secondary BG (Cards)
  { old: /#1F2937/gi, new: '#F5F2F0' }, // Primary Text (Off-white)
  { old: /#6B7280/gi, new: '#A6A098' }, // Secondary Text (Muted gray/gold)
  { old: /#2563EB/gi, new: '#D4AF37' }, // Primary Accent (Metallic Gold)
  { old: /#1D4ED8/gi, new: '#B39247' }, // Hover Accent (Darker Gold)
  { old: /#E5E7EB/gi, new: '#2D2A35' }, // Borders
  { old: /#60A5FA/gi, new: '#E5C672' }, // Accent (Lighter gold for gradients)
  
  // rgba replacements
  { old: /rgba\(31,\s*41,\s*55/g, new: 'rgba(0, 0, 0' }, // Shadow base
  { old: /rgba\(37,\s*99,\s*235/g, new: 'rgba(212, 175, 55' }, // Glow base (Gold)
  { old: /rgba\(29,\s*78,\s*216/g, new: 'rgba(179, 146, 71' },
  { old: /rgba\(250,\s*250,\s*250/g, new: 'rgba(15, 14, 19' }
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
