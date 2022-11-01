import { CLEAR_ERRORS, CREATE_BRAND_FAIL, CREATE_BRAND_REQUEST, CREATE_BRAND_SUCCESS, DELETE_BRAND_FAIL, DELETE_BRAND_REQUEST, DELETE_BRAND_SUCCESS, GETALL_BRANDS_FAIL, GETALL_BRANDS_REQUEST, GETALL_BRANDS_SUCCESSS } from "../Common/Constants"

export const newBrandReducer = (state = {result:{}}, action) => {
    const { type, payload } = action;
    switch (type) {
      case CREATE_BRAND_REQUEST:
        return {
          ...state,
          createLoading: true,
        };
      case CREATE_BRAND_SUCCESS:
        return {
            ...state,
          createLoading: false,
          result: payload,
        };
      case CREATE_BRAND_FAIL:
        return {
          createLoading: false,
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

  export const fetchBrandsReducer = (state = {brands: []}, action) => {
    const { type, payload } = action;

    switch (type) {
        case GETALL_BRANDS_REQUEST:
          return {
            ...state,
            loading: true,
          };
        case GETALL_BRANDS_SUCCESSS:
          return {
            loading: false,
            brands: payload,
          };
        case GETALL_BRANDS_FAIL:
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
  }


  export const deleteBrandReducer = (state = {result:{}}, action) => {
    const { type, payload } = action;
    switch (type) {
      case DELETE_BRAND_REQUEST:
        return {
          deleteLoading: true,
        };
      case DELETE_BRAND_SUCCESS:
        return {
          deleteLoading: false,
          result: payload,
        };
      case DELETE_BRAND_FAIL:
        return {
          deleteLoading: false,
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