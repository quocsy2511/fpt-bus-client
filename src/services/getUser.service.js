
import { serverEndpoint } from '../utilities/serverEndpoint'
import { axiosInstance } from "../helpers/axiosInstance"
import axios from 'axios';
// import { axiosConfig } from '../helpers/axiosConfig';

// axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
// axios.defaults.headers.common['Content-Type'] = `application/json`;

const config = {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': `application/json`
    }
}
export const getAllUsersFunction = async (userKey) => {
    try {
        const response = await axios.get(serverEndpoint + `api/v1/users/${userKey}`, config)
        console.log(response);
        return response
    } catch (error) {
        console.log("error in service: ", error);
        return error;
    }
}
