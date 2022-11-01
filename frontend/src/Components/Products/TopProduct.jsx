import { Button, Divider } from "@mui/material";
import React from "react";
import img from "../../assets/img/FRu3TDxmd2tS6A23f216.jpg";
import Star from "../Utils/Star";
import "./Products.css";

function TopProduct() {
  return (
    <div className="top-product">
      <div className="top-product-img">
        <img src={img} alt="" />
      </div>

      <div className="top-product-details">
        <div className="top-product-title">
          <h3>Web Development Cake</h3>
        </div>
        <div className="top-product-price">
          <p>$300</p>
        </div>

        <Star />
        <Divider />

        <div className="top-product-increase">
          <div className="top-product-inc-dec-buttons">
            <div className="increase-btn btn-cont">
              <button>+</button>
            </div>
            <div className="display">
              <p>4</p>
            </div>

            <div className="decrease-btn btn-cont">
              <button>-</button>
            </div>
          </div>
        </div>

        <Divider />
        <div className="top-product-addCart">
          <div className="cart-button">
            <Button variant="outlined" size="small" fullWidth>
              Add To Cart
            </Button>
          </div>
          <div className="wishlist-button">
            <Button variant="outlined" size="small" fullWidth>
              Add To Wishlist
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopProduct;
