const fs = require('fs');
const file = 'c:\\Users\\IFEDAYO LAWAL\\Videos\\Armstrong\\chem-market\\src\\components\\Navbar.tsx';
let content = fs.readFileSync(file, 'utf8');

// Remove the "My Account" / "Buyer Portal" link
content = content.replace(
  /<Show when="signed-in">\s*<Link href="\/portal" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition">\s*My Account\s*<\/Link>\s*<\/Show>/g,
  ''
);

fs.writeFileSync(file, content);
console.log('Navbar cleaned up');
