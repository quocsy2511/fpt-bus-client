import { Divider, message, Space, Switch, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import PageTitle from '../components/PageTitle';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import { EditTwoTone } from '@ant-design/icons'
import "../resources/content.css"
import 'antd/dist/reset.css'
import { updateStationStatusFunction } from '../services/station.service';
import StationForm from '../components/form/StationForm';
import { getAllStationsFunction } from '../services/station.service';

const Stations = () => {

    const dispatch = useDispatch();
    const [stations, setStations] = useState([]);
    const [showStationForm, setShowStationForm] = useState(false)
    const [selectedStation, setSelectedStation] = useState(null);
    const [query, setQuery] = useState("");

    const columns = [
        {
            title: "No",
            dataIndex: "",
            width: 70,
            render: (_, __, index) => index + 1, // Return the index of each row plus one
        },
        {
            title: "Station",
            dataIndex: "station_name",
            render: (text) => <a>{text}</a>,
            width: 350,
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
            width: 150,
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
                <Space size="large" >
                    <EditTwoTone twoToneColor='orange'
                        onClick={() => {
                            setSelectedStation(record);
                            setShowStationForm(true);
                        }} />
                    <Divider />
                </Space>
            ),
        },
    ];

    const getFilterItem = (data) => {
        return data.filter((item) => item.station_name.toLowerCase().includes(query.toLowerCase()))
    }
    const dataFilter = getFilterItem(stations);

    const handleStatus = async (id) => {
        try {
            dispatch(ShowLoading());
            const response = await updateStationStatusFunction(id);
            // console.log('response update in station: ', response)
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

    const getAllStations = async () => {
        try {
            dispatch(ShowLoading());
            const response = await getAllStationsFunction()
            // console.log('response get all station: ', response)
            dispatch(HideLoading());
            if (response.data.status === "Success") {
                setStations(response.data.data);
            } else {
                message.error(response.data.message);
            }
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
            <div>
                <Header showForm={showStationForm} setShowForm={setShowStationForm} query={query} setQuery={setQuery} search={dataFilter} />
            </div>
            <div className='inside-content'>
                <div className='inside-content-2'>
                    <div className="d-flex justify-content-between ">
                        <PageTitle title="List Stations" />
                    </div>
                    <br />
                    <Table rowKey="id" bordered={false} columns={columns} dataSource={dataFilter} pagination={{ pageSize: 10, }} scroll={{ y: 240, }} />
                </div>
            </div>
            {showStationForm && (
                <StationForm
                    showStationForm={showStationForm}
                    setShowStationForm={setShowStationForm}
                    type={selectedStation ? "edit" : "new"}
                    selectedStation={selectedStation}
                    setSelectedStation={setSelectedStation}
                    getData={getAllStations} />
            )}
        </div>
    );
};

export default Stations;