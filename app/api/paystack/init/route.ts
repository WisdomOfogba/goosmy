import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, matric, email } = body;

  const response = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      amount: 2000 * 100, // Kobo
      callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?email=${email}&name=${name}&matric=${matric}`,
      metadata: { name, matric },
    }),
  });

  const result = await response.json();

  return NextResponse.json({ url: result.data.authorization_url });
}
