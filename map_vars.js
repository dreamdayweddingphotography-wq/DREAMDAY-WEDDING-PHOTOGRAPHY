const fs = require('fs');
const path = require('path');

const cssVarReplacements = {
  '--pg-black': 'var(--bg-primary)',
  '--pg-surface': 'var(--bg-secondary)',
  '--pg-surface-2': 'var(--bg-primary)',
  '--pg-cream': 'var(--text-primary)',
  '--pg-cream-dim': 'var(--text-secondary)',
  '--pg-muted': 'var(--text-secondary)',
  '--pg-gold': 'var(--accent-color)',
  '--pg-gold-2': 'var(--accent-hover)',
  '--pg-gold-glow': 'var(--glass-border)',
  '--pg-border': 'var(--border-color)',
  '--pg-border-soft': 'var(--border-color)'
};

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      // We will replace hex codes assigned to these vars in the file.
      // E.g. --pg-black: #070604; -> --pg-black: var(--bg-primary);
      for (const [varName, globalVar] of Object.entries(cssVarReplacements)) {
        // Regex to match `--pg-name: anything;`
        const regex = new RegExp(`(${varName}:\\s*)[^;]+(;)`, 'g');
        content = content.replace(regex, `$1${globalVar}$2`);
      }
      
      if (content !== originalContent) {
        console.log(`Updated ${fullPath}`);
        fs.writeFileSync(fullPath, content, 'utf8');
      }
    }
  }
}

processDirectory(path.join(__dirname, 'client', 'src', 'pages'));
console.log('Done mapping page variables to global theme.');
