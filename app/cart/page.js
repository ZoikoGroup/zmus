"use client";
import { useCart } from "../context/CartContext";
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import HeadBar from "../components/HeadBar";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
import { Button, Container } from "react-bootstrap";

export default function CartPage() {
  const { cartItems, removeFromCart, totalPrice, clearCart } = useCart();

  return (
    <>
    <TopHeader />
    <Header />
    <HeadBar text={<>Cart Details</>} />
    <Container fluid className="bglite py-4">
        <Container>
            <div className="p-10">
            <h2 className="text-3xl font-semibold mb-4">Your Cart</h2>

            {cartItems.length === 0 ? (
                <p>Your cart is empty 🛍️</p>
            ) : (
                <>
                <ul className="space-y-3">
                    {cartItems.map((item) => (
                    <li key={item.id} className="flex justify-between border p-4 rounded-lg">
                        <div>
                            <p className="font-semibold">{item.name}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: ${item.price * item.quantity}</p>
                        </div>
                        <Button variant="danger" onClick={() => removeFromCart(item.id)}>Remove</Button>
                    </li>
                    ))}
                </ul>

                <div className="mt-6 border-t pt-4">
                    <p className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</p>
                    <Button onClick={clearCart} variant="danger">Clear Cart</Button>
                </div>
                </>
            )}
            </div>
        </Container>
    </Container>
    <Testimonials />
    <Footer />
    </>
  );
}
