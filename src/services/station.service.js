import { axiosInstance } from "../helpers/axiosInstance";
import { serverEndpoint } from '../utilities/serverEndpoint'

export const getAllStationsFunction = async () => {
    try {
        const response = await axiosInstance.get(serverEndpoint + "api/v1/station")
        // console.log('response in service station: ', response)
        return response;
    } catch (error) {
        console.log('error in service : ', error)
        return error
    }
}

export const handleNewStationFunction = async (values) => {
    console.log(values);
    try {
        const response = await axiosInstance.post(serverEndpoint + "api/v1/station/create", values);
        console.log('response in service : ', response);
        return response
    } catch (error) {
        console.log('error in service : ', error)
        return error
    }
}

export const handleUpdateStationFunction = async (values, selectedStation) => {
    try {
        const response = await axiosInstance.post(serverEndpoint + `api/v1/station/update/${selectedStation.id}`, values);
        console.log('response in service: ', response)
        return response;
    } catch (error) {
        console.log('error in service : ', error)
        return error
    }
}

export const updateStationStatusFunction = async (id) => {
    try {
        const response = await axiosInstance.post(serverEndpoint + `api/v1/station/change-status/${id}`)
        // console.log('response in service update status', response)
        return response;
    } catch (error) {
        console.log('error in service : ', error)
        return error
    }
}