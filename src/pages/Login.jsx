import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleButton } from 'react-google-button';
import { UserAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import '../resources/login.css'



const Login = () => {
    const { user, googleSignIn, accessToken } = UserAuth();
    const navigate = useNavigate();
    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
            if (accessToken) {
                const response = await fetch(
                    "http://178.128.223.115:8080/api/v1/auth/sign-in",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ accessToken: accessToken }),
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    if (data !== undefined) {
                        localStorage.setItem("access_token", data.token);
                        console.log(data);
                        navigate("/home");
                    } else {
                        console.log("No data returned from server");
                    }
                } else {
                    console.log("Response not OK");
                }
            } else {
                console.log("Access token not found");
            }
        } catch (error) {
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
                <div class="form-container log-in-container">
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