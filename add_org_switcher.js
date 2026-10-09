const fs = require('fs');
const path = require('path');
const file = 'c:\\Users\\IFEDAYO LAWAL\\Videos\\Armstrong\\chem-market\\src\\components\\Navbar.tsx';
let content = fs.readFileSync(file, 'utf8');

// Ensure OrganizationSwitcher is imported
if (!content.includes('OrganizationSwitcher')) {
  content = content.replace(
    "import { SignInButton, SignUpButton, Show, UserButton } from '@clerk/nextjs';",
    "import { SignInButton, SignUpButton, Show, UserButton, OrganizationSwitcher } from '@clerk/nextjs';"
  );
}

// Add OrganizationSwitcher next to UserButton
content = content.replace(
  /<Show when="signed-in">\s*<UserButton \/>\s*<\/Show>/g,
  `<Show when="signed-in">
              <div className="flex items-center gap-4">
                <OrganizationSwitcher 
                  hidePersonal={false}
                  appearance={{
                    elements: {
                      organizationSwitcherTrigger: "bg-white border border-slate-200 py-1.5 px-3 rounded-full text-slate-700 hover:bg-slate-50 transition"
                    }
                  }}
                />
                <UserButton />
              </div>
            </Show>`
);

// Add a link to the portal
content = content.replace(
  '<Link href="/catalog" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition">\n            Catalog\n          </Link>',
  `<Link href="/catalog" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition">
            Catalog
          </Link>
          <Show when="signed-in">
            <Link href="/portal" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition">
              Buyer Portal
            </Link>
          </Show>`
);

fs.writeFileSync(file, content);
console.log('Navbar updated with OrganizationSwitcher and Portal link');
