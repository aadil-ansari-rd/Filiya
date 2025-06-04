import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import filiyapng from "./images/filiyapng.png"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify'; 

function Sidebarmenu({ children }) {
  let navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false)
  useEffect(() => {
    if (localStorage.getItem('uName')) {
      setIsLogin(true)
    }
  }, [])

  const logout = () => {

    axios({
      url: import.meta.env.VITE_BASE_API + "/logout/admin",// Ensure you have the correct base URL
      method: "get",
      withCredentials: true,
    }).then((res) => {
      setIsLogin(false);
      localStorage.removeItem('uName')
      localStorage.removeItem('u_id')
      toast.success("Have a great day! We’d love to welcome you again soon. You have been logged out.")
      

      navigate("/")
    }).catch((err) => {
      console.error("Not logged in or error:", err);
      
    })

  }

  return (
    <div className="container-fluid d-flex">
      <div className="row bg-dark" style={{ width: "25%" }}>
        <div className="bg-dark min-vh-100 col">
          <div>
            <a href="/foods" className="text-decoration-none text-white d-flex align-itemcenter ms-3 mt-2">
              <img src={filiyapng} alt="filiyapng" style={{ width: "40px", height: "40px" }} />
              <span className="ms-3 fs-4">
                <h3 style={{ fontFamily: "cursive" }}>Filiya</h3>
              </span>
            </a>
            <hr style={{ border: "none", height: "1px", backgroundColor: "white" }} />

            <ul className="nav nav-pills flex-column">
              <li className="nav-item text-white fs-4 my-1">
                <a
                  href="/foods"
                  className="nav-link text-white fs-5"
                  aria-current="page"
                >
                  <i className="bi bi-kanban"></i>
                  <span className="ms-2">Manage&nbsp;Foods</span>
                </a>
              </li>
              {/* <li className="nav-item text-white fs-4 my-1">
                <a
                  href="/users"
                  className="nav-link text-white fs-5"
                  aria-current="page"
                >
                  <i className="bi bi-people"></i>
                  <span className="ms-2">Manage Users</span>
                </a>
              </li> */}
              <li className="nav-item text-white fs-4 my-1">
                <a
                  href="/feedbacks"
                  className="nav-link text-white fs-5"
                  aria-current="page"
                >
                  <i className="bi bi-chat-left-heart"></i>
                  <span className="ms-2">Feedbacks</span>
                </a>
              </li>
              <hr style={{ border: "none", height: "1px", backgroundColor: "white" }} />

              <li>
                {/* <b>{isLogin ?
                  (<a className="nav-link text-white fs-5" style={{ textDecoration: "none", color: "white" }} onClick={logout}>
                    Logout
                  </a>) : (<a className="nav-link text-white fs-5" style={{ textDecoration: "none", color: "white" }} href="/">
                    Login
                  </a>)}
                </b> */}
                <b>{isLogin ?
                  (<a className="nav-link text-white fs-5" style={{ textDecoration: "none", color: "white", cursor:"pointer" }} onClick={logout} >
                    Logout 
                  </a>) : (<p></p>)}
                </b>

              </li>
            </ul>
          </div>
        </div>
      </div>

      <main style={{ width: "100%", margin: "20px" }}>{children}</main>
    </div>
  );
}

export default Sidebarmenu;