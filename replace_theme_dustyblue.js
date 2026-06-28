const fs = require('fs');
const path = require('path');

const replacements = [
  // Sage Green to Dusty Blue & Cream
  { old: /#F7F8F6/gi, new: '#FAF9F6' }, // Primary BG (Cream)
  { old: /#FFFFFF/gi, new: '#FFFFFF' }, // Secondary BG (Cards)
  { old: /#2C362F/gi, new: '#2A323C' }, // Primary Text (Slate Charcoal)
  { old: /#6F7A73/gi, new: '#6B7480' }, // Secondary Text (Muted Slate)
  { old: /#7B907B/gi, new: '#7B95A8' }, // Primary Accent (Dusty Blue)
  { old: /#637863/gi, new: '#627D92' }, // Hover Accent (Darker Dusty Blue)
  { old: /#E5EAE5/gi, new: '#E8EAEB' }, // Borders
  { old: /#A1B5A1/gi, new: '#9BB5C8' }, // Accent (Lighter dusty blue for gradients)
  
  // rgba replacements
  { old: /rgba\(44,\s*54,\s*47/g, new: 'rgba(42, 50, 60' }, // Shadow base
  { old: /rgba\(123,\s*144,\s*123/g, new: 'rgba(123, 149, 168' }, // Glow base (Dusty Blue)
  { old: /rgba\(99,\s*120,\s*99/g, new: 'rgba(98, 125, 146' }, // Darker Glow
  { old: /rgba\(247,\s*248,\s*246/g, new: 'rgba(250, 249, 246' } // Cream Background
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
console.log('Done replacing theme colors with Dusty Blue.');
