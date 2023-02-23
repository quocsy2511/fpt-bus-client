
import { message, Table } from "antd";
import PageTitle from "../components/PageTitle";
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllUsersFunction } from "../services/getUser.service";
import "../resources/content.css"
import Header from "../components/Header";


const Users = () => {

    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);

    const columns = [
        {
            title: "No",
            dataIndex: "",
            width: 50,
            render: (_, __, index) => index + 1, // Return the index of each row plus one
        },
        {
            title: "Student ID",
            width: 150,
            dataIndex: "student_id",
        },
        {
            title: "Name",
            dataIndex: "fullname",
        },
        {
            title: "Email",
            dataIndex: "email",
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
            const response = await getAllUsersFunction("user")
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
            <div>
                <Header />
            </div>

            <div className='inside-content'>
                <div className="inside-content-2">
                    <div className="d-flex justify-content-between">
                        <PageTitle title="List Users" />
                    </div>
                    <br />
                    <Table rowKey="id" columns={columns} dataSource={users} />
                    <br />
                    <div className="d-flex justify-content-between">
                        <PageTitle title="List Drivers" />
                    </div>
                    <br />
                    <Table rowKey="id" columns={columns} dataSource={users} />
                </div>
            </div>
        </div>
    );
};

export default Users;