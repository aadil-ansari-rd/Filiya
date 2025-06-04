import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";


const Checkout = () => {
  let navigate = useNavigate();
  let [food, setFood] = useState({});
  const { id } = useParams();

  useEffect(() => {
    let url = import.meta.env.VITE_BASE_API + "/profile";
    axios({
      url: url,
      method: "get",
      withCredentials: true,
    })
      .then((res) => {})
      .catch((err) => {
        toast.error("Yor are not authorized");
        navigate("/login");
      });
  }, []);

  useEffect(() => {
    let url = import.meta.env.VITE_BASE_API + `/food/${id}`;
    axios({
      url: url,
      method: "get",
    })
      .then((res) => {
        setFood(res.data.data);
      })
      .catch((err) => {
        toast.error("Something went wrong.");
        navigate("/menus");
      });
  }, []);

  async function goToPurchase() {
    let data = {
      user: localStorage.getItem("u_id"),
      item: id,
    };
    const stripe = await loadStripe(
      "pk_test_51QnBqEFxVlqJV5HMciqIiRLzEwFEzWxXd9XIop02WjvRAgYGnzrFCAaAgtd2IJJBkpiuoTPl7kvcReYHj38T7fs100hrkPVd7U"
    );

    const headers = {
      "Content-Type": "application/json",
    };
    let url = import.meta.env.VITE_BASE_API + "/create-checkout-session";
    axios({
      url: url,
      method: "post",
      data: data,
      headers: headers,
    })
      .then((res) => {
        localStorage.setItem("transactionId", res.data.data);
        stripe.redirectToCheckout({
          sessionId: res.data.data,
        });
      })
      .catch((err) => {
        console.log("Something went wrong");
      });
  }
  return (
    <div>
      <br />

      <Container>
        <div>
          <img
            style={{
              width: "100%",
              height: "15rem",
              borderRadius: "0.3rem",
              boxShadow: "-moz-initial",
            }}
            src={food.f_image}
            alt=""
          />
        </div>
        <br />
        <Row className="my-5">
          <b>
            <Col>Item : {food.f_name}</Col>
          </b>
        </Row>
        <br />

        <p>
          <b>Rating : </b>
          {[...Array(food.f_rating)].map((_, i) => (
            <span>⭐</span>
          ))}
        </p>

        <br />
        <Row className="my-5">
          <b>
            <Col>Price : &nbsp; &#x20b9; {food.f_price}</Col>
          </b>
        </Row>
        <br />

        <br />
        <Row className="my-5">
          <Button
            variant="dark"
            style={{ width: "100%" }}
            className="btn"
            type="button"
            onClick={goToPurchase}
          >
            Pay Now &nbsp; &#x20b9; {food.f_price}
          </Button>
        </Row>
      </Container>
    </div>
  );
};

export default Checkout;
