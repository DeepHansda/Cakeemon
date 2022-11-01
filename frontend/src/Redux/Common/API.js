import axios from "axios";

axios.defaults.withCredentials=true
// https://tapajyoti-ecommerce-backend.vercel.app
// http://localhost:3400/api
export const API = axios.create({
  baseURL: "http://localhost:3400/api",
  headers: {
    "Content-Type": "application/json",
    'Access-Control-Allow-Headers' : 'Origin X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept Accept-Encoding',
    },
});
