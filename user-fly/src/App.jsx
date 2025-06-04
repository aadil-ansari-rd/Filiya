import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import Settings from "./pages/Settings.jsx";
import Feedback from "./pages/Feedback.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Emailver from "./pages/Emailver.jsx";
import OtpVer from "./pages/OtpVer.jsx";
import { useState } from "react";
import Checkout from "./pages/Checkout.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import PaymentFailure from "./pages/PaymentFailure.jsx";

function App() {
  let [show, setShow] = useState(true);
  return (
    <Router>
      <Navbar />
      <div className="container main" style={{ minHeight:"90vh"}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menus" element={<Menu />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/order/:id" element={<Login />} />
          <Route path="/emailver" element={<Emailver/>} />
          <Route path="/otpver" element={<OtpVer/>} />
          <Route path="/checkout/:id" element={<Checkout/>}/>
          <Route path="/payment/success" element={<PaymentSuccess/> }/>
          <Route path="/payment/failure" element={<PaymentFailure/>}/>
          <Route path="/checkout/:id" element={<Checkout/>}/>

        </Routes>
      </div>
      <Footer />
    </Router>
  );
}
export default App;
