import CustomImage from "./CustomImage";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

function FoodCard({ food }) {

  let navigate = useNavigate();

  function orderpage(id) {
    
    navigate(`/checkout/${id}`);

  }
  return (
    <div className="receipe-card" onClick={()=>orderpage(food._id)} >
      <CustomImage imgSrc={food.f_image} pt="70%" />
      <div className="receipe-card-info">
        {/* <img className="chef-img" src={food.chefImg} alt="" /> */}
        <p className="receipe-title">{food.f_name}</p>
        {/* <p className="receipe-description">{food.f_description}</p> */}
        <p className="receipe-description">Price : &#8377; {food.f_price}</p>
        <p className="receipe-description">Category : {food.f_category}</p>
        <br />
        <p>{[...Array(food.f_rating)].map((_, i) => (
          <span>⭐</span>
        ))}</p>
        <br />
        <Button style={{ width: "100%" }} onClick={() => orderpage(food._id)} className="btn ">Order &nbsp; Now</Button>

        {/* <a className="view-button" href="#!">VIEW....</a> */}
      </div>
    </div>
  );
}
export default FoodCard;
