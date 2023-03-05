
import { axiosInstance } from "../helpers/axiosInstance";
import { serverEndpoint } from '../utilities/serverEndpoint'

export const updateBusStatusFunction = async (id) => {
    try {
        const response = await axiosInstance.post(serverEndpoint + `api/v1/bus/change-status/${id}`)
        // console.log('response update status bus in service :', response)
        return response
    } catch (error) {
        console.log('error in update status buses service: ', error);
        return error;
    }
}