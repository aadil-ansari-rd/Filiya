import { Button, Container, Table, Form, Pagination } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

function FoodList() {
  let [foods, setFoods] = useState([]);
  let [isDelete, setIsDelete] = useState(false);
  let [search, setSearch] = useState("");
  let [pageNo, setPageNo] = useState(1);
  let [numberofPage, setNumberofPage] = useState(1);
  let items = [];
  function setPage(number) {
    setPageNo(number);
  }
  for (let number = 1; number <= numberofPage; number++) {
    items.push(
      <Pagination.Item key={number} onClick={() => setPage(number)}>
        {number}
      </Pagination.Item>
    );
  }
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
    let url = import.meta.env.VITE_BASE_API  + "/foods"

    axios({
      url: url,
      method: "get",
      params: {
        //params ->req.query ,file -> req.file , data-> req.body , :variable -> req.params
        search: search,
        pageNo: pageNo,
        limit: 3,
      },
    })
      .then((res) => {
        setFoods(res.data.data);
        setNumberofPage(Math.ceil(res.data.totalCounts / 3));
        setIsDelete(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isDelete, search, pageNo]);
  const navigate = useNavigate();
  function addFood() {
    // alert('ok')
    navigate("/add/food");
  }
  function viewFood(id) {
    navigate("/view/food/" + id);
  }
  function goToBookEditPage(id) {
    navigate("/edit/food/" + id);
  }
  function deleteFood(id) {
    let url = import.meta.env.VITE_BASE_API  + "/delete/food/" + id ;

    axios({
      url: url,
      method: "delete",
    })
      .then((res) => {
        //below method will refresh the page
        // window.location.reload(); //to refresh is not a good practice so we should
        //setBooks(res.data.data)
        if (res.data.success) {
          toast.success("Food has been deleted successfully");
          setIsDelete(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      {/* <h2 className="text-center">Book Library</h2> */}
      {/* </hr> */}
      <Container>
        <Form.Group className="mb-3">
          <Form.Label>
            Search <i className="bi bi-search"></i>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter food name for search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Form.Group>
        {search}
      </Container>
      <Container>
        <Container className="d-flex justify-content-end">
          <Button variant="dark" onClick={addFood}>
            Add Food
          </Button>
        </Container>
        <Table striped bordered hover className="my-3">
          <thead>
            <tr>
              <th>Image</th>
              <th>Food Id</th>
              <th>Food Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food, index) => (
              <tr key={index} >
                <td onClick={() => viewFood(food._id)}>
                  <img src={food.f_image} alt="" width="30px" height="30px" />
                </td>
                <td onClick={() => viewFood(food._id)}>{food._id}</td>
                <td onClick={() => viewFood(food._id)}>{food.f_name}</td>
                <td onClick={() => viewFood(food._id)}>{food.f_price}</td>
                <td onClick={() => viewFood(food._id)}>{food.f_category}</td>
                
                <td>
                  <Button
                    variant="success"
                    onClick={() => goToBookEditPage(food._id)}
                    size="sm"
                    className="ms-2"
                  >
                    <i className="bi bi-pencil"></i>{" "}
                  </Button>
                  <Button
                    variant="warning"
                    onClick={() => viewFood(food._id)}
                    className="ms-2"
                    size="sm"
                  >
                    {" "}
                    <i className="bi bi-eye"></i>
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => deleteFood(food._id)}
                    size="sm"
                    className="ms-2"
                    style={{ marginLeft: "10px" }}
                  >
                    <i className="bi bi-trash3"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination size="md" className="justify-content-center">
          {items}
        </Pagination>
      </Container>
    </div>
  );
}
export default FoodList;
