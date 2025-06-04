import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";


function Feedback() {
  let navigate = useNavigate();
  let [title,setTitle] = useState("");
  let [feedback, setFeedback] = useState("");

  useEffect(()=>{
    let url = import.meta.env.VITE_BASE_API  + "/profile"
    axios({
      url: url,
      method: "get",
      withCredentials: true,
    })
      .then((res) => {

      }).catch((err)=>{
        toast.error("Yor are not authorized");
        navigate('/login')
      })
  },[])


  function sendFeedback() {
    let data = {
      title :title,
      feedback: feedback,
      user : localStorage.getItem('u_id')
    }
    let url = import.meta.env.VITE_BASE_API  + "/add/feedback"
    axios({
      url: url,
      method: "post",
      data: data,
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.success) {
          toast.success("Feedback Sent")
          navigate("/");
        }
      })
      .catch((err) => {
        toast.error("Sorry ! , You are not logged in.")
        navigate("/");
      });
  }

  return (
    <section className="contact w-100">
      <form >
        <h2>Give's Your Feedback !</h2>
        <div className="input-box mb-3">
          <label className="text-control">Enter Review Title</label>
          <input
            type="email"
            className="field"
            name="text"
            placeholder="Enter Review Title ...."
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="input-box mb-3">
          <label className="text-control">Tell us about Filiya</label>
          <textarea
            name="feedback"
            className="field message"
            placeholder="Enter your message"
            onChange={(e) => setFeedback(e.target.value)}
            required
          />
        </div>
        <Button onClick={() => sendFeedback()} className="btn">Submit</Button>

      </form>
    </section>
  );
}
export default Feedback;
