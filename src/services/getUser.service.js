
import { serverEndpoint } from '../utilities/serverEndpoint'
import { axiosInstance } from "../helpers/axiosInstance"
import axios from 'axios';

const config = {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': `application/json`
    }

}
console.log("local", localStorage.getItem('access_token'));
export const getAllUsersFunction = async (userKey) => {
    try {
        const response = await axios.get(serverEndpoint + `api/v1/users/${userKey}`, config)
        // console.log(response);
        return response
    } catch (error) {
        console.log("error in service: ", error);
        return error;
    }
}
