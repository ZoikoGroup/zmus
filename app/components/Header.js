"use client"
import { Container, Button, Nav, Navbar, NavDropdown, Modal } from "react-bootstrap";
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../globals.css';
import { useState } from "react";
import { usePathname} from 'next/navigation';

const Header = () => {

    const [show, setShow] = useState(false);
    const pathname = usePathname();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    return (
        <>
        <Navbar expand="lg" className="bg-body-tertiary p-0 headnav">
            <Container fluid>
                <Navbar.Brand href="/"><Image src='/img/zmuslogo-new.png' width={160} height={70} alt="Logo" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link href="/prepaid-plans" className={pathname == "/prepaid-plans" ? "active" : "" }>Prepaid Plans</Nav.Link>
                        <Nav.Link href="/postpaid-plans" className={pathname == "/postpaid-plans" ? "active" : "" }>Postpaid Plans</Nav.Link>
                        <Nav.Link href="/business-deals" className={pathname == "/business-deals" ? "active" : "" }>Business Deals</Nav.Link>
                        <Nav.Link href="/travel-plans" className={pathname == "/travel-plans" ? "active" : "" }>Travel Plans</Nav.Link>
                        <Nav.Link href="#">Animal &amp; Music</Nav.Link>
                        <NavDropdown title="Devices" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="https://phones.zoikomobile.com/" target="_blank">New Smartphones</NavDropdown.Item>
                            <NavDropdown.Item href="/product-category/refurbished">Refurbished Smartphones</NavDropdown.Item>
                            <NavDropdown.Item href="#">Accessories</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/about" className={pathname == "/about" ? "active" : "" }>About Us</Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        <Nav.Link href="#" onClick={handleShow}><i className="bi bi-search"></i></Nav.Link>
                        <Nav.Link href="cart"><i className="bi bi-cart"></i></Nav.Link>
                        <NavDropdown title="Login" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                            <NavDropdown.Item href="/register">Register</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#">Español</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Body>
                <div className="p-5">
                    <h2 className="mb-3">Search Zoiko Products</h2>
                    <label htmlFor="search">Enter keyword to search</label>
                    <input type="text" name="search" className="form-control" />
                    <Button variant="primary" onClick={handleClose} className="mt-4">Search</Button>&nbsp;
                    <Button variant="primary" onClick={handleClose} className="mt-4">Cancel</Button>
                </div>
            </Modal.Body>
        </Modal>
        </>
    );
};

export default Header;