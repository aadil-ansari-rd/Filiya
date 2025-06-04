import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons"; //use the icons from fontawesome.
function CheifCards({cheif}) { // passing props(cheif) from CheifSection.jsx
  return (
    <div className="cheif-card">
      <img src={cheif.img} alt="" />
      <div className="cheif-card-info">
        <h3 className="cheif-card-name">{cheif.name}</h3>
        <p className="cheif-receipe-count">Receipes:<b>{cheif.receipes}</b></p>
        <p className="cheif-country">Country: <b>{cheif.country}</b></p>
        <p className="Cheif-icons">
            <FontAwesomeIcon icon={faFacebook}/>
            <FontAwesomeIcon icon={faTwitter}/>
            <FontAwesomeIcon icon={faInstagram}/>
        </p>
      </div>
    </div>
  );
}
export default CheifCards;
