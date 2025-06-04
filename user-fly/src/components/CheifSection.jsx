import CheifCards from "./CheifCards";

function ChefSection() {
  const cheifs = [
    {
      name: "Juan Carlos",
      img: "public/top-cheifs/chef-1.jpg",
      receipes: " 10",
      country: "Mexican",
    },
    {
      name: "John Doe",
      img: "public/top-cheifs/chef-2.jpg",
      receipes: " 16",
      country: "Italian",
    },
    {
      name: "Mahin Sahin",
      img: "public/top-cheifs/chef-3.jpg",
      receipes: " 12",
      country: "American",
    },
    {
      name: "Burak Seyran",
      img: "public/top-cheifs/chef-4.jpg",
      receipes: " 11",
      country: "French",
    },
    {
      name: "Furkan Andic",
      img: "public/top-cheifs/chef-5.jpg",
      receipes: " 18",
      country: "Turkian",
    },
    {
      name: "Seren Denis",
      img: "public/top-cheifs/chef-6.jpg",
      receipes: " 13",
      country: "Russian",
    },
  ];
  return (
    <div className="section cheifs">
      <h1 className="title">Our Top Chefs</h1>
      <div className="top-cheifs-container">
        {/* <CheifCards />
        <CheifCards />
        <CheifCards />
        <CheifCards />
        <CheifCards />
        <CheifCards /> */}
        {cheifs.map(cheif=> <CheifCards key={cheif.name} cheif={cheif}/>)} 
      </div>
    </div>
  );
}
export default ChefSection;
