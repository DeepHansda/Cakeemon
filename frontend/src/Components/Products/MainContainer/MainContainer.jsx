import {
  Divider,
  Drawer,
  Paper,
  Typography,
  Slider,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListItemButton,
  Radio,
  FormControlLabel,
  List,
  RadioGroup,
  Button,
  Chip,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { FiChevronDown, FiSettings } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { ProjectContext } from "../../../App";
import { getProductsClient } from "../../../Redux/Actions/ProductsActions";
import Footer from "../../Footer/Footer";
import ProductsContainer from "../ProductsContainer";
import "./mainContainer.css";
import Pagination from "react-js-pagination";
import Loading from "../../Utils/Loading";
import {  useSearchParams } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import { getBrands } from "../../../Redux/Actions/BrandActions";

export default function MainContainer() {
  const [value, setValue] = React.useState([0, 1000]);
  const [brand, setBrand] = React.useState("");
  const [ratings, setRatings] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const { offset, width } = useContext(ProjectContext);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = React.useState("");
  const [searchParams] = useSearchParams();
  // getting search parameter form searchbar------------------------------

  var keywordParam = searchParams.get("keyword");
  useEffect(() => {
    setKeyword(keywordParam === null ? "" : keywordParam);
  }, [keywordParam]);

  var categoryParam = searchParams.get("category");
  useEffect(() => {
    setCategory(categoryParam === null ? "" : categoryParam);
  }, [categoryParam]);

  
  // handling products------------------------------------------
 
 
  useEffect(() => {
    dispatch(getProductsClient(keyword, currentPage, category,ratings, brand));
  }, [keyword, currentPage, category]);


  useEffect(() => {
    dispatch(getBrands())
  },[])

  const productsStates = useSelector((state) => state.products);
  const {
    filteredProductsCount,
    loading,
    productPerPage,
    products,
    productsCount,
    error,
  } = productsStates;

const {brands} = useSelector((state) => state.brands)
  // filter events------------------------------------------------

  const applyFilter = () => {
    dispatch(getProductsClient(keyword, currentPage,category, ratings, brand));
  };
  const handlePageChange = (event) => {
    setCurrentPage(event);
  };

  function valuetext(value) {
    return `${value}°C`;
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleBrandChange = (event, newValue) => {
    setBrand(newValue);
  };

  const handleRatingChange = (event, newValue) => {
    setRatings(newValue);
  };

  const breakPo = () => {
    return width <= 600;
  };

  const drawerWidth = breakPo() ? "100%" : "300px";

  
  const marks = [
    {
      value: 0,
      label: "₹0",
    },
    {
      value: 200,
      label: "₹200",
    },
    {
      value: 400,
      label: "₹400",
    },
    {
      value: 600,
      label: "₹600",
    },
    {
      value: 800,
      label: "₹800",
    },
    {
      value: 1000,
      label: "₹1000",
    },
  ];

  return (
    <React.Fragment>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="products-mainContainer">
            {/* filter box -------------------------------------------------*/}

            <div className="products-mainContainer-filter">
              {/* Drawer sections */}
              <Paper elevation={3}>
                <Drawer
                  sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                      width: drawerWidth,
                      position: `${breakPo() ? "fixed" : "relative"}`,
                    },
                  }}
                  variant={`${breakPo() ? "temporary" : "permanent"}`}
                  anchor={breakPo() ? "top" : "left"}
                  open={breakPo() && openDrawer}
                >
                  {/* <Toolbar /> */}
                  <Container sx={{ padding: "20px" }}>
                    <Typography variant="h4">Filters</Typography>
                  </Container>
                  <Divider />

                  {/* price section */}
                  <Container sx={{ marginTop: "20px" }}>
                    <Typography variant="h6">Price</Typography>
                    <Slider
                      aria-label="Custom marks"
                      // defaultValue={value}
                      value={value}
                      onChange={handleChange}
                      getAriaValueText={valuetext}
                      step={200}
                      valueLabelDisplay="auto"
                      marks={marks}
                      size="small"
                      min={0}
                      max={1000}
                    />
                  </Container>

                  {/* Brands sections */}

                  <Box>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<FiChevronDown />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>Brands</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <RadioGroup
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="controlled-radio-buttons-group"
                          value={brand}
                          onChange={handleBrandChange}
                        >
                          <List
                            sx={{
                              width: "100%",
                              // maxWidth: 360,
                              bgcolor: "background.paper",
                              position: "relative",
                              overflow: "auto",
                              maxHeight: 300,
                              // '& ul': { padding: 0 },
                            }}
                            dense
                          >
                            {brands.map((data, index) => {
                              return (
                                <ListItemButton key={index}>
                                  <FormControlLabel
                                    value={data.value}
                                    control={<Radio size="small" />}
                                    label={data.name}
                                    sx={{ textTransform: "capitalize" }}
                                  />
                                </ListItemButton>
                              );
                            })}
                          </List>
                        </RadioGroup>
                      </AccordionDetails>
                    </Accordion>
                  </Box>

                  <Box sx={{ marginTop: "10px" }}>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<FiChevronDown />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>Customer Ratings</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <RadioGroup
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="controlled-radio-buttons-group"
                          value={ratings}
                          onChange={handleRatingChange}
                        >
                          <List
                            sx={{
                              width: "100%",
                              // maxWidth: 360,
                              bgcolor: "background.paper",
                              position: "relative",
                              // overflow: "auto",
                              maxHeight: 300,
                              // '& ul': { padding: 0 },
                            }}
                            dense="true"
                          >
                            <ListItemButton>
                              <FormControlLabel
                                value={4}
                                control={<Radio size="small" />}
                                label="4★ & above"
                                sx={{ textTransform: "capitalize" }}
                              />
                            </ListItemButton>

                            <ListItemButton>
                              <FormControlLabel
                                value={3}
                                control={<Radio size="small" />}
                                label="3★ & above"
                                sx={{ textTransform: "capitalize" }}
                              />
                            </ListItemButton>
                          </List>
                        </RadioGroup>
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                  <Divider />

                  <Container
                    sx={{
                      margin: "10px 0",
                      textAlign: "right",
                      "& button": {
                        margin: `${breakPo() ? "5px" : "0"}`,
                      },
                    }}
                  >
                    {breakPo() && (
                      <Button
                        variant="contained"
                        size="small"
                        color="error"
                        onClick={() => setOpenDrawer(false)}
                      >
                        Cancel
                      </Button>
                    )}

                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => applyFilter()}
                    >
                      Apply
                    </Button>
                  </Container>
                </Drawer>
              </Paper>
            </div>

            {/* products box -------------------------------------------------*/}

            <div className="mainContainer-product-container">
              <div className="chip-container">
                {breakPo() && (
                  <Chip
                    label="Filter"
                    icon={<FiSettings />}
                    variant="outlined"
                    onClick={() => setOpenDrawer(true)}
                  />
                )}
              </div>
              {products.length != 0 ? (<ProductsContainer products={products} />):(
                <Container>
                  <Typography variant="h5">
                    Products not Found !
                  </Typography>
                </Container>
              )}

              <div className="products-container-pagination">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={productPerPage}
                  totalItemsCount={productsCount}
                  onChange={handlePageChange}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="First"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </React.Fragment>
  );
}
