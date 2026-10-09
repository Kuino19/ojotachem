const fs = require('fs');
const path = require('path');
const ROOT = 'c:\\Users\\IFEDAYO LAWAL\\Videos\\Armstrong\\chem-market';

// 1. Update Types
const typesPath = path.join(ROOT, 'src/types/index.ts');
let typesContent = fs.readFileSync(typesPath, 'utf8');
if (!typesContent.includes('imageUrl: string;')) {
  typesContent = typesContent.replace('packaging: string;', "packaging: string;\n  imageUrl: string;");
  fs.writeFileSync(typesPath, typesContent);
}

// 2. Update Chemicals Data with Images
const chemicalsPath = path.join(ROOT, 'src/data/chemicals.ts');
let chemContent = fs.readFileSync(chemicalsPath, 'utf8');
const getImageUrl = (name, category) => {
  const images = {
    'Caustic Soda': 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800&auto=format&fit=crop',
    'Liquid': 'https://images.unsplash.com/photo-1605273397987-9bc64e1d13db?q=80&w=800&auto=format&fit=crop',
    'Powder': 'https://images.unsplash.com/photo-1618422176428-c1787ba49749?q=80&w=800&auto=format&fit=crop',
    'Lab': 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop',
    'Sacks': 'https://images.unsplash.com/photo-1588629555135-263301aeb4b8?q=80&w=800&auto=format&fit=crop'
  };
  
  if (name.includes('Caustic') || name.includes('Soda Ash')) return images['Sacks'];
  if (name.includes('Acid') || name.includes('Liquid') || name.includes('SLES') || name.includes('LABSA')) return images['Liquid'];
  if (category.includes('Laboratory')) return images['Lab'];
  return images['Powder'];
};

// Add imageUrl to the data objects
const updatedChemContent = chemContent.replace(/packaging: (.*?),/g, (match, p1) => {
  // Try to randomly assign based on a simple rotation or regex, but for simplicity let's just use replace and a random looking pattern
  return `${match}\n    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800&auto=format&fit=crop',`; 
});
// Actually, let's just completely rewrite the chemicals array mapping dynamically in JS to be safe
// Since it's a TS file with export const CHEMICALS_DATA = [...], we can do a regex replace
const finalChemContent = chemContent.replace(/(packaging:\s*['"`].*?['"`],)/g, "$1\n    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800',");
fs.writeFileSync(chemicalsPath, finalChemContent);
// Let's make the images varied!
let fileStr = fs.readFileSync(chemicalsPath, 'utf8');
let counter = 0;
const imgs = [
  'https://images.unsplash.com/photo-1588629555135-263301aeb4b8?q=80&w=800', // Sacks
  'https://images.unsplash.com/photo-1605273397987-9bc64e1d13db?q=80&w=800', // Blue Drums
  'https://images.unsplash.com/photo-1618422176428-c1787ba49749?q=80&w=800', // White powder
  'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800', // Lab Flasks
  'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800', // Lab powder
  'https://images.unsplash.com/photo-1603126857599-f6e157824fce?q=80&w=800'  // Scientist/Vials
];
fileStr = fileStr.replace(/imageUrl:\s*'.*?'/g, () => {
  const img = imgs[counter % imgs.length];
  counter++;
  return `imageUrl: '${img}'`;
});
fs.writeFileSync(chemicalsPath, fileStr);

console.log('Types and Data updated.');
