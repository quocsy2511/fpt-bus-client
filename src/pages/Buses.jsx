import { message, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PageTitle from '../components/PageTitle';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';

const Buses = () => {
    const dispatch = useDispatch();
    const [buses, setBuses] = useState([]);

    const columns = [
        {
            title: "Bus",
            dataIndex: "license_plate",
        },
        {
            title: "quantity",
            dataIndex: "seat_quantity",
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
            <div className="d-flex justify-content-between my-2">
                <PageTitle title="List Buses" />
            </div>
            <Table columns={columns} dataSource={buses} />
        </div>
    );
};

export default Buses;