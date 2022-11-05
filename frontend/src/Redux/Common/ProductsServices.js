import {API} from './API'
export const ProductsServices ={
    getProductsClient:(keyword , currentPage, category ,ratings )=>{
        return API.get(`/getProducts/?keyword=${keyword}&category=${category}&page=${currentPage}&ratings=${ratings}`)
    },

    createProduct:(data)=>{
        return API.post('/createProduct', data)
    },
    getAllProducts:()=>{
        return API.get('/getAllProducts')
    },

    getProductDetails:(id)=>{
        return API.get(`/getProduct/${id}`)
    },

    deleteProduct:(id)=>{
        return API.delete(`/deleteProduct/${id}`)
    },
    createReviews:(reviewData)=>{
        return API.post('/createReview',reviewData)
    }


}