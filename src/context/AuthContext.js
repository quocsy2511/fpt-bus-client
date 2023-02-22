import { useContext, createContext, useEffect, useState, useCallback } from 'react';
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase';
import { message } from 'antd';
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(AuthStorage.getUser());
    const [accessToken, setAccessToken] = useState(AuthStorage.getToken());
    /**
     * Remove key token of server send and token of firebase 
     */
    const logOut = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("@token_fb");
        setAccessToken(undefined);
        setUser(undefined);
        signOut(auth)
    }
    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        //response of firebase return 
        const result = await signInWithPopup(auth, provider);
        //get infor of user 
        const user = result.user;
        //check đuôi email fpt
        if (user.email.endsWith("@fpt.edu.vn")) {
            //get token firebase
            const userTokenFirebase = await user.getIdToken();
            setAccessToken(userTokenFirebase);
            AuthStorage.setToken(userTokenFirebase)
            setUser(user);
        } else {
            //không phải reun hàm logout
            logOut();
            message.error("Please Login by account FPT University");
        }
    }

    useEffect(() => {
        //onAuthStateChanged để giữ trạng thái đăng nhập mình sử dụng
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            console.log("Current in auth:", currentUser);
            if (!currentUser) return;
            console.log("Auth state change");
            setUser(currentUser)
            setAccessToken(await currentUser.getIdToken());
        });
        return () => {
            unsubscribe();
        };
    }, [])

    return (
        <AuthContext.Provider value={{ googleSignIn, logOut, user, accessToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};


//class to take function get/set user and token in storage 
export class AuthStorage {
    static setToken(token) {
        localStorage.setItem("@token_fb", token);
    }

    static setUser(user) {
        localStorage.setItem("@user", JSON.stringify(user));
    }

    static getToken() {
        return localStorage.getItem("@token");
    }

    static getUser() {
        const userStored = localStorage.getItem("@user");
        return userStored ? userStored : null;
    }
}