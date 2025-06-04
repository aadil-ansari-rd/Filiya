function Desert() {
  const list = [
    "Apple Pie la Mode",
    "Chocolate Lava Cake",
    "Mango Sticky Rice",
    "Lokum (Turkish delight)",
    "Mixed Fruit Pan Cake",
    "Macarons Pudding",
  ];
  return (
    <div className="section food-desert">
      <div className="col img">
        <img src="/public/sushi.jpg" alt="" />
      </div>
      <div className="col typograph">
        <h1 className="title">Our Special Desert Destination</h1>
        {list.map((item, index) => (
          <p className="desert-item" key={index}>{item}</p>
        ))}
        {/* <button className="btn">signup now</button> */}
      </div>
    </div>
  );
}
export default Desert;
