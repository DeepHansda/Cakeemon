import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Grid,
  Divider,
  Avatar,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getOrder } from "../../../Redux/Actions/OrderActions";
import OrderStepper from "../../../Components/Utils/OrderStepper";
import { ProjectContext } from "../../../App";
import { useContext } from "react";

function AdminOrderDetails() {
  const { id } = useParams();
  const { dispatch, navigator, setOpenAlert } = useContext(ProjectContext);

  const { loading, order } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    dispatch(getOrder(id));
  }, []);

  console.log(order.paymentInfo);

  // const {shippingInfo,orderedItems,user,totalPrice,shippingCharges} = order

  // const navigate = useNavigate();
  // let productPrice =order && order.orderedItems.reduce(
  //   (acc, item) => acc + item.quantity * item.price,
  //   0
  // );

  //   const subtotal = productPrice;
  // eslint-disable-next-line

  //   const totalPrice = subtotal + shippingCharges;

  //   const proceedToPayment = () => {
  //     const data = {
  //       shippingCharges,
  //       totalPrice,
  //     };

  //     sessionStorage.setItem("orderInfo", JSON.stringify(data));

  //     navigate("/payment");
  //   };
  return (
    <Fragment>
      {}
      {/* <OrderStepper activeStep={1}/>
  <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
    <Paper variant="outlined" sx={{ padding: "20px" }}>
      <Grid container spacing={5}>
        <Grid item md={8}>
          <div className="confirmshippingArea">
            <Typography component="h1" variant="h4">
              Shipping Info :
            </Typography>
            <Paper variant="outlined" sx={{ padding: "10px" }}>
              <div>
                <Typography variant="body1">Name: <span style={{textTransform: "capitalize"}}>{user.full_name}</span></Typography>
                
              </div>
              <div>
              <Typography variant="body1">Phone Number : <span style={{textTransform: "capitalize"}}>{shippingInfo.phoneNo}</span></Typography>
              </div>
              <Divider variant="fullWidth" sx={{margin:'10px 0'}}/>
              <div>
              <Typography variant="body1">Address Line : <span style={{textTransform: "capitalize"}}>{shippingInfo.address}</span></Typography>

              </div>

              <div>
              <Typography variant="body1">City : <span style={{textTransform: "capitalize"}}>{shippingInfo.city}</span></Typography>
              </div>

              <div>
              <Typography variant="body1">State : <span style={{textTransform: "capitalize"}}>{shippingInfo.state}</span></Typography>
              </div>
            </Paper>
          </div>
          <div className="confirmCartItems">
            <Typography component="h2" variant="h4">
              Your Cart Items:
            </Typography>

            <Paper variant="outlined" sx={{ padding: "10px" }}>
              {orderedItems.length === 0 ? (
                <div className="confirmCartItemsContainer">""</div>
              ) : (
                <div className="confirmCartItemsContainer">
                  {orderedItems.map((item) => (
                    <Paper
                      variant="outlined"
                      key={item.product}
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
                            onClick={() =>navigate(`/productDetails/${item.id}`)}
                          >
                            {item.name}
                          </Typography>
                        
                      </Container>
                      <Container>
                        <Typography variant="2">
                          {item.quantity} X ₹{item.price} ={" "}
                        </Typography>
                        <Typography variant="body1">
                          ₹{item.price * item.quantity}
                        </Typography>
                      </Container>
                    </Paper>
                  ))}
                </div>
              )}
            </Paper>
          </div>
        </Grid>

        
        <Grid item md={4}>
          <div className="orderSummary">
            <Typography variant="h4" component="h2">
              Order Summery :
            </Typography>
            <Paper variant="outlined" sx={{ padding: "10px" }}>
              <div>
                <div>
              <Typography variant="body1">Subtotal : <span style={{textTransform: "capitalize"}}>₹{}</span></Typography>
              </div>
              <div>
              <Typography variant="body1">Shipping Chargers : <span style={{textTransform: "capitalize"}}>₹{shippingCharges}</span></Typography>
              </div>
              </div>

              <div className="orderSummaryTotal">
               <Typography variant="h6">Total:</Typography>
                <Typography variant="body1">₹{totalPrice}</Typography>
              </div>

            </Paper>
              <Button variant="outlined" sx={{marginTop:'20px'}}>Pay ₹{totalPrice}</Button>
          </div>
        </Grid>
      </Grid>
    </Paper>
  </Container> */}
    </Fragment>
  );
}

export default AdminOrderDetails;
