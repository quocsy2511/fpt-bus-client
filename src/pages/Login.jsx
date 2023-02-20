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
    const { user, googleSignIn, accessToken } = UserAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    console.log(user);

    const handleGoogleSignIn = async () => {
        dispatch(ShowLoading());
        try {
            await googleSignIn();
            dispatch(HideLoading());
            if (accessToken) {
                const response = await loginFunction(accessToken);
                console.log("response:  ", response);
                if (response.data.status === "Success") {
                    message.success(response.data.messages);
                    const token = response.data.data.accessToken
                    localStorage.setItem("access_token", token);
                    console.log(token);
                    navigate("/home");
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
    useEffect(() => {
        if (user != null) {
            navigate('/home');
        }
    }, [user]);

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