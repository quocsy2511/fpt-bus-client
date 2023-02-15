import axios from "axios";
import { serverEndpoint } from '../utilities/serverEndpoint'

export const onFinishFunction = async (values) => {

    try {
        const response = await axios.post(serverEndpoint + "/api/users/login", values);
        return response;
    } catch (error) {
        console.log('error in onFinishFunction : ', error)
        return error;

    }
};

export const validateTokenFunction = async () => {
    try {
        const response = await axios.post(serverEndpoint + "/api/users/get-user-by-id", {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
        return response;
    } catch (error) {
        console.log('error in validateTokenFunction : ', error)
        return error;
    }
}
