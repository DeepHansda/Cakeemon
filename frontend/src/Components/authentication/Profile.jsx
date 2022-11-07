import {
  Avatar,
  Badge,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, Fragment } from "react";
import { FiBookmark, FiHeart, FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ProjectContext } from "../../App";
import { clearErrors, logout } from "../../Redux/Actions/UserActions";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Loading from "../Utils/Loading";
import Toast from "../Utils/Toast";
import man from "../../assets/img/man.png";
import woman from "../../assets/img/woman.png";
import MetaData from "../Utils/MetaData";

function Profile() {
  const { loading, isAuthenticated, user, error } = useSelector(
    (state) => state.user
  );

  const nav = useLocation();
  const { navigator, dispatch, setOpenAlert } = useContext(ProjectContext);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishItems } = useSelector((state) => state.wishList);
  const handleLogOut = () => {
    dispatch(logout());
  };

  const data = [
    {
      name: "cart",
      icon: FiShoppingCart(),
      link: "/cart",
      count: cartItems.length,
    },
    {
      name: "wishlist",
      icon: FiHeart(),
      link: "/wishlist",
      count: wishItems.length,
    },
    {
      name: "orders",
      icon: FiBookmark(),
      link: "/myOrders",
    },
  ];
  console.log(nav.state?.previousPath);
  useEffect(() => {
    if (error) {
      setOpenAlert({ open: true, message: error.message, success: false });
      dispatch(clearErrors());
    }
  }, [error]);
  return (
    <Fragment>
      <MetaData title="Profile"/> 
      <Navbar />
      <div className="profile" style={{ height: "100vh" }}>
        {loading && <Loading />}
        <Toast />
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Avatar
                alt={user.full_name}
                src={user.avatar.img || ("male" ? man : woman)}
                sx={{ width: { xs: 80, md: 85 }, height: { xs: 80, md: 85 } }}
              />

              <Chip label={user.genders} sx={{ textTransform: "capitalize",mt:1 }} />
              <Typography
                component="h1"
                variant="h4"
                align="center"
                sx={{ textTransform: "capitalize" }}
              >
                {user.full_name}
              </Typography>
            </Box>

            <Box
              sx={{
                display: { sm: "block", md: "flex" },
                justifyContent: "center",
                margin: "20px 0",
                "&.css-5brpsq-MuiPaper-root": {
                  margin: "0 5px",
                },
              }}
            >
              <Paper
                variant="outlined"
                sx={{
                  textAlign: "center",
                  padding: "10px",
                  marginRight: { md: "10px" },
                }}
              >
                <Typography variant="body1">{user.email}</Typography>
              </Paper>
              <Paper
                variant="outlined"
                sx={{
                  textAlign: "center",
                  padding: "10px",
                  marginTop: { xs: "10px", md: "0" },
                }}
              >
                <Typography variant="body1">
                  +91 {user.mobile_number}
                </Typography>
              </Paper>
            </Box>
            <Divider />

            <Box sx={{ margin: "20px 0" }}>
              <Grid container spacing={2} columns={{ xs: 12, lg: 6 }}>
                {data.map((item, index) => {
                  return (
                    <Grid item key={index} xs={6} lg={3}>
                      <Paper
                        onClick={() => navigator(item.link)}
                        variant="outlined"
                      >
                        <Box
                          sx={{
                            textAlign: "center",
                            padding: "10px",
                            width: "100%",
                            fontSize: { sm: "1.3rem", lg: "1.43rem" },
                            textTransform: "capitalize",
                            cursor: "pointer",
                          }}
                        >
                          <Container>
                            <IconButton>
                              <Badge badgeContent={item.count} color="primary">
                                {item.icon}
                              </Badge>
                            </IconButton>
                          </Container>
                          <Container>
                            <Typography variant="body1">{item.name}</Typography>
                          </Container>
                        </Box>
                      </Paper>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
            <Divider />
            <Button
              variant="outlined"
              color="error"
              size="medium"
              fullWidth
              sx={{ marginTop: "20px" }}
              onClick={() => handleLogOut()}
            >
              {" "}
              Log Out
            </Button>
          </Paper>
        </Container>
      </div>
      <Footer />
    </Fragment>
  );
}

export default Profile;
