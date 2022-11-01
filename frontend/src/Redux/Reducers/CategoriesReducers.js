import { CLEAR_ERRORS, CREATE_CATEGORY_FAIL, CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS, DELETE_CATEGORY_FAIL, DELETE_CATEGORY_REQUEST, DELETE_CATEGORY_SUCCESS, GETALL_CATEGORIES_FAIL, GETALL_CATEGORIES_REQUEST, GETALL_CATEGORIES_SUCCESSS } from "../Common/Constants"

export const newCategoryReducer = (state = {result:{}}, action) => {
    const { type, payload } = action;
    switch (type) {
      case CREATE_CATEGORY_REQUEST:
        return {
          ...state,
          createLoading: true,
        };
      case CREATE_CATEGORY_SUCCESS:
        return {
            ...state,
          createLoading: false,
          result: payload,
        };
      case CREATE_CATEGORY_FAIL:
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

  export const fetchCategoriesReducer = (state = {categories: []}, action) => {
    const { type, payload } = action;

    switch (type) {
        case GETALL_CATEGORIES_REQUEST:
          return {
            ...state,
            loading: true,
          };
        case GETALL_CATEGORIES_SUCCESSS:
          return {
            loading: false,
            categories: payload,
          };
        case GETALL_CATEGORIES_FAIL:
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


  export const deleteCategoryReducer = (state = {result:{}}, action) => {
    const { type, payload } = action;
    switch (type) {
      case DELETE_CATEGORY_REQUEST:
        return {
          deleteLoading: true,
        };
      case DELETE_CATEGORY_SUCCESS:
        return {
          deleteLoading: false,
          result: payload,
        };
      case DELETE_CATEGORY_FAIL:
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