import { BannerServices } from "../Common/BannerServices"
import { CategoriesServices } from "../Common/CategoriesServices"
import { CREATE_CATEGORY_FAIL, CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS, DELETE_CATEGORY_FAIL, DELETE_CATEGORY_REQUEST, DELETE_CATEGORY_SUCCESS,  GETALL_CATEGORIES_FAIL, GETALL_CATEGORIES_REQUEST, GETALL_CATEGORIES_SUCCESSS } from "../Common/Constants"

export const createCategory = (categoryData) => async (dispatch)=>{
    try{
        dispatch({
            type: CREATE_CATEGORY_REQUEST
        })

        const {data} = await CategoriesServices.createCategory(categoryData)

        console.log(data)

        if(data.success==1){
            dispatch({
                type: CREATE_CATEGORY_SUCCESS,
                payload:data
            })

            return Promise.resolve(data)
        }
    }
    catch(err){
        dispatch({
            type:CREATE_CATEGORY_FAIL,
            payload:err.response.data
        })

        return Promise.reject(err.response.data)
    }
}

export const getCategories = () => async (dispatch)=>{
    try{
        dispatch({
            type: GETALL_CATEGORIES_REQUEST
        })

        const {data} = await CategoriesServices.readAllCategories()

        if(data.success==1){
            dispatch({
                type: GETALL_CATEGORIES_SUCCESSS ,
                payload:data.categories
            })

        }
    }
    catch(err){
        dispatch({
            type:GETALL_CATEGORIES_FAIL,
            payload:err.response.data
        })

    }
}

export const deleteCategory = (id) => async (dispatch)=>{
    try{
        dispatch({
            type: DELETE_CATEGORY_REQUEST
        })

        const {data} = await CategoriesServices.deleteCategory(id)

        if(data.success==1){
            dispatch({
                type: DELETE_CATEGORY_SUCCESS,
                payload:data
            })

            return Promise.resolve(data)
        }
    }
    catch(err){
        dispatch({
            type:DELETE_CATEGORY_FAIL,
            payload:err.response.data
        })

        return Promise.reject(err.response.data)
    }
}