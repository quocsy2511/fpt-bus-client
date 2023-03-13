import { EditTwoTone } from '@ant-design/icons';
import { Divider, message, Space, Switch, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import PageTitle from '../components/PageTitle';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import { getAllDriversFunction, updateUserStatusFunction } from '../services/user.service';
import DriverForm from '../components/form/DriverForm'

const Drivers = () => {
    const dispatch = useDispatch();
    let [drivers, setDrivers] = useState([]);
    const [showDriverForm, setShowDriverForm] = useState(false);
    const [query, setQuery] = useState("");
    const [selectedDriver, setSelectedDriver] = useState(null);

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
            width: 250,
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
            width: 250,
            ellipsis: true,
        },
        {
            title: "Status",
            dataIndex: "",
            width: 180,
            key: "status",
            render: (data, record) => {
                return (
                    <Space direction="vertical" size="middle">
                        {data.status ? (<Switch className="custom-switch" checkedChildren="Active" unCheckedChildren="Block" defaultChecked
                            onClick={() => handleStatus(record.id)} />)
                            : (<Switch className="custom-switch" checkedChildren="Active" unCheckedChildren="Block" onClick={() => handleStatus(record.id)} />)}
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
                            setSelectedDriver(record);
                            setShowDriverForm(true)
                        }} />
                    <Divider />
                </Space>
            ),
        },
    ];

    const getFilterItem = (data) => {
        return data.filter((item) => item.fullname.toLowerCase().includes(query.toLowerCase())
            || item.email.toLowerCase().includes(query.toLowerCase()))
    }
    const driverFilter = getFilterItem(drivers);

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
    const handleStatus = async (id) => {
        try {
            dispatch(ShowLoading());
            const response = await updateUserStatusFunction(id);
            // console.log('response update in bus: ', response)
            dispatch(HideLoading());
            if (response.data.status === "Success") {
                message.success(response.data.message);
                getAllDrivers()
                dispatch(HideLoading());
            } else {
                message.error(response.message);
                dispatch(HideLoading());
            }
        } catch (error) {
            console.log('error in User : ', error)
        }
    }

    useEffect(() => {
        getAllDrivers()
    }, []);
    return (
        <div>
            <div>
                <Header query={query} setQuery={setQuery} />
            </div>
            <div className='inside-content'>
                <div className="inside-content-2">

                    <div className="d-flex justify-content-between">
                        <PageTitle title="List Drivers" />
                        <div>
                            <button className='add-button' onClick={() => setShowDriverForm(true)}> New </button>
                        </div>
                    </div>
                    <br />
                    <Table rowKey="id" columns={columnsDriver} pagination={{ pageSize: 5, }} dataSource={driverFilter} />
                </div>
            </div>
            {showDriverForm && (
                <DriverForm
                    showDriverForm={showDriverForm}
                    setShowDriverForm={setShowDriverForm}
                    type={selectedDriver ? "edit" : "new"}
                    selectedDriver={selectedDriver}
                    setSelectedDriver={setSelectedDriver}
                    getDataDrivers={getAllDrivers}>
                </DriverForm>
            )}
        </div>
    );
};

export default Drivers;