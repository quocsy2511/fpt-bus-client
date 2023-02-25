import { message, Table, Tag, Space, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import BusForm from '../components/form/BusForm';
import Header from '../components/Header';
import PageTitle from '../components/PageTitle';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import "../resources/content.css"
import { getAllBusesFunction } from '../services/getBus.service';
import { CheckOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css'
import { updateBusStatusFunction } from '../services/updateBusStatus.service';

const Buses = () => {
    const dispatch = useDispatch();
    const [buses, setBuses] = useState([]);
    const [showBusForm, setShowBusForm] = useState(false)
    const [selectedBus, setSelectedBus] = useState(null);


    const columns = [
        {
            title: "No",
            dataIndex: "",
            width: 50,
            render: (_, __, index) => index + 1, // Return the index of each row plus one
        },
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
            width: 100,
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
            render: (action, record) => (
                <Space size="middle" >
                    <a onClick={() => {
                        setSelectedBus(record);
                        setShowBusForm(true);
                    }} >Update</a>
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
            if (response.data.status === "Success") {
                message.success("Update bus status successfully.");
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


    const getAllBuses = async () => {
        try {

            dispatch(ShowLoading());
            const response = await getAllBusesFunction()
            console.log('response get all buses: ', response)
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
                <Header showForm={showBusForm} setShowForm={setShowBusForm} />
            </div>
            <div className='inside-content'>
                <div className='inside-content-2'>
                    <div className="d-flex justify-content-between ">
                        <PageTitle title="List Buses" />
                    </div>
                    <br />
                    <Table rowKey="id" bordered={false} columns={columns} dataSource={buses} />
                </div>
            </div>
            {showBusForm && (
                <BusForm
                    showBusForm={showBusForm}
                    setShowBusForm={setShowBusForm}>
                    type={selectedBus ? "edit" : "add"}
                </BusForm>)}
        </div>
    );
};

export default Buses;