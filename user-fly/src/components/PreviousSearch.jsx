import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
function PreviousSearch() {
  // const searches = [
  //   "pizza",
  //   "burger",
  //   "noodles",
  //   "french-fries",
  //   "italian desert",
  //   "ice-cream",
  //   "veg-machurian",
  //   "veg-biriyani",
  // ];
  return (
    <div className="previous-searches section">
      <div className="search-box">
        <input type="text" placeholder="Search...." onChange={(e) => setSearch(e.target.value)} />
        <button className="btn">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </div>
  );
}
export default PreviousSearch;
