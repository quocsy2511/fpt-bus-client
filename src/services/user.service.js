
import { serverEndpoint } from '../utilities/serverEndpoint'
import axiosInstance from '../helpers/axiosInstance';
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
        const response = await axios.get(serverEndpoint + 'api/v1/users', config)
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
        if (error?.response?.data?.message) {
            throw new Error(error.response.data.message);
        } else {
            throw error;
        }
    }
}
export const updateUserStatusFunction = async (id) => {
    try {
        const response = await axiosInstance.put(serverEndpoint + `api/v1/users/change-status/${id}`)
        console.log('response update status bus in service :', response)
        return response
    } catch (error) {
        console.log('error in update status buses service: ', error);
        if (error?.response?.data?.message) {
            throw new Error(error.response.data.message);
        } else {
            throw error;
        }
    }
}

export const handleFileUploadFunction = async (base64) => {
    try {
        const response = await axiosInstance.post(serverEndpoint + "api/v1/upload-file", {
            type: "profile",
            imageBase64: `${base64}`,
            userId: ""
        })
        console.log('response upload in service : ', response)
        return response;
    } catch (error) {
        console.log('error in upload file service ', error)
        return error;
    }
}