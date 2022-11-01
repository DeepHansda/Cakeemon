import { CLEAR_ERRORS, CREATE_BANNER_FAIL, CREATE_BANNER_REQUEST, CREATE_BANNER_SUCCESS, DELETE_BANNER_FAIL, DELETE_BANNER_REQUEST, DELETE_BANNER_SUCCESS, GETALL_BANNERS_FAIL, GETALL_BANNERS_REQUEST, GETALL_BANNERS_SUCCESSS } from "../Common/Constants"

export const newBannerReducer = (state = {banners:{}}, action) => {
    const { type, payload } = action;
    switch (type) {
      case CREATE_BANNER_REQUEST:
        return {
          ...state,
          createLoading: true,
        };
      case CREATE_BANNER_SUCCESS:
        return {
            ...state,
          createLoading: false,
          banners: payload,
        };
      case CREATE_BANNER_FAIL:
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

  export const fetchBannersReducer = (state = {banners: []}, action) => {
    const { type, payload } = action;

    switch (type) {
        case GETALL_BANNERS_REQUEST:
          return {
            ...state,
            loading: true,
          };
        case GETALL_BANNERS_SUCCESSS:
          return {
            loading: false,
            banners: payload,
          };
        case GETALL_BANNERS_FAIL:
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


  export const deleteBannerReducer = (state = {result:{}}, action) => {
    const { type, payload } = action;
    switch (type) {
      case DELETE_BANNER_REQUEST:
        return {
          deleteLoading: true,
        };
      case DELETE_BANNER_SUCCESS:
        return {
          deleteLoading: false,
          result: payload,
        };
      case DELETE_BANNER_FAIL:
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