import { Link,  useLocation, useNavigate } from "react-router-dom"; // import Link helps to render the another page.
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import logoIcon from "../../public/Filiya-logo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  faHome,
  faList,
  faCog,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { icon } from "@fortawesome/fontawesome-svg-core";
import axios from "axios";
import { toast } from "react-toastify";


function Navbar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isLogin, setIsLogin]=useState(false)
  const location = useLocation();
  let navigate = useNavigate()

 useEffect(()=>{
    if(localStorage.getItem('uName')){
      setIsLogin(true)
    }
 },[localStorage.getItem('uName')])
  
  

  const links = [
    {
      name: "Home",
      path: "/",
      icon: faHome,
    },
    {
      name: "Menu",
      path: "/menus",
      icon: faList,
    },

    // {
    //   name: "Feedback",
    //   path: "/feedback",
    //   icon: faPhone,
    // },

    {
      name: "Settings",
      path: "/settings",
      icon: faCog,
    },




  ];
  
  ""
  function closeSidebar() {
    setShowSidebar(false);
  }
  const logout = () => {

    axios({
      url: import.meta.env.VITE_BASE_API + "/logout/user",// Ensure you have the correct base URL
      method: "get",
      withCredentials: true,
    }).then((res) => {
      setIsLogin(false);
      localStorage.removeItem('uName')
      localStorage.removeItem('u_id')
      toast.success("Have a great day! We’d love to welcome you again soon. You have been logged out.")

      navigate("/menus")
    }).catch((err) => {
      console.error("Not logged in or error:", err);
      
    })

  }
  return (
    <>
      <div className="navbar container ">
        <a href="/"><img src={logoIcon} width="60px" height="60px"></img></a>
        <Link to="/" className="logo">
          Filiya <span>Res</span>tau<span>rant</span>
        </Link>

        <div className="nav-links">
          {links.map((link) => (
            <Link
              className={
                location.pathname === link.path
                  ? "sidebar-link active"
                  : "sidebar-link"
              }
              to={link.path}
              key={link.name}
            >
              {link.name}
            </Link>
          ))}
          {isLogin?(<a onClick={logout} style={{cursor:'pointer'}}>Logout</a>):(<a href="/login">Login</a>)}
        </div>

        
        {/* cart logo */}
        {/* <div className="">
          <span>
            <i class="fa-solid fa-cart-shopping"></i>
          </span>
        </div> */}
        
        <div
          onClick={() => setShowSidebar(true)}
          className={showSidebar ? "sidebar-btn active" : "sidebar-btn"}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
      {showSidebar && <Sidebar close={closeSidebar} links={links} />}
    </>
  );
}
export default Navbar;

// {showSidebar && <Sidebar links={links} />}
// This line makes sidebar responsive
