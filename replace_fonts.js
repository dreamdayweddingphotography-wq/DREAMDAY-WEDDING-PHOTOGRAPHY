const fs = require('fs');
const path = require('path');

const replacements = [
  { old: /font-family:\s*['"]Cormorant Garamond['"],\s*serif;/g, new: 'font-family: var(--font-heading);' },
  { old: /font-family:\s*['"]Instrument Sans['"],\s*sans-serif;/g, new: 'font-family: var(--font-body);' },
  { old: /font-family:\s*['"]Pinyon Script['"],\s*cursive;/g, new: 'font-family: var(--font-script);' },
  { old: /font-family:\s*['"]Great Vibes['"],\s*cursive;/g, new: 'font-family: var(--font-script);' },
  { old: /font-family:\s*var\(--font-script\);\s*font-family:\s*var\(--font-script\);/g, new: 'font-family: var(--font-script);' } // Just in case
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
console.log('Done replacing hardcoded fonts.');
