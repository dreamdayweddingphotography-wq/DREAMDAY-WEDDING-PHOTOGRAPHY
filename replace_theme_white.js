const fs = require('fs');
const path = require('path');

const replacements = [
  // Coral to Clean White replacements
  { old: /#FFF7F4/gi, new: '#FAFAFA' }, // Primary BG
  { old: /#2F2A28/gi, new: '#1F2937' }, // Primary Text
  { old: /#7A7672/gi, new: '#6B7280' }, // Secondary Text
  { old: /#FF6B6B/gi, new: '#2563EB' }, // Primary Accent (Blue)
  { old: /#E65353/gi, new: '#1D4ED8' }, // Hover (Darker Blue)
  { old: /#F1E3DA/gi, new: '#E5E7EB' }, // Borders
  { old: /#FFC5A3/gi, new: '#60A5FA' }, // Accent (Lighter Blue for gradients)
  
  // rgba replacements
  { old: /rgba\(47,\s*42,\s*40/g, new: 'rgba(31, 41, 55' }, // Shadow base
  { old: /rgba\(255,\s*107,\s*107/g, new: 'rgba(37, 99, 235' }, // Glow base
  { old: /rgba\(230,\s*83,\s*83/g, new: 'rgba(29, 78, 216' },
  { old: /rgba\(255,\s*247,\s*244/g, new: 'rgba(250, 250, 250' }
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
