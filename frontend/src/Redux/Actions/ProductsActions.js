import {
    ADMIN_PRODUCT_FAIL,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS
} from '../Common/Constants'
import {ProductsServices} from '../Common/ProductsServices'

export const getProductsClient = (keyword , currentPage, category ,ratings ,brand) => async (dispatch) => {
    try {
        dispatch({
            type: ALL_PRODUCT_REQUEST
        })

        const res = await ProductsServices.getProductsClient(keyword , currentPage, category ,ratings ,brand)

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: res.data
        })

        return Promise.resolve(res.data)
    } catch (err) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: err.response.data
        })
        return Promise.reject(err)
    }
}

export const getProductsAdmin = () => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_PRODUCT_REQUEST
        })

        const res = await ProductsServices.getAllProducts()
        console.log(res)
        dispatch({
            type: ADMIN_PRODUCT_SUCCESS,
            payload: res.data
        })
        // return Promise.resolve(res.data)
    } catch (err) {
        dispatch({
            type: ADMIN_PRODUCT_FAIL,
            payload: err.response.data
        })

        // return Promise.reject(err)
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_DETAILS_REQUEST
        })

        const res = await ProductsServices.getProductDetails(id)
        console.log(res)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: res.data.product
        })
        return Promise.resolve(res.data.product)
    } catch (err) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: err.response.data
        })

        return Promise.reject(err)
    }

}

export const addReview = (reviewData) =>async (dispatch) => {
    try{
        dispatch({
            type:NEW_REVIEW_REQUEST
        })

        const {data} = await ProductsServices.createReviews(reviewData)
        if(data.success===1){
            dispatch({
                type:NEW_REVIEW_SUCCESS,
                payload:data
            })

            return Promise.resolve(data)
        }

        
    }
    catch(err) {
        dispatch({
            type:NEW_REVIEW_FAIL,
            payload: err.response.data
        })

        return Promise.reject(err)
    }
}

export const newProduct = (productData) =>async (dispatch) => {
    try{
        dispatch({
            type:NEW_PRODUCT_REQUEST
        })

        const {data} = await ProductsServices.createProduct(productData)
        if(data.success===1){
            dispatch({
                type:NEW_PRODUCT_SUCCESS,
                payload:data
            })

            return Promise.resolve(data)
        }

        
    }
    catch(err) {
        dispatch({
            type:NEW_PRODUCT_FAIL,
            payload: err.response.data
        })

        return Promise.reject(err.response.data)
    }
}