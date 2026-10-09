const fs = require('fs');
const path = require('path');
const file = 'c:\\Users\\IFEDAYO LAWAL\\Videos\\Armstrong\\chem-market\\src\\components\\Navbar.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace imports
content = content.replace(
  "import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';",
  "import { SignInButton, SignUpButton, Show, UserButton } from '@clerk/nextjs';"
);

// Replace tags
content = content.replace(/<SignedOut>/g, '<Show when="signed-out">');
content = content.replace(/<\/SignedOut>/g, '</Show>');
content = content.replace(/<SignedIn>/g, '<Show when="signed-in">');
content = content.replace(/<\/SignedIn>/g, '</Show>');

fs.writeFileSync(file, content);
console.log('Fixed Clerk Show tags');
