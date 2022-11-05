import { Button, Divider } from "@mui/material";
import React, { Fragment, useContext, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ProjectContext } from "../../App";
import { addToCart } from "../../Redux/Actions/CartActions";
import { addToWishList } from "../../Redux/Actions/WishListActions";
import Star from "../Utils/Star";
import Toast from "../Utils/Toast";
import "./Products.css";

function TopProduct({ product }) {
  const { setOpenAlert, dispatch } = useContext(ProjectContext);
  const [quantity, setQuantity] = useState(1);
  const { wishItems } = useSelector((state) => state.wishList);
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const navigator = (id) => {
    navigate(`/productDetails/${id}`);
  };

  const increaseQuantity = (stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity)
      return setOpenAlert({
        open: true,
        message: "stock is limited",
        success: false,
      });

    setQuantity(newQty);
  };

  const decreaseQuantity = () => {
    const newQty = quantity - 1;
    if (1 >= quantity) return;
    setQuantity(newQty);
  };


  const addToCartHandler = (id) => {
    if (product.stock > 0) {
      dispatch(addToCart(id, quantity))
        .then((res) => {
          const exist = cartItems.find((item) => item.id == id);
          if (exist) {
            setOpenAlert({
              open: true,
              message: "Item Already in Cart",
              success: false,
            });
          } else if (res.success === 1) {
            setOpenAlert({
              open: true,
              message: "Added to Cart",
              success: true,
            });
          }
        })
        .catch((err) => {
          setOpenAlert({
            open: true,
            message: err.message,
            success: false,
          });
        });
    } else {
      setOpenAlert({
        open: true,
        message: "out of stock",
        success: false,
      });
    }
  };


  const addToWishHandler = (id) => {
    dispatch(addToWishList(id))
      .then((res) => {
        const exist = wishItems.find((item) => item.product == id);
        if (exist) {
          setOpenAlert({
            open: true,
            message: "Item Already in Wishlist",
            success: false,
          });
        } else if (res.success === 1) {
          setOpenAlert({
            open: true,
            message: "Added to Wishlist",
            success: true,
          });
        }
      })
      .catch((err) => {
        setOpenAlert({
          open: true,
          message: err.message,
          success: false,
        });
      });
  };


  return (
    <Fragment>
      <Toast />
      <div className="top-product">
        <div className="top-product-img">
          <img src={product.images[0].img} alt={product.name} 
          onClick={() =>navigator(product._id)}
          />
        </div>

        <div className="top-product-details">
          <div className="top-product-title" onClick={() =>navigator(product._id)}>
            <h3>{product.name}</h3>
          </div>
          <div className="top-product-price">
            <p>${product.price}</p>
          </div>

          <Star ratings={product.ratings} />

          <Divider />

          <div className="top-product-increase">
            <div className="top-product-inc-dec-buttons">
              <div className="increase-btn btn-cont">
                <button onClick={() => increaseQuantity(product.stock)}>
                  +
                </button>
              </div>
              <div className="display">
                <p>{quantity}</p>
              </div>

              <div className="decrease-btn btn-cont">
                <button onClick={() => decreaseQuantity()}>-</button>
              </div>
            </div>
          </div>

          <Divider />
          <div className="top-product-addCart">
            <div className="cart-button">
              <Button variant="outlined" size="small" fullWidth onClick={() => addToCartHandler(product._id)}>
                Add To Cart
              </Button>
            </div>
            <div className="wishlist-button">
              <Button variant="outlined" size="small" fullWidth onClick={() => addToWishHandler(product._id)}>
                Add To Wishlist
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default TopProduct;
