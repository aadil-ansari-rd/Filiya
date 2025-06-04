import filiyapng from "../images/food-admin.jpg";
import "bootstrap-icons/font/bootstrap-icons.css";

import { Container } from "react-bootstrap";
const Home = () => {
  return (
    <div>
      <Container>
        <img
          src={filiyapng}
          alt="Filiya Restaurant"
          style={{
            width: "103%",
            height: "93vh",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />
      </Container>
    </div>
  );
};

export default Home;
