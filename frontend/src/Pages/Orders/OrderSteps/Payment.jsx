import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  List,
  ListItemButton,
  ListItemIcon,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import card from "../../../assets/icons/card-return-icon.svg";
import Upi from "../../../assets/icons/upi-icon.svg";
import wallet from "../../../assets/icons/wallet-money-icon.svg";
import bank from "../../../assets/icons/wallet-to-bank-icon.svg";

import { ProjectContext } from "../../../App";

import Loading from "../../../Components/Utils/Loading";
import MetaData from "../../../Components/Utils/MetaData";
import OrderStepper from "../../../Components/Utils/OrderStepper";
import Toast from "../../../Components/Utils/Toast";
import { createOrder } from "../../../Redux/slices/ordersSlice";
import {
  paymentProcess,
  paymentVerify,
} from "../../../Redux/slices/paymentSlice";
import MainLayout from "../../../Layouts/MainLayout";

const methods = [
  { name: "UPI", type: "upi", logo: Upi },
  { name: "Wallets", type: "wallets", logo: wallet },
  { name: "Cards", type: "cards", logo: card },
  { name: "Net Bankings", type: "netBankings", logo: bank },
];

function Payment() {
  const paymentPrices = JSON.parse(sessionStorage.getItem("orderInfo"));
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const { user } = useSelector((state) => state.user);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  const { payment, error } = useSelector((state) => state.payment);

  const { order, loading } = useSelector((state) => state.orders);

  const { dispatch, navigator, setOpenAlert } = useContext(ProjectContext);

  useEffect(() => {
    if (error) {
      setOpenAlert({
        open: true,
        message: "Check Your Network Connection",
        success: false,
      });
      // location.reload()
    }
  }, [error]);

  const formatDate = () => {
    const result = new Date(Date.now());
    result.setDate(result.getDate() + 7);
    return result;
  };

  // 3rd this function will be called from pay() function , this function will handle payment verification and after payment varified ,the order will be placed.
  const placeOrder = (paymentInfo) => {
    dispatch(paymentVerify(paymentInfo))
      .then(({ payload }) => {
        setOpenAlert({ open: true, message: payload.message, success: true });

        const orderData = {
          shippingInfo,
          orderedItems: cartItems,
          createdBy: user._id,
          paymentInfo: {
            receipt: payload.razorpay_order_id,
            payment_id: payload.razorpay_payment_id,
            status: "Paid",
            paidAt: Date.now(),
          },
          shippingCharges: paymentPrices.shippingCharges,
          totalPrice: paymentPrices.totalPrice,
          deliveryDate: formatDate(),
        };

        dispatch(createOrder(orderData))
          .then(({ payload }) => {
            if (payload.success == 1) {
              setOpenAlert({
                open: true,
                message: "order placed",
                success: true,
              });
              sessionStorage.setItem("order", JSON.stringify(payload.order));
              navigator("/confirmOrder");
            }
          })
          .catch((err) => {
            setOpenAlert({ open: true, message: err.message, success: false });
          });
      })
      .catch((error) => {
        console.log(error);
        setOpenAlert({ open: true, message: error.message, success: false });
      });
  };

  // 2nd this function will be called from handleOrder() function , this function will handle payment process
  const pay = (banks) => {
    var options = {
      key: process.env.REACT_APP_KEY_ID,
      amount: paymentPrices.totalPrice * 1000,
      currency: "INR",
      name: "Dummy Academy",
      description: "Pay & Checkout this Course, Upgrade your DSA Skill",
      image: "",
      order_id: payment.id,
      handler: function (response) {
        if (response.razorpay_signature) {
          placeOrder(response);
        }
        // alert("This step of Payment Succeeded");
      },
      prefill: {
        //Here we are prefilling random contact
        contact: user.phoneNo,
        //name and email id, so while checkout
        name: user.full_name,
        email: user.email,
      },
      config: {
        display: {
          blocks: {
            banks: banks,
          },
          sequence: ["block.banks"],
          preferences: {
            show_default_blocks: false,
          },
        },
      },

      theme: {
        color: "#2300a3",
      },
    };

    const rzp = new window.Razorpay(options);
    if (!rzp) {
      setOpenAlert({
        open: true,
        message: "Razorpay SDK failed to load Check Your Network Connection.",
        success: false,
      });
    }
    rzp.on("payment.failed", function (response) {
      alert("This step of Payment Failed");
    });
    rzp.open();
  };

  // 1st this function will be called, it will handle payment method
  const handleOrder = () => {
    dispatch(paymentProcess({ amount: paymentPrices.totalPrice }));
    if (payment.amount !== 0) {
      switch (paymentMethod) {
        case "upi":
          const upiBanks = {
            name: "Pay via UPI",
            instruments: [
              {
                method: "upi",
              },
            ],
          };
          return pay(upiBanks);

        case "wallets":
          const walletsBanks = {
            name: "Pay via Wallet",
            instruments: [
              {
                method: "wallet",
              },
            ],
          };
          return pay(walletsBanks);

        case "cards":
          const cardsBanks = {
            name: "Pay via Cards",
            instruments: [
              {
                method: "card",
              },
            ],
          };
          return pay(cardsBanks);

        case "netBankings":
          const netBanks = {
            name: "Pay via Net Banking",
            instruments: [
              {
                method: "netbanking",
              },
            ],
          };
          return pay(netBanks);

        default:
          return setOpenAlert({
            open: true,
            message: "please select a payment option.",
            success: false,
          });
      }
    }
  };

  return (
    <MainLayout>
      <Fragment>
        <MetaData title="Payment Details" />

        <Toast />
        {loading && <Loading />}
        <OrderStepper activeStep={2} />
        <Container maxWidth="md" sx={{my:4}}>
          <Paper variant="outlined" square>
            <Container sx={{ margin: "10px" }}>
              <Typography
                variant="h4"
                component="h1"
                sx={{ fontFamily: "'Poppins',Roboto" }}
              >
                Payment Options
              </Typography>
            </Container>
          </Paper>
          <Paper variant="outlined" sx={{ padding: "20px", marginTop: "10px" }}>
            <FormControl fullWidth>
              <RadioGroup
                defaultValue="female"
                name="radio-payment-group"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <List>
                  {methods.map((method) => {
                    return (
                      <ListItemButton>
                        <ListItemIcon>
                          <img
                            src={method.logo}
                            alt="icon"
                            style={{ width: "30px" }}
                          />
                        </ListItemIcon>

                        <FormControlLabel
                          value={method.type}
                          control={<Radio size="small" color="success" />}
                          label={method.name}
                        />
                      </ListItemButton>
                    );
                  })}
                </List>
              </RadioGroup>
            </FormControl>
            <Button
              variant="contained"
              color="success"
              onClick={() => handleOrder()}
            >
              Pay ₹{paymentPrices.totalPrice}
            </Button>
          </Paper>
        </Container>
      </Fragment>
    </MainLayout>
  );
}

export default Payment;
