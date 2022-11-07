import React, { useContext } from "react";
import Slider from "react-slick";
import "./categories.css";
import { ProjectContext } from "../../../App";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
export default function Categories({ items, name }) {

  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black",borderRadius: "100%",margin:'0 5px'}}
        onClick={onClick}
      />
    );
  }
  
  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black" ,borderRadius: "100%",margin:'0 5px'}}
        onClick={onClick}
      >
        <FiArrowRight/>
      </div>
    );
  }


  const settings = {
    dots: false,
    // autoplay: true,
    infinite: true,
    swipeToSlide: true,
    arrow: true,
     nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,

        },
      },
      {
        breakpoint: 810,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,

        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,

        },
      },
    ],
  };
  const { navigator } = useContext(ProjectContext);

  const navi = (value) => {
    navigator(`/allProducts?category=${value}`);
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
