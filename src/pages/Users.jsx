import 'antd/dist/reset.css'
import { Divider, message, Space, Switch, Table } from "antd";
import PageTitle from "../components/PageTitle";
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllDriversFunction, getAllStudentsFunction, getAllUsersFunction } from "../services/user.service";
import "../resources/content.css"
import Header from "../components/Header";
import UserForm from "../components/form/UserForm"
import { EditTwoTone } from '@ant-design/icons';



const Users = () => {

    const dispatch = useDispatch();
    let [users, setUsers] = useState([]);
    let [drivers, setDrivers] = useState([]);
    const [showUserForm, setShowUserForm] = useState(false);
    const [query, setQuery] = useState("");

    const columnsStudent = [
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
        {
            title: "Status",
            dataIndex: "",
            width: 100,
            key: "status",
            render: (data) => {

                return (
                    <Space direction="vertical" size="middle">
                        {data.status ? (<Switch className="custom-switch" checkedChildren="Active" unCheckedChildren="Block" defaultChecked />)
                            : (<Switch className="custom-switch" checkedChildren="Active" unCheckedChildren="Block" />)}
                    </Space>
                )
            },
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (action, record) => (
                <Space size="large" >
                    <EditTwoTone twoToneColor='orange'
                        onClick={() => {
                            console.log("click click ")
                        }} />
                    <Divider />
                </Space>
            ),
        },
    ];

    const columnsDriver = [
        {
            title: "No",
            dataIndex: "",
            width: 70,
            render: (_, __, index) => index + 1, // Return the index of each row plus one
        },
        {
            title: "Name",
            dataIndex: "fullname",
            render: (text) => <a>{text}</a>,
            ellipsis: true,
        },
        {
            title: "Phone",
            dataIndex: "phone_number",
            ellipsis: true,
        },
        {
            title: "Email",
            dataIndex: "email",
            render: (text) => <a>{text}</a>,
            ellipsis: true,
        },
        {
            title: "Status",
            dataIndex: "",
            width: 100,
            key: "status",
            render: (data) => {

                return (
                    <Space direction="vertical" size="middle">
                        {data.status ? (<Switch className="custom-switch" checkedChildren="Active" unCheckedChildren="Block" defaultChecked />)
                            : (<Switch className="custom-switch" checkedChildren="Active" unCheckedChildren="Block" />)}
                    </Space>
                )
            },
        },
        {
            title: "Action",
            dataIndex: "action",
            render: (action, record) => (
                <Space size="large" >
                    <EditTwoTone twoToneColor='orange'
                        onClick={() => {
                            console.log("click click ")
                        }} />
                    <Divider />
                </Space>
            ),
        },
    ];

    const getFilterItem = (data) => {
        return data.filter((item) => item.fullname.toLowerCase().includes(query.toLowerCase())
            || item.student_id.toLowerCase().includes(query.toLowerCase())
            || item.email.toLowerCase().includes(query.toLowerCase()))
    }
    const userFilter = getFilterItem(users);
    const driverFilter = getFilterItem(drivers);

    const handleStatus = () => {
    }
    const getAllStudents = async () => {
        try {
            dispatch(ShowLoading());
            const response = await getAllStudentsFunction();
            console.log('response get all student :  ', response)
            dispatch(HideLoading());
            if (response?.data?.status === "Success") {
                setUsers(response.data.data);
            } else {
                message.error(response.data?.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }
    const getAllDrivers = async () => {
        try {
            dispatch(ShowLoading());
            const response = await getAllDriversFunction();
            console.log('response get all student :  ', response)
            dispatch(HideLoading());
            if (response?.data?.status === "Success") {
                setDrivers(response.data.data);
            } else {
                message.error(response.data?.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }

    useEffect(() => {
        getAllStudents()
        getAllDrivers()
    }, []);

    return (
        <div>
            <div>
                <Header showForm={showUserForm} setShowForm={setShowUserForm} query={query} setQuery={setQuery} />
            </div>

            <div className='inside-content'>
                <div className="inside-content-2">
                    <div className="d-flex justify-content-between">
                        <PageTitle title="List Users" />
                    </div>
                    <br />
                    <Table rowKey="id" columns={columnsStudent} pagination={{ pageSize: 10, }} scroll={{ y: 290, }} dataSource={userFilter} />
                    <div className="d-flex justify-content-between">
                        <PageTitle title="List Drivers" />
                    </div>
                    <br />
                    <Table rowKey="id" columns={columnsDriver} pagination={{ pageSize: 10, }} scroll={{ y: 200, }} dataSource={driverFilter} />
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