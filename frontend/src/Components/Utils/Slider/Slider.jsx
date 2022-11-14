import Slider from "react-slick";
import { useContext, useEffect, useState } from "react";
import "./slide.css";
import { ProjectContext } from "../../../App";
import Toast from "../Toast";
import { getBanners } from "../../../Redux/Actions/BannerActions";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const MainSlider = () => {
  const { setOpenAlert ,dispatch , navigator} = useContext(ProjectContext);

  const settings = {
    lazyLoad: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    adaptiveHeight: true,
    arrows: true,
    fade: true,
  };


  
  useEffect(() => {
    dispatch(getBanners())
  }, []);
  const {banners , loading} = useSelector((state)=>state.banners)
  return (
    <div className="main-autoSlide">
      <Toast />
      <Slider {...settings}>
        {banners && banners.map((banner) => {
          return (
            <div className="slide-items">
              <img src={banner.img} alt={banner.public_id} onClick={()=>navigator(banner.link)}/>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default MainSlider;
