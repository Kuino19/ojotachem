const fs = require('fs');
const path = require('path');

const ROOT = 'c:\\Users\\IFEDAYO LAWAL\\Videos\\Armstrong\\chem-market';
const targetFile = path.join(ROOT, 'src/components/Navbar.tsx');
let content = fs.readFileSync(targetFile, 'utf8');

// Replace cartItems with totalItemsCount and remove the reduce block
content = content.replace(
  'const { cartItems, setIsCartOpen } = useCart();',
  'const { totalItemsCount: totalItems, setIsCartOpen } = useCart();'
);
content = content.replace(
  'const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);',
  ''
);

fs.writeFileSync(targetFile, content);
console.log('Fixed Navbar.tsx');
