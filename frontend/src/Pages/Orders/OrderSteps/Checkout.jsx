import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { City, State } from "country-state-city";
import React, { Fragment, useContext, useState } from "react";
import { useSelector } from "react-redux";

import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { ProjectContext } from "../../../App";
import MetaData from "../../../Components/Utils/MetaData";
import OrderStepper from "../../../Components/Utils/OrderStepper";
import MainLayout from "../../../Layouts/MainLayout";
import { saveShippingInfo } from "../../../Redux/slices/cartSlice";

export default function Checkout() {
  const { dispatch, navigator } = useContext(ProjectContext);
  const { shippingInfo } = useSelector((state) => state.cart);
  console.log(shippingInfo);
  const [address, setAddress] = useState(shippingInfo.address);
  // eslint-disable-next-line
  const [state, setState] = useState(shippingInfo.state);
  const [city, setCity] = useState(shippingInfo.city);
  // eslint-disable-next-line
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const country = "IN";

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length !== 10) {
      alert("Phone Number should be 10 digits");
      return;
    }
    dispatch(
      saveShippingInfo({ address, state, country, city, pinCode, phoneNo })
    );
    navigator("/reviewOrder");
  };
  return (
    <MainLayout>
      <Fragment>
        <MetaData title="Checkout" />
        <OrderStepper activeStep={0} />
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <form encType="multipart/form-data" onSubmit={shippingSubmit}>
            <Paper
              variant="outlined"
              sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
            >
              <Typography component="h1" variant="h4" align="center">
                Checkout
              </Typography>

              <React.Fragment>
                <Typography variant="h6" gutterBottom>
                  Shipping address
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="address"
                      name="address"
                      label="Address line "
                      fullWidth
                      autoComplete="shipping address-line"
                      variant="standard"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="phoneNumber"
                      name="phoneNumber"
                      label="Phone Number"
                      fullWidth
                      max={10}
                      type="number"
                      variant="standard"
                      value={phoneNo}
                      onChange={(e) => setPhoneNo(e.target.value)}
                      size="10"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="country"
                      name="country"
                      label="Country"
                      fullWidth
                      autoComplete="shipping country"
                      variant="standard"
                      defaultValue={country}
                      disabled
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-controlled-open-select-label">
                        State/Province/Region
                      </InputLabel>
                      <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        value={state}
                        label="State/Province/Region"
                        variant="standard"
                        fullWidth
                        onChange={(e) => setState(e.target.value)}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {State &&
                          State.getStatesOfCountry(country).map((item) => (
                            <MenuItem key={item.isoCode} value={item.isoCode}>
                              {item.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-controlled-open-select-label">
                        City
                      </InputLabel>
                      <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        value={city}
                        label="City"
                        variant="standard"
                        fullWidth
                        onChange={(e) => setCity(e.target.value)}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {City &&
                          City.getCitiesOfState(country, state).map((item) => (
                            <MenuItem key={item.name} value={item.name}>
                              {item.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      id="pincode"
                      name="pinCode"
                      label="Pin Code/Postal Code"
                      fullWidth
                      autoComplete="pinCode"
                      variant="standard"
                      value={pinCode}
                      type="number"
                      onChange={(e) => setPinCode(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </React.Fragment>
              <Button variant="contained" type="submit" sx={{ mt: 3, ml: 1 }}>
                Next
              </Button>
            </Paper>
          </form>
        </Container>
      </Fragment>
    </MainLayout>
  );
}
