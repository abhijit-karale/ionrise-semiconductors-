const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'server/seed.js',
  'src/pages/Contact.jsx',
  'src/pages/Home.jsx',
  'src/pages/Terms.jsx',
  'src/pages/Team.jsx',
  'src/pages/Privacy.jsx',
  'src/pages/Careers.jsx',
  'src/pages/Blog.jsx',
  'src/pages/About.jsx',
  'src/components/Navbar.jsx',
  'src/components/Footer.jsx',
  'server/index.js',
  'server/db.js',
  'package.json',
  'package-lock.json',
  'index.html'
];

const replacements = [
  { from: /Corevexis Semiconductor/g, to: 'Ionrise Semiconductors' },
  { from: /Corevexis/g, to: 'Ionrise' },
  { from: /corevexis-semiconductor/g, to: 'ionrise-semiconductors' },
  { from: /corevexis/g, to: 'ionrise' }
];

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    replacements.forEach(r => {
      content = content.replace(r.from, r.to);
    });

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${file}`);
    }
  } else {
    console.warn(`File not found: ${file}`);
  }
});
