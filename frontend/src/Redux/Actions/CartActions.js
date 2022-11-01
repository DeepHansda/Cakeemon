import {
  ADD_TO_CART,
  ADD_TO_WISHLIST_FAILD,
  REMOVE_CART_ITEM,
  REMOVE_FROM_CART_FAILD,
  SAVE_SHIPPING_INFO,
  SAVE_SHIPPING_INFO_FAILD,
} from "../Common/Constants";
import { ProductsServices } from "../Common/ProductsServices";

export const addToCart = (id, quantity) => async (dispatch, getState) => {
  try {
    const { data } = await ProductsServices.getProductDetails(id);

    dispatch({
      type: ADD_TO_CART,
      payload: {
        id: data.product._id,
        img: data.product.images[0].img,
        name: data.product.name,
        price: data.product.price,
        stock: data.product.stock,
        quantity: quantity,
      },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );

    return Promise.resolve(data);
  } catch (err) {
    dispatch({
      type: ADD_TO_WISHLIST_FAILD,
      payload: err.message,
    });
    return Promise.reject(err);
  }
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: id,
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (err) {
    dispatch({
      type: REMOVE_FROM_CART_FAILD,
      payload: err.message,
    });
  }
};

export const saveShippingInfo = (data) => async (dispatch) => {
  try {
    dispatch({
      type: SAVE_SHIPPING_INFO,
      payload: data,
    });

    localStorage.setItem("shippingInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: SAVE_SHIPPING_INFO_FAILD,
      payload: err.message,
    });
  }
};
