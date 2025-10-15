"use client";
import React, { useEffect, useState } from "react";
import { Card, CardBody, Container, Button, Image, Row, Col } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SimTypeModal from "./SimTypeModal";

const PrepaidSlider = () => {
    const [plans, setPlans] = useState([]);
    const { addToCart } = useCart();
    const router = useRouter();
    const [showSimModal, setShowSimModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);

    const handleBuyNow = (item) => {
        setSelectedPlan(item);
        setShowSimModal(true);
    };

    const handleSimTypeSelect = (data) => {
        if (selectedPlan) {
            addToCart({
                ...selectedPlan,
                simType: data.simType,
                lineType: data.lineType,
                portNumber: data.portNumber || ""
            });
            setShowSimModal(false);
            setSelectedPlan(null);
            router.push("/checkout");
        }
    };

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const res = await fetch("https://zmapi.zoikomobile.co.uk/api/v1/plans");
                const result = await res.json();
                if (result.success) {
                    setPlans(result.data);
                }
            } catch (error) {
                console.error("Error fetching plans:", error);
            }
        };
        fetchPlans();
    }, []);

    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1, infinite: true, dots: true } },
            { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1, initialSlide: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
    };

    return (
        <Container fluid className="py-5 bglite">
            <h2 className="text-center">Zoiko Mobile Prepaid Plans</h2>
            <div className="slider-container">
                <Slider {...settings}>
                    {plans.map((item) => (
                        <Card key={item.id}>
                            <CardBody>
                                {/* IMAGE */}
                                <Image
                                    src={item.featured_image ? `https://zmapi.zoikomobile.co.uk/storage/${item.featured_image}` : "/static/images/plan-placeholder.png"}
                                    fluid
                                    alt={item.title}
                                />

                                {/* TITLE */}
                                <h4 className="pt-2 txtred">{item.title}</h4>

                                <hr className="separator" />

                                {/* DATA ROW */}
                                <Row>
                                    <Col className="data">{item.sub_title || "Unlimited Data"}</Col>
                                    <Col style={{ textAlign: "right" }}>
                                        <span className="curprice">{item.currency} {item.price}</span>
                                        <br />
                                        {item.rate || "/mo/line"}
                                    </Col>
                                </Row>

                                <hr className="separator" />

                                {/* FEATURES */}
                                <ul className="check-bullet">
                                    {item.features.map((feature, idx) => (
                                        <li key={idx}>{feature.text}</li>
                                    ))}
                                </ul>

                                <hr className="separator" />

                                {/* BUTTONS */}
                                <Button variant="danger" onClick={() => handleBuyNow(item)} size="sm">
                                    Buy This Plan
                                </Button>
                                &nbsp;
                                <Button variant="outline-danger" href={`/plans/${item.slug}`} size="sm">
                                    View Details
                                </Button>
                            </CardBody>
                        </Card>
                    ))}
                </Slider>
            </div>
            <SimTypeModal show={showSimModal} onHide={() => setShowSimModal(false)} onSelect={handleSimTypeSelect} />
        </Container>
    );
};

export default PrepaidSlider;
