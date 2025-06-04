import { useEffect, useState } from "react";
import PreviousSearch from "../components/PreviousSearch";
import FoodCard from "../components/FoodCard";
import axios from 'axios';
import { Form } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
function Menu() {
  // backend work.
  let [foods, setFoods] = useState([]);
  let [search, setSearch] = useState("")
  useEffect(() => {
    let url = import.meta.env.VITE_BASE_API  + "/foods"

    axios({
      url: url,
      method: "get",
      params: {
        search: search,
      },
    })
      .then((res) => {
        setFoods(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [search ,localStorage.getItem('uName')]);
  return (
    <div>
      <a  href="/feedback">
      <button style={{marginTop:"1rem"}} className="btn">Give Your Feedback .....</button>
      </a>
      <div className="previous-searches section">
        <div className="search-box">
          <input type="text" placeholder="Search...." onChange={(e) => setSearch(e.target.value)} />
          <button className="btn">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
      <div className="receipe-container">
        {foods.map((food, index) => (
          <FoodCard key={index} food={food} />
        ))}
      </div>
    </div>
  );
}
export default Menu;
