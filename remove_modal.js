const fs = require('fs');
const path = require('path');

function removeAccountModal(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace("import { AccountModal } from './AccountModal';\n", "");
  content = content.replace("<AccountModal />\n", "");
  fs.writeFileSync(filePath, content);
}

removeAccountModal('c:\\Users\\IFEDAYO LAWAL\\Videos\\Armstrong\\chem-market\\src\\components\\HomeClient.tsx');
removeAccountModal('c:\\Users\\IFEDAYO LAWAL\\Videos\\Armstrong\\chem-market\\src\\components\\CatalogClient.tsx');
console.log('AccountModal removed from clients');
