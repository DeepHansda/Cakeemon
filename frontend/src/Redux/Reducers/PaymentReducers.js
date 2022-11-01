import { PAYMENT_FAIL, PAYMENT_REQUEST, PAYMENT_SUCCESS } from "../Common/Constants"

export const paymentReducers = (state={payment:{}},action) =>{
    const {type, payload} = action
    switch(type) {
        case PAYMENT_REQUEST:
            return{
                ...state,
                payment:payload
            }
        case PAYMENT_SUCCESS:
            return{
                ...state,
                payment:payload
            }
        case PAYMENT_FAIL:
            return{
                error:payload
            }
        default: return state
    }
}