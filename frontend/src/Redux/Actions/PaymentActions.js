import { API } from "../Common/API";
import {
  PAYMENT_FAIL,
  PAYMENT_REQUEST,
  PAYMENT_SUCCESS,
} from "../Common/Constants";

export const paymentProcess = (paymentData) => async (dispatch) => {
  try {
    const res = await API.post("/payment", paymentData);
    if (res.status === 200) {
      dispatch({
        type: PAYMENT_REQUEST,
        payload: res.data,
      });
    }
    return Promise.resolve(res);
  } catch (error) {
    dispatch({
      type: PAYMENT_FAIL,
      payload: error,
    });
    Promise.reject(error);
  }
};

export const paymentVerify = (paymentData) => async (dispatch) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      paymentData;
    const { data } = await API.post(
      "/paymentVerify",
      { razorpay_order_id, razorpay_payment_id },
      { headers: { "x-razorpay-signature": razorpay_signature } }
    );
    if (data.success === 1) {
      dispatch({
        type: PAYMENT_SUCCESS,
        payload: data,
      });

      return Promise.resolve(data);
    }
  } catch (error) {
    dispatch({
      type: PAYMENT_FAIL,
      payload: error,
    });

    return Promise.reject(error);
  }
};
