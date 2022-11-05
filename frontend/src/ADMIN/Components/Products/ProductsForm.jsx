import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ProjectContext } from "../../../App";
import { newProduct } from "../../../Redux/Actions/ProductsActions";
import { useSelector } from "react-redux";
import Loading from "../../../Components/Utils/Loading";
import { getCategories } from "../../../Redux/Actions/CategoriesAction";

function ProductsForm() {
  const { dispatch, setOpenAlert } = useContext(ProjectContext);

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [occasion, setOccasion] = useState("");
  const [types, setTypes] = useState("");
  const [best, setBest] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);

  const { loading, product } = useSelector((state) => state.newProduct);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const { categories } = useSelector((state) => state.categories);

  const imagesHandling = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState == 2) {
          setPreviewImages((old) => [...old, reader.result]);
          setImages((old) => [...old, file]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.set("name", name);
    form.set("desc", desc);
    form.set("price", price);
    form.set("category", category);
    form.set("stock", stock);
    form.set("occasion", occasion);
    form.set('types',types)
    form.set("best", best);

    images.forEach((img) => {
      form.append("img", img);
    });

    dispatch(newProduct(form))
      .then((res) => {
        if (res && res.success == 1) {
          setOpenAlert({ open: true, message: res.message, success: true });
          window.location.reload()
        }
      })
      .catch((err) => {
        setOpenAlert({ open: true, message: err.message, success: false });
      });
  };

  return (
    <>
      {loading && <Loading />}
      <Box maxWidth="xs" sx={{ m: 1, p: 2, width: "300px" }}>
        <Typography
          variant="h5"
          sx={{ fontFamily: "'Poppins',sans-serif", fontWeight: "bold" }}
        >
          Add Product
        </Typography>
        <Box component="form" onSubmit={submitHandler}>
          <FormControl margin="normal">
            <FormLabel>Select Images</FormLabel>
            <input
              component="input"
              type="file"
              multiple="multiple"
              required="true"
              accept="image/*"
              onChange={imagesHandling}
            />
          </FormControl>
          <TextField
            fullWidth
            variant="filled"
            label="Product Name"
            name="product_name"
            size="small"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            variant="filled"
            label="Description"
            name="description"
            multiline
            rows={4}
            size="small"
            required
            margin="normal"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <TextField
            fullWidth
            variant="filled"
            name="price"
            label="Price"
            size="small"
            type="number"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <TextField
            fullWidth
            variant="filled"
            name="types"
            label="Types"
            size="small"
            required
            value={types}
            onChange={(e) => setTypes(e.target.value)}
          />

          <FormControl fullWidth required>
            <InputLabel id="demo-simple-select-label">
              Select Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="category"
              label="Category"
              variant="filled"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories &&
                categories.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.value}>
                      {item.name}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>

          <FormControl fullWidth required margin="normal">
            <InputLabel id="demo-simple-select-label">Best</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="best"
              label="Best"
              variant="filled"
              required
              value={best}
              onChange={(e) => setBest(e.target.value)}
            >
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            variant="filled"
            name="stock"
            label="Stock"
            size="small"
            required
            type="number"
            margin="normal"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />

          <TextField
            fullWidth
            variant="filled"
            label="Occasion"
            name="occasion"
            size="small"
            required
            margin="normal"
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
          />

          <Typography variant="h6">Selected Images</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {previewImages.map((image) => {
              return (
                <Box sx={{ width: "80px", m: 0.5 }}>
                  <img src={image} alt="preview" style={{ maxWidth: "100%" }} />
                </Box>
              );
            })}
          </Box>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default ProductsForm;
