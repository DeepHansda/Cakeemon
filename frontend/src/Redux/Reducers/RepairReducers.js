import { CREATE_REPAIR_FAIL, CREATE_REPAIR_REQUEST, CREATE_REPAIR_SUCCESS } from "../Common/Constants";


export const createReducer = (
  state = {
    repair: {},
  },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_REPAIR_REQUEST:
      return {
        loading: true,
      };
    case CREATE_REPAIR_SUCCESS:
      return {
        ...state,
        loading: false,
        repair: payload,
      };
    case CREATE_REPAIR_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
