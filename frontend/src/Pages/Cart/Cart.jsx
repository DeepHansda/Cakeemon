import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import React, { Fragment, useContext } from "react";
import { useSelector } from "react-redux";
import { ProjectContext } from "../../App";
import MetaData from "../../Components/Utils/MetaData";
import "./cart.css";
import CartCard from "./CartCard";
import MainLayout from "../../Layouts/MainLayout";

function Cart() {
  const { cartItems } = useSelector((state) => state.cart);
  const { navigator } = useContext(ProjectContext);
  let TotalPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const checkOutHandler = () => {
    navigator("/checkout");
  };
  return (
    <MainLayout>
      <Fragment>
        <MetaData title="Cart" />

        <div className="cart">
          <Box sx={{ width: "100%" }}>
            <Container>
              <Typography variant="h2">Cart</Typography>
            </Container>

            <Paper
              variant="outlined"
              sx={{ padding: "10px", display: { lg: "flex" } }}
            >
              {cartItems && cartItems.length > 0 ? (
                <Container
                  sx={{
                    display: { md: "grid" },
                    gridTemplateColumns: "repeat(2,1fr)",
                    gridGap: "15px",
                  }}
                >
                  {cartItems.map((item) => {
                    return <CartCard item={item} key={item.id} />;
                  })}
                </Container>
              ) : (
                <Container>
                  <Typography variant="h6">Cart is Empty !</Typography>
                </Container>
              )}

              <Divider sx={{ margin: "10px 0" }} />
              <div className="cart-sub-total">
                <div className="sub-total">
                  <div className="cart-sub-total-title">
                    <Typography variant="h6">Sub-Total</Typography>
                    <Typography variant="subtitle1">
                      {cartItems.length} items
                    </Typography>
                  </div>

                  <div className="total">
                    <Typography variant="h3">₹{TotalPrice}</Typography>
                  </div>
                </div>
                {cartItems && cartItems.length > 0 && (
                  <div className="cart-checkout">
                    <Button
                      variant="outlined"
                      onClick={() => checkOutHandler()}
                    >
                      Check Out
                    </Button>
                  </div>
                )}
              </div>
            </Paper>
          </Box>
        </div>
      </Fragment>
    </MainLayout>
  );
}

export default Cart;
