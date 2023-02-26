import { axiosInstance } from "../helpers/axiosInstance";
import { serverEndpoint } from "../utilities/serverEndpoint";

export const handleUpdateBusFunction = async (values, selectedBus) => {
    console.log('values in service update', values)
    console.log('selectedBus in service update : ', selectedBus.id)


    try {
        const response = await axiosInstance.post(serverEndpoint + `api/v1/bus/update/${selectedBus.id}`, values);
    } catch (error) {
        console.log("error in service : ", error);
        return error;
    }
}