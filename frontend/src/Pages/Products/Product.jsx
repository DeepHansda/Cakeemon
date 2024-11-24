import React, { Fragment, useContext } from "react";
import "./products.style.css";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { ProjectContext } from "../../App";
import { useSelector } from "react-redux";
import { Button, Divider, Typography } from "@mui/material";
import Toast from "../../Components/Utils/Toast";
import Star from "../../Components/Utils/Star";
import { addToCart } from "../../Redux/slices/cartSlice";
import { addToWishList } from "../../Redux/slices/wishListSlice";

export default function Product({ product }) {
  const navigate = useNavigate();
  const { dispatch, setOpenAlert } = useContext(ProjectContext);

  const navigator = (id) => {
    navigate(`/productDetails/${id}`);
  };

  const { wishItems } = useSelector((state) => state.wishList);
  const { cartItems } = useSelector((state) => state.cart);

  const addToCartHandler = (id) => {
    dispatch(addToCart({ id, quantity: 1 }))
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
  };

  const addToWishHandler = (id) => {
    dispatch(addToWishList({ id }))
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
      <div className="product">
        <div className="product-container">
          <div className="product-img-container">
            <div className="product-img" onClick={() => navigator(product._id)}>
              <img src={product.images[0].img} alt={product.name} />
            </div>

            <div className="product-details">
              <div
                className="product-details-title"
                onClick={() => navigator(product._id)}
              >
                <h3>{product.name}</h3>
              </div>

              <div className="product-details-price">
                <Typography variant="body1">₹{product.price}</Typography>
              </div>

              <div className="product-details-ratings">
                <Star ratings={product.ratings} />
              </div>

              <Divider />
              <div className="product-actions">
                <div className="product-actions-container">
                  <div
                    className="product-actions-wish-list"
                    onClick={() => addToWishHandler(product._id)}
                  >
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<FiHeart />}
                      fullWidth
                    >
                      {" "}
                      Add To Wishlist
                    </Button>
                  </div>

                  <div
                    className="product-actions-cart"
                    onClick={() => addToCartHandler(product._id)}
                  >
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<FiShoppingCart />}
                      fullWidth
                    >
                      {" "}
                      Add To Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
