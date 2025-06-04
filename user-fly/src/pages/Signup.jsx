import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";


function Signup() {
  const navigate = useNavigate();
  let [u_image, setU_image] = useState();
  let [u_name, setU_name] = useState("");
  let [u_password, setU_password] = useState("");
  let [u_phone, setU_phone] = useState("");
  let [u_address, setU_address] = useState("");
  let [username , setUsername] = useState("")
  let [confirmPassword, setU_ConfirmPassword] = useState("");
  let [message, setMessage] = useState("");
  function addUser() {
    if (u_password !== confirmPassword) {
      setMessage("Confirm password is incorrect");
    } else {
      setMessage("");
    }

    let formData = new FormData();
    formData.append("u_image", u_image);
    formData.append("u_name", u_name);
    formData.append("u_email", localStorage.getItem('email'));
    formData.append("password", u_password);
    formData.append("u_phone", u_phone);
    formData.append("u_address", u_address);
    formData.append("username", username)
    let url = import.meta.env.VITE_BASE_API  + "/add/user"
    console.log("console" , formData.get('u_name'));
    localStorage.removeItem('email');
    axios({
      url: url,
      method: "post",
      data: formData,
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((res) => {
        toast.success("Welcome to Filiya , You are successfully registered .")
        if (res.data.success) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        if(res.data.message==="notExist"){
          toast.error("Invalid User");
          navigate('/emailver');
        }
      });
  }

  return (

    <section className="contact w-100">
      <Col className="border  rounded">
        <h1 className="text-center">Sign Up</h1>
        <hr />
        <Form>
          <Form.Group className="mb-3 input-box ">
            <Form.Label className="text-control">Profile Image : </Form.Label>
            <Form.Control className="field"
            required
              type="file"
              name = "u_image"
              onChange={(e) => setU_image(e.target.files[0])}
            />
          </Form.Group>

          <Form.Group className="mb-3 input-box">
            <Form.Label className="text-control">Name : </Form.Label>
            <Form.Control className="field"
              type="text"
              name = "u_name"
              required

              placeholder="Enter your name..."
              onChange={(e) => setU_name(e.target.value)}
            />
          </Form.Group>

          
          <Form.Group className="mb-3 input-box">
            <Form.Label className="text-control">Username : </Form.Label>
            <Form.Control className="field"
              type="text"
              name = "username"
              required

              placeholder="Enter a unique username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3 input-box">
            <Form.Label className="text-control">Password : </Form.Label>
            <Form.Control className="field"
              type="password"
              name = "u_password"
              required

              placeholder="Enter your password"
              onChange={(e) => setU_password(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3 input-box">
            <Form.Label className="text-control">Confirm Password : </Form.Label>
            <Form.Control className="field"
              type="password"
            required

              placeholder="Confirm your password"
              onChange={(e) => setU_ConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <h6 style={{ color: "red" }}>{message}</h6>

          <Form.Group className="mb-3 input-box">
            <Form.Label className="text-control">Mobile No. : </Form.Label>
            <Form.Control className="field"
              type="Number"
              name = "u_phone"
              required

              placeholder="Enter Mobile No."
              onChange={(e) => setU_phone(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3 input-box">
            <Form.Label className="text-control">Address : </Form.Label>
            <Form.Control className="field message"
              as="textarea"
              name="u_address"
            required

              placeholder="Enter your address..."
              onChange={(e) => setU_address(e.target.value)}
            />
          </Form.Group>

          <div className="mb-3 input-box">
            <Button  variant="dark" className="w-100 my-5 btn" onClick={addUser}>
              Sign Up
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
  );
}
export default Signup;