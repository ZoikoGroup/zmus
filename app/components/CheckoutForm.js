"use client"
import { Col, Row, Form, FormLabel } from "react-bootstrap";
import React, { useState, useImperativeHandle, forwardRef } from "react";

const CheckoutForm = forwardRef((props, ref) => {
    const [showAltAddress, setShowAltAddress] = useState(false);
    const [altAddress, setAltAddress] = useState({
        address: "",
        apartment: "",
        region: "",
        state: "",
        city: "",
        street: "",
        zip: ""
    });
    const handleAltAddressChange = (e) => {
        const { name, value } = e.target;
        setAltAddress({
            ...altAddress,
            [name]: value,
        });
    };
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        company: "",
        address: "",
        apartment: "",
        email: "",
        password: "",
        region: "",
        state: "",
        city: "",
        street: "",
        phone: "",
        zip: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.fname) newErrors.fname = "First name is required.";
        if (!formData.lname) newErrors.lname = "Last name is required.";
        if (!formData.company) newErrors.company = "Company name is required.";
        if (!formData.address) newErrors.address = "Address is required.";
        if (!formData.email) newErrors.email = "Email is required.";
        else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Enter a valid email address.";
        if (!formData.password) newErrors.password = "Password is required.";
        if (!formData.region) newErrors.region = "Region is required.";
        if (!formData.state) newErrors.state = "State is required.";
        if (!formData.city) newErrors.city = "City is required.";
        if (!formData.street) newErrors.street = "Street is required.";
        if (!formData.phone) newErrors.phone = "Phone is required.";
        if (!formData.zip) newErrors.zip = "ZIP is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    useImperativeHandle(ref, () => ({
        validate,
        getFormData: () => formData,
        getErrors: () => errors
    }));

    return (
        <>
    <Form>
            <h4 className="body22">Service/Billing details (If your shipping address is different, it will be used as your service address.)</h4>
            <Row>
                <Col md={6} sm={12} xs={12}>
                    <FormLabel htmlFor="fname">First Name <span className="txtred">*</span></FormLabel>
                    <Form.Control type="text" name="fname" placeholder="First name" value={formData.fname} onChange={handleChange} isInvalid={!!errors.fname} />
                    {errors.fname && <div className="text-danger small">{errors.fname}</div>}
                </Col>
                <Col md={6} sm={12} xs={12}>
                    <FormLabel htmlFor="lname">Last Name <span className="txtred">*</span></FormLabel>
                    <Form.Control type="text" name="lname" placeholder="Last name" value={formData.lname} onChange={handleChange} isInvalid={!!errors.lname} />
                    {errors.lname && <div className="text-danger small">{errors.lname}</div>}
                </Col>
            </Row>
            <br />
            <Row>
                <Col md={4} sm={12} xs={12}>
                    <FormLabel htmlFor="company">Company Name <span className="txtred">*</span></FormLabel>
                    <Form.Control type="text" name="company" placeholder="Company name" value={formData.company} onChange={handleChange} isInvalid={!!errors.company} />
                    {errors.company && <div className="text-danger small">{errors.company}</div>}
                </Col>
                <Col md={4} sm={12} xs={12}>
                    <FormLabel htmlFor="address">Address <span className="txtred">*</span></FormLabel>
                    <Form.Control type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} isInvalid={!!errors.address} />
                    {errors.address && <div className="text-danger small">{errors.address}</div>}
                </Col>
                <Col md={4} sm={12} xs={12}>
                    <FormLabel htmlFor="apartment">Apartment (optional)</FormLabel>
                    <Form.Control type="text" name="apartment" placeholder="Apartment, suite, etc." value={formData.apartment} onChange={handleChange} />
                </Col>
            </Row>
            <br />
            <Row>
                <Col md={6} sm={12} xs={12}>
                    <FormLabel htmlFor="region">Region <span className="txtred">*</span></FormLabel>
                    <Form.Control type="text" name="region" placeholder="Region" value={formData.region} onChange={handleChange} isInvalid={!!errors.region} />
                    {errors.region && <div className="text-danger small">{errors.region}</div>}
                </Col>
                <Col md={6} sm={12} xs={12}>
                    <FormLabel htmlFor="state">State <span className="txtred">*</span></FormLabel>
                    <Form.Control type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} isInvalid={!!errors.state} />
                    {errors.state && <div className="text-danger small">{errors.state}</div>}
                </Col>
            </Row>
            <br />
            <Row>
                <Col md={6} sm={12} xs={12}>
                    <FormLabel htmlFor="city">City <span className="txtred">*</span></FormLabel>
                    <Form.Control type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} isInvalid={!!errors.city} />
                    {errors.city && <div className="text-danger small">{errors.city}</div>}
                </Col>
                <Col md={6} sm={12} xs={12}>
                    <FormLabel htmlFor="street">Street <span className="txtred">*</span></FormLabel>
                    <Form.Control type="text" name="street" placeholder="Street" value={formData.street} onChange={handleChange} isInvalid={!!errors.street} />
                    {errors.street && <div className="text-danger small">{errors.street}</div>}
                </Col>
            </Row>
            <br />
            <Row>
                <Col md={6} sm={12} xs={12}>
                    <FormLabel htmlFor="phone">Phone <span className="txtred">*</span></FormLabel>
                    <Form.Control type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} isInvalid={!!errors.phone} />
                    {errors.phone && <div className="text-danger small">{errors.phone}</div>}
                </Col>
                <Col md={6} sm={12} xs={12}>
                    <FormLabel htmlFor="zip">ZIP <span className="txtred">*</span></FormLabel>
                    <Form.Control type="text" name="zip" placeholder="ZIP" value={formData.zip} onChange={handleChange} isInvalid={!!errors.zip} />
                    {errors.zip && <div className="text-danger small">{errors.zip}</div>}
                </Col>
            </Row>
            <br />
            <Row>
                <Col md={6} sm={12} xs={12}>
                    <FormLabel htmlFor="email">Email <span className="txtred">*</span></FormLabel>
                    <Form.Control type="email" name="email" placeholder="Email address" value={formData.email} onChange={handleChange} isInvalid={!!errors.email} />
                    {errors.email && <div className="text-danger small">{errors.email}</div>}
                </Col>
                <Col md={6} sm={12} xs={12}>
                    <FormLabel htmlFor="password">Create Password <span className="txtred">*</span></FormLabel>
                    <Form.Control type="password" name="password" placeholder="Create password" value={formData.password} onChange={handleChange} isInvalid={!!errors.password} />
                    {errors.password && <div className="text-danger small">{errors.password}</div>}
                </Col>
            </Row>
            <br />
            <Form.Check
                type="checkbox"
                label="Ship to a different address?"
                checked={showAltAddress}
                onChange={() => setShowAltAddress(!showAltAddress)}
                className="mb-3"
            />
            {showAltAddress && (
                <div className="p-3 mb-4 border rounded bg-light">
                    <h5 className="mb-3">Alternate Shipping Address (optional)</h5>
                    <Row>
                        <Col md={4} sm={12} xs={12}>
                            <FormLabel htmlFor="address">Address</FormLabel>
                            <Form.Control type="text" name="address" placeholder="Address" value={altAddress.address} onChange={handleAltAddressChange} />
                        </Col>
                        <Col md={4} sm={12} xs={12}>
                            <FormLabel htmlFor="apartment">Apartment (optional)</FormLabel>
                            <Form.Control type="text" name="apartment" placeholder="Apartment, suite, etc." value={altAddress.apartment} onChange={handleAltAddressChange} />
                        </Col>
                        <Col md={4} sm={12} xs={12}>
                            <FormLabel htmlFor="region">Region</FormLabel>
                            <Form.Control type="text" name="region" placeholder="Region" value={altAddress.region} onChange={handleAltAddressChange} />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col md={4} sm={12} xs={12}>
                            <FormLabel htmlFor="state">State</FormLabel>
                            <Form.Control type="text" name="state" placeholder="State" value={altAddress.state} onChange={handleAltAddressChange} />
                        </Col>
                        <Col md={4} sm={12} xs={12}>
                            <FormLabel htmlFor="city">City</FormLabel>
                            <Form.Control type="text" name="city" placeholder="City" value={altAddress.city} onChange={handleAltAddressChange} />
                        </Col>
                        <Col md={4} sm={12} xs={12}>
                            <FormLabel htmlFor="street">Street</FormLabel>
                            <Form.Control type="text" name="street" placeholder="Street" value={altAddress.street} onChange={handleAltAddressChange} />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col md={4} sm={12} xs={12}>
                            <FormLabel htmlFor="zip">ZIP</FormLabel>
                            <Form.Control type="text" name="zip" placeholder="ZIP" value={altAddress.zip} onChange={handleAltAddressChange} />
                        </Col>
                    </Row>
                </div>
            )}
            {/* Submit button removed; submission handled by parent */}
        </Form>
        </>
    );
});

export default CheckoutForm;