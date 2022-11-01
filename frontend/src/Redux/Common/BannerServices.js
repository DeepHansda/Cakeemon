import {API} from "../Common/API"
export const BannerServices = {
    createBanner:(bannersData)=>{
        return API.post('/addBanners',bannersData)
    },
    readAllBanners:()=>{
        return API.get('/getBanners')
    },
    deleteBanner:(id)=>{
        return API.post(`/deleteBanner/${id}`)
    }    
}