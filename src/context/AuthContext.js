import { useContext, createContext, useEffect, useState } from 'react';
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [accessToken, setAccessToken] = useState("");


    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const token = await user.getIdToken();
        setAccessToken(token);
        setUser(user);
    };

    const logOut = () => {
        signOut(auth)
        localStorage.removeItem("access_token");
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log('currentUser', currentUser)
            if (currentUser && !currentUser.email.endsWith("@fpt.edu.vn")) {
                logOut();
                setTimeout(() => {
                    alert("Please Login by account FPT University");
                }, 1000);
            } else {
                setUser(currentUser);
                if (currentUser) {
                    currentUser.getIdToken().then((token) => {
                        setAccessToken(token);
                    });
                }
            }

            console.log("user in auth", user);
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