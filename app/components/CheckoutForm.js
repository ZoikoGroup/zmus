"use client"
import { Col, Row, Form, FormLabel } from "react-bootstrap";
import React, { useState } from "react";

export default function CheckoutForm () {

    const [errors, setErrors] = useState({});
    const [selectedValue, setSelectedValue] = useState('');
    const [formData, setFormData] = useState({
        fname: "",
        lanme: "",
        company: "",
    });

    return (
        <>
        <Form>
            <h4 className="body22">Service/Billing details (If your shipping address is different, it will be used as your service address.)</h4>
            <Row>
                <Col md={6} sm={12} xs={12}>
                    <FormLabel htmlFor="fname">First Name <span className="txtred">*</span></FormLabel>
                    <Form.Control type="text" name="fname" placeholder="First name" />
                </Col>
                <Col md={6} sm={12} xs={12}>
                    <FormLabel htmlFor="lname">Last Name <span className="txtred">*</span></FormLabel>
                    <Form.Control type="text" name="lname" placeholder="Last name" />
                </Col>
            </Row>
            <br />
            <Row>
                <Col md={6} sm={12} xs={12}>
                    <FormLabel htmlFor="fname">Company Name <span className="txtred">*</span></FormLabel>
                    <Form.Control type="text" name="fname" placeholder="Company name" />
                </Col>
                <Col md={6} sm={12} xs={12}>
                    <FormLabel htmlFor="lname">Address <span className="txtred">*</span></FormLabel>
                    <Form.Control type="text" name="lname" placeholder="Address" />
                </Col>
            </Row>
            <br />
            <Row>
                <Col md={6} sm={12} xs={12}>
                    <FormLabel htmlFor="fname">Region <span className="txtred">*</span></FormLabel>
                    <Form.Control type="text" name="fname" placeholder="Region" />
                </Col>
                <Col md={6} sm={12} xs={12}>
                    <FormLabel htmlFor="lname">State <span className="txtred">*</span></FormLabel>
                    <Form.Control type="text" name="lname" placeholder="State" />
                </Col>
            </Row>
            <br />
            <Row>
                <Col md={6} sm={12} xs={12}>
                    <FormLabel htmlFor="fname">City <span className="txtred">*</span></FormLabel>
                    <Form.Control type="text" name="fname" placeholder="City" />
                </Col>
                <Col md={6} sm={12} xs={12}>
                    <FormLabel htmlFor="lname">Street <span className="txtred">*</span></FormLabel>
                    <Form.Control type="text" name="lname" placeholder="Street" />
                </Col>
            </Row>
            <br />
            <Row>
                <Col md={6} sm={12} xs={12}>
                    <FormLabel htmlFor="school">Phone <span className="txtred">*</span></FormLabel>
                    <Form.Control type="text" name="school" placeholder="Phone" />
                </Col>
                <Col md={6} sm={12} xs={12}>
                    <FormLabel htmlFor="yos">ZIP <span className="txtred">*</span></FormLabel>
                    <Form.Control type="date" name="yos" placeholder="ZIP" />
                </Col>
            </Row>
            <br />
        </Form>
        </>
    );
}