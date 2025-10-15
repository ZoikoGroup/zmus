"use client";
import React, { useState } from "react";
import { Modal, Button, ProgressBar, Form } from "react-bootstrap";

export default function SimTypeModal({ show, onHide, onSelect }) {
    const [step, setStep] = useState(1);
    const [lineType, setLineType] = useState("");
    const [portNumber, setPortNumber] = useState("");
    const [simType, setSimType] = useState("");

    const handleNext = () => {
        if (step === 1 && lineType) {
            setStep(2);
        }
    };
    const handlePrev = () => {
        if (step === 2) {
            setStep(1);
        }
    };
    const handleComplete = (type) => {
        setSimType(type);
        // Pass both lineType, portNumber (if applicable), and simType
        onSelect({ lineType, portNumber: lineType === "port" ? portNumber : "", simType: type });
        setStep(1);
        setLineType("");
        setPortNumber("");
        setSimType("");
    };
    const handleClose = () => {
        setStep(1);
        setLineType("");
        setPortNumber("");
        setSimType("");
        onHide();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{step === 1 ? "Select Line Option" : "Select SIM Type"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ProgressBar now={step === 1 ? 50 : 100} label={`${step === 1 ? "Step 1/2" : "Step 2/2"}`} className="mb-4" />
                {step === 1 && (
                    <div className="d-flex flex-column align-items-center">
                        <Button
                            variant={lineType === "new" ? "primary" : "outline-primary"}
                            className="mb-3 w-100"
                            onClick={() => setLineType("new")}
                        >
                            New Line
                        </Button>
                        <Button
                            variant={lineType === "port" ? "primary" : "outline-primary"}
                            className="mb-3 w-100"
                            onClick={() => setLineType("port")}
                        >
                            Port Number
                        </Button>
                        {lineType === "port" && (
                            <Form.Group className="w-100 mb-3">
                                <Form.Label>Enter Port Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={portNumber}
                                    onChange={e => setPortNumber(e.target.value)}
                                    placeholder="Port Number"
                                />
                            </Form.Group>
                        )}
                        <div className="d-flex justify-content-between w-100">
                            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                            <Button variant="primary" onClick={handleNext} disabled={!lineType || (lineType === "port" && !portNumber)}>Next</Button>
                        </div>
                    </div>
                )}
                {step === 2 && (
                    <div className="d-flex flex-column align-items-center">
                        <Button variant="primary" className="mb-3 w-100" onClick={() => handleComplete("esim")}>eSIM</Button>
                        <Button variant="secondary" className="w-100" onClick={() => handleComplete("psim")}>Physical SIM (pSIM)</Button>
                        <div className="d-flex justify-content-between w-100 mt-3">
                            <Button variant="secondary" onClick={handlePrev}>Previous</Button>
                        </div>
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
}
