const fs = require('fs');
const file = 'c:\\Users\\IFEDAYO LAWAL\\Videos\\Armstrong\\chem-market\\src\\components\\Navbar.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/Buyer Portal/g, 'My Account');

fs.writeFileSync(file, content);
console.log('Navbar updated');
