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

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    };

    const logOut = () => {
        signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log('User', currentUser)
            if (!currentUser.email.endsWith("@fpt.edu.vn")) {
                logOut();
                setTimeout(() => {
                    alert("Please Login by account FPT University");
                }, 1000);

            }
            const handleGoogleSignIn = async () => {
                try {
                    await googleSignIn();
                    const response = await postUserData();
                    console.log('response in login: ', response)
                    if (response.data.success) {
                        message.success(response.data.message);
                        localStorage.setItem("token", response.data.data);
                        navigate("/home")
                    } else {
                        message.error(response.data.message);
                    }
                } catch (error) {
                    console.log(error);
                }
            };


        });
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};