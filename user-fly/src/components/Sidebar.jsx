import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Sidebar({ links, close }) { // props
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(false)
  let navigate = useNavigate()

  


  useEffect(() => {
    if (localStorage.getItem('uName')) {
      setIsLogin(true)
    }
  }, [localStorage.getItem('uName')])
  const logout = () => {

    axios({
      url: import.meta.env.VITE_BASE_API + "/logout",// Ensure you have the correct base URL
      method: "get",
      withCredentials: true,
    }).then((res) => {
      setIsLogin(false);
      localStorage.removeItem('uName')
      localStorage.removeItem('u_id')
      toast.error("Have a great day! We’d love to welcome you again soon. You have been logged out.")
      navigate("/menus")
    }).catch((err) => {
      console.error("Not logged in or error:", err);
      setUser(null);
    })

  }
  return (
    <div className="sidebar" onClick={close}>
      {links.map((link) => (
        <Link to={link.path} className={location.pathname === link.path ? "sidebar-link active" : "sidebar-link"} key={link.name}>
          <FontAwesomeIcon icon={link.icon} />
          {link.name}
        </Link>
      ))}
        
        <b>{isLogin ? (<a className="nav-links" onClick={logout}>Logout</a>) : (<a className="nav-links" style={{textDecoration:"none", color: "black"}} href="/login">Login</a>)}</b>
     
    </div>
  );
}
export default Sidebar;