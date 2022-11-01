import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { Fragment, useContext, useState } from "react";
import { ProjectContext } from "../../App";
import { createRepair } from "../../Redux/Actions/RepairActions";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

function BookRepair() {
  // const [first_name, setFirst_name] = useState("");
  // const [last_name, setLast_name] = useState("");
  // const [email, setEmail] = useState("");
  // const [mobile_number, setMobile_number] = useState("");
  // const [address, setAddress] = useState("");
  // const [device,setDevice] = useState("");
  // const [menufacturer,setMenufacturer] = useState("");
  // const [model,setModel] = useState("");
  // const [description,setDescription] = useState("");
  // const [repairType,setRepairType] = useState("");
  const { dispatch } = useContext(ProjectContext);
  const [repairImg, setRepairImg] = useState("");

  const [repair, setRepair] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    email: "",
    address: "",
    device: "",
    menufacturer: "",
    model: "",
    description: "",
    repair_type: "",
  });

  console.log(repair);
  const {
    first_name,
    last_name,
    mobile_number,
    email,
    address,
    device,
    menufacturer,
    model,
    description,
    repair_type,
  } = repair;

  const submitHandler = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.set("first_name", first_name);
    form.set("last_name", last_name);
    form.set("mobile_number", mobile_number);
    form.set("email", email);
    form.set("address", address);
    form.set("device", device);
    form.set("menufacturer", menufacturer);
    form.set("model", model);
    form.set("description", description);
    form.set("repair_type", repair_type);
    form.set("repairImg", repairImg);

    dispatch(createRepair(form));
  };

  const repairDataChange = (e) => {
    if (e.target.name == "repair_img") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState == 2) {
          setRepairImg(reader.result);
        }

        reader.readAsDataURL(e.target.files[0]);
      };
    } else {
      setRepair({ ...repair, [e.target.name]: e.target.value });
    }
  };
  return (
    <Fragment>
      <Navbar />
      <Container maxWidth="sm">
        <Typography component="h1" variant="h2">
          Home Service
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={submitHandler}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="first_name"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                size="medium"
                value={first_name}
                onChange={repairDataChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="last_name"
                autoComplete="family-name"
                size="medium"
                value={last_name}
                onChange={repairDataChange}
              />
            </Grid>
            <Grid item xs={12} sm={7}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                size="medium"
                value={email}
                onChange={repairDataChange}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <TextField
                required
                fullWidth
                id="mobile_number"
                label="Mobile Number"
                name="mobile_number"
                autoComplete="phone"
                type="number"
                size="medium"
                value={mobile_number}
                onChange={repairDataChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="address"
                label="Address"
                id="address"
                size="medium"
                value={address}
                onChange={repairDataChange}
              />
            </Grid>
            <Grid item sx={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Device
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={device}
                  name="device"
                  label="Select Device"
                  onChange={repairDataChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="menufacturer"
                label="Menufacturer Name"
                id="menufacturer"
                size="medium"
                value={menufacturer}
                onChange={repairDataChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="model"
                label="Model Name/Number"
                id="model"
                size="medium"
                value={model}
                onChange={repairDataChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={4}
                id="outlined-multiline-flexible"
                name="description"
                label="Description"
                value={description}
                onChange={repairDataChange}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl
                component="fieldset"
                name="repair_type"
                variant="standard"
                value={repair_type}
                onChange={repairDataChange}
              >
                <FormLabel component="legend">Repair Type</FormLabel>
                <RadioGroup row>
                  <FormControlLabel
                    value="repair"
                    control={<Radio size="small" />}
                    label="Repair"
                  />
                  <FormControlLabel
                    value="refurbished"
                    control={<Radio size="small" />}
                    label="Refurbished"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Upload Image
                </FormLabel>
                <Input type="file" name="repairImg" />
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item></Grid>
          </Grid>
        </Box>
      </Container>
      <Footer />
    </Fragment>
  );
}

export default BookRepair;
