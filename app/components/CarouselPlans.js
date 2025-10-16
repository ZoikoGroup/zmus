"use client"
import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import { useState, useEffect } from 'react';
import SimTypeModal from './SimTypeModal';
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

export default function CarouselSimPlan () {

    const { addToCart } = useCart();
    const [plans, setPlans] = useState(null);
    const router = useRouter();

    const [showSimModal, setShowSimModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const handleBuyNow = (item) => {
        setSelectedPlan(item);
        setShowSimModal(true);
    };
    const handleSimSelect = (simType) => {
        addToCart({ ...selectedPlan, simType });
        setShowSimModal(false);
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
    console.log(plans);

    return (
        <>
        <Container fluid className="py-4 bglite">
            <h2 className="text-center py-4">Choose Your Zoiko Mobile Preferred Plan</h2>
            <ul className="nav nav-tabs nav-justified tabhead p-1" role="tablist" style={{border:'1px solid black',borderRadius:'12px'}}>
                <li className="nav-item" role="presentation">
                    <Link className="nav-link active" id="justified-tab-0" data-bs-toggle="tab" href="#prepaid" role="tab" aria-controls="justified-tabpanel-0" aria-selected="true"> Prepaid Plans </Link>
                </li>
                <li className="nav-item" role="presentation">
                    <Link className="nav-link" id="justified-tab-1" data-bs-toggle="tab" href="#postpaid" role="tab" aria-controls="justified-tabpanel-1" aria-selected="false"> Postpaid Plans </Link>
                </li>
                <li className="nav-item" role="presentation">
                    <Link className="nav-link" id="justified-tab-2" data-bs-toggle="tab" href="#business" role="tab" aria-controls="justified-tabpanel-2" aria-selected="false"> Business Plans </Link>
                </li>
                <li className="nav-item" role="presentation">
                    <Link className="nav-link" id="justified-tab-3" data-bs-toggle="tab" href="#travel" role="tab" aria-controls="justified-tabpanel-3" aria-selected="false"> Travel Plans </Link>
                </li>
            </ul>
        </Container>
        <Container fluid className="px-4 bglite">
            <div className="tab-content">
                <div id="prepaid" className="tab-pane active" aria-current="page">
                    <Row>
                        {plans.filter(plan => plan.plan_type === 'prepaid-plans').slice(0,3).map(item => (
                        <Col md={4} sm={12} xs={12} key={item.id}>
                            <div className="card p-2">
                                <Image src={`https://zmapi.zoikomobile.co.uk/storage/${item.featured_image}`} fluid alt="Zoiko Lite" />
                                <div className="card-header">
                                    {item.title}
                                </div>
                                <div className="card-body">
                                    <Row>
                                        <Col>
                                            <div className="data">{item.sub_title}</div>
                                        </Col>
                                        <Col>
                                            <p style={{textAlign:'right'}}><span className="curprice">${item.price}/mo</span><br />per line</p>
                                        </Col>
                                    </Row>
                                    <hr className="separator" />
                                    <ul className='check-bullet'>
                                        {item.features.slice(0,6).map((ftrs, index) => (
                                        <li key={index}>{ftrs.text}</li>
                                        ))}
                                    </ul>
                                    <hr className="separator" />
                                    <div className="text-center"><Link href={`/plans/${item.slug}`} className="btn btn-outline-danger px-4">View plan</Link> <Button variant='danger' onClick={() => handleBuyNow(item)}>Buy this plan</Button></div>
                                    <SimTypeModal show={showSimModal} onHide={() => setShowSimModal(false)} onSelect={handleSimSelect} />
                                </div>
                            </div>
                        </Col>
                        ))}
                    </Row>
                    <div className='text-center py-4'>
                        <Button variant='outline-danger' size='lg' href='/prepaid-plans'>View All Plans <i className="bi bi-arrow-right"></i></Button>
                    </div>
                </div>
                <div id="postpaid" className="tab-pane fade">
                    <Row>
                        {plans.filter(plan => plan.plan_type === 'postpaid-plans').slice(0,3).map(item => (
                        <Col md={4} sm={12} xs={12} key={item.id}>
                            <div className="card p-2">
                                <Image src={`https://zmapi.zoikomobile.co.uk/storage/${item.featured_image}`} fluid alt='Zoiko Lite' />
                                <div className="card-header">
                                    {item.title}
                                </div>
                                <div className="card-body">
                                    <Row>
                                        <Col>
                                            <div className="data">{item.sub_title}</div>
                                        </Col>
                                        <Col>
                                            <p style={{textAlign:'right'}}><span className="curprice">${item.price}/mo</span><br />per line</p>
                                        </Col>
                                    </Row>
                                    <hr className="separator" />
                                    <ul className='check-bullet'>
                                        {item.features.slice(0,6).map((ftrs, index) => (
                                        <li key={index}>{ftrs.text}</li>
                                        ))}
                                    </ul>
                                    <hr className="separator" />
                                    <div className="text-center"><Link href={`/plans/${item.slug}`} className="btn btn-outline-danger px-4">View plan</Link> <Button variant='danger' onClick={() => handleBuyNow(item)}>Buy this plan</Button></div>
                                </div>
                            </div>
                        </Col>
                        ))}
                    </Row>
                    <div className='text-center py-4'>
                        <Button variant='outline-danger' size='lg' href='/postpaid-plans'>View All Plans <i className="bi bi-arrow-right"></i></Button>
                    </div>
                </div>
                <div id="business" className="tab-pane fade">
                    <Row>
                        {plans.filter(plan => plan.plan_type === 'business-plans').slice(0,3).map(item => (
                        <Col md={4} sm={12} xs={12} key={item.id}>
                            <div className="card p-2">
                                <Image src={`https://zmapi.zoikomobile.co.uk/storage/${item.featured_image}`} fluid alt='Zoiko Lite' />
                                <div className="card-header">
                                    {item.title}
                                </div>
                                <div className="card-body">
                                    <Row>
                                        <Col>
                                            <div className="data">{item.sub_title}</div>
                                        </Col>
                                        <Col>
                                            <p style={{textAlign:'right'}}><span className="curprice">${item.price}/mo</span><br />per line</p>
                                        </Col>
                                    </Row>
                                    <hr className="separator" />
                                    <ul className='check-bullet'>
                                        {item.features.slice(0,6).map((ftrs, index) => (
                                        <li key={index}>{ftrs.text}</li>
                                        ))}
                                    </ul>
                                    <hr className="separator" />
                                    <div className="text-center"><Link href={`/plans/${item.slug}`} className="btn btn-outline-danger px-4">View plan</Link> <Button variant='danger' onClick={() => handleBuyNow(item)}>Buy this plan</Button></div>
                                </div>
                            </div>
                        </Col>
                        ))}
                    </Row>
                    <div className='text-center py-4'>
                        <Button variant='outline-danger' size='lg' href='/business-deals'>View All Plans <i className="bi bi-arrow-right"></i></Button>
                    </div>
                </div>
                <div id="travel" className="tab-pane fade">
                    <Row>
                        {plans.filter(plan => plan.plan_type === 'travel-plans').slice(0,3).map(item => (
                        <Col md={4} sm={12} xs={12} key={item.id}>
                            <div className="card p-2">
                                <Image src={`https://zmapi.zoikomobile.co.uk/storage/${item.featured_image}`} fluid alt='Zoiko Lite' />
                                <div className="card-header">
                                    {item.title}
                                </div>
                                <div className="card-body">
                                    <Row>
                                        <Col>
                                            <div className="data">{item.sub_title}</div>
                                        </Col>
                                        <Col>
                                            <p style={{textAlign:'right'}}><span className="curprice">${item.price}/mo</span><br />per line</p>
                                        </Col>
                                    </Row>
                                    <hr className="separator" />
                                    <ul className='check-bullet'>
                                        {item.features.slice(0,6).map((ftrs, index) => (
                                        <li key={index}>{ftrs.text}</li>
                                        ))}
                                    </ul>
                                    <hr className="separator" />
                                    <div className="text-center"><Link href={`/plans/${item.slug}`} className="btn btn-outline-danger px-4">View plan</Link> <Button variant='danger' onClick={() => handleBuyNow(item)}>Buy this plan</Button></div>
                                </div>
                            </div>
                        </Col>
                        ))}
                    </Row>
                    <div className='text-center py-4'>
                        <Button variant='outline-danger' size='lg' href='/travel-plans'>View All Plans <i className="bi bi-arrow-right"></i></Button>
                    </div>
                </div>
            </div>
        </Container>
        </>
    );
}