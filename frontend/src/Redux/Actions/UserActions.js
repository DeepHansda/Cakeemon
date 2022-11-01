import { ALL_USERS_FAIL, ALL_USERS_REQUEST, ALL_USERS_SUCCESS, CLEAR_ERRORS, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_REQUEST, LOGOUT_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS } from "../Common/Constants"
import { UserServices } from "../Common/UserServices"

export const signin = (formData) => async (dispatch)=>{

    try{
        dispatch({
            type: LOGIN_REQUEST
        })
        const {data} = await UserServices.signIn(formData);
        if(data.success===1){
            dispatch({
                type: LOGIN_SUCCESS,
                payload:data.user
            })
        }

        return Promise.resolve(data)
    }
    catch(err){
        dispatch({
            type:LOGIN_FAIL,
            payload:err.response.data
        })

        return Promise.reject(err.response.data)
    }
}

export const signUp = (formData) => async (dispatch) => {
    try{
        dispatch({
            type:REGISTER_USER_REQUEST
        })

        const {data} = await UserServices.signUp(formData);
        if(data.success===1){
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload:data.user
            })
        }
    }
    catch(err){
        dispatch({
            type:REGISTER_USER_FAIL,
            payload:err.response.data

        })
    }
}

export const loadUser = () => async (dispatch)=>{
    try{
        dispatch({
            type:LOAD_USER_REQUEST
        })

        const {data} = await UserServices.userDetails()
        if(data.success===1){
            dispatch({
                type: LOAD_USER_SUCCESS,
                payload:data.user
            })
        }

    }
    catch(err){
 dispatch({
            type:LOAD_USER_FAIL,
            payload:err
        })
    }
}

export const logout = ( ) => async (dispatch) => {
    try{
        dispatch({
            type:LOGOUT_REQUEST
        })

        const {data} = await UserServices.logOut();
        if(data.success===1){
            dispatch({
                type: LOGOUT_SUCCESS,
                payload:data
            })
        }
    }
    catch(err){
        dispatch({
            type: LOGOUT_FAIL,
            payload:err.response.data
        })
    }
}

export const getUsers = () => async (dispatch) => {
    try{
        dispatch({
            type:ALL_USERS_REQUEST
        })

        const {data} = await UserServices.getUsers()
        if(data.success===1){
            dispatch({
                type:ALL_USERS_SUCCESS,
                payload:data.users
            })
        }
    }
    catch(err){
        dispatch({
            type:ALL_USERS_FAIL,
            payload:err.response.data
        })
    }
}

export const deleteUser = (id) => async (dispatch) => {
    try{
        dispatch({
            type:DELETE_USER_REQUEST
        })

        const {data} = await UserServices.deleteUser(id)
        if(data.success===1){
            dispatch({
                type: DELETE_USER_SUCCESS,
                payload:data
            })
        }

    }
    catch(err){
 dispatch({
            type:DELETE_USER_FAIL,
            payload:err.response.data
        })
    }
}
export const clearErrors= () => async (dispatch)=>{
    dispatch({
        type: CLEAR_ERRORS
    })
  }