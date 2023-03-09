import axios from "axios";
import axiosInstance from "../helpers/axiosInstance";
import { serverEndpoint } from '../utilities/serverEndpoint'

export const getAllBusesFunction = async () => {
    try {
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': `application/json`
            }
        }
        const response = await axios.get(serverEndpoint + `api/v1/bus`, config)
        // console.log('response in getAllBusesFunction + ', response)
        return response
    } catch (error) {
        console.log('error in get buses service: ', error);
        return error;
    }
}
export const handleNewBusFunction = async (values) => {
    console.log(values);
    try {
        const response = await axiosInstance.post(serverEndpoint + "api/v1/bus/create", values);
        // console.log('response in service : ', response);
        return response
    } catch (error) {
        console.log('error in service : ', error)
        return error;
    }
}
export const handleUpdateBusFunction = async (values, selectedBus) => {
    try {
        const response = await axiosInstance.put(serverEndpoint + `api/v1/bus/update/${selectedBus.id}`, values);
        // console.log('response in service: ', response)
        return response;
    } catch (error) {
        console.log("error in service : ", error);
        return error;
    }
}
export const updateBusStatusFunction = async (id) => {
    try {

        const response = await axiosInstance.put(serverEndpoint + `api/v1/bus/change-status/${id}`)
        // console.log('response update status bus in service :', response)
        return response
    } catch (error) {
        console.log('error in update status buses service: ', error);
        return error;
    }
}