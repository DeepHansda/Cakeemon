import "./main.css";
import React, { Fragment, useEffect } from "react";

import Footer from "../Footer/Footer";
import MainSlider from "../Utils/Slider/Slider";
import Categories from "../Utils/Categories/Categories";

import Navbar from "../Navbar/Navbar";
import Query from "../Utils/Query";
import { getBrands } from "../../Redux/Actions/BrandActions";
import { getCategories } from "../../Redux/Actions/CategoriesAction";
import { useDispatch, useSelector } from "react-redux";
import birthDay from "../../assets/img/birthday-specials.jpg";
import christmas from "../../assets/img/christmas.jpeg";
import wedding from "../../assets/img/wedding-specials.jpg";
import Additional from "./Additional";
import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import Showcase from "./Showcase";

export default function Main() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
  }, []);

  const { categories } = useSelector((state) => state.categories);
  const { brands } = useSelector((state) => state.brands);

  return (
    <Fragment>
      <Navbar />
      <div className="main">
        <div className="main-container">
          <div className="main-slider">
            <div className="main-slider-container">
              <MainSlider />
            </div>
          </div>
        </div>

        <Additional />

        <Showcase title="Popular Cakes." />

        <Paper variant="outlined" sx={{ mt: 5, p: 5 }}>
          <Container maxWidth="lg" sx={{ p: 1 }}>
            <div className="showcase-title">
              <h2>Explore Cakes.</h2>
            </div>
            <Grid container spacing={2} sx={{ mt: 5 }}>
              {categories &&
                categories.map((category) => {
                  return (
                    <Grid item xs={6} sm={4} md={3}>
                      <Card>
                        <CardMedia
                          component="img"
                          image={category.img}
                          alt={category.name}
                          sx={{
                            height: { xs: "85px", sm: "120px", md: "180px" },
                          }}
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            sx={{
                              fontFamily: "'Poppins',sans-serif",
                              fontSize: { xs: "14px", sm: "18px", md: "1.3em" },
                            }}
                          >
                            {category.name}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
            </Grid>
          </Container>
        </Paper>

        <Showcase title="Chocolate Cakes." />

        <Paper variant="outlined">
          <Container maxWidth="lg">
            <div className="popular-category">
              <div className="showcase-title">
                <h2>Popular Categories.</h2>
              </div>

              <div className="popular-category-list">
                <div className="popular-category-items">
                  <div className="popular-category-container">
                    <div className="popular-category-img">
                      <img src={wedding} alt="wedding_img" />
                    </div>

                    <div className="popular-category-title">
                      <h6>Wedding Specials</h6>
                    </div>
                  </div>

                  <div className="popular-category-container">
                    <div className="popular-category-img">
                      <img src={christmas} alt="christmas_img" />
                    </div>

                    <div className="popular-category-title">
                      <h6>Christmas Specials</h6>
                    </div>
                  </div>
                  <div className="popular-category-container">
                    <div className="popular-category-img">
                      <img src={birthDay} alt="birthDay_img" />
                    </div>

                    <div className="popular-category-title">
                      <h6>Birth Day Specials</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Paper>

        <Paper variant="outlined">
          <Container maxWidth="lg">
            <div className="custome-container">
            <div className="custom-container-img">
            <img src="https://res.cloudinary.com/manjiro/image/upload/v1667021857/samples/front-view-delicious-chocolate-cake-stand-with-copy-space_krnzeu.jpg" alt="" />
            </div>

            <div className="custom-container-details">
            <div className="custom-container-details-title">
              <h2>Customize Your Own Cake.</h2>
            </div>

            <div className="custom-container-details-para">
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa nulla nostrum molestiae, cupiditate quasi quia tempore eligendi iure non nisi esse consequatur velit dicta eum.</p>
            </div>
            </div>
              
            </div>
          </Container>
        </Paper>

        <Query />
        <Footer />
      </div>
    </Fragment>
  );
}
