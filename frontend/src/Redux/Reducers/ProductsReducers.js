import {
    ADMIN_PRODUCT_FAIL,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    CLEAR_ERRORS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_RESET,
    NEW_REVIEW_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
} from "../Common/Constants";

export const newProductReducer = (
    state = {
        product:{},
    },
    action
) => {
    const {type,payload} = action;

    switch (type) {
        case NEW_PRODUCT_REQUEST:
            return {
                loading: true,
                product:{}
            };
        case NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                product: payload,
            };
        case NEW_PRODUCT_FAIL:
            return {
                loading: false,
                error: payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};
export const productsReducer = (
    state = {
        products: [],
    },
    action
) => {
    const {type,payload} = action;
    switch (type) {
        case ALL_PRODUCT_REQUEST:
        case ADMIN_PRODUCT_REQUEST:
            return {
                loading: true,
                products: [],
            };
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                // data:payload
                products: payload.products,
                filteredProductsCount:payload.filteredProductsCount,
                productsCount: payload.productsCount,
                productPerPage:payload.productPerPage
                
            };
        case ADMIN_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: payload,
            };
        case ALL_PRODUCT_FAIL:
        case ADMIN_PRODUCT_FAIL:
            return {
                loading: false,
                error: payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const productReducer = (
    state = {
        product: [],
    },
    action
) => {
    const {type,payload} = action;

    switch (type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                product: [],
            };
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: payload,
            };
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const newReviewReducer = (state={},action)=>{
    const {type, payload}=action;
    switch (type) {
        case NEW_REVIEW_REQUEST:
          return {
            ...state,
            loading: true,
          };
        case NEW_REVIEW_SUCCESS:
          return {
            loading: false,
            review: payload,
            success: true,
          };
        case NEW_REVIEW_FAIL:
          return {
            ...state,
            loading: false,
            error: payload,
            success:false,
          };
        case NEW_REVIEW_RESET:
          return {
            ...state,
            success: false,
          };
        case CLEAR_ERRORS:
          return {
            ...state,
            error: null,
          };
        default:
          return state;
      }
}