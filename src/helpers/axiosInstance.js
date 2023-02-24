import axios from "axios";


export const axiosInstance = axios.create({
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': `application/json`
    }
})