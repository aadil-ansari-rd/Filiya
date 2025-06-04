import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { toast } from 'react-toastify';


const ViewFood = () => {
  let navigate = useNavigate()

  useEffect(()=>{
    let url = import.meta.env.VITE_BASE_API  + "/profile/admin"
    axios({
      url: url,
      method: "get",
      withCredentials: true,
    })
      .then((res) => {

      }).catch((err)=>{
        toast.error("Yor are not authorized");
        navigate('/')
      })
  },[])


  let [food, setFood] = useState({});
  let [Availability, setAvailability] = useState("Available")
  let params = useParams()
  let id = params.id
  useEffect(() => {
    let url = import.meta.env.VITE_BASE_API  + "/food/" + id ;

    axios({
      url: url,
      method: "get",
    })
      .then((res) => {
        setFood(res.data.data);
        if (food.f_availability) {
          setAvailability("Available")
        } else {
          setAvailability("Not Available")
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  return (
    <div>
      <Container>
        <Col>
          <Row>
            <img src={food.f_image} alt="Food Image" height="400px" />
          </Row>
          <Row className="my-3">
            <h1 style={{ fontFamily: "cursive" }}>{food.f_name}</h1>
            <br />
            <p ><i>{food.f_description}</i></p>
            <p><b>Price</b> : &#8377; {food.f_price}</p>
            <p><b>Category</b> : {food.f_category}</p>
            <p><b>Availability</b> : {Availability} </p>
            <p><b>Rating</b> : {[...Array(food.f_rating)].map((_, i) => (
              <span>⭐</span>
            ))}</p>

          </Row>
        </Col>
      </Container>
    </div>
  );
};

export default ViewFood;