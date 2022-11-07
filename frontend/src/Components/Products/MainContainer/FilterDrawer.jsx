import React, { useContext, useState } from "react";
import {
  Divider,
  Drawer,
  Paper,
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
  Typography,
  Container,
  Chip,
} from "@mui/material";

import { FiChevronDown, FiSettings } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { ProjectContext } from "../../../App";
import { getProductsClient } from "../../../Redux/Actions/ProductsActions";

function FilterDrawer({ openDrawer, setOpenDrawer }) {
  const [value, setValue] = useState([0, 1000]);
  const [ratings, setRatings] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { offset, width } = useContext(ProjectContext);
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [occasion, setOccasion] = useState("");
  const { categories } = useSelector((state) => state.categories);

  const applyFilter = () => {
    dispatch(getProductsClient(keyword, currentPage, category,occasion, ratings));
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

          

          <Box sx={{ marginTop: "10px" }}>
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
                  value={category}
                  onChange={(e)=> setCategory(e.target.value)}
                >
                  <List
                    sx={{
                      width: "100%",
                      position: "relative",
                    }}
                    dense="true"
                  >
                    {categories &&
                      categories.map((cat, index) => {
                        return (
                          <ListItemButton key={index}>
                            <FormControlLabel
                              value={cat.value}
                              control={<Radio size="small" />}
                              label={cat.name}
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
          <Divider />


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

                      position: "relative",
                      maxHeight: 300,
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
  );
}

export default FilterDrawer;
