const fs = require('fs');
const path = require('path');
const file = 'c:\\Users\\IFEDAYO LAWAL\\Videos\\Armstrong\\chem-market\\src\\components\\Navbar.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace the imports to include Clerk components
content = content.replace(
  "import { Search, ShoppingCart, FlaskConical, Menu, X, User } from 'lucide-react';",
  "import { Search, ShoppingCart, FlaskConical, Menu, X, User } from 'lucide-react';\nimport { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';"
);

// Replace Desktop Account Button
content = content.replace(
  /<button[\s\S]*?onClick=\{\(\) => setIsAccountOpen\(true\)\}[\s\S]*?className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition ml-2"[\s\S]*?aria-label="Account"[\s\S]*?>[\s\S]*?<User className="w-5 h-5" \/>[\s\S]*?<\/button>/,
  `
          <div className="flex items-center gap-3 ml-2">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition">Sign In</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-900 px-4 py-2 rounded-full transition">Sign Up</button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
`
);

// Replace Mobile Account Button
content = content.replace(
  /<button onClick=\{\(\) => setIsAccountOpen\(true\)\} className="text-slate-900">\s*<User className="w-6 h-6" \/>\s*<\/button>/,
  `
          <div className="flex items-center">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-slate-900"><User className="w-6 h-6" /></button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
`
);

fs.writeFileSync(file, content);
console.log('Navbar updated with Clerk auth controls');
