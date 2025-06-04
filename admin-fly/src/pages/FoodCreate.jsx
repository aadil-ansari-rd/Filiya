import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { toast } from 'react-toastify';

function FoodCreate() {
  const navigate = useNavigate(); 

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

  let [f_image, setF_image] = useState("");
  let [f_name, setF_name] = useState("");
  let [f_description, setF_descriptoin] = useState("");
  let [f_price, setF_price] = useState(99);
  let [f_category, setF_category] = useState("Veg");
  let [f_availability, setF_availability] = useState(true);
  let [f_rating, setF_rating] = useState(5);

  function addBook() {

    let formData = new FormData();
    formData.append("f_image", f_image);
    formData.append("f_name", f_name);
    formData.append("f_description", f_description);
    formData.append("f_price", f_price);
    formData.append("f_category", f_category);
    formData.append("f_availability", f_availability);
    formData.append("f_rating", f_rating);

    let url = import.meta.env.VITE_BASE_API  + "/add/food"

    axios({
      url: url,
      method: "post",
      data: formData,
      header: {
        "content-type": "multipart/form-data",
      },
    })
      .then((res) => {
        
        console.log(res);
        if (res.data.success) {
          navigate("/foods");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function cancel(){
    navigate('/foods')
  }
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col className="border  rounded">
          <h1 className="text-center">Add Food</h1>
          <hr />
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Food Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setF_image(e.target.files[0])}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Food Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex : Pizza"
                onChange={(e) => setF_name(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="Food Description"
                onChange={(e) => setF_descriptoin(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price"
                onChange={(e) => setF_price(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                onChange={(e) => setF_category(e.target.value)}
                aria-label="Select Food Category"
              >
                <option value="">Select a category</option>
                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Food Availability</Form.Label>
              <Form.Select
                onChange={(e) => setF_availability(e.target.value)}
                aria-label="Select Availability"
              >
                <option value="">Select Food Availability</option>
                <option value={true}>True</option>
                <option value={false}>False</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                placeholder="Rating"
                onChange={(e) => setF_rating(e.target.value)}
              />
            </Form.Group>

            <Button variant="dark" className="w-100" onClick={addBook}>
              Add Food
            </Button>
            <Button variant="warning" className="w-100 my-3" onClick={()=>cancel()}>
              Cancel
            </Button>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
export default FoodCreate;