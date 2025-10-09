"use client";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Col, Container, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import HeadBar from "../components/HeadBar";
import CheckoutForm from "../components/CheckoutForm";

export default function CheckoutPage() {
    const { cartItems, totalPrice, clearCart, removeFromCart } = useCart();
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleCheckout = async () => {
        if (cartItems.length === 0) return alert("Cart is empty!");

        setLoading(true);

        if (paymentMethod === "stripe") {
            // Stripe Checkout
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items: cartItems }),
            });

            const { url } = await res.json();
            window.location.href = url;
        } else {
            // Cash on Delivery
            clearCart();
            router.push("/order-success?method=cod");
        }

        setLoading(false);
    };

    return (
        <>
        <TopHeader />
        <Header />
        <HeadBar text={<>Zoiko Mobile Checkout: Now Review & Complete Your Purchase</>} />
        <Container fluid className="bglite">
            <Container className="py-4 my-4">
                <div className="p-10 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-semibold mb-6">Checkout</h2>
                    <p className="txtred">Connecting Every Possibility with Zoiko Mobile!</p>
                    <Row>
                        <Col md="8" sm="12" xs="12">
                            <h4 className="text-xl font-medium">Order Summary</h4>
                            {cartItems.map((item) => (
                            <div key={item.id} className="d-flex flex-row gap-5 p-4">
                                <span>{item.title}</span>
                                <span>{item.quantity}</span>
                                <span>${item.price * item.quantity}</span>
                                <Button variant="outline" size="sm" onClick={() => removeFromCart(item.id)} className="ms-5"><i className="bi bi-x-square"></i></Button>
                            </div>
                            ))}
                            <hr />
                            <CheckoutForm />
                        </Col>
                        <Col md="4" sm="12" xs="12">
                            <div className="mt-4">
                                <h3 className="font-semibold mb-2">Payment Method</h3>
                                <div className="flex space-x-4">
                                    <label>
                                    <input type="radio" name="payment" value="cod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />{" "}
                                    Cash on Delivery
                                    </label>
                                    <label>
                                    <input type="radio" name="payment" value="stripe" checked={paymentMethod === "stripe"} onChange={() => setPaymentMethod("stripe")} />{" "}
                                    Pay with Stripe
                                    </label>
                                </div>
                            </div>
                            
                            <Button disabled={loading} variant="danger" onClick={handleCheckout} size="sm">
                                {loading ? "Processing..." : "Place Order"}
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Container>
        </Container>
        <Footer />
        </>
    );
}
