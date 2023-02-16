import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleButton } from 'react-google-button';
import { UserAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import '../resources/login.css'



const Login = () => {
    const { user, googleSignIn } = UserAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user != null) {
            navigate('/home');
        }
    }, [user]);

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className='login-body'>

            <div class="container" id="container">
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
                <div class="overlay-container">
                    <div class="overlay">
                        <div class="overlay-panel overlay-right">
                            <img src='https://daihoc.fpt.edu.vn/media/2021/01/134993391_10164417035720062_8990523925756062023_o-910x1138.jpg' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;