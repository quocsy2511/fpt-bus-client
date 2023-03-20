import { Divider, message, Space, Switch, DatePicker, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PageTitle from '../components/PageTitle';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import "../resources/content.css"
import 'antd/dist/reset.css'
import { getAllTripsByDateFunction, updateTripStatusActiveFunction, updateTripStatusDeActiveFunction } from '../services/trip.service';
import TripForm from '../components/form/TripForm';
import { EditTwoTone } from '@ant-design/icons';
import moment from 'moment';
import dayjs from 'dayjs';


const Trips = () => {
    const dispatch = useDispatch();
    const [trips, setTrips] = useState([]);
    const [showTripForm, setShowTripForm] = useState(false)
    const [selectedTrip, setSelectedTrip] = useState(null);
    const today = dayjs().format('YYYY-MM-DD');
    const [date, setDate] = useState(today)

    const columns = [
        {
            title: "No",
            dataIndex: "",
            width: 70,
            render: (_, __, index) => index + 1, // Return the index of each row plus one
        },
        {
            title: "Departure Date",
            width: 150,
            render: (record) => {
                const { departure_date, departure_time } = record;
                return (
                    <a>
                        {departure_date} - {departure_time}
                    </a>
                )
            }
        },
        {
            title: "Driver",
            dataIndex: "driver_name",
            width: 150,
            ellipsis: true,
        },
        {
            title: "License Plate",
            dataIndex: "license_plate",
            width: 170,
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Route",
            dataIndex: "route_name",
            key: "route",
            width: 140,

        },
        {
            title: "Ticket Quantity",
            dataIndex: "ticket_quantity",
            width: 105,
        },
        {
            title: "Status",
            dataIndex: "status",
            width: 110,
            key: "status",
            render: (data, record) => {
                return (
                    <Space size="middle">
                        <Switch checked={data !== 3}
                            className="custom-switch" checkedChildren="Active" unCheckedChildren="Block"
                            onClick={() => handleStatus(record.id, record.status)} />
                    </Space>
                )
            },
        },
        {
            title: "Action",
            dataIndex: "action",
            width: 90,
            render: (action, record) => (
                <Space size="large" >
                    <EditTwoTone twoToneColor='orange'
                        onClick={() => {
                            setSelectedTrip(record);
                            setShowTripForm(true);
                        }} />
                    <Divider />
                </Space>
            ),
        },
    ];

    const handleStatus = async (id, status) => {
        console.log('status in handle Status : ', status)
        try {
            dispatch(ShowLoading());
            let response = null;
            if (status === 3) {
                response = await updateTripStatusActiveFunction(id);
                // console.log('response update Active in bus: ', response.data.status)
            } else {
                response = await updateTripStatusDeActiveFunction(id);
                // console.log('response update DeActive in bus: ', response.data.status)
            }
            dispatch(HideLoading());
            if (response.data.status === "Success") {
                if (date) {
                    getAllTripsByDate(date)
                    message.success(response.data.message);
                    dispatch(HideLoading());
                }
            } else {
                message.error(response.message);
                dispatch(HideLoading());
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }

    const getAllTripsByDate = async (date) => {
        try {
            dispatch(ShowLoading());
            const response = await getAllTripsByDateFunction(date)
            console.log('response get all trip by date: ', response)
            dispatch(HideLoading());
            if (response.data.status === "Success") {
                setTrips(response.data.data);
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    const onChangeDateSearch = (date, dateString) => {
        setDate(dateString)
    };

    useEffect(() => {
        getAllTripsByDate(date)
    }, [date]);

    return (
        <div>
            <div className='search-picker-date'>
                <DatePicker onChange={onChangeDateSearch}
                    disabledDate={(current) => current && current < moment().startOf('day')}
                    defaultValue={dayjs(today)}
                />
            </div>
            <div className='inside-content'>
                <div className='inside-content-2'>
                    <div className="d-flex justify-content-between " style={{ margin: "30px" }}>
                        <PageTitle title="List Trips" />
                        <div>
                            <button className='add-button' onClick={() => setShowTripForm(true)}> New </button>
                        </div>
                    </div>
                    <Table rowKey="id" bordered={false} columns={columns} dataSource={trips}
                        pagination={{ pageSize: 5 }} />
                </div>
            </div>
            {showTripForm && (
                <TripForm
                    showTripForm={showTripForm}
                    setShowTripForm={setShowTripForm}
                    type={selectedTrip ? "edit" : "new"}
                    selectedTrip={selectedTrip}
                    setSelectedTrip={setSelectedTrip}
                    getData={getAllTripsByDate} />
            )}
        </div>
    );
};

export default Trips;