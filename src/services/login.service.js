import axios from "axios";
import { serverEndpoint } from '../utilities/serverEndpoint'


export const loginFunction = async (accessToken) => {

    try {
        //call api
        const response = await axios.post(
            serverEndpoint + "api/v1/auth/sign-in",
            { accessToken },
        );
        return response;
    } catch (error) {
        console.log('error in service: ', error)
        return error;
    }
}




