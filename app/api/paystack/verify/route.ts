import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { trx_ref } = body;

  try {
    const verify = await fetch(
      `https://api.paystack.co/transaction/verify/${trx_ref}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );
    const verification = await verify.json();

    //console.log("Verification response:", verification);

    if (verification.data.status !== "success") {
      return NextResponse.json(
        { error: "Payment not verified" },
        { status: 400 }
      );
    }
    return NextResponse.json({ url: verification.data.status });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }
}
