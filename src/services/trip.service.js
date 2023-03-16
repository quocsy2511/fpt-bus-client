import axios from "axios";
import axiosInstance from "../helpers/axiosInstance";
import { serverEndpoint } from "../utilities/serverEndpoint";

export const getAllTripsFunction = async (date) => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': `application/json`
            }
        }
        const response = await axios.get(serverEndpoint + `api/v1/trip`, config)
        return response
    } catch (error) {
        console.log('error in get buses service: ', error);
        return error;
    }
}
export const handleNewTripFunction = async (values) => {
    console.log(values);
    try {
        const response = await axiosInstance.post(serverEndpoint + "api/v1/trip/create", values);
        return response
    } catch (error) {
        console.log('error in service : ', error)
        //API trả về một thông báo lỗi từ máy chủ
        if (error?.response?.data?.message) {
            throw new Error(error.response.data.message);
        } else {
            throw error;
        }
    }
}
export const handleUpdateTripFunction = async (values, selectedBus) => {
    try {
        const response = await axiosInstance.put(serverEndpoint + `api/v1/trip/update/${selectedBus.id}`, values);
        return response;
    } catch (error) {
        console.log("error in service : ", error);
        return error;
    }
}

export const updateTripStatusActiveFunction = async (id) => {
    try {
        const response = await axiosInstance.put(serverEndpoint + `api/v1/trip/change-status/${id}`, { "status": 1 })
        return response
    } catch (error) {
        console.log('error in update status buses service: ', error);
        return error;
    }
}
export const updateTripStatusDeActiveFunction = async (id, status) => {
    try {
        const response = await axiosInstance.put(serverEndpoint + `api/v1/trip/change-status/${id}`, { "status": 3 })
        return response
    } catch (error) {
        console.log('error in update status buses service: ', error);
        return error;
    }
}

export const getAllTripsByDateFunction = async (date) => {
    try {
        const response = await axiosInstance.get(serverEndpoint + `api/v1/trip?date=${date}`)
        return response
    } catch (error) {
        console.log('error in get buses service by date: ', error);
        if (error?.response?.data?.message) {
            throw new Error(error.response.data.message);
        } else {
            throw error;
        }
    }
}
