import 'antd/dist/reset.css'
import { message, Space, Switch, Table, Tag } from "antd";
import PageTitle from "../components/PageTitle";
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllUsersFunction } from "../services/getUser.service";
import "../resources/content.css"
import Header from "../components/Header";
import UserForm from "../components/form/UserForm"



const Users = () => {

    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const [showUserForm, setShowUserForm] = useState(false);

    const columns = [
        {
            title: "No",
            dataIndex: "",
            width: 70,
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
            render: (text) => <a>{text}</a>,
            ellipsis: true,
        },
        {
            title: "Email",
            dataIndex: "email",
            ellipsis: true,
        },
        // {
        //     title: "Status",
        //     dataIndex: "",
        //     width: 120,
        //     key: "status",
        //     render: (data) => {
        //         let color = ""
        //         if (data.status) {
        //             color = "geekblue";
        //         } else {
        //             color = "volcano";
        //         }
        //         return (
        //             <Tag color={color}>
        //                 {data.status ? "Active" : "Block"}
        //             </Tag>
        //         )
        //     },
        // },        
        {
            title: "Status",
            dataIndex: "",
            width: 100,
            key: "status",
            render: (data) => {

                return (
                    <Space direction="vertical" size="middle">
                        {data.status ? (<Switch className="custom-switch"checkedChildren="Active" unCheckedChildren="Block" defaultChecked />)
                            : (<Switch className="custom-switch" checkedChildren="Active" unCheckedChildren="Block" />)}
                    </Space>
                )
            },
        },

        {
            title: "Action",
            dataIndex: "action",
            render: (action, record) => (
                <Space size="middle" >
                    {record?.status && (
                        <a>Block</a>
                    )}
                    {!record?.status && (
                        <a>UnBlock</a>
                    )}
                </Space>
            ),
        },
    ];
    const handleStatus = () => {


    }

    const getAllUsers = async () => {
        try {

            dispatch(ShowLoading());
            const response = await getAllUsersFunction("user")
            console.log('response get all user: ', response)
            dispatch(HideLoading());
            if (response?.data?.status === "Success") {
                setUsers(response.data.data.cacheResults);
            } else {
                message.error(response.data?.message);
            }
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
                <Header showForm={showUserForm} setShowForm={setShowUserForm} />
            </div>

            <div className='inside-content'>
                <div className="inside-content-2">
                    <div className="d-flex justify-content-between">
                        <PageTitle title="List Users" />
                    </div>
                    <br />
                    <Table rowKey="id" columns={columns} pagination={{ pageSize: 5, }} scroll={{ y: 240, }} dataSource={users} />
                    <div className="d-flex justify-content-between">
                        <PageTitle title="List Drivers" />
                    </div>
                    <br />
                    <Table rowKey="id" columns={columns} pagination={{ pageSize: 5, }} scroll={{ y: 240, }} dataSource={users} />
                </div>
            </div>
            {showUserForm && (
                <UserForm
                    showUserForm={showUserForm}
                    setShowUserForm={setShowUserForm}>
                </UserForm>
            )}
        </div>
    );
};

export default Users;