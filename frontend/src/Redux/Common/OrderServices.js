import {
    API
} from './API'
export const OrderServices = {
    createOrder: (data) => {
        return API.post('/createOrder', data)
    },
    getMyOrders: () => {
        return API.get('/getOrders/me')
    },
    getAllOrders: () => {
        return API.get('/getOrders')
    },
    getOrder: (id) => {
        return API.get(`/getOrder/${id}`)
    },
    updateOrder: (id, order) => {
        return API.post(`/updateOrder/${id}`,order)
    },
    deleteOrder: (id) => {
        return API.post(`/deleteOrder/${id}`)
    }
}