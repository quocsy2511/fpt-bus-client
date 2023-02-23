import { message, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import PageTitle from '../components/PageTitle';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import "../resources/content.css"

const Buses = () => {
    const dispatch = useDispatch();
    const [buses, setBuses] = useState([]);

    const columns = [
        {
            title: "No",
            dataIndex: "",
            width: 50,
            render: (_, __, index) => index + 1, // Return the index of each row plus one
        },
        {
            title: "Driver",
            dataIndex: "driver_name",
            width: 200,
            key: "driver_name"

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
            key: "seat_quantity",
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

    const getAllBuses = async () => {
        try {

            dispatch(ShowLoading());
            // const response = await getAllBusesFunction()
            // console.log('response get all user: ', response)
            dispatch(HideLoading());
            // if (response.data.status === "Success") {
            //     setBuses(response.data.data);
            // } else {
            //     message.error(response.data.message);
            // }
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
                <Header />
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
        </div>
    );
};

export default Buses;