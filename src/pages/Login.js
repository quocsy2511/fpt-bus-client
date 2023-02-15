import { Form, message } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import { onFinishFunction } from '../services/login.service';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginUser = async (values) => {
        dispatch(ShowLoading());
        const response = await onFinishFunction(values)
        console.log('response', response)
        dispatch(HideLoading());
        if (response.data.success) {
            message.success(response.data.message);
            localStorage.setItem("token", response.data.data);
            navigate("/")
        } else {
            message.error(response.data.message);
        }
    }

    return (
        <div className="h-screen d-flex justify-content-center align-items-center auth">
            <div className="w-400 card p-3">
                <h1 className="text-lg">Six-Bus Login</h1>
                <hr />
                <Form layout="vertical" onFinish={loginUser}>
                    <Form.Item label="Email" name="email">
                        <input type="text" />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <input type="password" />
                    </Form.Item>
                    <div className="d-flex justify-content-between align-items-center my-3">
                        <Link to="/register">Click Here To Register</Link>
                        <button
                            className="secondary-btn" type="submit">
                            Login
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Login;