import { axiosInstance } from "../helpers/axiosInstance";
import { serverEndpoint } from "../utilities/serverEndpoint";

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