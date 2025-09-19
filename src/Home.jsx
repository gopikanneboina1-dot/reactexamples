import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";
import { Truck, BadgeCheck, Headphones } from "lucide-react";

function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  };

  const carouselItems = [
    { title: "Veg Dishes", img: "/Veg banner.png" },
    { title: "Non-Veg Dishes", img: "/Non veg banner.png" },
    { title: "Dairy Items", img: "/Milkbanner.png" },
  ];

  const cardItems = [
    {
      title: "Veg Dishes",
      description:
        "Fresh, healthy and delicious vegetarian meals made with seasonal ingredients.",
      img: "/vegcard.png",
    },
    {
      title: "Non-Veg Dishes",
      description:
        "Juicy, flavorful and protein-packed non-vegetarian dishes for every taste.",
      img: "/noncard.png",
    },
    {
      title: "Dairy Items",
      description:
        "Fresh Dairy items will be delivered and they are good in Proteins.",
      img: "milkcard.png",
    },
  ];

  const serviceItems = [
    {
      title: "Free Delivery",
      description:
        "Enjoy hassle-free shopping with fast and free delivery on every order. We ensure your fresh products reach your doorstep quickly and in perfect condition, without any extra charges.",
      icon: <Truck size={50} />,
    },
    {
      title: "Good Quality",
      description:
        "We are committed to providing only the best quality products. Every item is carefully selected, fresh, and hygienically packed to guarantee premium standards and customer satisfaction.",
      icon: <BadgeCheck size={50} />,
    },
    {
      title: "24/7 Support",
      description:
        "Our friendly customer support team is available around the clock to assist you. Whether you need help with an order, have a query, or need recommendations, we’re here for you anytime.",
      icon: <Headphones size={50} />,
    },
  ];

  return (
    <div className="home-container">
      {/* Carousel Section */}
      <div className="carousel-container">
        <Slider {...settings}>
          {carouselItems.map((item, index) => (
            <div key={index} className="carousel-slide">
              <img src={item.img} alt={item.title} className="carousel-img" />
              <h2 className="carousel-text">{item.title}</h2>
            </div>
          ))}
        </Slider>
      </div>

      {/* Categories Section */}
      <div className="categories-section">
        <h2 className="services-heading">Categories</h2>
        <div className="cards-container">
          {cardItems.map((card, index) => (
            <div key={index} className="card">
              <img src={card.img} alt={card.title} className="card-img" />
              <div className="card-body">
                <h3 className="card-title">{card.title}</h3>
                <p className="card-description">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <div className="categories-section">
        <h2 className="services-heading">🌟 Our Services</h2>
        <div className="cards-container">
          {serviceItems.map((service, index) => (
            <div key={index} className="card">
              <div className="card-img" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "150px" }}>
                {service.icon}
              </div>
              <div className="card-body">
                <h3 className="card-title">{service.title}</h3>
                <p className="card-description">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
