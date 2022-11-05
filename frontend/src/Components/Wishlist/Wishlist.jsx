import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { Fragment } from "react";
import { FiAirplay, FiCloudOff, FiDelete, FiTrash } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishList } from "../../Redux/Actions/WishListActions";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import "./Wishlist.css";
import { useNavigate } from "react-router-dom";
function Wishlist() {
  const { wishItems } = useSelector((state) => state.wishList);
  const dispatch = useDispatch();
  const wishCount = wishItems.length;

  const navigate = useNavigate();
  const navigator = (id) => {
    navigate(`/productDetails/${id}`);
  };
  return (
    <Fragment>
      <Navbar wishCount={wishCount} />
      <div className="wishlist">
        <Paper variant="outlined">
          <Box sx={{ margin: "5px 0", padding: "10px" }}>
            <Typography variant="h2">My Wishlist</Typography>
          </Box>
          <Divider variant="middle" />
          {wishItems.length > 0 ? (
            WishItems(wishItems)
          ) : (
            <Container>
              <Typography variant="h6">Wishlist is Empty !</Typography>
            </Container>
          )}
        </Paper>
      </div>
      <Footer />
    </Fragment>
  );

  function WishItems(wishItems) {
    return (
      <Container
        sx={{
          padding: "10px",
          display: { md: "grid" },
          gridTemplateColumns: "repeat(2,1fr)",
          gridGap: "15px",
          flexWrap: "wrap",
        }}
      >
        {wishItems.map((item) => {
          return (
            <Container
              sx={{
                marginTop: { xs: "10px", md: "0" },
                width: { xs: "100%", md: "100%" },
                padding: { xs: "0", md: "0" },
              }}
              key={item.product}
            >
              <Card
                sx={{
                  display: "flex",
                  alignItems: "center",
                  overflow: "hidden",
                }}
                variant="outlined"
              >
                <CardMedia
                  component="img"
                  sx={{ width: 151, height: 165, marginRight: "5px" }}
                  image={item.img}
                  alt="Live from space album cover"
                  onClick={() =>navigator(item.product)}
                />
                <Divider orientation="vertical" flexItem />
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography
                      component="div"
                      variant="h5"
                      sx={{ textTransform: "capitalize" }}
                      onClick={() =>navigator(item.product)}
                    >
                      {item.name}
                    </Typography>
                    <Divider variant="fullWidth" />

                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      ₹{item.price}
                    </Typography>

                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      component="div"
                    >
                      Stock-{item.stock}
                    </Typography>
                    <Divider variant="fullWidth" />

                    <Box>
                      <Tooltip title="Delete">
                        <IconButton>
                          <FiTrash
                            onClick={() =>
                              dispatch(removeFromWishList(item.product))
                            }
                          />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </CardContent>
                </Box>
              </Card>
            </Container>
          );
        })}
      </Container>
    );
  }
}

export default Wishlist;
