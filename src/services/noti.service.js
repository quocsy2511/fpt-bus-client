import axiosInstance from "../helpers/axiosInstance"
import { serverEndpoint } from "../utilities/serverEndpoint"

export const handleNewNotiForUserFunction = async (values, selectedUser) => {
    try {
        const response = await axiosInstance.post(serverEndpoint + `api/v1/user/push-notification/${selectedUser.id}`, values)
        console.log('response in service : ', response)
        return response;
    } catch (error) {
        console.log('error in service : ', error)
        return error;
    }
}