import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";


function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Added state for error message


    useEffect(()=>{
        let url = import.meta.env.VITE_BASE_API  + "/profile"
        axios({
          url: url,
          method: "get",
          withCredentials: true,
        })
          .then((res) => {
            navigate('/menus')
          }).catch((err)=>{
            
          })
      },[])




  // Handle the login submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Sending data as JSON
    const loginData = {
      username: username,
      password: password,
    };

    let url = import.meta.env.VITE_BASE_API + "/login"; // Ensure you have the correct base URL

    axios({
      url: url,
      method: "post",
      data: loginData, // Send the data as JSON
      
      headers: {
        "Content-Type": "application/json", // Set content type to JSON
      },
      withCredentials: true, // Make sure credentials (cookies) are sent
    })
      .then((res) => {
        toast.success("Welcome to Filiya , You are logged in .")
        localStorage.setItem('uName',res.data.user.u_name)
        localStorage.setItem('u_id',res.data.user._id)
        if (res.data.success) {
          navigate("/menus"); // Redirect to menus page on successful login
        }
      })
      .catch((err) => {
        console.error("Error during login:", err);
        setErrorMessage("Invalid credentials, please try again."); // Set error message
      });
  };

  return (
    <section className="contact w-100">
      <Col className="border rounded">
        <h1 className="text-center">Login</h1>
        <hr />
        <Form onSubmit={handleSubmit}>
          {/* Display error message if there's an issue with login */}
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

          <Form.Group className="mb-3 input-box">
            <Form.Label className="text-control">Username: </Form.Label>
            <Form.Control
              className="field"
              type="text"
              required
              placeholder="Enter your username..."
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3 input-box">
            <Form.Label className="text-control">Password: </Form.Label>
            <Form.Control
              className="field"
              type="password" // Change type to password for security
              required
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="mb-3 input-box">
            <Button variant="dark" type="submit" className="w-100 my-5 btn">
              Login
            </Button>
          </div>
          <div className="mb-3 input-box">
            <h3>
              Don't have an account? <a href="/emailver">Click Here...</a>
            </h3>
          </div>
        </Form>
      </Col>
    </section>
  );
}

export default Login;
