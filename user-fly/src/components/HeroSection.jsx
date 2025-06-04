import CustomImage from "./CustomImage";
function HeroSection() {
  const images = [
    "public/noodles.jpg",
    "public/strawberry.jpg",
    "public/french-fries.jpg",
    "public/chicken-salad.jpg",
    "public/mixed-salad.jpg",
    "public/burger.jpg",
    "public/chicken-wings.jpg",
    "public/chaap.jpg",
    "public/ice-cone.jpg",
  ];
  return (
    <div className="section hero">
      <div className="col typograph">
        <h1 className="title">Feel the Food Feel the taste</h1>
        <p className="info">
          Welcome to FIliya, where culinary art meets a warm, inviting ambiance.
          Our restaurant is your gateway to a delightful dining experience.
          Explore our diverse menu, crafted with the freshest ingredients and a
          touch of creativity. From mouth-watering appetizers to exquisite
          entrees and delectable desserts, every dish promises an unforgettable
          taste journey.
        </p>
        {/* <button className="btn">explore now</button> */}
      </div>
      <div className="col gallery">
        {images.map((src, index) => (
          <CustomImage key={index} imgSrc={src} pt={"80%"} />
        ))}
      </div>
    </div>
  );
}
export default HeroSection;
