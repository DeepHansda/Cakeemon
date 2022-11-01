import {
  ADD_TO_CART,
  ADD_TO_CART_FAILD,
  REMOVE_CART_ITEM,
  REMOVE_FROM_CART_FAILD,
  SAVE_SHIPPING_INFO,
  SAVE_SHIPPING_INFO_FAILD,
} from "../Common/Constants";

export const cartReducers = (
  state = {
    cartItems: [],
    shippingInfo: {},
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TO_CART:
      const item = payload;

      const isItemExist = state.cartItems.find((i) => i.id === item.id);

      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) => (i.id === item.id ? item : i)),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case ADD_TO_CART_FAILD:
      return {
        error: payload,
      };

    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.id !== payload),
      };

    case REMOVE_FROM_CART_FAILD:
      return {
        error: payload,
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: payload,
      };
    case SAVE_SHIPPING_INFO_FAILD:
      return { error: payload };
    default:
      return state;
  }
};
