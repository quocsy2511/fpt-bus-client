import { axiosInstance } from "../helpers/axiosInstance";
import { serverEndpoint } from "../utilities/serverEndpoint";

export const handleUpdateBusFunction = async (values, selectedBus) => {
    try {
        const response = await axiosInstance.post(serverEndpoint + `api/v1/bus/update/${selectedBus.id}`, values);
        // console.log('response in service: ', response)
        return response;
    } catch (error) {
        console.log("error in service : ", error);
        return error;
    }
}