const fs = require('fs');
const path = require('path');

const ROOT = 'c:\\Users\\IFEDAYO LAWAL\\Videos\\Armstrong\\chem-market';

function refactorFile(relativePath, replacer) {
  const fullPath = path.join(ROOT, relativePath);
  if (!fs.existsSync(fullPath)) return;
  const content = fs.readFileSync(fullPath, 'utf8');
  const newContent = replacer(content);
  fs.writeFileSync(fullPath, newContent);
  console.log('Refactored ' + relativePath);
}

// 1. HeroSection.tsx
refactorFile('src/components/HeroSection.tsx', (content) => {
  return content
    .replace('py-20 lg:py-24', 'py-32 lg:py-48')
    .replace('gap-10', 'gap-20')
    .replace('lg:col-span-7 space-y-8', 'lg:col-span-6 space-y-12')
    .replace('text-4xl lg:text-5xl lg:leading-[1.15]', 'text-5xl lg:text-7xl lg:leading-[1.1]')
    .replace('leading-relaxed mb-1', 'leading-loose')
    .replace('gap-4 pt-2', 'gap-6 pt-6')
    .replace('lg:col-span-5', 'lg:col-span-6')
    .replace(/<div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-2">[\s\S]*?<\/div>\s*<\/div>/, '')
    .replace('bg-white rounded-3xl p-7 border border-slate-200/90 shadow-xl relative overflow-hidden', 'bg-white rounded-[2.5rem] p-10 lg:p-14 border border-slate-100 shadow-2xl relative overflow-hidden')
    .replace('mt-6 pt-5 border-t border-slate-100 bg-slate-50/80 -mx-7 -mb-7 p-6 rounded-b-3xl', 'mt-10 pt-8 border-t border-slate-100 bg-slate-50/50 -mx-10 lg:-mx-14 -mb-10 lg:-mb-14 p-10 lg:p-14 rounded-b-[2.5rem]')
    .replace(/leading-relaxed/g, 'leading-loose')
    .replace(/space-y-4/g, 'space-y-8');
});

// 2. ChemicalGrid.tsx
refactorFile('src/components/ChemicalGrid.tsx', (content) => {
  return content
    .replace('py-12 bg-slate-50', 'py-24 bg-slate-50')
    .replace('grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6', 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14');
});

// 3. ChemicalCard.tsx
refactorFile('src/components/ChemicalCard.tsx', (content) => {
  return content
    .replace('flex flex-col h-full bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-lg', 'flex flex-col h-full bg-white rounded-[2rem] border border-slate-100 shadow-md hover:shadow-2xl')
    .replace('p-5 flex-1', 'p-8 flex-1')
    .replace('text-lg font-bold text-slate-900 leading-tight mb-2', 'text-2xl font-extrabold text-slate-900 leading-tight mb-4')
    .replace('p-5 border-t border-slate-100 bg-slate-50/50 space-y-3', 'p-8 border-t border-slate-50 bg-slate-50/30 space-y-5')
    .replace('px-4 py-2.5 rounded-xl text-sm', 'px-6 py-4 rounded-2xl text-base')
    .replace(/text-xs/g, 'text-sm')
    .replace('mb-3', 'mb-6');
});

// 4. Navbar.tsx
refactorFile('src/components/Navbar.tsx', (content) => {
  return content
    .replace('h-16 md:h-20', 'h-24 md:h-28')
    .replace('text-sm font-medium', 'text-base font-semibold');
});

// 5. CheckoutModal.tsx
refactorFile('src/components/CheckoutModal.tsx', (content) => {
  return content
    .replace('w-full max-w-4xl bg-white rounded-3xl', 'w-full max-w-6xl bg-white rounded-[2.5rem]')
    .replace('p-5 lg:p-7 border-b', 'p-10 lg:p-12 border-b')
    .replace('p-5 lg:p-7 space-y-6', 'p-10 lg:p-12 space-y-10')
    .replace('text-xl font-bold', 'text-3xl font-black')
    .replace(/gap-6/g, 'gap-12');
});

