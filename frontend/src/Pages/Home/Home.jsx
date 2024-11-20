import React, { Fragment, useContext, useEffect } from "react";
import "./home.css";

import MainSlider from "../../Components/Utils/Slider/Slider";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ProjectContext } from "../../App";
import birthDay from "../../assets/img/birthday-specials.jpg";
import christmas from "../../assets/img/christmas.jpeg";
import wedding from "../../assets/img/wedding-specials.jpg";
import { getProductsAdmin } from "../../Redux/Actions/ProductsActions";
import { useGetAllCategoriesQuery } from "../../Redux/slices/categoriesApiSlice";
import Additional from "./Additional";
import Showcase from "./Showcase";
import MetaData from "../../Components/Utils/MetaData";
import Query from "../../Components/Utils/Query";
import { useGetAllProductsQuery } from "../../Redux/slices/productsApiSlice";
import MainLayout from "../../Layouts/MainLayout";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsAdmin());
  }, []);

  const { navigator } = useContext(ProjectContext);

  const { data: categories, isLoading } = useGetAllCategoriesQuery();
  console.log(categories);
  const { data: productsResult, isLoading: isProductsLoading } =
    useGetAllProductsQuery();
  const products = productsResult?.result;


  const chocolateCakes =
    products && products.filter((f) => f.category == "chocolates").slice(0, 10);
  const mangoCakes =
    products && products.filter((f) => f.category == "mango").slice(0, 10);
  const PopularCakes =
    products && products.filter((f) => f.top === true).slice(0, 10);

  const navi = (cat) => {
    navigator(`/allProducts?category=${cat}`);
  };

  const occ = (oc) => {
    navigator(`/allProducts?occasion=${oc}`);
  };

  return (
    <Fragment>
      <MainLayout>
        <MetaData title="Home" />
        <div className="main">
          <div className="main-container">
            <div className="main-slider">
              <div className="main-slider-container">
                <MainSlider />
              </div>
            </div>
          </div>
          <Additional />
          {isProductsLoading ? (
            <Box sx={{ p: 1, textAlign: "center" }}>
              <CircularProgress />
            </Box>
          ) : (
            <Showcase title="Popular Cakes." data={PopularCakes} show={"all"} />
          )}
          <Paper sx={{ mt: 5, p: 5 }}>
            <Container maxWidth="lg" sx={{ p: 1 }}>
              <div className="showcase-title">
                <h2>Explore Cakes.</h2>
              </div>
              <Grid container spacing={2} sx={{ mt: 5 }}>
                {categories &&
                  categories.categories.map((category) => {
                    return (
                      <Grid item xs={6} sm={4} md={3}>
                        <Card onClick={() => navi(category.value)}>
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
                                fontSize: {
                                  xs: "14px",
                                  sm: "18px",
                                  md: "1.3em",
                                },
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
          {isProductsLoading ? (
            <Box sx={{ p: 1, textAlign: "center" }}>
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <Showcase
              title="Chocolate Cakes."
              data={chocolateCakes}
              show="chocolates"
            />
          )}

          {isProductsLoading ? (
            <Box sx={{ p: 1, textAlign: "center" }}>
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <Showcase title="Mango Cakes." data={mangoCakes} show="mango" />
          )}

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
                        <img
                          src={wedding}
                          alt="wedding_img"
                          onClick={() => occ("wedding")}
                        />
                      </div>

                      <div className="popular-category-title">
                        <h6>Wedding Specials</h6>
                      </div>
                    </div>

                    <div className="popular-category-container">
                      <div className="popular-category-img">
                        <img
                          src={christmas}
                          alt="christmas_img"
                          onClick={() => occ("christmas")}
                        />
                      </div>

                      <div className="popular-category-title">
                        <h6>Christmas Specials</h6>
                      </div>
                    </div>
                    <div className="popular-category-container">
                      <div className="popular-category-img">
                        <img
                          src={birthDay}
                          alt="birthDay_img"
                          onClick={() => occ("birthday")}
                        />
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
          <Paper
            variant="outlined"
            sx={{ margin: "25px 0", padding: "20px 0" }}
          >
            <Container maxWidth="lg">
              <div className="custom-container">
                <div className="custom-container-img">
                  <img
                    src="https://res.cloudinary.com/manjiro/image/upload/v1667021857/samples/front-view-delicious-chocolate-cake-stand-with-copy-space_krnzeu.jpg"
                    alt=""
                  />
                </div>

                <div className="custom-container-details">
                  <div className="custom-container-details-title">
                    <h2>Customize Your Own Cake.</h2>
                  </div>

                  <div className="custom-container-details-para">
                    <p>
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Ipsa nulla nostrum molestiae, cupiditate quasi quia
                      tempore eum.
                    </p>
                  </div>
                  <Button variant="outlined" size="small" sx={{ mt: 1 }}>
                    Customize Cake.
                  </Button>
                </div>
              </div>
            </Container>
          </Paper>
          <Query />
        </div>
      </MainLayout>
    </Fragment>
  );
}
