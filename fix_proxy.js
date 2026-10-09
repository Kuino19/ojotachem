const fs = require('fs');
const path = require('path');
const file = 'c:\\Users\\IFEDAYO LAWAL\\Videos\\Armstrong\\chem-market\\src\\proxy.ts';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(
  '"/(api|trpc)(.*)",',
  '"/(api|trpc)(.*)",\n    "/__clerk/:path*",'
);
fs.writeFileSync(file, content);
console.log('proxy.ts updated');
