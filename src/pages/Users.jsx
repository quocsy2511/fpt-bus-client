
import { message, Table } from "antd";
import PageTitle from "../components/PageTitle";
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllUsersFunction } from "../services/getUser.service";



const Users = () => {

    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);

    const columns = [
        {
            title: "Name",
            dataIndex: "fullname",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Role",
            dataIndex: "",
            render: (data) => {
                console.log(data);
                if (data?.role_name === "ADMIN") {
                    return "Admin";
                } else if (data?.role_name === "DRIVER") {
                    return "driver";
                } else {
                    return "student"
                }
            },
        },
        {
            title: "Status",
            dataIndex: "",
            render: (data) => {
                return data.status ? "Blocked" : "Active";
            },
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (action, record) => (
                <div className="d-flex gap-3">
                    {record?.isBlocked && (
                        <p
                            className="underline"
                        >
                            UnBlock
                        </p>
                    )}
                    {!record?.isBlocked && (
                        <p
                            className="underline"

                        >
                            Block
                        </p>
                    )}
                </div>
            ),
        },
    ];


    const getAllUsers = async () => {
        try {

            dispatch(ShowLoading());
            const response = await getAllUsersFunction()
            console.log('response get all user: ', response)
            dispatch(HideLoading());
            // if (response.data.status === "Success") {
            //     setUsers(response.data.data);
            // } else {
            //     message.error(response.data.message);
            // }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <div>
            <div className="d-flex justify-content-between my-2">
                <PageTitle title="List Users" />
            </div>
            <Table columns={columns} dataSource={users} />
        </div>
    );
};

export default Users;