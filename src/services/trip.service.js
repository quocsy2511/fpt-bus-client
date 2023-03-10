import axios from "axios";
import axiosInstance from "../helpers/axiosInstance";
import { serverEndpoint } from "../utilities/serverEndpoint";

export const getAllTripsFunction = async () => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': `application/json`
            }
        }
        const response = await axios.get(serverEndpoint + `api/v1/trip`, config)
        console.log('response in service:  ', response)
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
        console.log('response in service : ', response);
        return response
    } catch (error) {
        console.log('error in service : ', error)
        return error;
    }
}
export const handleUpdateTripFunction = async (values, selectedBus) => {
    try {
        const response = await axiosInstance.put(serverEndpoint + `api/v1/trip/update/${selectedBus.id}`, values);
        console.log('response in service: ', response)
        return response;
    } catch (error) {
        console.log("error in service : ", error);
        return error;
    }
}
export const updateTripStatusFunction = async (id, values) => {
    try {
        const response = await axiosInstance.put(serverEndpoint + `api/v1/trip/change-status/${id}`, { status: values })
        console.log('response update status bus in service :', response)
        return response
    } catch (error) {
        console.log('error in update status buses service: ', error);
        return error;
    }
}