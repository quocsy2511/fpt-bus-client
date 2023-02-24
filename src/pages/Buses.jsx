import { message, Table, Tag, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import BusForm from '../components/form/BusForm';
import Header from '../components/Header';
import PageTitle from '../components/PageTitle';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import "../resources/content.css"
import { getAllBusesFunction } from '../services/getBus.service';

const Buses = () => {
    const dispatch = useDispatch();
    const [buses, setBuses] = useState([]);
    const [showBusForm, SetShowBusForm] = useState(false)

    const columns = [
        {
            title: "No",
            dataIndex: "",
            width: 50,
            render: (_, __, index) => index + 1, // Return the index of each row plus one
        },
        // {
        //     title: "Name",
        //     dataIndex: "User.fullname",
        //     render: (text) => <a>{text}</a>,
        // },
        {
            title: "Driver",
            dataIndex: "User",
            render: (user) => <a>{user ? user.fullname : ""}</a>,
        },
        {
            title: "License Plate",
            dataIndex: "license_plate",
            key: "license_plate"
        },
        {
            title: "Quantity",
            dataIndex: "seat_quantity",
            key: "seat_quantity"
        },
        {
            title: "Status",
            dataIndex: "",
            width: 120,
            key: "status",
            render: (data) => {
                let color = ""
                if (data.status) {
                    color = "geekblue";
                } else {
                    color = "volcano";
                }
                return (
                    <Tag color={color}>
                        {data.status ? "Active" : "Block"}
                    </Tag>
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



    const getAllBuses = async () => {
        try {

            dispatch(ShowLoading());
            const response = await getAllBusesFunction()
            console.log('response get all buses: ', response)
            console.log("driver: ", response.data.data[0].User?.fullname);
            dispatch(HideLoading());
            if (response.data.status === "Success") {
                setBuses(response.data.data);

            } else {
                message.error(response.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    useEffect(() => {
        getAllBuses();
    }, []);


    return (
        <div>
            <div>
                <Header showForm={showBusForm} setShowForm={SetShowBusForm} />
            </div>
            <div className='inside-content'>
                <div className='inside-content-2'>
                    <div className="d-flex justify-content-between ">
                        <PageTitle title="List Buses" />
                    </div>
                    <br />
                    <Table rowKey="id" columns={columns} dataSource={buses} />
                </div>
            </div>
            {showBusForm && (
                <BusForm
                    showBusForm={showBusForm}
                    setShowBusForm={SetShowBusForm}>
                </BusForm>)}
        </div>
    );
};

export default Buses;