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
import { addToCart, removeFromCart } from "../../Redux/Actions/CartActions";
import "./cart.css";
import Toast from "../Utils/Toast";
import { FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
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
    dispatch(addToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) return;
    dispatch(addToCart(id, newQty));
  };
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
            <Typography variant="h4" onClick={() =>navigator(item.id)}>{item.name}</Typography>
          </div>
        </div>

        <Divider />
        <div className="cart-paper-numbers">
          <div className="cart-paper-quantity">
            <div className="cartInput">
              <Chip
                label="+"
                variant="outlined"
                color="primary"
                onClick={() =>
                  increaseQuantity(item.id, item.quantity, item.stock)
                }
              />
              <Input type="number" readOnly value={item.quantity} />
              <Chip
                label="-"
                variant="outlined"
                color="primary"
                onClick={() => decreaseQuantity(item.id, item.quantity)}
              />
            </div>
          </div>

          <div className="cart-paper-price">
            <Typography variant="body1" sx={{ display: "flex" }}>
              ₹{item.price * item.quantity}
              <Box
                sx={{ margin: "0 10px", cursor: "pointer" }}
                
              >
                <IconButton color="primary" onClick={() => dispatch(removeFromCart(item.id))}>
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
