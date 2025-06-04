import React, { useEffect, useState } from 'react'
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { format } from "date-fns";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Feedback = () => {
    let [feedbacks, setFeedbacks] = useState([]);
    let [isDelete, setIsDelete] = useState(false);

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


    useEffect(() => {
        let url = import.meta.env.VITE_BASE_API  + "/get/feedbacks"

        axios({
            url: url,
            method: "get",
        })
            .then((res) => {
                setFeedbacks(res.data.data);
                setIsDelete(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [isDelete]);

    function deleteFeedback(id) {
        let url = import.meta.env.VITE_BASE_API  + "/delete/feedback/" + id

        axios({
            url: url,
            method: "delete",
        })
            .then((res) => {
                if (res.data.success) {
                    toast.success("Feedback has been deleted successfully");
                    setIsDelete(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (

        <Container fluid>
            <Row>

                {
                    feedbacks.map((feedback, i) =>
                        <Col key={i} lg={3} className="m-4">
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>Title : {feedback.title}</Card.Title>
                                    {/* <Card.Text>{feedback.created_at}</Card.Text> */}
                                    <p style={{fontSize: "0.9rem"}}>
                                    {new Date(feedback.created_at).toLocaleString('en-GB', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true
                                        })}
                                    </p>
                                    

                                    <hr />
                                    <Card.Text>{feedback.feedback}</Card.Text>
                                    <Card.Text>By : <b>{feedback.user.u_name}</b></Card.Text>
                                    <Card.Text><b style={{fontSize:"0.9rem"}}>{feedback.user.u_email}</b></Card.Text>
                                </Card.Body>
                                <Button variant="dark" className="w-90 m-2 warning" style={{ alignItems: "center", margin: "auto" }} onClick={() => deleteFeedback(feedback._id)}>Delete Feedback</Button>
                            </Card>
                        </Col>
                    )
                }
            </Row>
        </Container>

    )
}

export default Feedback
