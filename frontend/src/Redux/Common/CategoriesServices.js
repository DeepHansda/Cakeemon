import {API} from "./API"
export const CategoriesServices = {
    createCategory:(categoryData)=>{
        return API.post('/addCategory',categoryData)
    },
    readAllCategories:()=>{
        return API.get('/getCategories')
    },
    deleteCategory:(id)=>{
        return API.post(`/deleteCategory/${id}`)
    }    
}