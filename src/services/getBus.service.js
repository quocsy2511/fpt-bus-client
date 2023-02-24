import axios from "axios";
import { axiosInstance } from "../helpers/axiosInstance";
import { serverEndpoint } from '../utilities/serverEndpoint'

export const getAllBusesFunction = async () => {
    try {
        const response = await axiosInstance.get(serverEndpoint + "api/v1/bus")
        // console.log('response in getAllBusesFunction + ', response)
        return response
    } catch (error) {
        console.log('error in get buses service: ', error);
        return error;
    }
}

