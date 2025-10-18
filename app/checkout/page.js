"use client";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import Footer from "../components/Footer";
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import HeadBar from "../components/HeadBar";
import CheckoutForm from "../components/CheckoutForm";
import React, { useRef } from "react";

export default function CheckoutPage() {
    const { cartItems, totalPrice, clearCart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
    const [paymentMethod, setPaymentMethod] = useState("stripe");
    const [cardData, setCardData] = useState({
        cardNumber: "",
        cardName: "",
        cardExpiry: "",
        cardCvc: ""
    });
    const [cardErrors, setCardErrors] = useState({});
    const handleCardChange = (e) => {
        const { name, value } = e.target;
        setCardData({
            ...cardData,
            [name]: value,
        });
    };
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    console.log(totalPrice.toFixed(2))

    const [errors, setErrors] = useState({});
    const [selectedValue, setSelectedValue] = useState('');

    const [formData, setFormData] = useState({
        concent: false,
        terms: false
    });
    const checkoutFormRef = useRef();

    const handleChange = (e) => {
        setSelectedValue(e.target.value);
        const { name, value, type, checked } = e.target
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        })
    }

    const [coupon, setCoupon] = useState("");
    const [couponApplied, setCouponApplied] = useState(false);
    const [discount, setDiscount] = useState(0);
    const [couponError, setCouponError] = useState("");

    // Example coupon logic
    const validCoupons = {
        "ZOIKO10": 0.10, // 10% off
        "SAVE5": 0.05    // 5% off
    };

    const handleApplyCoupon = async () => {
        const code = coupon.trim();
        if (!code) return;
        setCouponError("");
        setLoading(true);
        try {
            // Replace with actual user data if available
            const user_id = 1;
            const email = "anowar.euronox@gmail.com";
            const res = await fetch("https://zmapi.zoikomobile.co.uk/api/v1/apply-coupon", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user_id,
                    email,
                    coupon_code: code
                })
            });
            const data = await res.json();
            if (data.success && data.discount) {
                setDiscount(data.discount); // expects discount as decimal, e.g. 0.10 for 10%
                setCouponApplied(true);
                setCouponError("");
            } else {
                setCouponError(data.message || "Invalid coupon code.");
                setCouponApplied(false);
                setDiscount(0);
            }
        } catch (err) {
            setCouponError("Error applying coupon. Please try again.");
            setCouponApplied(false);
            setDiscount(0);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (!couponApplied) setDiscount(0);
    }, [couponApplied]);

    const handleCheckout = async () => {
        if (cartItems.length === 0) return alert("Cart is empty!");

        // Validate user data from CheckoutForm
        if (checkoutFormRef.current && !checkoutFormRef.current.validate()) {
            alert("Please fill all required user details correctly.");
            return;
        }
        // Validate terms agreement
        if (!formData.terms) {
            setErrors({ terms: "You must agree to the terms and conditions." });
            return;
        }
        // Validate credit card if selected
        if (paymentMethod === "card") {
            const newCardErrors = {};
            if (!cardData.cardNumber) newCardErrors.cardNumber = "Card number is required.";
            if (!cardData.cardName) newCardErrors.cardName = "Name on card is required.";
            if (!cardData.cardExpiry) newCardErrors.cardExpiry = "Expiry date is required.";
            if (!cardData.cardCvc) newCardErrors.cardCvc = "CVC is required.";
            setCardErrors(newCardErrors);
            if (Object.keys(newCardErrors).length > 0) return;
        }
        setErrors({});
        setLoading(true);

        // Get user data from form
        const userData = checkoutFormRef.current ? checkoutFormRef.current.getFormData() : {};

        if (paymentMethod === "stripe") {
            // Stripe Checkout
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items: cartItems, user: userData }),
            });

            const { url } = await res.json();
            window.location.href = url;
        } else if (paymentMethod === "card") {
            // Credit Card
            // Here you would handle card payment logic
            alert("Credit card payment submitted!");
            clearCart();
            router.push("/order-success?method=card");
        }

        setLoading(false);
    };

    // Calculate shipping fee if any item is pSIM
    const hasPSIM = cartItems.some(item => item.simType && item.simType.toLowerCase() === 'psim');
    const shippingFee = hasPSIM ? 5 : 0;

    // Calculate tax @10% on subtotal after discount
    // If backend returns discount as a fixed value (e.g., $10 off), use that
    // If discount is a percentage (e.g., 0.10 for 10%), calculate accordingly
    let couponDeduction = 0;
    let subtotal = totalPrice;
    if (discount > 0) {
        if (discount < 1) {
            // percentage discount
            couponDeduction = totalPrice * discount;
        } else {
            // fixed value discount
            couponDeduction = discount;
        }
        subtotal = totalPrice - couponDeduction;
    }
    if (subtotal < 0) subtotal = 0;
    const taxRate = 0.10;
    const taxAmount = subtotal * taxRate;
    const grandTotal = subtotal + taxAmount + shippingFee;

    return (
        <>
        <TopHeader />
        <Header />
        <HeadBar text={<>Zoiko Mobile Checkout: Now Review & Complete Your Purchase</>} />
        <Container fluid className="bglite">
            <Container className="py-4">
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
                            <div key={item.id} className="d-flex justify-content-between align-items-center greyborderbox">
                                <div className="w-25">
                                    {item.title}
                                    {item.simType && (
                                        <div className="small text-muted">SIM: {item.simType.toUpperCase()}</div>
                                    )}
                                </div>
                                <div className="w-25 d-flex align-items-center">
                                    <Button variant="outline" size="sm" onClick={() => decreaseQuantity(item.id)} className="me-2">-</Button>
                                    <span>{item.quantity}</span>
                                    <Button variant="outline" size="sm" onClick={() => increaseQuantity(item.id)} className="ms-2">+</Button>
                                </div>
                                <div className="w-25">${item.price * item.quantity}</div>
                                <Button variant="outline" size="sm" onClick={() => removeFromCart(item.id)} className="ms-5"><i className="bi bi-x-square"></i></Button>
                            </div>
                            ))}
                            {/* Coupon Section */}
                            <div className="my-5">
                                <Form.Label>Coupon Code</Form.Label>
                                <div className="d-flex">
                                    <Form.Control
                                        type="text"
                                        value={coupon}
                                        onChange={e => setCoupon(e.target.value)}
                                        placeholder="Enter coupon code"
                                        disabled={couponApplied}
                                    />
                                    <Button
                                        variant="primary"
                                        className="ms-2"
                                        onClick={handleApplyCoupon}
                                        disabled={couponApplied || !coupon}
                                    >
                                        {couponApplied ? "Applied" : "Apply"}
                                    </Button>
                                </div>
                                {couponError && <div className="text-danger small mt-2">{couponError}</div>}
                                {couponApplied && <div className="text-success small mt-2">Coupon applied! Discount: {Math.round(discount * 100)}%</div>}
                            </div>
                            {/* End Coupon Section */}
                            <hr />
                            <CheckoutForm ref={checkoutFormRef} />
                        </Col>
                        <Col md="4" sm="12" xs="12">
                            <div className="redborderbox">
                                <h4 className="txtgreen">Your order</h4>
                                <div className="d-flex justify-content-between">
                                    <div className="w-40 fw-bold">Item</div>
                                    <div className="w-30 fw-bold text-center">Quantity</div>
                                    <div className="w-30 fw-bold text-end">Price</div>
                                </div>
                                <hr />
                                {cartItems.map((item) => (
                                <div key={item.id} className="d-flex justify-content-between align-items-center">
                                    <div className="w-40">
                                        {item.title}
                                        {item.simType && (
                                            <div className="small text-muted">SIM: {item.simType.toUpperCase()}</div>
                                        )}
                                    </div>
                                    <div className="w-30 text-center">{item.quantity}</div>
                                    <div className="w-30 text-end">${item.price * item.quantity}</div>
                                </div>
                                ))}
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <div>Subtotal</div>
                                    <div>${totalPrice.toFixed(2)}</div>
                                </div>
                                {couponDeduction > 0 && (
                                    <div className="d-flex justify-content-between">
                                        <div>Coupon Discount</div>
                                        <div className="text-success">- ${couponDeduction.toFixed(2)}</div>
                                    </div>
                                )}
                                <div className="d-flex justify-content-between">
                                    <div>Tax (10%)</div>
                                    <div>${taxAmount.toFixed(2)}</div>
                                </div>
                                {shippingFee > 0 && (
                                    <div className="d-flex justify-content-between">
                                        <div>Shipping Fee</div>
                                        <div>${shippingFee.toFixed(2)}</div>
                                    </div>
                                )}
                                <div className="d-flex justify-content-between fw-bold">
                                    <div>Total</div>
                                    <div>${grandTotal.toFixed(2)}</div>
                                </div>
                                <div className="mt-4">
                                    <h5 className="font-semibold mb-2">Select Payment</h5>
                                    <div className="flex space-x-4 mb-3">
                                        <label className="me-4">
                                            <input type="radio" name="payment" value="stripe" checked={paymentMethod === "stripe"} onChange={() => setPaymentMethod("stripe")} />{" "}
                                            Pay with Stripe
                                        </label>
                                        <label>
                                            <input type="radio" name="payment" value="card" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} />{" "}
                                            Credit Card
                                        </label>
                                    </div>
                                    {paymentMethod === "card" && (
                                        <div className="mb-3 p-3 border rounded bg-light">
                                            <Form.Group className="mb-2">
                                                <Form.Label>Card Number <span className="txtred">*</span></Form.Label>
                                                <Form.Control type="text" name="cardNumber" placeholder="Card number" value={cardData.cardNumber} onChange={handleCardChange} isInvalid={!!cardErrors.cardNumber} />
                                                {cardErrors.cardNumber && <div className="text-danger small">{cardErrors.cardNumber}</div>}
                                            </Form.Group>
                                            <Form.Group className="mb-2">
                                                <Form.Label>Name on Card <span className="txtred">*</span></Form.Label>
                                                <Form.Control type="text" name="cardName" placeholder="Name on card" value={cardData.cardName} onChange={handleCardChange} isInvalid={!!cardErrors.cardName} />
                                                {cardErrors.cardName && <div className="text-danger small">{cardErrors.cardName}</div>}
                                            </Form.Group>
                                            <Form.Group className="mb-2">
                                                <Form.Label>Expiry Date <span className="txtred">*</span></Form.Label>
                                                <Form.Control type="text" name="cardExpiry" placeholder="MM/YY" value={cardData.cardExpiry} onChange={handleCardChange} isInvalid={!!cardErrors.cardExpiry} />
                                                {cardErrors.cardExpiry && <div className="text-danger small">{cardErrors.cardExpiry}</div>}
                                            </Form.Group>
                                            <Form.Group className="mb-2">
                                                <Form.Label>CVC <span className="txtred">*</span></Form.Label>
                                                <Form.Control type="text" name="cardCvc" placeholder="CVC" value={cardData.cardCvc} onChange={handleCardChange} isInvalid={!!cardErrors.cardCvc} />
                                                {cardErrors.cardCvc && <div className="text-danger small">{cardErrors.cardCvc}</div>}
                                            </Form.Group>
                                        </div>
                                    )}
                                </div>
                                <hr />
                                <small>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.</small>
                                <Form.Check label="By submitting this form, you agree to Zoiko College Student Discount Program&apos;s terms and conditions ." name="terms" onChange={handleChange} checked={formData.terms} type="checkbox" className="small mt-4" />
                                {errors.terms && <div className="text-danger small mt-2">{errors.terms}</div>}
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
