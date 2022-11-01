import React, { useContext } from "react";
import Slider from "react-slick";
import "./categories.css";
import { ProjectContext } from "../../../App";
export default function Categories({ items, name }) {
  const settings = {
    dots: false,
    arrows: true,
    // autoplay: true,
    speed: 4000,
    infinite: true,
    slidesToScroll: 6,
    autoplaySpeed: 2000,
    swipeToSlide: true,
    cssEase: "ease",
    responsive: [
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 810,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };
  const { navigator } = useContext(ProjectContext);

  const navi = (value) => {
    navigator(
      name === "Categories"
        ? `allProducts?category=${value}`
        : `allProducts?brand=${value}`
    );
  };
  return (
    <div className="categories">
      <div className="categories-container">
        <div className="categories-list">
          <div className="categories-list-container">
            <Slider {...settings}>
              {items.map((value, index) => {
                return (
                  <div
                    className="cate-item"
                    key={index}
                    onClick={() => navi(value.value)}
                  >
                    <div className="cate-item-img">
                      <img src={value.img} alt="icon" />
                    </div>

                    <div className="cate-item-title">
                      <p>{value.name}</p>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}
