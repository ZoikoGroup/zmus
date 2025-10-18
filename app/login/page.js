"use client"
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import { Button, Card, CardBody, Container, Form, Row, Image, Col } from "react-bootstrap";
import React, { useState } from "react";

const Login = () => {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        passwd: '',
        remember: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const validate = () => {
        let formErrors = {};
        if (!formData.username) formErrors.username = "Username is required";
        if (!formData.passwd) formErrors.passwd = "Password is required";
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            setLoading(true);
            const response = await fetch("https://zmapi.zoikomobile.co.uk/api/v1/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.username,
                    password: formData.passwd,
                }),
            });

            const data = await response.json();
            setLoading(false);

            if (!response.ok || !data.success) {
                setErrors({ api: "Invalid credentials, please try again." });
                return;
            }

            // ✅ Save token and user details
            localStorage.setItem("zoiko_token", data.token.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            //alert("Login successful!");
            // redirect to dashboard or home
            window.location.href = "/dashboard";

        } catch (error) {
            console.error("Login error:", error);
            setLoading(false);
            setErrors({ api: "Something went wrong. Please try again later." });
        }
    };

    return (
        <>
            <TopHeader />
            <Header />
            <HeadBar text="Join Buster and flock together with your buddies!" />
            <Container className="p-5">
                <Card>
                    <CardBody>
                        <Row className="gx-5 align-items-center">
                            <Col md={6} sm={12} xs={12} className="d-none d-md-block d-lg-block">
                                <div className="loginbg">
                                    <p className="txtwhite text-center body22">
                                        Hello Buddies! Our well-loved character 'Budgie', our first-of-its-kind animal-friendly network, is set to arrive at your place.
                                    </p>
                                </div>
                            </Col>
                            <Col md={6} sm={12} xs={12}>
                                <h2>Welcome Back!</h2>
                                <p className="body22">
                                    Simply fill in the form below to get started.<br />
                                    We promise it&apos;s quicker than a Budgie flying to its nest!
                                </p>
                                <Form onSubmit={handleSubmit}>
                                    <label htmlFor="username">Username or Email</label>
                                    <input
                                        type="text"
                                        name="username"
                                        className="form-control"
                                        onChange={handleChange}
                                        value={formData.username}
                                    />
                                    {errors.username && <small className="txtred">{errors.username}</small>}
                                    <br />

                                    <label htmlFor="passwd">Password</label>
                                    <input
                                        type="password"
                                        name="passwd"
                                        className="form-control"
                                        onChange={handleChange}
                                        value={formData.passwd}
                                    />
                                    {errors.passwd && <small className="txtred">{errors.passwd}</small>}
                                    <br />

                                    <input
                                        className="form-check-input mb-4"
                                        type="checkbox"
                                        name="remember"
                                        onChange={handleChange}
                                        checked={formData.remember}
                                    />&nbsp;
                                    <label className="form-check-label" htmlFor="remember">Remember me</label>
                                    <br />

                                    {errors.api && <p className="txtred">{errors.api}</p>}

                                    <input
                                        type="submit"
                                        name="submit"
                                        value={loading ? "Logging in..." : "Login"}
                                        className="btn btn-outline-danger"
                                        disabled={loading}
                                    />
                                    &nbsp;
                                    <Button variant="outline-danger" href="/register">Register</Button>
                                    &nbsp;
                                    <Button variant="danger" href="/api/auth/google">Sign in with Google</Button>
                                </Form>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Container>

            <Container fluid className="p-5 bglite">
                <Container>
                    <h4 className="text-center txtred">Let the Good Times Roll with Zolko Mobile!</h4>
                    <p className="text-center body22">
                        Upgrade to Zolko Mobile SIM plans today and experience the power of the nation&apos;s most reliable 5G network!
                        Enjoy free eSIM services and seamless connectivity that keeps you connected wherever you go.
                        Say goodbye to dropped calls and slow speeds &mdash; switch now and feel the difference!
                    </p>
                    <Row className="align-items-center py-4">
                        <Col md={5} sm={12} xs={12}>
                            <Image src="/img/login-benefits.webp" fluid alt="Zoiko Benefits" />
                        </Col>
                        <Col md={7} sm={12} xs={12}>
                            <h4 className="txtred">Unlock Exclusive Benefits with Zolko Mobile!</h4>
                            <p className="body22">
                                Meet Buster, your cheerful guide to savings! Refer a friend to Zolko Mobile, and you&apos;ll both receive a $20 credit.
                                It&apos;s a win-win! Plus, enjoy premium entertainment perks like Spotify, Netflix, and Amazon Prime &mdash; 
                                all while staying connected on the best 5G network in the USA.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </Container>
            <Footer />
        </>
    );
};

export default Login;
