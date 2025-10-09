"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button, Col, Container, Row, Card, CardBody, Image, Spinner } from "react-bootstrap";
import TopHeader from "../../components/TopHeader";
import Header from "../../components/Header";
import HeadBar from "../../components/HeadBar";
import Footer from "../../components/Footer";
import Testimonials from "../../components/Testimonials";
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/navigation";

export default function PlanDetailsPage() {
    const { slug } = useParams();
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const router = useRouter();

    const handleBuyNow = (item) => {
        addToCart(item);
        router.push("/checkout");
    };

    useEffect(() => {
        if (!slug) return;

        fetch(`https://zmapi.zoikomobile.co.uk/api/v1/plan/slug/${slug}`)
            .then((res) => res.json())
            .then((res) => {
                if (res.success) {
                setPlan(res.data);
                } else {
                setPlan(null);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [slug]);

    if (loading) {
        return (
            <>
            <TopHeader />
            <Header />
            <Container className="text-center mt-5">
            <Spinner animation="border" /> Loading plan...
            </Container>
            </>
        );
    }

    if (!plan) {
        return (
        <>
        <TopHeader />
        <Header />
        <HeadBar text={<>Plan Details</>} />
        <Container className="text-center mt-5">
        <h2>Plan not found</h2>
        </Container>
        <Footer />
        </>
        );
    }

    return (
    <>
    <TopHeader />
    <Header />
    <HeadBar text={<>Zoiko Prepaid Plan</>} />

    {/* Plan Details */}
    <Container fluid className="bglite">
        <Container className="py-5 w-75">
            <h2>{plan.title}</h2>

            {/* Plan Features */}
            {plan.features && plan.features.map((f, i) => (
                <div key={i} className="planbox d-flex flex-row p-2 gap-2 align-items-center">
                    {/* Icon image */}
                    {f.icon_url && (
                        <Image src={`https://zmapi.zoikomobile.co.uk/storage/${f.icon_url}`} alt={f.text} fluid />
                    )}

                    <span className="p-0">{f.text}</span>
                </div>
            ))}

            {/* Continue Button */}
            <div className="text-center pt-4">
                <Button variant="danger" size="lg" onClick={() => handleBuyNow(plan)}>Continue To Checkout</Button>
            </div>
        </Container>
    </Container>




      {/* Why Choose Zoiko Section */}
      <Container fluid className="bglite p-5 whychoose">
            <h2 className="text-center pb-3">Zoiko Mobile Prepaid Plan Features</h2>
            <Row className="gx-3">
                <Col md={3} sm={12} xs={12}>
                    <Card className="px-5 py-3">
                        <CardBody className="text-center">
                            <Image src="/img/icons/rss_feed.png" fluid className="icw10 mb-3" alt="Plan Flexibility"  />
                            <p><span className="txtred body22">Unlimited 5G and 4G LTE Data</span><br />
                            Enjoy reliable, ultra-fast data, even during peak hours. Stream, browse, and work with confidence, knowing you have access to unlimited data.</p>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={3} sm={12} xs={12}>
                    <Card className="px-5 py-3">
                        <CardBody className="text-center">
                            <Image src="/img/icons/text.png" fluid className="icw10 mb-3" alt="Plan Flexibility"  />
                            <p><span className="txtred body22">Unlimited Talk &amp; Text</span><br />
                            Stay connected to family, friends, and colleagues across the U.S. with unlimited calls and text messages, ensuring seamless communication wherever you are.</p>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={3} sm={12} xs={12}>
                    <Card className="px-5 py-3">
                        <CardBody className="text-center">
                            <Image src="/img/icons/5g-solid.png" fluid className="icw10 mb-3" alt="Sustainablity"  />
                            <p><span className="txtred body22">Nationwide 5G & 4G Coverage</span><br />
                            Get dependable coverage from cities to rural areas. No matter where you are, Zoiko Mobile provides seamless connectivity across the nation.</p>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={3} sm={12} xs={12}>
                    <Card className="px-5 py-3">
                        <CardBody className="text-center">
                            <Image src="/img/icons/hotspot.png" fluid className="icw10 mb-3" alt="Sustainablity"  />
                            <p><span className="txtred body22">Mobile Hotspot Access</span><br />
                            Share your mobile data with other devices, such as laptops or tablets, at no extra cost. Stay connected on the go, whether you are at work, school, or traveling.</p>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <br />
            <Row className="gx-3">
                <Col md={3} sm={12} xs={12}>
                    <Card className="px-5 py-3">
                        <CardBody className="text-center">
                            <Image src="/img/icons/devices_other.png" fluid className="icw10 mb-3" alt="AI Powred" />
                            <p><span className="txtred body22">Affordable Device Protection</span><br />
                            Protect your device from accidental damage, loss, or theft with affordable and customizable device protection plans, giving you peace of mind.</p>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={3} sm={12} xs={12}>
                    <Card className="px-5 py-3">
                        <CardBody className="text-center">
                            <Image src="/img/icons/finance_chip.png" fluid className="icw10 mb-3" alt="Regulatory"  />
                            <p><span className="txtred body22">Simple and Transparent Pricing</span><br />
                            No hidden fees - just clear and competitive pricing. Zoiko Mobile&quot;s plans offer simplicity and transparency so you always know what to expect.</p>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={3} sm={12} xs={12}>
                    <Card className="px-5 py-3">
                        <CardBody className="text-center">
                            <Image src="/img/icons/phone.png" fluid className="icw10 mb-3" alt="Customer Support"  />
                            <p><span className="txtred body22">Free International Roaming</span><br />
                            Make international calls and roam freely in Canada and Mexico without the extra charges. Stay in touch with loved ones abroad without worrying about costs.</p>
                        </CardBody>
                    </Card>
                </Col>
                <Col md={3} sm={12} xs={12}>
                    <Card className="px-5 py-3">
                        <CardBody className="text-center">
                            <Image src="/img/icons/customer-support.png" fluid className="icw10 mb-3" alt="Customer Support"  />
                            <p><span className="txtred body22">Priority Customer Support</span><br />
                            Get faster and more personalized, priority customer service, ensuring that any issue is quickly addressed by our dedicated support team.</p>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>

    <Testimonials />
    <Footer />
    </>
  );
}
