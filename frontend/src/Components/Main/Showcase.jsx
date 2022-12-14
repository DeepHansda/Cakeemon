import { Chip, Container, Paper } from "@mui/material";
import React, { useContext } from "react";
import Slider from "react-slick";
import { ProjectContext } from "../../App";
import TopProduct from "../Products/TopProduct";

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "black",
        borderRadius: "100%",
        margin: "0 5px",
      }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "black",
        borderRadius: "100%",
        margin: "0 5px",
      }}
      onClick={onClick}
    >
    </div>
  );
}

function Showcase({ title, data, show }) {
  const { navigator } = useContext(ProjectContext);
  const settings = {
    infinite: true,
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "10px",
    slidesToShow: 5,
    speed: 500,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 6,
          centerPadding: "-40px",
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          centerPadding: "-30px",
        },
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 3,
          centerPadding: "-20px",
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 2,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
          centerPadding: "85px",
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          centerPadding: "70px",
        },
      },
      {
        breakpoint: 380,
        settings: {
          slidesToShow: 1,
          centerPadding: "55px",
        },
      },
    ],
  };

  const navi = () => {
    navigator(`/allProducts?category=${show}`);
  };
  return (
    <Paper variant="outlined">
      <Container maxWidth="xl">
        <div className="showcase">
          <div className="showcase-container">
            <div className="showcase-title">
              <h2>{title}</h2>
            </div>
          </div>

          <div className="showcase-slider">
            <Slider {...settings}>
              {data &&
                data.map((i, index) => {
                  return <TopProduct product={i} key={index} />;
                })}
            </Slider>
          </div>

          <div className="showcase-chip">
            <Chip
              variant="filled"
              label="Show More."
              color="primary"
              onClick={() => navi()}
            />
          </div>
        </div>
      </Container>
    </Paper>
  );
}

export default Showcase;
