const fs = require('fs');
const path = require('path');

const replacements = [
  { old: /#A44A4A/gi, new: '#738A9C' },
  { old: /#8B3A3A/gi, new: '#4A5F70' },
  { old: /#F8F2EA/gi, new: '#F5F2EB' },
  { old: /#FFF9F2/gi, new: '#FAF8F5' },
  { old: /#3F322D/gi, new: '#2C363F' },
  { old: /#C8A165/gi, new: '#8A9BA8' },
  // rgba replacements
  { old: /rgba\(63,\s*50,\s*45/g, new: 'rgba(44, 54, 63' },
  { old: /rgba\(164,\s*74,\s*74/g, new: 'rgba(115, 138, 156' },
  { old: /rgba\(200,\s*161,\s*101/g, new: 'rgba(138, 155, 168' },
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
