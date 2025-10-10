// app/order-success/page.js
import { Suspense } from 'react';
import OrderSuccessContent from './OrderSuccessContent'; // Your component using useSearchParams

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div>Loading order details...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}