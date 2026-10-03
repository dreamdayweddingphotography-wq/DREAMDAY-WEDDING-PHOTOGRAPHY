const fs = require('fs');
const path = require('path');

const replacements = [
  // Terracotta to Champagne Gold & Cream
  { old: /#FCF9F2/gi, new: '#FAF8F5' }, // bg-primary
  { old: /#4A3B32/gi, new: '#2A2421' }, // text-primary
  { old: /#9C8577/gi, new: '#7A706B' }, // text-secondary
  { old: /#9C4B33/gi, new: '#C5A880' }, // accent-color
  { old: /#D9734E/gi, new: '#D4BA95' }, // accent-hover
  { old: /#E8E0D5/gi, new: '#EAE3DB' }, // border-color
  
  // rgb values
  { old: /rgba\(252,\s*249,\s*242/gi, new: 'rgba(250, 248, 245' }, // glass-bg
  { old: /rgba\(156,\s*75,\s*51/gi, new: 'rgba(197, 168, 128' }, // glass-border / shadow-glow
  { old: /rgba\(74,\s*59,\s*50/gi, new: 'rgba(42, 36, 33' }, // shadow-premium
  
  // A few leftover terracotta colors from the original script if any
  { old: /#EBA093/gi, new: '#E6D5B8' },
  { old: /#9F4132/gi, new: '#937A50' },
  { old: /rgba\(216,\s*106,\s*88/gi, new: 'rgba(197, 168, 128' }
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
console.log('Done applying Champagne Gold theme from Terracotta.');
