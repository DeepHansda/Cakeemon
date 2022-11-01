import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    TextField,
    Typography,
  } from "@mui/material";
  import React, { useContext, useEffect, useState } from "react";
  import { FiTrash2 } from "react-icons/fi";
  import { useSelector } from "react-redux";
  import { ProjectContext } from "../../../App";
import Loading from "../../../Components/Utils/Loading";
import { createBrand, deleteBrand, getBrands } from "../../../Redux/Actions/BrandActions";
  
  
  function Brands() {
    const { dispatch, navigator, setOpenAlert } = useContext(ProjectContext);
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [name, setName] = useState("");
    const [value, setValue] = useState("");
    const { loading, brands } = useSelector((state) => state.brands);
    const { createLoading } = useSelector((state) => state.newBrand);
    const { deleteLoading } = useSelector((state) => state.deleteBrand);


    useEffect(() => {
      dispatch(getBrands());
    }, []);
  
    const imageHandler = (e) => {
      const inputImage = e.target.files[0];
  
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState == 2) {
          setImage(inputImage);
          setPreviewImage(reader.result);
        }
      };
      reader.readAsDataURL(inputImage);
    };
  
    const submitHandler = (e) => {
      e.preventDefault();
  
      const form = new FormData();
      form.set("name", name);
      form.set("value", value);
      form.set("img", image);
      dispatch(createBrand(form))
        .then((res) => {
          if (res && res.success == 1) {
            setOpenAlert({ open: true, message: res.message, success: true });
  
            dispatch(getBrands());
          }
        })
        .catch((err) => {
          setOpenAlert({ open: true, message: err.message, success: false });
        });
    };
  
    const deleteHandler = (id) => {
      dispatch(deleteBrand(id))
        .then((res) => {
          if (res && res.success == 1) {
            setOpenAlert({ open: true, message: res.message, success: true });
            dispatch(getBrands());
          }
        })
        .catch((err) => {
          setOpenAlert({ open: true, message: err.message, success: false });
        });
    };
    return (
      <Container>
      {createLoading || deleteLoading ? (<Loading/>):''}

        <Typography
          component="h2"
          variant="h5"
          sx={{ fontFamily: "'Poppins',sans-serif", fontWeight: "bold" }}
        >
          Brands
        </Typography>
        <Paper variant="outlined" sx={{ p: 2, width: "fit-content" }}>
          <Box component="form" onSubmit={submitHandler}>
            <FormControl>
              <FormLabel>Select Images</FormLabel>
              <input type="file" accept="image/*" onChange={imageHandler} />
            </FormControl>
  
            <TextField
              label="Title"
              name="name"
              variant="standard"
              value={name}
              onChange={(e) => setName(e.target.value)}
              size="small"
              margin="normal"
              fullWidth
            />
  
            <TextField
              label="Value"
              name="name"
              variant="standard"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              size="small"
              margin="normal"
              fullWidth
            />
  
            <Box component="div" sx={{ mt: 2 }}>
              <Button variant="outlined" type="submit">
                Submit
              </Button>
            </Box>
          </Box>
        </Paper>
  
        <Box sx={{ ml: 2 }}>
        {previewImage && (
          <>
            <Typography variant="body1">Preview Images</Typography>

            <Box sx={{ width: "150px" }}>
              <img
                src={previewImage}
                alt="preview"
                style={{ maxWidth: "100%" }}
              />
            </Box>
          </>
        )}
      </Box>
        <Paper variant="outlined" sx={{ mt:1}}>
          <List>
            {brands.map((brand) => {
              return (
                <ListItem>
                  <ListItemText primary={brand.name} />
                  <ListItemIcon>
                    <IconButton onClick={() => deleteHandler(brand._id)}>
                      <FiTrash2 />
                    </IconButton>
                  </ListItemIcon>
                </ListItem>
              );
            })}
          </List>
        </Paper >
      </Container>
    );
  }
  
  export default Brands;
  