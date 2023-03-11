import { Divider, message, Space, Switch, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import PageTitle from '../components/PageTitle';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import BusRouteForm from "../components/form/BusRouteForm"
import "../resources/content.css"
import 'antd/dist/reset.css'
import { EditTwoTone } from '@ant-design/icons';
import { getAllBusRoutesFunction, updateBusRouteStatusFunction } from '../services/busRoute.service';
import { getAllStationsFunction } from '../services/station.service';
const BusRoutes = () => {
    const dispatch = useDispatch();
    const [busRoutes, setBusRoutes] = useState([]);
    const [selectedBusRoute, setSelectedBusRoute] = useState(null);
    const [showBusRouteForm, setShowBusRouteForm] = useState(false)
    const [stations, setStations] = useState([])
    const columns = [
        {
            title: "No",
            dataIndex: "",
            width: 50,
            render: (_, __, index) => index + 1, // Return the index of each row plus one
        },
        {
            title: "Route Name",
            dataIndex: "route_name",
            width: 130,
            render: (text) => <a>{text}</a>,
        },
        {
            title: "Departure",
            dataIndex: "departure",
        },
        {
            title: "Destination ",
            dataIndex: "destination",
        },
        {
            title: "Status",
            width: 150,
            key: "status",
            render: (data, record) => {
                return (
                    <Space size="middle">
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
                            setSelectedBusRoute(record);
                            setShowBusRouteForm(true);
                        }} />
                    <Divider />
                </Space>
            ),
        },
    ];
    const handleStatus = async (id) => {
        try {
            dispatch(ShowLoading());
            const response = await updateBusRouteStatusFunction(id);
            console.log('response update in bus route: ', response)
            if (response.data.status === "Success") {
                message.success(response.data.message);
                getAllBusRoutes();
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
    const getAllStations = async () => {
        try {
            const response = await getAllStationsFunction()
            console.log('response station : ', response)
            if (response.data.status === "Success") {
                const filterStations = response.data.data.filter(station => station.status);
                setStations(filterStations);
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    };
    const getAllBusRoutes = async () => {
        try {
            dispatch(ShowLoading());
            const response = await getAllBusRoutesFunction()
            console.log('response get all route: ', response)
            dispatch(HideLoading());
            if (response?.data?.status === "Success") {
                setBusRoutes(response.data.data);
            } else {
                message.error(response.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    useEffect(() => {
        getAllBusRoutes();
        getAllStations()
    }, []);

    return (
        <div>
            <div>
                <Header showForm={showBusRouteForm} setShowForm={setShowBusRouteForm} exclude={"routes"} />
            </div>
            <div className='inside-content'>
                <div className='inside-content-2'>
                    <div className="d-flex justify-content-between">
                        <PageTitle title="List Bus Routes" />
                    </div>
                    <br />
                    <Table rowKey="id" columns={columns} dataSource={busRoutes} pagination={{ pageSize: 7, }} />
                </div>
            </div>
            {showBusRouteForm && (
                <BusRouteForm
                    showBusRouteForm={showBusRouteForm}
                    setShowBusRouteForm={setShowBusRouteForm}
                    type={selectedBusRoute ? "edit" : "new"}
                    setSelectedBusRoute={setSelectedBusRoute}
                    selectedBusRoute={selectedBusRoute}
                    getData={getAllBusRoutes}
                    stations={stations}
                />
            )}
        </div>
    );
};

export default BusRoutes;