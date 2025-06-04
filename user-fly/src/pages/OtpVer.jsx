import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const OtpVer = () => {
    let [otp, setOtp] = useState(null)
    let navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Sending data as JSON
        const loginData = {
            otp: otp,
            email: localStorage.getItem('email')
        };
        let url = import.meta.env.VITE_BASE_API + "/otpver"; // Ensure you have the correct base URL

        axios({
            url: url,
            method: "post",
            data: loginData, // Send the data as JSON
            withCredentials: true,
            headers: {
                "Content-Type": "application/json", // Set content type to JSON
            },
            withCredentials: true, // Make sure credentials (cookies) are sent
        })
            .then((res) => {
                
                if (res.data.success) {
                    toast.success("OTP Verified")
                    navigate("/signup"); // Redirect to menus page on successful login
                }
            })
            .catch((err) => {
                const message = err?.response?.data?.message;
            
                if (message === "notMatched") {
                    toast.error("OTP not matched");
                } else if (message === "Error" || message === "notExist") {
                    toast.error("Something went wrong. Please try again.");
                    navigate('/menus'); // fix typo from navigator to navigate
                } else {
                    toast.error("Unexpected Error.");
                    console.error(err);
                }
            });
            
    }
    return (
        <div>
            <section className="contact w-100">
                <Col className="border rounded">
                    <h1 className="text-center">SignUP</h1>
                    <hr />
                    <Form onSubmit={handleSubmit}>


                        <Form.Group className="mb-3 input-box">
                            <Form.Label className="text-control">Enter OTP : </Form.Label>
                            <Form.Control
                                className="field"
                                type="number"
                                required
                                placeholder="Enter your otp..."
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </Form.Group>


                        <div className="mb-3 input-box">
                            <Button variant="dark" type="submit" className="w-100 my-5 btn">
                                Verify OTP
                            </Button>
                        </div>

                        <div className="mb-3 input-box">
                            <h3>
                                Already have an account , <a href="/login"> Click Here...</a>

                            </h3>
                        </div>

                    </Form>
                </Col>
            </section>
        </div>
    )
}

export default OtpVer