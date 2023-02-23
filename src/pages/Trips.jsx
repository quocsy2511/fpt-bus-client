import { message, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PageTitle from '../components/PageTitle';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import "../resources/content.css"

const Trips = () => {
    const dispatch = useDispatch();
    const [trips, setTrips] = useState([]);

    const columns = [
        {
            title: "No",
            dataIndex: "",
            width: 50,
            render: (_, __, index) => index + 1, // Return the index of each row plus one
        },
        {
            title: "Departure time",
            dataIndex: "departure_time",
        },
        {
            title: "Bus name",
            dataIndex: "license_plate",
        },
        {
            title: "Route",
            dataIndex: "id",
        },
        {
            title: "Ticket quantity",
            dataIndex: "ticket_quantity",
        }
    ];

    const getAllTrips = async () => {
        try {

            dispatch(ShowLoading());
            // const response = await getAllTripsFunction()
            // console.log('response get all user: ', response)
            dispatch(HideLoading());
            // if (response.data.status === "Success") {
            //     setTrips(response.data.data);
            // } else {
            //     message.error(response.data.message);
            // }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    useEffect(() => {
        getAllTrips();
    }, []);


    return (
        <div className='inside-content'>
            <div className="d-flex justify-content-between ">
                <PageTitle title="List Trips" />
            </div>
            <br />
            <Table rowKey="id" columns={columns} dataSource={trips} />
        </div>
    );
};

export default Trips;