import axios from "axios";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { serverEndpoint } from "../utilities/serverEndpoint";

const JWT_SECRET = process.env.SECRET_KEY;

const getAccessToken = async () => {
    const user = firebase.auth().currentUser;
    if (!user) {
        throw new Error("User not logged in");
    }
    const tokenResult = await user.getIdTokenResult();
    return tokenResult.token;
};


const postUserData = async (user) => {
    try {
        //token firebase 
        const accessToken = await getAccessToken();
        const response = await axios.post(
            // `${API_BASE_URL}/users`,
            `${serverEndpoint}/api/v1/auth/sign-in`,
            { accessToken }
        );
        const { userId, name, email } = response.data;
        const userData = { userId, name, email };
        localStorage.setItem("jwtToken", response.data);
        return accessToken
        // return jwtToken;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to post user data");
    }
};

export { postUserData };