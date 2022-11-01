import { CREATE_REPAIR_FAIL, CREATE_REPAIR_REQUEST, CREATE_REPAIR_SUCCESS } from "../Common/Constants";
import { RepairServices } from "../Common/RepairServices";

export const createRepair = (repairData) => async (dispatch)=>{

    try{
        dispatch({
            type: CREATE_REPAIR_REQUEST
        })
        const {data} = await RepairServices.createRepair(repairData);
        if(data.success===1){
            dispatch({
                type: CREATE_REPAIR_SUCCESS,
                payload:data.result
            })
        }

        return Promise.resolve(data)
    }
    catch(err){
        dispatch({
            type:CREATE_REPAIR_FAIL,
            payload:err.response.data
        })

        return Promise.reject(err.response.data)
    }
}