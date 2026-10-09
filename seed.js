const { PrismaClient } = require('@prisma/client');
const { CHEMICALS_DATA } = require('./src/data/chemicals');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with products...');
  for (const product of CHEMICALS_DATA) {
    await prisma.product.create({
      data: {
        id: product.id,
        name: product.name,
        casNumber: product.casNumber,
        chemicalFormula: product.chemicalFormula || '-',
        purity: product.purity,
        grade: product.grade,
        description: product.description,
        priceNgn: product.priceNgn,
        stockQuantity: product.stockQuantity,
        category: product.category,
        packaging: product.packaging,
        imageUrl: product.imageUrl,
      }
    });
  }
  console.log('Seeding complete!');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
