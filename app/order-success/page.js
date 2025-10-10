"use client";
import { useSearchParams } from "next/navigation";

export default function OrderSuccessPage() {
  const params = useSearchParams();
  const method = params.get("method") || "stripe";

  return (
    <div className="p-10 text-center">
      <h1 className="text-4xl font-bold text-green-600 mb-4">✅ Order Confirmed!</h1>
      {method === "stripe" ? (
        <p>Your payment was successfully processed through Stripe.</p>
      ) : (
        <p>Your order was placed successfully. Please pay on delivery.</p>
      )}
      <a
        href="/products"
        className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Continue Shopping
      </a>
    </div>
  );
}
