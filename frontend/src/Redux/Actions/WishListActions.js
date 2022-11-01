import {
  ADD_TO_WISHLIST,
  ADD_TO_WISHLIST_FAILD,
  REMOVE_FROM_WISHLIST,
  REMOVE_FROM_WISHLIST_FAILD,
} from "../Common/Constants";
import { ProductsServices } from "../Common/ProductsServices";

export const addToWishList = (id) => async (dispatch, getState) => {
  try {
    const { data } = await ProductsServices.getProductDetails(id);

    dispatch({
      type: ADD_TO_WISHLIST,
      payload: {
        product: data.product._id,
        img: data.product.images[0].img,
        name: data.product.name,
        price: data.product.price,
        stock: data.product.stock,
      },
    });
    localStorage.setItem(
      "wishItems",
      JSON.stringify(getState().wishList.wishItems)
    );

    return Promise.resolve(data);
  } catch (err) {
    console.log(err);
    dispatch({
      type: ADD_TO_WISHLIST_FAILD,
      payload: err,
    });
  }
};

export const removeFromWishList = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REMOVE_FROM_WISHLIST,
      payload: id,
    });

    localStorage.setItem(
      "wishItems",
      JSON.stringify(getState().wishList.wishItems)
    );
  } catch (err) {
    dispatch({
      type: REMOVE_FROM_WISHLIST_FAILD,
      payload: err,
    });
  }
};
