import {
  Box,
  Chip,
  Container,
  Divider,
  IconButton,
  Input,
  Paper,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { ProjectContext } from "../../App";
import "./cart.css";
import { FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Toast from "../../Components/Utils/Toast";
import { addToCart, removeFromCart } from "../../Redux/slices/cartSlice";
export default function CartCard({ item }) {
  const { setOpenAlert, dispatch } = useContext(ProjectContext);


  const navigate = useNavigate();
  const navigator = (id) => {
    navigate(`/productDetails/${id}`);
  };
  // Increase quantity
  // const [quantity, setQuantity] = useState(1);
  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity)
      return setOpenAlert({
        open: true,
        message: "stock is limited",
        success: false,
      });
    dispatch(addToCart({id, quantity:newQty}));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) return;
    dispatch(addToCart({id, quantity:newQty}));
  };

  const deleteFromCart =(id) =>{
    dispatch(removeFromCart({id}))
  }
  return (
    <Paper
      variant="outlined"
      sx={{ marginTop: { xs: "15px", md: "0" }, width: "auto" }}
    >
      <Toast />
      <div className="cart-paper-container">
        <div className="cart-paper-desc">
          <div className="cart-paper-img">
            <img src={item.img} onClick={() =>navigator(item.id)}/>
          </div>

          <div className="cart-paper-title">
            <Typography  sx={{fontSize:{sm:"1.2rem",md:"1.5rem"}}} onClick={() =>navigator(item.id)}>{item.name}</Typography>
          </div>
        </div>

        <Divider />
        <div className="cart-paper-numbers">
          <div className="cart-paper-quantity">
            <div className="cartInput">
              <IconButton
                variant="outlined"
                color="primary"
                onClick={() =>
                  increaseQuantity(item.id, item.quantity, item.stock)
                }
              >
                +
              </IconButton>
              <Input type="number" readOnly value={item.quantity} />
              <IconButton
                variant="outlined"
                color="primary"
                onClick={() => decreaseQuantity(item.id, item.quantity)}
              >-</IconButton>
            </div>
          </div>

          <div className="cart-paper-price">
            <Typography variant="body1" sx={{ display: "flex" }}>
              ₹{item.price * item.quantity}
              <Box
                sx={{ margin: "0 10px", cursor: "pointer" }}
                
              >
                <IconButton color="primary" onClick={()=>deleteFromCart(item.id)}>
                  <FiTrash />
                </IconButton>
              </Box>
            </Typography>
          </div>
        </div>
      </div>
    </Paper>
  );

  //   function ProductPrice(price, quantity) {
  //     return (

  //     );
  //   }
}
