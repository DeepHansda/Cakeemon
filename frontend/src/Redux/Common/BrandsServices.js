import {API} from "./API"
export const BrandsServices = {
    createBrand:(brandData)=>{
        return API.post('/addBrand',brandData)
    },
    readAllBrands:()=>{
        return API.get('/getBrands')
    },
    deleteBrand:(id)=>{
        return API.post(`/deleteBrand/${id}`)
    }    
}