import {
  Box,
  Chip,
  Container,
  Divider,
  Input,
  Paper,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { ProjectContext } from "../../App";
import { addToCart, removeFromCart } from "../../Redux/Actions/CartActions";
import "./cart.css";
import img from "../../assets/p2.jpg";
import Toast from "../Utils/Toast";
import { FiTrash } from "react-icons/fi";
export default function CartCard({ item }) {
  const { setOpenAlert ,dispatch } = useContext(ProjectContext);

  console.log(item);
  // Increase quantity
  // const [quantity, setQuantity] = useState(1);
  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) return setOpenAlert({open:true,message:'stock is limited',success:false});
    dispatch(addToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) return;
    dispatch(addToCart(id, newQty));
  };
  return (
    <Paper variant="outlined" sx={{ marginTop: {xs:"15px",md:'0'},width:'auto' }}>
      <Toast/>
      <div className="cart-paper-container">
        <div className="cart-paper-desc">
          <div className="cart-paper-img">
            <img src={img} />
          </div>

          <div className="cart-paper-title">
            <Typography variant="h4">{item.name}</Typography>
            
          </div>
        </div>

        <Divider />
        <div className="cart-paper-numbers">
          <div className="cart-paper-quantity">
            <div className="cartInput">
              <Chip
                label="+"
                variant="outlined"
                onClick={() =>
                  increaseQuantity(item.id, item.quantity, item.stock)
                }
              />
              <Input type="number" readOnly value={item.quantity} />
              <Chip
                label="-"
                variant="outlined"
                onClick={() => decreaseQuantity(item.id, item.quantity)}
              />
            </div>
          </div>

          <div className="cart-paper-price" >
        <Typography variant="body1" sx={{display: 'flex',}}>₹{item.price * item.quantity}
        <Box sx={{margin:'0 10px',cursor: "pointer"}} onClick={()=>dispatch(removeFromCart(item.id))}>
          <FiTrash/>
        </Box >
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
