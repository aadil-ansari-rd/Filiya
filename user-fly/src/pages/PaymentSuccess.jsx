import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";

const TickIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="72"
    height="72"
    fill="none"
    viewBox="0 0 24 24"
    stroke="green"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    role="img"
    style={{ display: "block", margin: "0 auto" }}
  >
    <circle cx="12" cy="12" r="10" stroke="green" strokeWidth="2" fill="none" />
    <path d="M7 13l3 3 7-7" />
  </svg>
);

const PaymentSuccess = () => {
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    const storedTransactionId = localStorage.getItem("transactionId") || "";
    setTransactionId(storedTransactionId);

    const url = `${import.meta.env.VITE_BASE_API}/update/transaction`;
    const data = { transactionId: storedTransactionId };

    axios
      .put(url, data)
      .then(() => {
        // Optionally handle success feedback
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  const handleButtonClick = () => {
    window.location.href = "/"; // Redirect to home or desired page
  };

  return (
    <Container
      fluid
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "3rem",
      }}
    >
      <Row className="justify-content-center w-100" style={{ maxWidth: 400 }}>
        <Col
          xs={12}
          className="text-center shadow-sm rounded"
          style={{
            backgroundColor: "#fff",
            padding: "2.5rem 1.5rem",
            boxShadow: "0 0 15px rgba(0, 128, 0, 0.3)",
            borderRadius: "12px",
          }}
        >
          <TickIcon />
          <h2
            className="mt-3"
            style={{
              color: "green",
              fontWeight: "700",
              textAlign: "center",
              margin: "2rem 0",
            }}
          >
            Payment Successful!
          </h2>
          <p style={{ fontSize: "1.1rem", marginTop: "0.5rem", color: "#333" }}>
            Your transaction completed successfully.
          </p>
          <div
            style={{
              marginTop: "1.5rem",
              fontSize: "1rem",
              fontWeight: "600",
              wordBreak: "break-word",
              color: "#444",
            }}
          >
            <span>Transaction ID: </span>
            <span style={{ color: "black", fontWeight: "700" }}>
              {transactionId || "N/A"}
            </span>
          </div>
          <div
            style={{
              marginTop: "1rem",
              fontSize: "1rem",
              fontWeight: "700",
              color: "green",
            }}
          >
            Status: Completed
          </div>
          <Button
            variant="success"
            onClick={handleButtonClick}
            style={{
              marginTop: "2rem",
              width: "100%",
              padding: "0.7rem",
              fontWeight: "600",
              fontSize: "1.1rem",
              borderRadius: "8px",
            }}
            aria-label="Go back to home page"
          >
            Go to Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentSuccess;
