import { axiosInstance } from "../helpers/axiosInstance";
import { serverEndpoint } from '../utilities/serverEndpoint'

export const handleNewBusFunction = async (values) => {
    console.log(values);
    try {
        const response = await axiosInstance.post(serverEndpoint + "api/v1/bus/create", values);
        console.log('response in service : ', response);
        return response
    } catch (error) {
        console.log('error in service : ', error)
        return error;
    }
}