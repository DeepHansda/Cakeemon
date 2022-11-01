import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { ProjectContext } from "../../App";
import accept from "../../assets/icons/accept.png";
import OrderStepper from "../Utils/OrderStepper";
function ConfirmOrder() {
  // const {order} = useSelector((state) => state.order)
  const { navigator } = useContext(ProjectContext);
  const order = JSON.parse(sessionStorage.getItem("order"));

  const fontStyle = {
    fontSize: "1.1em",
    fontFamily: "'Poppins',sans-serif",
    fontWeight: "bold",
  };

  const boxStyle = {
    margin: "10px",
  };
  let productPrice = order.orderedItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const subtotal = productPrice;

  const formatDate = (date) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const d = new Date(date);
    const formatedDate = `${days[d.getDay()]} ${d.getDate()} ${
      months[d.getMonth()]
    } ${d.getFullYear()}`;

    return formatedDate;
  };
  const date = new Date(order.createdAt);
  return (
    <Fragment>
      <OrderStepper activeStep={3}/>
    <div className="confirmOrder" style={{ marginTop: "20px" }}>
      <Container maxWidth="sm">
        <Paper variant="outlined">
          <Container>
            <Box
              sx={{ width: { sm: "100px", xs: "80px" }, margin: "20px auto" }}
            >
              <img src={accept} alt="accept" style={{ maxWidth: "100%" }} />
            </Box>
          </Container>
          <Box>
            <Typography
              variant="h1"
              sx={{
                fontFamily: "'Poppins',sans-serif",
                fontWeight: "bold",
                fontSize: "3em",
                textAlign: "center",
              }}
            >
              Thank You For Your Order!{" "}
            </Typography>
          </Box>

          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Box sx={boxStyle}>
              <Typography variant="h2" sx={fontStyle}>
                Order Time.
              </Typography>
              <Typography variant="body1">
                {formatDate(order.createdAt)}
              </Typography>
            </Box>

            <Box sx={boxStyle}>
              <Typography variant="h2" sx={fontStyle}>
                Order Id
              </Typography>
              <Typography variant="body1">{order._id}</Typography>
            </Box>

            <Box sx={boxStyle}>
              <Typography variant="h2" sx={fontStyle}>
                Expected Delivery Time.
              </Typography>
              <Typography variant="body1">
                {formatDate(order.deliveryDate)}
              </Typography>
            </Box>
          </Container>
          <Divider />
          {order.orderedItems.map((item) => {
            return (
              <Container
                variant="outlined"
                key={item.id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "10px",
                  padding: { xs: "10px", lg: "25px" },
                }}
              >
                <Container>
                  <Avatar
                    alt={item.name}
                    src={item.img}
                    sx={{
                      width: { xs: 40, md: 56 },
                      height: { xs: 40, md: 56 },
                    }}
                  />
                </Container>
                <Container>
                  <Typography
                    variant="body1"
                    sx={{ textTransform: "capitalize" }}
                    onClick={() => navigator(`/productDetails/${item.id}`)}
                  >
                    {item.name}
                  </Typography>
                </Container>
                <Container>
                  <Typography variant="body1">
                    {item.quantity} X ₹{item.price} = ₹
                    {item.price * item.quantity}
                  </Typography>
                </Container>
              </Container>
            );
          })}

          <Divider />
          <div className="orderSummary">
            <Container
              sx={{
                padding: "10px 24px",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: { xs: "column-reverse", sm: "row" },
              }}
            >
              <Box sx={boxStyle}>
                <Typography variant="h2" sx={fontStyle}>
                  Delivery Address.
                </Typography>
                <Box>
                  <Typography variant="body1" sx={{ width: "300px" }}>
                    {order.shippingInfo.address}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{ textAlign: { xs: "left", sm: "right" }, margin: "10px" }}
              >
                <div>
                  <div>
                    <Typography variant="body1">
                      Subtotal :{" "}
                      <span style={{ textTransform: "capitalize" }}>
                        ₹{subtotal}
                      </span>
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="body1">
                      Shipping Chargers :{" "}
                      <span style={{ textTransform: "capitalize" }}>
                        ₹{order.shippingCharges}
                      </span>
                    </Typography>
                  </div>
                </div>

                <div className="orderSummaryTotal">
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="body1">₹{order.totalPrice}</Typography>
                </div>
              </Box>
            </Container>
          </div>
          <Button fullWidth size="large" onClick={() => navigator('/')}>GO Back To Home</Button>
        </Paper>
      </Container>
    </div>
    </Fragment>
  );
}

export default ConfirmOrder;
