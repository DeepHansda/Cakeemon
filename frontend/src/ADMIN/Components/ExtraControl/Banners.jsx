import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormLabel,
  InputLabel,
  Paper,
  Typography,
} from "@mui/material";
import { ProjectContext } from "../../../App";
import {
  createBanners,
  deleteBanner,
  getBanners,
} from "../../../Redux/Actions/BannerActions";
import { useSelector } from "react-redux";
import { FiTrash2 } from "react-icons/fi";
import Toast from "../../../Components/Utils/Toast";
import Loading from "../../../Components/Utils/Loading";

function Banners() {
  const { dispatch, navigator, setOpenAlert } = useContext(ProjectContext);
  const { banners, loading } = useSelector((state) => state.banners);
  const { createLoading } = useSelector((state) => state.newBanners);
  const { deleteLoading } = useSelector((state) => state.deleteBanner);


  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    dispatch(getBanners());
  }, []);

  const imageHandler = (e) => {
    const inputImages = Array.from(e.target.files);
    

    inputImages.forEach((image) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState == 2) {
          setImages((old) => [...old, image]);
          setPreviewImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(image);
    });
  };

  const submitHandler = () => {
    const form = new FormData();
    images.forEach((image) => {
      form.append("img", image);
    });
    dispatch(createBanners(form))
      .then((res) => {
        if (res && res.success == 1) {
          setOpenAlert({ open: true, message: res.message, success: true });

          dispatch(getBanners());
        }
      })
      .catch((err) => {
        setOpenAlert({ open: true, message: err.message, success: false });
      });
  };

  const deleteHandler = (id) => {
    dispatch(deleteBanner(id))
      .then((res) => {
        if (res && res.success == 1) {
          setOpenAlert({ open: true, message: res.message, success: true });
          dispatch(getBanners());
        }
      })
      .catch((err) => {
        setOpenAlert({ open: true, message: err.message, success: false });
      });
  };
  return (
    <Box>
      <Toast />
      {createLoading || deleteLoading ? (<Loading/>):''}

      <Typography
        sx={{ fontFamily: "'Poppins',sans-serif", fontWeight: "bold" ,p:2}}
        variant="h5"
      >
        Add Banners
      </Typography>
      <Box sx={{ display: "flex",p:5 }}>
        <Paper variant="outlined" sx={{ p: 2, width: "fit-content" }}>
          <FormControl>
            <FormLabel>Select Images</FormLabel>
            <input
              type="file"
              accept="image/*"
              multiple="multiple"
              onChange={imageHandler}
            />
          </FormControl>

          <Box component="div" sx={{ mt: 2 }}>
            <Button variant="outlined" onClick={() => submitHandler()}>
              Submit
            </Button>
          </Box>
        </Paper>

        <Box sx={{ ml: 2 }}>
          <Typography variant="body1">Preview Images</Typography>
          {previewImages.length > 0 && (
            <Paper variant="outlined" sx={{ display: "flex", p: 1 }}>
              {previewImages.map((img) => {
                return (
                  <Container sx={{ width: "200px" }}>
                    <img src={img} alt="preview" style={{ maxWidth: "100%" }} />
                  </Container>
                );
              })}
            </Paper>
          )}
        </Box>
      </Box>

      {loading ? (
        <Container>
          <CircularProgress />
        </Container>
      ) : (
        <Box sx={{ display: "flex", mt: 2 }}>
          {banners.map((banner) => {
            return (
              <Container key={banner._id}>
                <Box>
                  <img
                    src={banner.img}
                    alt={banner.public_id}
                    style={{
                      maxWidth: "100%",
                      overflow: "hidden",
                      borderRadius: "10px",
                    }}
                  />
                  <Button
                    startIcon={<FiTrash2 />}
                    color="error"
                    onClick={() => deleteHandler(banner._id)}
                  >
                    Delete
                  </Button>
                </Box>
              </Container>
            );
          })}
        </Box>
      )}
    </Box>
  );
}

export default Banners;
