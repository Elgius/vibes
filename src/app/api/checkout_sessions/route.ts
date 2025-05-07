import { NextResponse } from "next/server";
import { headers } from "next/headers";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: "price_1RMErHFNlmTKWbTj7wymC2KZ",
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
    });
    if (!session.url) {
      return NextResponse.json(
        { error: "No redirect URL returned from Stripe." },
        { status: 500 }
      );
    }
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    let message = "Unknown error";
    let status = 500;
    if (err instanceof Error) {
      message = err.message;
    }
    if (
      typeof err === "object" &&
      err !== null &&
      "statusCode" in err &&
      typeof (err as any).statusCode === "number"
    ) {
      status = (err as any).statusCode;
    }
    return NextResponse.json({ error: message }, { status });
  }
}
