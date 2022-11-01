import React, { useContext, useEffect, useState } from 'react'
import {
    Divider,
    Drawer,
    Paper,
    Typography,
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
    TextField,
    Container,
  } from "@mui/material";
  import { FiArrowDown, FiChevronDown, FiSettings } from "react-icons/fi";

  import { ProjectContext } from "../../../App";
import { getProductsClient } from '../../../Redux/Actions/ProductsActions';
import { getCategories } from '../../../Redux/Actions/CategoriesAction';
import { getBrands } from '../../../Redux/Actions/BrandActions';
import { useSelector } from 'react-redux';


function ProductsDrawer() {
    const { offset, width ,dispatch,setOpenAlert } = useContext(ProjectContext);

    const [value, setValue] = useState([0, 1000]);
    const [brand, setBrand] = useState("");
    const [ratings, setRatings] = useState("");
    const [category, setCategory] = useState("");


    useEffect(() => {
      dispatch(getCategories())
      dispatch(getBrands())
  
    },[])
  
    const {categories} = useSelector((state) => state.categories)
    const {brands} = useSelector((state) => state.brands)

    

    //   useEffect(() => {
    //     dispatch(getProductsClient(category, ratings, brand));
    //   },[category, ratings, brand])
        
      
      
    
      
    
      const handleBrandChange = (event, newValue) => {
        setBrand(newValue);
      };
    
      const handleRatingChange = (event, newValue) => {
        setRatings(newValue);
      };
    
      const breakPo = () => {
        return width <= 600;
      };
    
      const drawerWidth = breakPo() ? "100%" : "230px";
    
  return (
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
                  >
                    {/* <Toolbar /> */}
                    <Container sx={{ padding: "20px" }}>
                      <Typography variant="h4"
                      sx={{
                        fontFamily: "'Poppins',sans-serif",
                        fontWeight: "bold",
                      }}
                      >Filters</Typography>
                    </Container>
                    <Divider />
  
                    {/* categories section */}
                      <Box sx={{ margin: "10px 0px" }}>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<FiChevronDown />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography>Categories</Typography>
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
                                bgcolor: "background.paper",
                                position: "relative",
                                overflow: "auto",
                                maxHeight: 300,
                              }}
                              dense
                            >
                              {categories.map((data, index) => {
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
                                bgcolor: "background.paper",
                                position: "relative",
                                overflow: "auto",
                                maxHeight: 300,
                              }}
                              dense
                            >
                              {brands.map((data, index) => {
                                return (
                                  <ListItemButton key={index}>
                                    <FormControlLabel
                                      value={data.value}
                                      control={<Radio size="small" />}
                                      label={data.value}
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
  
                    
                  </Drawer>
                </Paper>
  )
}

export default ProductsDrawer