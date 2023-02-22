
import { serverEndpoint } from '../utilities/serverEndpoint'
import { axiosInstance } from "../helpers/axiosInstance"
// import { axiosConfig } from '../helpers/axiosConfig';

const USER_KEY = 'user';

export const getAllUsersFunction = async () => {
    try {
        const response = await axiosInstance.get(serverEndpoint + "api/v1/users/user", {})
        console.log(response);
        return response
    } catch (error) {
        console.log("error in service: ", error);
        return error;
    }
}
