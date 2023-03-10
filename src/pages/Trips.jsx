import { Divider, message, Space, Switch, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import PageTitle from '../components/PageTitle';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import "../resources/content.css"
import 'antd/dist/reset.css'
import { getAllTripsFunction, updateTripStatusFunction } from '../services/trip.service';
import TripForm from '../components/form/TripForm';
import { EditTwoTone } from '@ant-design/icons';



const Trips = () => {
    const dispatch = useDispatch();
    const [trips, setTrips] = useState([]);
    const [query, setQuery] = useState("");
    const [showTripForm, setShowTripForm] = useState(false)
    const [selectedTrip, setSelectedTrip] = useState(null);


    const getFilterItem = (data) => {
        return data.filter((item) => item.license_plate.toLowerCase().includes(query.toLowerCase())
            || item.departure_time.toLowerCase().includes(query.toLowerCase()))
    }
    const dataFilter = getFilterItem(trips);
    const columns = [
        {
            title: "No",
            dataIndex: "",
            width: 70,
            render: (_, __, index) => index + 1, // Return the index of each row plus one
        },
        {
            title: "Departure Date",
            dataIndex: "departure_date",
            width: 150,
        },
        {
            title: "Departure Time",
            dataIndex: "departure_time",
            width: 150,
        },
        {
            title: "Bus Name",
            dataIndex: "license_plate",
            width: 130,
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Route",
            dataIndex: "",
            key: "route",
            width: 210,
            render: (record) => {
                const { departure, destination } = record;
                return (
                    <a>
                        {departure} - {destination}
                    </a>
                );
            },
        },
        {
            title: "Ticket Quantity",
            dataIndex: "ticket_quantity",
            width: 105,
        },
        {
            title: "Status",
            dataIndex: "",
            width: 110,
            key: "status",
            render: (data, record) => {
                return (
                    <Space size="middle">
                        {data.status ? (<Switch className="custom-switch" checkedChildren="Active" unCheckedChildren="Block" defaultChecked
                            onClick={() => handleStatus(record.id)} />)
                            : (<Switch className="custom-switch" checkedChildren="Active" unCheckedChildren="Block"
                                onClick={() => handleStatus(record.id)} />)}
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

    const handleStatus = async (id) => {
        try {
            dispatch(ShowLoading());
            const response = await updateTripStatusFunction(id);
            console.log('response update in bus: ', response)
            dispatch(HideLoading());
            if (response.data.status === "Success") {
                message.success(response.data.message);
                dispatch(HideLoading());
            } else {
                message.error(response.message);
                dispatch(HideLoading());
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }


    const getAllTrips = async () => {
        try {
            dispatch(ShowLoading());
            const response = await getAllTripsFunction()
            console.log('response get all trip: ', response)
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

    useEffect(() => {
        getAllTrips();
    }, []);


    return (
        <div>
            <div>
                <Header showForm={showTripForm} setShowForm={setShowTripForm} query={query} setQuery={setQuery} search={dataFilter} />
            </div>
            <div className='inside-content'>
                <div className='inside-content-2'>
                    <div className="d-flex justify-content-between ">
                        <PageTitle title="List Trips" />
                    </div>
                    <br />
                    <Table rowKey="id" bordered={false} columns={columns} dataSource={dataFilter}
                        pagination={{ pageSize: 7, }} />
                </div>

            </div>
            {showTripForm && (
                <TripForm
                    showTripForm={showTripForm}
                    setShowTripForm={setShowTripForm}
                    type={selectedTrip ? "edit" : "new"}
                    selectedTrip={selectedTrip}
                    setSelectedTrip={setSelectedTrip}
                    getData={getAllTrips} />
            )}
        </div>
    );
};

export default Trips;