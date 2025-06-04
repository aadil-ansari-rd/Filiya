import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function QuoteSection() {
  return (
    <div className="section quote">
      <div className="quote-text">
        <FontAwesomeIcon icon={faQuoteLeft} />
        Food is everything we are. It's an extension of nationalist feeling,
        ethnic feeling, your personal history, your provience, your region, your
        tribe. It's inseparable from those from the get-go. Discover our story,
        meet our talented chefs, and stay updated with our latest offers and
        events. Easily book your table online, or order your favorite meals for
        a cozy night in. At Filiya, we celebrate food, family, and the joy of
        sharing a meal together.
        <p className="quote-author">- Anthony Bourdain</p>
      </div>
    </div>
  );
}
export default QuoteSection;
