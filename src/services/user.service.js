
import { serverEndpoint } from '../utilities/serverEndpoint'
import axios from 'axios';


export const getAllUsersFunction = async () => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': `application/json`
            }
        }
        const response = await axios.get(serverEndpoint + 'api/v1/users', config)
        // console.log(response);
        return response
    } catch (error) {
        console.log("error in service: ", error);
        return error;
    }
}

export const getAllStudentsFunction = async () => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': `application/json`
            }
        }
        const response = await axios.get(serverEndpoint + 'api/v1/users?role_name=Student', config)
        // console.log(response);
        return response
    } catch (error) {
        console.log("error in service: ", error);
        return error;
    }
}
export const getAllDriversFunction = async () => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': `application/json`
            }
        }
        const response = await axios.get(serverEndpoint + 'api/v1/users?role_name=Driver', config)
        // console.log(response);
        return response
    } catch (error) {
        console.log("error in service: ", error);
        return error;
    }
}