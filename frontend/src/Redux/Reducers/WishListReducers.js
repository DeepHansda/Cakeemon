import {
  ADD_TO_WISHLIST,
  ADD_TO_WISHLIST_FAILD,
  REMOVE_FROM_WISHLIST,
  REMOVE_FROM_WISHLIST_FAILD,
} from "../Common/Constants";

export const wishListReducer = (state = { wishItems: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TO_WISHLIST:
      const item = payload;

      const isExists = state.wishItems.find((i) => i.product === item.product);

      if (isExists) {
        return {
          ...state,
          wishItems: state.wishItems.map((i) =>
            i.product === isExists.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          wishItems: [...state.wishItems, item],
        };
      }
    case ADD_TO_WISHLIST_FAILD:
      return { error: payload };
    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishItems: state.wishItems.filter((i) => i.product !== payload),
      };
    case REMOVE_FROM_WISHLIST_FAILD:
      return { error: payload,  };

    default:
      return state;
  }
};
