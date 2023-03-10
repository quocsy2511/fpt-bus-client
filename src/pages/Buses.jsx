import { message, Table, Space, Switch, Divider } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import BusForm from '../components/form/BusForm';
import Header from '../components/Header';
import PageTitle from '../components/PageTitle';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import { getAllBusesFunction } from '../services/bus.service';
import { updateBusStatusFunction } from '../services/bus.service';
import "../resources/content.css"
import 'antd/dist/reset.css'
import { EditTwoTone } from '@ant-design/icons'
// import { useParams, useSearchParams } from 'react-router-dom';

const Buses = () => {
    const dispatch = useDispatch();
    const [buses, setBuses] = useState([]);
    const [showBusForm, setShowBusForm] = useState(false)
    const [selectedBus, setSelectedBus] = useState(null);
    const [query, setQuery] = useState("");
    const [status, setStatus] = useState(null);

    const getFilterItem = (data) => {
        return data.filter((item) => item.license_plate.toLowerCase().includes(query.toLowerCase())
            || item.driver_name.toLowerCase().includes(query.toLowerCase()))
    }
    const dataFilter = getFilterItem(buses);

    const columns = [
        {
            title: "No",
            dataIndex: "",
            width: 70,
            render: (_, __, index) => index + 1, // Return the index of each row plus one
        },
        {
            title: "Driver",
            dataIndex: "driver_name",
            render: (text) => <a>{text}</a>,
        },
        {
            title: "License Plate",
            dataIndex: "license_plate",
            key: "license_plate"
        },
        {
            title: "Quantity",
            dataIndex: "seat_quantity",
            key: "seat_quantity",
            width: 120,
        },
        {
            title: "Status",
            dataIndex: "",
            width: 150,
            key: "status",
            render: (data, record) => {
                console.log(data);

                return (
                    <Space size="middle">
                        {data.status === 1 ? (<Switch className="custom-switch" checkedChildren="Active" unCheckedChildren="Block" defaultChecked
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
            render: (action, record) => (
                <Space size="large" >
                    <EditTwoTone twoToneColor='orange'
                        onClick={() => {
                            setSelectedBus(record);
                            setShowBusForm(true);
                        }} />
                    <Divider />
                </Space>
            ),
        },
    ];

    const handleStatus = async (id) => {
        try {
            dispatch(ShowLoading());
            const response = await updateBusStatusFunction(id);
            console.log('response update in bus: ', response)
            dispatch(HideLoading());
            if (response.response.data.status === "Success") {
                message.success(response.data.message);
                dispatch(HideLoading());
            } else {
                message.error(response.response.data.message);
                dispatch(HideLoading());
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }

    const getAllBuses = async () => {
        try {
            dispatch(ShowLoading());
            const response = await getAllBusesFunction()
            console.log('response get all buses: ', response)
            dispatch(HideLoading());
            if (response?.data?.status === "Success") {
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
                <Header showForm={showBusForm} setSelectedBus={selectedBus} setShowForm={setShowBusForm} query={query} setQuery={setQuery} search={dataFilter} />
            </div>
            <div className='inside-content'>
                <div className='inside-content-2'>
                    <div className="d-flex justify-content-between ">
                        <PageTitle title="List Buses" />
                    </div>
                    <br />
                    <Table rowKey="id" bordered={false} columns={columns} dataSource={dataFilter}
                        pagination={{ pageSize: 7, }} />
                </div>
            </div>
            {showBusForm && (
                <BusForm
                    showBusForm={showBusForm}
                    setShowBusForm={setShowBusForm}
                    type={selectedBus ? "edit" : "new"}
                    selectedBus={selectedBus}
                    setSelectedBus={setSelectedBus}
                    getData={getAllBuses} />
            )}
        </div>
    );
};

export default Buses;