import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { SetUser } from "../redux/usersSlice";
import DefaultLayout from './DefaultLayout';



const Protected = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const { user, accessToken } = UserAuth();
    // if (!user) {
    //     return <Navigate to='/' />;
    // }
    const validateToken = async () => {
        try {
            const token = localStorage.getItem("access_token")
            const decodeUser = jwt_decode(token)
            const role = decodeUser.role_name;
            if (role === "ADMIN") {
                dispatch(SetUser(decodeUser));
            } else {
                localStorage.removeItem("access_token")
                navigate("/login")
            }
        } catch (error) {
            localStorage.removeItem("access_token")
            navigate("/login")
        }
    }

    useEffect(() => {
        if (localStorage.getItem("access_token")) {
            validateToken();
        } else {
            navigate("/login")
        }
    }, [])
    return (
        <div>
            <DefaultLayout>{children}</DefaultLayout>
        </div>
    )
};
//
export default Protected;