import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  GETALL_ORDERS_FAIL,
  GETALL_ORDERS_REQUEST,
  GETALL_ORDERS_SUCCESSS,
  MYORDERS_FAIL,
  MYORDERS_REQUEST,
  MYORDERS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
} from "../Common/Constants";
import { OrderServices } from "../Common/OrderServices";



export const createOrders = (orderData) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_ORDER_REQUEST,
    });


    const { data } = await OrderServices.createOrder(orderData);
    if (data.success === 1) {
      dispatch({
        type: CREATE_ORDER_SUCCESS,
        payload: data.order,
      });

      return Promise.resolve(data)
    }
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error,
    });

    return Promise.reject(error)
  }
};

export const getMyOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: MYORDERS_REQUEST,
    });

    const { data } = await OrderServices.getMyOrders();
    if (data.success === 1) {
      dispatch({
        type: MYORDERS_SUCCESS,
        payload: data.order,
      });
    }
  } catch (error) {
    dispatch({
      type: MYORDERS_FAIL,
      payload: error,
    });
  }
};

export const getOrders = () => async (dispatch) => {
  try{
    dispatch({type:GETALL_ORDERS_REQUEST})

    const {data} = await OrderServices.getAllOrders();
    if(data.success === 1){
        dispatch({
          type:GETALL_ORDERS_SUCCESSS,
          payload: data.orders
        })
      }
  }
  catch(error) {
    dispatch({
      type:GETALL_ORDERS_FAIL,
      payload: error,
    })
  }
}

export const getOrder = (id) => async(dispatch) => {
  try{
    dispatch({
      type:ORDER_DETAILS_REQUEST
    })

    const {data} = await OrderServices.getOrder(id);
    if(data.success === 1){
      dispatch({
        type:ORDER_DETAILS_SUCCESS,
        payload:data.order
      })
    }
  }
  catch(error) {
    dispatch({
      type:ORDER_DETAILS_FAIL,
      payload: error,
    })
  }
}


export const updateOrder = (id,order) => async (dispatch)=>{
  try{
    dispatch({
      type:UPDATE_ORDER_REQUEST,
    })
  
    const {data} = await OrderServices.updateOrder(id, order)

    if(data.success===1){
      dispatch({
        type:UPDATE_ORDER_SUCCESS,
        payload: data
      })
    }
  }
  catch(error) {
    dispatch({
      type:UPDATE_ORDER_FAIL,
      payload: error,
    })
  }
}

export const deleteOrder = (id) => async (dispatch)=>{
  try{
    dispatch({
      type:DELETE_ORDER_REQUEST,
    })
  
    const {data} = await OrderServices.deleteOrder(id)

    if(data.success===1){
      dispatch({
        type:DELETE_ORDER_SUCCESS,
        payload: data
      })
    }
  }
  catch(error) {
    dispatch({
      type:DELETE_ORDER_FAIL,
      payload: error,
    })
  }
}
