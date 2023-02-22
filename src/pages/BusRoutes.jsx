import { message, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PageTitle from '../components/PageTitle';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';

const BusRoutes = () => {
    const dispatch = useDispatch();
    const [busRoutes, setBusRoutes] = useState([]);

    const columns = [
        {
            title: "Departure",
            dataIndex: "departure",
        },
        {
            title: "Destination ",
            dataIndex: "destination",
        },
        {
            title: "Route",
            dataIndex: "id",
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

    const getAllBusRoutes = async () => {
        try {

            dispatch(ShowLoading());
            // const response = await getAllBusRoutesFunction()
            // console.log('response get all user: ', response)
            dispatch(HideLoading());
            // if (response.data.status === "Success") {
            //     setBusRoutes(response.data.data);
            // } else {
            //     message.error(response.data.message);
            // }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    useEffect(() => {
        getAllBusRoutes();
    }, []);


    return (
        <div>
            <div className="d-flex justify-content-between my-2">
                <PageTitle title="List Bus Routes" />
            </div>
            <Table columns={columns} dataSource={busRoutes} />
        </div>
    );
};

export default BusRoutes;