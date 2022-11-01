import { Chip, Container, Paper } from '@mui/material'
import React from 'react'
import Slider from 'react-slick'
import TopProduct from '../Products/TopProduct'

function Showcase({title}) {
    const settings = {
        infinite: true,
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "10px",
        slidesToShow: 5,
        speed: 500,
        arrows: true,
        responsive: [
          {
            breakpoint:1050,
            settings: {
              slidesToShow:4,
              centerPadding: "-40px",
            }
          },
          {
            breakpoint:900,
            settings: {
              slidesToShow:3,
              centerPadding: "-30px"
            }
          },
          {
            breakpoint:770,
            settings: {
              slidesToShow:3,
              centerPadding: "-20px"
            }
          }
          ,
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
            <TopProduct />
            <TopProduct />
            <TopProduct />
            <TopProduct />
            <TopProduct />
            <TopProduct />
            <TopProduct />
            <TopProduct />


          </Slider>
        </div>

        <div className="showcase-chip">
          <Chip variant="filled" label="Show More." color="primary" />
        </div>
      </div>
    </Container>
  </Paper>
  )
}

export default Showcase