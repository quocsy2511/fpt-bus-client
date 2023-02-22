import { message, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PageTitle from '../components/PageTitle';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';

const Stations = () => {

    const dispatch = useDispatch();
    const [stations, setStations] = useState([]);

    const columns = [
        {
            title: "Station",
            dataIndex: "station_name",
        },
        {
            title: "Longitude",
            dataIndex: "longitude",
        },
        {
            title: "Latitude",
            dataIndex: "latitude",
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

    const getAllStations = async () => {
        try {

            dispatch(ShowLoading());
            // const response = await getAllStationsFunction()
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
        getAllStations();
    }, []);
    return (
        <div>
            <div className="d-flex justify-content-between my-2">
                <PageTitle title="List Stations" />
            </div>
            <Table columns={columns} dataSource={stations} />
        </div>
    );
};

export default Stations;