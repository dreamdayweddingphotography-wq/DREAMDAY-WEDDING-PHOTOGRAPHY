const fs = require('fs');
const path = require('path');

const replacements = [
  // Dusty Blue & Cream to Terracotta & Warm Snow
  { old: /#FAF9F6/gi, new: '#FFFCFB' }, // Primary BG (Warm Snow)
  { old: /#FFFFFF/gi, new: '#FFFFFF' }, // Secondary BG (Cards)
  { old: /#2A323C/gi, new: '#2E1E1C' }, // Primary Text (Deep Espresso)
  { old: /#6B7480/gi, new: '#7A6663' }, // Secondary Text (Muted Warm Gray)
  { old: /#7B95A8/gi, new: '#D86A58' }, // Primary Accent (Terracotta)
  { old: /#627D92/gi, new: '#BC5241' }, // Hover Accent (Deep Terracotta)
  { old: /#E8EAEB/gi, new: '#F0E7E5' }, // Borders
  { old: /#9BB5C8/gi, new: '#EBA093' }, // Accent (Soft Peach/Terracotta for gradients)
  
  // rgba replacements
  { old: /rgba\(42,\s*50,\s*60/g, new: 'rgba(46, 30, 28' }, // Shadow base
  { old: /rgba\(123,\s*149,\s*168/g, new: 'rgba(216, 106, 88' }, // Glow base
  { old: /rgba\(98,\s*125,\s*146/g, new: 'rgba(188, 82, 65' }, // Darker Glow
  { old: /rgba\(250,\s*249,\s*246/g, new: 'rgba(255, 252, 251' } // BG
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
console.log('Done replacing theme colors with Terracotta.');
