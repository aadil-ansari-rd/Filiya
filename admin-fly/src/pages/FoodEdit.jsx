import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from 'react-toastify';


function FoodEdit() {
  const [food, setFood] = useState({});
  const [f_image, setF_image] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

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


  useEffect(() => {
    let url = import.meta.env.VITE_BASE_API  + `/food/${id}`

    axios
      .get(url)
      .then((res) => {
        setFood(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFood((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function editFood() {
    const formData = new FormData();

    for (const key in food) {
      formData.append(key, food[key]);
    }

    if (f_image) {
      formData.append("file", f_image);
    }
    let url = import.meta.env.VITE_BASE_API  + `/edit/food/${id}`

    axios
      .put(url, formData)
      .then((res) => {
        console.log(res);
        navigate("/foods");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Select Image</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => setF_image(e.target.files[0])}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Food Name</Form.Label>
        <Form.Control
          type="text"
          name="f_name"
          value={food.f_name || ""}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Food Description</Form.Label>
        <Form.Control
          type="textarea"
          name="f_description"
          value={food.f_description|| ""}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="Number"
          name="f_price"
          value={food.f_price|| ""}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Select
          name="f_category"
          value={food.f_category || ""}
          onChange={handleChange}
        >
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Availability</Form.Label>
        <Form.Select
          name="f_availability"
          value={food.f_availability || ""}
          onChange={handleChange}
        >
          <option value={true}>True</option>
          <option value={false}>False</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Rating</Form.Label>
        <Form.Control
          type="Number"
          name="f_rating"
          value={food.f_rating|| ""}
          onChange={handleChange}
        />
      </Form.Group>
      <Container>
        <Button variant="dark" onClick={editFood}>
          Edit Food
        </Button>
      </Container>
    </Form>
  );
}

export default FoodEdit;
