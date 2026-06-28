const fs = require('fs');
const path = require('path');

const replacements = [
  // Warm Ivory to Sage Green
  { old: /#FAF8F5/gi, new: '#F7F8F6' },
  { old: /#222222/gi, new: '#2C362F' },
  { old: /#666666/gi, new: '#6F7A73' },
  { old: /#D4B895/gi, new: '#7B907B' },
  { old: /#C2A47F/gi, new: '#637863' },
  { old: /#EAE5DF/gi, new: '#E5EAE5' },
  { old: /#EAD3B3/gi, new: '#A1B5A1' },
  
  // rgba replacements
  { old: /rgba\(34,\s*34,\s*34/g, new: 'rgba(44, 54, 47' },
  { old: /rgba\(212,\s*184,\s*149/g, new: 'rgba(123, 144, 123' },
  { old: /rgba\(194,\s*164,\s*127/g, new: 'rgba(99, 120, 99' },
  { old: /rgba\(250,\s*248,\s*245/g, new: 'rgba(247, 248, 246' }
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
console.log('Done reverting theme colors.');
