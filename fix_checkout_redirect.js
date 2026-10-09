const fs = require('fs');
const file = 'c:\\Users\\IFEDAYO LAWAL\\Videos\\Armstrong\\chem-market\\src\\components\\CheckoutModal.tsx';
let content = fs.readFileSync(file, 'utf8');

const oldHandle = `      if (res.ok) {
        // Clear cart and show success
        clearCart();
        setIsCheckoutOpen(false);
        setLastOrder({
          id: data.orderId,
          status: 'PENDING',
          date: new Date().toISOString(),
          total: totalAmount,
          items: items.map(i => ({ chemicalName: i.chemical.name, quantity: i.quantity })),
        });
        setIsOrderSuccessOpen(true);
      } else {`;

const newHandle = `      if (res.ok) {
        // Clear cart
        clearCart();
        
        // Redirect to Paystack Checkout URL securely
        if (data.url) {
           window.location.href = data.url;
           return;
        }

        setIsCheckoutOpen(false);
        setLastOrder({
          id: data.orderId,
          status: 'PENDING',
          date: new Date().toISOString(),
          total: totalAmount,
          items: items.map(i => ({ chemicalName: i.chemical.name, quantity: i.quantity })),
        });
        setIsOrderSuccessOpen(true);
      } else {`;

content = content.replace(oldHandle, newHandle);
fs.writeFileSync(file, content);
console.log('Fixed checkout redirect');
