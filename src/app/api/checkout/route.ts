import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '../../../lib/prisma';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { items, customerName, companyName, userEmail, deliveryType, deliveryFee, subtotal, totalAmount } = body;

    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
    if (!paystackSecret) {
      return NextResponse.json({ error: 'Paystack Secret not found' }, { status: 500 });
    }

    // Initialize Paystack FIRST so we can use its reference as Order ID
    const paystackRes = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${paystackSecret}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: userEmail || 'customer@ojotachem.com',
        amount: Math.round(totalAmount * 100), // kobo
        callback_url: 'http://localhost:3000/order-success'
      })
    });

    const paystackData = await paystackRes.json();
    if (!paystackData.status) {
      return NextResponse.json({ error: paystackData.message }, { status: 400 });
    }

    const reference = paystackData.data.reference;

    // Create Order in Database using Paystack Reference as ID
    const order = await prisma.order.create({
      data: {
        id: reference,
        userId,
        userEmail,
        customerName,
        companyName,
        deliveryType,
        deliveryFee,
        subtotal,
        totalAmount,
        status: 'PENDING',
        items: {
          create: items.map((item: any) => ({
            productId: item.chemical.id,
            quantity: item.quantity,
            priceAtTime: item.chemical.priceNgn,
          })),
        },
      },
    });

    console.log(`[CHECKOUT] Order ${order.id} generated successfully.`);

    return NextResponse.json({ 
      url: paystackData.data.authorization_url, 
      orderId: order.id 
    });

  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
