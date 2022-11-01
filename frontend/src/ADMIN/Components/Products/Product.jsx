import React, { Fragment, useContext } from "react";
import "../../../Components/Products/Products.css";
import { useNavigate } from "react-router-dom";
import Star from "../../../Components/Utils/Star";
import { ProjectContext } from "../../../App";
import Toast from "../../../Components/Utils/Toast";

export default function Product({ product }) {
  const navigate = useNavigate();
  const { dispatch, setOpenAlert } = useContext(ProjectContext);

  const navigator = (id) => {
    navigate(`/productDetails/${id}`);
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
                <h4>₹{product.price}</h4>
              </div>

              <div className="product-details-ratings">
                <Star ratings={product.ratings} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
