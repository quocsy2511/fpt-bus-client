import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleButton } from 'react-google-button';
import { UserAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import '../resources/login.css'
import { loginFunction } from '../services/login.service';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import { useDispatch } from 'react-redux';
import { message } from 'antd';


const Login = () => {
    const { user, googleSignIn, accessToken,logOut } = UserAuth();
    console.log("token_firebase: ", accessToken);
    console.log("user: ", user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleGoogleSignIn = async () => {
        dispatch(ShowLoading());
        try {
            //call function google signin in AuthContext
            await googleSignIn();
            dispatch(HideLoading());
            /**
             * After call googleSignIn() firebase return token and storage with key "@token_fb",
             *  then get token_firebase in localstorage 
             */
            const tokenFirebase = localStorage.getItem("@token_fb")
            //have token firebase
            if (tokenFirebase) {
                console.log("token-fire-base:", tokenFirebase);
                //call api login function service
                const response = await loginFunction(tokenFirebase);
                console.log("response:  ", response);
                //check response 
                if (response.data.status === "Success") {
                    const roleUser = response.data.data.user.role_name;
                    if (roleUser === "ADMIN") {
                        //get token of api return 
                        const token = response.data.data.accessToken
                        //set localstorage token of server
                        localStorage.setItem("access_token", token);
                        console.log("access_token", token);
                        dispatch(HideLoading());
                        navigate("/home");
                        message.success(response.data.messages);
                    } else {
                        dispatch(HideLoading());
                        console.log("không đủ quyền");
                        message.warning("Your role doesn't have enough permissions!!!");
                        await logOut();
                    }
                } else {
                    dispatch(HideLoading());
                    console.log("Response not OK");
                    message.error(response.data.messages);
                }
            } else {
                dispatch(HideLoading());
                console.log("Access token not found");
            }
        } catch (error) {
            dispatch(HideLoading());
            console.log("error", error);
        }
    };
    return (
        <div className='login-body'>

            <div className="container" id="container">
                <div className="form-container log-in-container">
                    <form action="#">
                        {user?.displayName ? (
                            <hr />
                        ) : (
                            <div className='googleButton'>
                                <h3>FPT Bus University</h3>
                                <h6>Login by account FPT University</h6>
                                <GoogleButton style={{ margin: '0 auto' }} onClick={handleGoogleSignIn} />
                            </div>
                        )}
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-right">
                            <img src='https://daihoc.fpt.edu.vn/media/2021/01/134993391_10164417035720062_8990523925756062023_o-910x1138.jpg' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;