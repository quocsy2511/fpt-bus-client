
import { serverEndpoint } from '../utilities/serverEndpoint'
import axios from 'axios';
import { axiosInstance } from '../helpers/axiosInstance';


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
export const handleNewUserFunction = async (values) => {
    console.log(values);
    try {
        const response = await axiosInstance.post(serverEndpoint + "api/v1/users/create", values);
        console.log('response in service : ', response);
        return response
    } catch (error) {
        console.log('error in service : ', error)
        return error;
    }
}
export const handleUpdateUserFunction = async (values, selectedUser) => {
    try {
        const response = await axiosInstance.put(serverEndpoint + `api/v1/users/update/${selectedUser.id}`, values);
        console.log('response in service: ', response)
        return response;
    } catch (error) {
        console.log("error in service : ", error);
        return error;
    }
}
export const updateUserStatusFunction = async (id) => {
    try {
        const response = await axiosInstance.put(serverEndpoint + `api/v1/users/change-status/${id}`)
        console.log('response update status bus in service :', response)
        return response
    } catch (error) {
        console.log('error in update status buses service: ', error);
        return error;
    }
}