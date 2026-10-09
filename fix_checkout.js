const fs = require('fs');
const file = 'c:\\Users\\IFEDAYO LAWAL\\Videos\\Armstrong\\chem-market\\src\\components\\CheckoutModal.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace the handleCheckout function to actually call our new API
const newHandleCheckout = `  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          deliveryType,
          deliveryFee,
          subtotal,
          totalAmount,
          customerName: formData.customerName,
          companyName: formData.companyName,
          userEmail: formData.userEmail,
        }),
      });

      const data = await res.json();
      
      if (res.ok) {
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
      } else {
        alert("Payment Error: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to connect to payment gateway.");
    } finally {
      setIsLoading(false);
    }
  };`;

// We'll replace the existing handleCheckout block
content = content.replace(/const handleCheckout = \(e: React\.FormEvent\) => \{[\s\S]*?setIsLoading\(false\);\n      \}, 1500\);\n    \};\n  \};/m, newHandleCheckout);

fs.writeFileSync(file, content);
console.log('CheckoutModal updated');
