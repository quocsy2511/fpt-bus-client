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

// export const validateTokenFunction = async () => {
//     try {
//         const response = await axios.post(serverEndpoint + "/api/users/get-user-by-id", {}, {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//             }
//         })
//         return response;
//     } catch (error) {
//         console.log('error in validateTokenFunction : ', error)
//         return error;
//     }
// }



