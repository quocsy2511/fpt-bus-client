import axios from "axios"
import axiosInstance from "../helpers/axiosInstance"
import { serverEndpoint } from "../utilities/serverEndpoint"

export const getAllBusRoutesFunction = async () => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': `application/json`
            }
        }
        const response = await axios.get(serverEndpoint + "api/v1/route", config)
        return response
    } catch (error) {
        console.log("error in service: ", error);
        return error;
    }
}

export const updateBusRouteStatusFunction = async (id) => {
    try {
        const response = await axiosInstance.put(serverEndpoint + `api/v1/route/change-status/${id}`)
        console.log('response', response)
        return response;
    } catch (error) {
        console.log('error in update status buses service: ', error);
        return error;
    }
}
export const handleNewBusRouteFunction = async (values) => {
    try {
        const response = await axiosInstance.post(serverEndpoint + "api/v1/route/create", values)
        return response;
    } catch (error) {
        console.log('error in service : ', error)
        if (error?.response?.data?.message) {
            throw new Error(error.response.data.message);
        } else {
            throw error;
        }
    }
}
export const handleUpdateBusRouteFunction = async (data, selectedBusRoute) => {
    try {
        const response = await axiosInstance.put(serverEndpoint + `api/v1/route/update/${selectedBusRoute.id}`, data)
        console.log('response in service: ', response)
        return response;
    } catch (error) {
        console.log('error in service : ', error)
        return error
    }
}