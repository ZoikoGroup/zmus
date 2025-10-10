// app/order-success/OrderSuccessContent.js
'use client'; // Mark this as a Client Component
import { useSearchParams } from 'next/navigation';

export default function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div>
      <h1>Order Successful!</h1>
      {orderId && <p>Your order ID is: {orderId}</p>}
      {!orderId && <p>Order details loading or not found.</p>}
    </div>
  );
}