import axios from "axios";


export const axiosInstance = axios.create({
    headers: {
        // Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
    },
})