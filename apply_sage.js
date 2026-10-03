const fs = require('fs');
const path = require('path');

const replacements = [
  // Soft Lavender to Sage Green & Linen
  { old: /#F8F7FA/gi, new: '#F6F4F0' }, // bg-primary
  { old: /#2C2A35/gi, new: '#2C352D' }, // text-primary
  { old: /#746F82/gi, new: '#798075' }, // text-secondary
  { old: /#9B8BBA/gi, new: '#8B9A86' }, // accent-color (Sage Green)
  { old: /#B2A4CC/gi, new: '#A5B3A1' }, // accent-hover
  { old: /#EBE9F0/gi, new: '#EAE8E2' }, // border-color
  
  // rgb values
  { old: /rgba\(248,\s*247,\s*250/gi, new: 'rgba(246, 244, 240' }, // glass-bg
  { old: /rgba\(155,\s*139,\s*186/gi, new: 'rgba(139, 154, 134' }, // glass-border / shadow-glow
  { old: /rgba\(44,\s*42,\s*53/g, new: 'rgba(44, 53, 45' }, // shadow-premium
  
  // Button gradient colors from Lavender script
  { old: /#C2B8D9/gi, new: '#C1CCBD' },
  { old: /#7E6DA3/gi, new: '#6F7E69' }
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
console.log('Done applying Sage Green & Linen theme.');
