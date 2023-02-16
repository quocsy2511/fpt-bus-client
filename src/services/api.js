import axios from "axios";
import jwt from "jsonwebtoken";
import firebase from "firebase/app";
import "firebase/auth";
import { serverEndpoint } from "../utilities/serverEndpoint";

const API_BASE_URL = "https://http://178.128.223.115:8080/";
const JWT_SECRET = "mysecretkey";

const getAccessToken = async () => {
    const user = firebase.auth().currentUser;
    if (!user) {
        throw new Error("User not logged in");
    }
    const tokenResult = await user.getIdTokenResult();
    return tokenResult.token;
};

const createJWT = (data) => {
    const token = jwt.sign(data, JWT_SECRET, { expiresIn: "1h" });
    return token;
};

const postUserData = async (user) => {
    try {
        const accessToken = await getAccessToken();
        const response = await axios.post(
            // `${API_BASE_URL}/users`,
            `${serverEndpoint}/api/v1/auth/sign-in`,
            { user },
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        const { userId, name, email } = response.data;
        const userData = { userId, name, email };
        const jwtToken = createJWT(userData);
        localStorage.setItem("jwtToken", jwtToken);
        // return userData;
        return jwtToken;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to post user data");
    }
};

export { postUserData };