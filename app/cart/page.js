"use client";
import { useCart } from "../context/CartContext";
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import HeadBar from "../components/HeadBar";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
import { Button, Container } from "react-bootstrap";
import { useRouter } from "next/navigation";

export default function CartPage() {
    const { cartItems, removeFromCart, totalPrice, clearCart } = useCart();
    const router = useRouter();
    console.log("Cart Items:", cartItems);
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
                    <div className="table-responsive">
                        <table className="table table-bordered align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>Item</th>
                                    <th>SIM Type</th>
                                    <th>Line Type</th>
                                    <th>Port Number</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <span className="fw-bold">{item.title || item.name}</span>
                                        </td>
                                        <td>{item.simType ? item.simType.toUpperCase() : '-'}</td>
                                        <td>{item.lineType ? (item.lineType === 'new' ? 'New Line' : 'Port Number') : '-'}</td>
                                        <td>{item.portNumber ? item.portNumber : '-'}</td>
                                        <td>{item.quantity}</td>
                                        <td>${item.price * item.quantity}</td>
                                        <td>
                                            <Button variant="danger" size="sm" onClick={() => removeFromCart(item.id)}>Remove</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-6 border-t pt-4">
                        <p className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</p>
                        <Button onClick={clearCart} variant="danger" className="me-3">Clear Cart</Button>
                        <Button
                            variant="success"
                            disabled={cartItems.length === 0}
                            onClick={() => router.push("/checkout")}
                        >
                            Proceed To Checkout
                        </Button>
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
