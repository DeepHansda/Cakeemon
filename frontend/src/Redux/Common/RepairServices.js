import {API} from "../Common/API"
export const RepairServices = {
    createRepair:(repairData)=>{
        return API.post('/createRepair',repairData)
    },
    readAllRepairs:()=>{
        return API.get('/getRepairs')
    },
    readRepair:(id)=>{
        return API.get(`/getRepair/${id}`)
    },
    deleteRepair:(id)=>{
        return API.get(`/deleteRapair/${id}`)
    }    
}