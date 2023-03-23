import 'antd/dist/reset.css'
import { Divider, message, Space, Switch, Table } from "antd";
import PageTitle from "../components/PageTitle";
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllStudentsFunction, updateUserStatusFunction } from "../services/user.service";
import "../resources/content.css"
import Header from "../components/Header";
import UserForm from "../components/form/UserForm"
import NotiForm from "../components/form/NotiForm"
import { EditTwoTone, NotificationTwoTone } from '@ant-design/icons';



const Users = () => {

    const dispatch = useDispatch();
    let [users, setUsers] = useState([]);
    const [showUserForm, setShowUserForm] = useState(false);
    const [showNotiForm, setShowNotiForm] = useState(false);
    const [query, setQuery] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);

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
            width: 250,
        },
        {
            title: "Email",
            dataIndex: "email",
            ellipsis: true,
            width: 250,
        },
        {
            title: "Status",
            dataIndex: "",
            width: 180,
            key: "status",
            render: (data, record) => {
                return (
                    <Space direction="vertical" size="middle">
                        <Switch checked={data?.status}
                            className="custom-switch" checkedChildren="Active" unCheckedChildren="Block"
                            onClick={() => handleStatus(record.id)} />
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
                            setSelectedUser(record);
                            setShowUserForm(true)
                        }} />
                    <Divider />
                    <NotificationTwoTone twoToneColor='orange'
                        onClick={() => {
                            setSelectedUser(record);
                            setShowNotiForm(true)
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

    const handleStatus = async (id) => {
        try {
            dispatch(ShowLoading());
            const response = await updateUserStatusFunction(id);
            // console.log('response update in bus: ', response)
            dispatch(HideLoading());
            if (response.data.status === "Success") {
                message.success(response.data.message);
                getAllStudents()
                dispatch(HideLoading());
            } else {
                message.error(response.message);
                dispatch(HideLoading());
            }
        } catch (error) {
            console.log('error in User : ', error)
        }
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


    useEffect(() => {
        getAllStudents()
    }, []);

    return (
        <div>
            <div>
                <Header query={query} setQuery={setQuery} />
            </div>
            <div className='inside-content'>
                <div className="inside-content-2">
                    <div className="d-flex justify-content-between" style={{ margin: "30px" }}>
                        <PageTitle title="List Students" />
                        {/* <div>
                            <button className='add-button' onClick={() => setShowUserForm(true)}> New </button>
                        </div> */}
                    </div>
                    <Table rowKey="id" columns={columnsStudent} pagination={{ pageSize: 5, }} dataSource={userFilter} />
                </div>
            </div>
            {showUserForm && (
                <UserForm
                    showUserForm={showUserForm}
                    setShowUserForm={setShowUserForm}
                    type={selectedUser ? "edit" : "new"}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                    getDataStudents={getAllStudents}>
                </UserForm>
            )}
            {showNotiForm && (
                <NotiForm
                    showNotiForm={showNotiForm}
                    setShowNotiForm={setShowNotiForm}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                ></NotiForm>
            )}
        </div>
    );
};

export default Users;