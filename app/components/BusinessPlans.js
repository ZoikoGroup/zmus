"use client"
import { Container, Card, CardBody, Row, Col, Button, Image } from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

const BusinessPlans = () => {

    const { addToCart } = useCart();
    const [plans, setPlans] = useState(null);
    const router = useRouter();

    const handleBuyNow = (item) => {
        addToCart(item);
        router.push("/checkout");
    };

    useEffect(() => {
        async function fetchPlans() {
            let res = await fetch('https://zmapi.zoikomobile.co.uk/api/v1/plans')
            let data = await res.json()
            setPlans(data.data)
        }
        fetchPlans()
    }, [])
    if (!plans) return <div>Loading...</div>
    
    return (
        <>
        <Container fluid className="py-5">
            <h2 className="text-center pt-3">Zoiko Mobile Postpaid Business Deals</h2>
            <Row>
                {plans.filter(plan => plan.plan_type === 'business-plans').slice(0,3).map(item => (
                <Col md={4} sm={12} xs={12}>
                    <Card>
                        <CardBody>
                            <Image src={`https://zmapi.zoikomobile.co.uk/storage/${item.featured_image}`} fluid alt="Zoiko Lite" />
                            <h4 className="pt-2 txtred">{item.title}</h4>
                            <hr className="separator" />
                            <Row>
                                <Col className="data">{item.sub_title}</Col>
                                <Col style={{textAlign:'right'}}><span className="curprice">${item.price}</span><br />{item.rate}</Col>
                            </Row>
                            <hr className="separator" />
                            <ul className='check-bullet'>
                                {item.features.slice(0,6).map((ftrs, index) => (
                                <li key={index}>{ftrs.text}</li>
                                ))}
                            </ul>
                            <hr className="separator" />
                            <Button variant="danger" onClick={() => handleBuyNow(item)} size="sm">Buy This Plan</Button>&nbsp;
                            <Button variant="outline-danger" href={`/plans/${item.slug}`} size="sm">View Details</Button>
                        </CardBody>
                    </Card>
                </Col>
                ))}
            </Row>
        </Container>
        <Container fluid className="redimgbg p-0">
            <Container className="p-5">
                <h4>Climb your business&apos;s bottom line.</h4>
                <p>Pick among the best Unlimited Business Postpaid Plans and select the number of lines to see a big impact on your business&apos;s bottom line.</p>
                <h4>Reward your growing business with just one connection to climb to success.</h4>
                <p>Business phone plans are available with a pay monthly rolling easy agreement.</p>
            </Container>
        </Container>
        <Image src="/img/pinkbg-us.webp" fluid alt="Zoiko USA" />
        </>
    );
}
export default BusinessPlans;