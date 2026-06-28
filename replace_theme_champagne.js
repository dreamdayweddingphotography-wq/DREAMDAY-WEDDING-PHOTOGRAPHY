const fs = require('fs');
const path = require('path');

const replacements = [
  { old: /#F5F2EB/gi, new: '#FCFBF9' },
  { old: /#FAF8F5/gi, new: '#FFFFFF' },
  { old: /#2C363F/gi, new: '#2A2421' },
  { old: /#586A7A/gi, new: '#7A706B' },
  { old: /#738A9C/gi, new: '#D4AF37' },
  { old: /#4A5F70/gi, new: '#B8962E' },
  { old: /#DCE3E8/gi, new: '#EAE3DB' },
  // Admin specific colors
  { old: /#344654/gi, new: '#F8F6F0' }, // Sidebar was deep slate, now light pearl
  { old: /#F4F0EA/gi, new: '#FCFBF9' },
  { old: /#1a232a/gi, new: '#2A2421' },
  { old: /#687987/gi, new: '#7A706B' },
  { old: /#eaedf0/gi, new: '#F0EBE1' },
  // rgba replacements
  { old: /rgba\(44,\s*54,\s*63/g, new: 'rgba(42, 36, 33' },
  { old: /rgba\(115,\s*138,\s*156/g, new: 'rgba(212, 175, 55' },
  { old: /rgba\(138,\s*155,\s*168/g, new: 'rgba(184, 150, 46' },
  { old: /rgba\(245,\s*242,\s*235/g, new: 'rgba(252, 251, 249' }
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
