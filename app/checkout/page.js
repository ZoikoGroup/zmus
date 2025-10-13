"use client";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
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

    console.log(totalPrice.toFixed(2))

    const [errors, setErrors] = useState({});
    const [selectedValue, setSelectedValue] = useState('');

    const [formData, setFormData] = useState({
        concent: false,
        terms: false
    });

    const handleChange = (e) => {
        setSelectedValue(e.target.value);
        const { name, value, type, checked } = e.target
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        })
    }

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
                            <div className="d-flex justify-content-between">
                                    <div className="d-flex align-items-start w-25">Item</div>
                                    <div className="d-flex align-items-center w-25">Quantity</div>
                                    <div className="d-flex align-items-end w-25">Price</div>
                                    <div className="d-flex align-items-end">Action</div>
                                </div>
                            {cartItems.map((item) => (
                            <div key={item.id} className="d-flex justify-content-between greyborderbox">
                                <div className="w-25">{item.title}</div>
                                <div className="w-25">{item.quantity}</div>
                                <div className="w-25">${item.price * item.quantity}</div>
                                <Button variant="outline" size="sm" onClick={() => removeFromCart(item.id)} className="ms-5"><i className="bi bi-x-square"></i></Button>
                            </div>
                            ))}
                            <hr />
                            <CheckoutForm />
                        </Col>
                        <Col md="4" sm="12" xs="12">
                            <div className="redborderbox">
                                <h4 className="txtgreen">Your order</h4>
                                <div className="d-flex justify-content-between">
                                    <div className="d-flex align-items-start">Item</div>
                                    <div className="d-flex align-items-center">Quantity</div>
                                    <div className="d-flex align-items-end">Price</div>
                                </div>
                                <hr />
                                {cartItems.map((item) => (
                                <div key={item.id} className="d-flex justify-content-between">
                                    <div>{item.title}</div>
                                    <div>{item.quantity}</div>
                                    <div>${item.price * item.quantity}</div>
                                </div>
                                ))}
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <div>Total</div>
                                    <div>${totalPrice.toFixed(2)}</div>
                                </div>
                                <hr />
                                <small>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.</small>
                                <Form.Check label="By submitting this form, you agree to Zoiko College Student Discount Program&apos;s terms and conditions ." name="terms" onChange={handleChange} value={formData.terms} type="checkbox" className="small mt-4" />
                                <Button disabled={loading} variant="danger" onClick={handleCheckout} size="lg" className="my-4">
                                    {loading ? "Processing..." : "Place Order"}
                                </Button>
                            </div>
                            {/* <div className="mt-4">
                                <h3 className="font-semibold mb-2">Payment Method ${totalPrice.toFixed(2)}</h3>
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
                            </Button> */}
                        </Col>
                    </Row>
                </div>
            </Container>
        </Container>
        <Footer />
        </>
    );
}
