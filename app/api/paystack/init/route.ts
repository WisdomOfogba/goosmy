import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { fullName, matricNumber, email } = body;

  const response = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      amount: 1000 * 100, // Kobo
      callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cos-assignment?email=${encodeURIComponent(email)}&name=${encodeURIComponent(fullName)}&matric=${encodeURIComponent(matricNumber)}`,
      metadata: { fullName, matricNumber },
    }),
  });

  const result = await response.json();

  return NextResponse.json({ url: result.data.authorization_url });
}
