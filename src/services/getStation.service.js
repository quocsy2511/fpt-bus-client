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