import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
console.log(stripe);

export async function POST(req) {
    try {
        const body = await req.json();

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: body.items.map(item => ({
                price_data: {
                currency: "usd",
                product_data: { name: item.name },
                unit_amount: item.price * 100,
                },
                quantity: item.quantity,
            })),
            success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/order-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`,
        });

        return Response.json({ url: session.url });
    } catch (error) {
        console.error("Stripe Checkout Error:", error);
        return Response.json({ error: error.message }, { status: 500 });
    }
}
