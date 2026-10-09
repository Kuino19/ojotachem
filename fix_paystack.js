const fs = require('fs');

const apiPath = 'c:\\Users\\IFEDAYO LAWAL\\Videos\\Armstrong\\chem-market\\src\\app\\api\\checkout\\route.ts';
fs.writeFileSync(apiPath, `import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { userEmail, totalAmount } = body;

    // We use the Paystack API to initialize a real transaction
    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
    
    if (!paystackSecret) {
      return NextResponse.json({ error: 'Paystack Secret not found' }, { status: 500 });
    }

    const paystackRes = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: \`Bearer \${paystackSecret}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: userEmail || 'customer@ojotachem.com',
        amount: Math.round(totalAmount * 100), // Paystack uses kobo
        callback_url: 'http://localhost:3000/order-success'
      })
    });

    const paystackData = await paystackRes.json();

    if (!paystackData.status) {
      console.error('Paystack error:', paystackData);
      return NextResponse.json({ error: paystackData.message }, { status: 400 });
    }

    // Return the real Paystack URL
    return NextResponse.json({ 
      url: paystackData.data.authorization_url, 
      orderId: paystackData.data.reference 
    });

  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
`);

console.log('Updated Checkout API with real Paystack');
