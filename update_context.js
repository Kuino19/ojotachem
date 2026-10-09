const fs = require('fs');
const path = require('path');
const ROOT = 'c:\\Users\\IFEDAYO LAWAL\\Videos\\Armstrong\\chem-market';

const contextPath = path.join(ROOT, 'src/context/CartContext.tsx');
let content = fs.readFileSync(contextPath, 'utf8');

if (!content.includes('isAccountOpen')) {
  // interface
  content = content.replace(
    'isRfqModalOpen: boolean;',
    "isRfqModalOpen: boolean;\n  isAccountOpen: boolean;\n  setIsAccountOpen: (open: boolean) => void;"
  );
  // useState
  content = content.replace(
    'const [isRfqModalOpen, setIsRfqModalOpen] = useState(false);',
    "const [isRfqModalOpen, setIsRfqModalOpen] = useState(false);\n  const [isAccountOpen, setIsAccountOpen] = useState(false);"
  );
  // provider value
  content = content.replace(
    'setIsRfqModalOpen,',
    "setIsRfqModalOpen,\n        isAccountOpen,\n        setIsAccountOpen,"
  );
  fs.writeFileSync(contextPath, content);
  console.log('CartContext updated.');
}
