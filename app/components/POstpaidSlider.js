"use client"
import React from "react";
import { Card, CardBody, Container, Button, Image, Row, Col } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PrepaidSlider = () => {

    const { addToCart } = useCart();
    const [plans, setPlans] = useState([]);
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

    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <Container fluid className="py-5 bglite">
            <h2 className="text-center">Zoiko Mobile Postpaid Plans</h2>
            <div className="slider-container">
                <Slider {...settings}>
                    {plans.filter(plan => plan.plan_type === 'postpaid-plans').slice(0,3).map(item => (
                        <Card key={item.id}>
                            <CardBody>
                                <Image src={`https://zmapi.zoikomobile.co.uk/storage/${item.featured_image}`} fluid alt="Zoiko Lite" />
                                <h4 className="pt-2 txtred">{item.title}</h4>
                                <hr className="separator" />
                                <Row>
                                    <Col className="data">{item.sub_title}</Col>
                                    <Col style={{textAlign:'right'}}><span className="curprice">{item.price}</span><br />{item.rate}</Col>
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
                    ))}
                </Slider>
            </div>
        </Container>
    );
}
export default PrepaidSlider;