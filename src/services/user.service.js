
import { serverEndpoint } from '../utilities/serverEndpoint'
import axios from 'axios';

const config = {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': `application/json`
    }

}
export const getAllUsersFunction = async () => {
    try {
        const response = await axios.get(serverEndpoint + 'api/v1/users', config)
        // console.log(response);
        return response
    } catch (error) {
        console.log("error in service: ", error);
        return error;
    }
}
