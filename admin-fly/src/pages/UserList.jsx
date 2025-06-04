import { Button, Container, Table, Form, Pagination } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
function UserList() {
  let [users, setUsers] = useState([]);
  let [isDelete, setIsDelete] = useState(false);
  let [search, setSearch] = useState("");
  let [pageNo  , setPageNo]=useState(1);
  let [ numberofPage , setNumberofPage] = useState(1)
  let items = [];
  function setPage(number){
    setPageNo(number)
  }
  for (let number = 1; number <= numberofPage; number++) {
    items.push(
      <Pagination.Item key ={number} onClick={()=>setPage(number)}>
        {number}
      </Pagination.Item>
    );

  }
  useEffect(() => {
    let url = import.meta.env.VITE_BASE_API + "/users"; 

    axios({
      url: url,
      method: "get",
      params: { //params ->req.query ,file -> req.file , data-> req.body , :variable -> req.params
        search: search,
        pageNo : pageNo , 
        limit : 3
      },
    })
      .then((res) => {
        setUsers(res.data.data);
        setNumberofPage(Math.ceil(res.data.totalCounts/3))
        setIsDelete(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isDelete, search , pageNo]);
  const navigate = useNavigate();

  function viewUser(id) {
    navigate("/view/user/" + id);
  }
  function goToBookEditPage(id) {
    // alert('ok')
    navigate("/edit/user/" + id);
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
            placeholder="Enter book name for search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Form.Group>
        {search}
      </Container>
      <Container>
        <Table striped bordered hover className="my-3">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Status</th>
              <th>Actions</th>
            
              
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.mobileNo}</td>
                <td>{user.status}</td>
                
                <td>
                  <Button
                    variant="success"
                    onClick={() => goToBookEditPage(user._id)}
                    size="sm"
                    className="ms-2"
                  >
                    <i className="bi bi-pencil"></i>{" "}
                  </Button>
                  <Button
                    variant="warning"
                    onClick={() => viewUser(user._id)}
                    className="ms-2"
                    size="sm"
                  >
                    {" "}
                    <i className="bi bi-eye"></i>
                  </Button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination size="md" className="justify-content-center">{items}</Pagination>
      </Container>
    </div>
  );
}
export default UserList;