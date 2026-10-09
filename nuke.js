const fs = require('fs');
fs.rmSync('node_modules', { recursive: true, force: true });
fs.rmSync('package-lock.json', { force: true });
console.log('Nuked node_modules');
