
import { serverEndpoint } from '../utilities/serverEndpoint'
import { axiosInstance } from '../helpers/axiosInstance';
import axios from 'axios';

export const getAllUsersFunction = async () => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': `application/json`
            }
        
        }
        console.log(localStorage.getItem('access_token'));
        const response = await axios.get(serverEndpoint + `api/v1/users`,config)
        console.log(response);
        return response
    } catch (error) {
        console.log("error in service: ", error);
        return error;
    }
}
