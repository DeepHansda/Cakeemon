import { BrandsServices } from "../Common/BrandsServices"
import { CREATE_BRAND_FAIL, CREATE_BRAND_REQUEST, CREATE_BRAND_SUCCESS, DELETE_BRAND_FAIL, DELETE_BRAND_REQUEST, DELETE_BRAND_SUCCESS, GETALL_BRANDS_FAIL, GETALL_BRANDS_REQUEST, GETALL_BRANDS_SUCCESSS } from "../Common/Constants"

export const createBrand = (brandData) => async (dispatch)=>{
    try{
        dispatch({
            type: CREATE_BRAND_REQUEST
        })

        const {data} = await BrandsServices.createBrand(brandData)

        console.log(data)

        if(data.success==1){
            dispatch({
                type: CREATE_BRAND_SUCCESS,
                payload:data
            })

            return Promise.resolve(data)
        }
    }
    catch(err){
        dispatch({
            type:CREATE_BRAND_FAIL,
            payload:err.response.data
        })

        return Promise.reject(err.response.data)
    }
}

export const getBrands = () => async (dispatch)=>{
    try{
        dispatch({
            type: GETALL_BRANDS_REQUEST
        })

        const {data} = await BrandsServices.readAllBrands()

        if(data.success==1){
            dispatch({
                type: GETALL_BRANDS_SUCCESSS ,
                payload:data.brands
            })

        }
    }
    catch(err){
        dispatch({
            type:GETALL_BRANDS_FAIL,
            payload:err.response.data
        })

    }
}

export const deleteBrand = (id) => async (dispatch)=>{
    try{
        dispatch({
            type: DELETE_BRAND_REQUEST
        })

        const {data} = await BrandsServices.deleteBrand(id)

        if(data.success==1){
            dispatch({
                type: DELETE_BRAND_SUCCESS,
                payload:data
            })

            return Promise.resolve(data)
        }
    }
    catch(err){
        dispatch({
            type:DELETE_BRAND_FAIL,
            payload:err.response.data
        })

        return Promise.reject(err.response.data)
    }
}