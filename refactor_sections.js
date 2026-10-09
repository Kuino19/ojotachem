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

// 6. OjotaDepotSection.tsx
refactorFile('src/components/OjotaDepotSection.tsx', (content) => {
  return content
    .replace('py-16 bg-white', 'py-32 bg-white')
    .replace('text-3xl lg:text-4xl font-bold', 'text-4xl lg:text-5xl font-black')
    .replace(/gap-8/g, 'gap-16')
    .replace(/space-y-6/g, 'space-y-10');
});

// 7. SeoContentSection.tsx
refactorFile('src/components/SeoContentSection.tsx', (content) => {
  return content
    .replace('py-16 bg-slate-50', 'py-32 bg-slate-50')
    .replace('text-3xl font-bold', 'text-4xl font-extrabold')
    .replace('space-y-12 max-w-5xl', 'space-y-20 max-w-5xl')
    .replace(/space-y-4/g, 'space-y-8')
    .replace(/leading-relaxed/g, 'leading-loose');
});

// 8. Footer.tsx
refactorFile('src/components/Footer.tsx', (content) => {
  return content
    .replace('pt-16 pb-8', 'pt-24 pb-12')
    .replace('text-sm text-slate-400 leading-relaxed', 'text-base text-slate-500 leading-loose')
    .replace(/gap-8/g, 'gap-16');
});

