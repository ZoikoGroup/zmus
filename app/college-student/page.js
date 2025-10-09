"use client"
import TopHeader from "../components/TopHeader";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeadBar from "../components/HeadBar";
import CollegeFaqs from '../components/CollegeFaqs';
import { Button, Col, Container, DropdownButton, DropdownItem, Row } from "react-bootstrap";
import Testimonials from "../components/Testimonials";

const CollegeStudent = () => {
    return (
        <>
        <TopHeader />
        <Header />
        <HeadBar text="Zoiko Mobile College Student Discount Program" />
        <Container fluid className="position-relative">
            <img className="d-none d-md-block w-100" src="/img/home-banner/banner-student.png" alt="Student Banner" />
            <img className="d-sm-block d-md-none" src="/img/home-banner/banner-student-mobile.png" alt="Student Banner" />
            <Container>
                <div className="btnbox text-start">
                    <h1 className="txtblack pb-1">Zoiko Mobile College<br />Student Discount Program</h1>
                    <h4 className="txtblack">Get Exclusive</h4>
                    <h1 className="txtred verybig">20% Discount</h1>
                    <h1 className="txtblack pb-1">On Any Of Our Plans</h1>
                    <Button href='/college-student-discount-form' variant="danger" size="lg" className="custom-button">Register Now</Button>
                    <Button href='#' variant="outline-danger" className="mx-4 custom-button" size="lg">Learn more</Button>
                </div>
            </Container>
        </Container>
        <Container fluid className="py-5 bglite">
            <Container className="w-75 w-sm-100">
                <h2 className="text-center">Who is Eligible?</h2>
                <hr className="seperator" />
                <p className="body22">To qualify for Zoiko Mobile&apos;s College Student Discount, you must be a registered college student in the United States. If you&apos;re currently enrolled in a recognized college or university, you&apos;re eligible for this offer. Simply provide proof of your student status, such as a valid student ID or an enrollment verification.</p>
            </Container>
            <h2 className="text-center pt-4">How to Get Started</h2>
            <div className="pinkboxwraper justify-content-center gap-4">
                <div className="d-flex flex-row protbox">
                    <div className="bigred px-3">1</div>
                    <div className="px-2">
                        <h4 className="txtred">Explore Our Plans</h4>
                        <p>Discover our range of flexible and affordable mobile plans and pick the one that fits your needs.</p>
                    </div>
                </div>
                <div className="d-flex flex-row protbox">
                    <div className="bigred px-3">2</div>
                    <div className="px-2">
                        <h4 className="txtred">Provide Your Student Information</h4>
                        <p>When you sign up, make sure to provide a valid student ID or proof of enrollment at your college or university.</p>
                    </div>
                </div>
                <div className="d-flex flex-row protbox">
                    <div className="bigred px-3">3</div>
                    <div className="px-2">
                        <h4 className="txtred">Enjoy Your Discount</h4>
                        <p>Once verified, you&apos;ll receive the 20% discount on your plan, and you can start enjoying your new mobile service right away!</p>
                    </div>
                </div>
            </div>
            <Container className="w-75 w-sm-100 pt-5">
                <h2 className="text-center">Terms and Conditions</h2>
                <hr className="seperator" />
                <ul className="redbullet">
                    <li><b>Eligibility:</b> The college student discount is available to students who are currently enrolled in a recognized U.S. college or university.</li>
                    <li><b>Proof of Student Status:</b> A valid student ID or enrollment verification must be provided to qualify.</li>
                    <li><b>Valid Government ID:</b> A valid student ID or enrollment verification must be provided to qualify.</li>
                    <li><b>Discount:</b> The 20% discount applies to any of our mobile plans.</li>
                    <li><b>No Duration Limit:</b> There is no contract duration required, and you&apos;ll continue to enjoy the discount as long as you are a Zoiko Mobile customer and meet the student criteria.</li>
                    <li><b>Renewal:</b> You may need to update your student status after each academic year to continue receiving your discount.</li>
                </ul>
            </Container>
            <Row className="align-items-center px-4 py-5 w-sm-100">
                <Col md={3} sm={12} xs={12}>
                    <p className="bigblack">Stay Connected, Stay Smart</p>
                </Col>
                <Col md={9} sm={12} xs={12}>
                    <p className="body22">At Zoiko Mobile, we believe in making mobile service affordable for students while providing the same high-quality experience that everyone deserves. Whether you&apos;re balancing studies or just staying connected with friends, we&apos;ve got the perfect plan for you—at a price that works with your budget.</p>
                    <DropdownButton variant="danger" size="lg" title="Browse Plans Now" style={{maxWidth:'150px'}}>
                        <DropdownItem href="/prepaid-plans">Prepaid Plans</DropdownItem>
                        <DropdownItem href="/postpaid-plans">Postpaid Plans</DropdownItem>
                        <DropdownItem href="/business-deals">Business Deals</DropdownItem>
                    </DropdownButton>
                </Col>
            </Row>
        </Container>
        <CollegeFaqs />
        <Container className="py-4 w-50 w-sm-100">
            <Row>
                <Col md={3} sm={12} xs={12}>
                    <Button variant="danger" size="lg" href="/college-student-discount-form">Sign up now</Button>
                </Col>
                <Col md={9} sm={12} xs={12}>
                    <p>Get your 20% student discount, and enjoy the freedom of a mobile plan that fits your lifestyle. Stay connected, stay smart, and let Zoiko Mobile help you make the most of your student life!</p>
                </Col>
            </Row>
        </Container>
        <Testimonials />
        <Footer />
        </>
    );
}
export default CollegeStudent;