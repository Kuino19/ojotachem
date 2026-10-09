import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const secret = process.env.PAYSTACK_SECRET_KEY || '';

export async function POST(req: Request) {
  try {
    const text = await req.text();
    const signature = req.headers.get('x-paystack-signature');

    // Verify signature
    const hash = crypto.createHmac('sha512', secret).update(text).digest('hex');
    if (hash !== signature) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
    }

    const event = JSON.parse(text);

    if (event.event === 'charge.success') {
      const reference = event.data.reference;

      // Update order in database
      await prisma.order.update({
        where: { id: reference },
        data: { status: 'PAID', paymentRef: event.data.id.toString() }
      });
      
      console.log(`[PAYSTACK WEBHOOK] Successfully marked order ${reference} as PAID.`);
    }

    return NextResponse.json({ status: 'success' }, { status: 200 });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
