import { Button, Form, message, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { Timeline, Select } from 'antd';
import { SmileOutlined, EnvironmentOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css'
import "../../resources/form.css"
import { getAllStationsFunction } from '../../services/station.service';
// const stations = [{
//     label: ' VinHome center park',
//     value: 'vinhomeCenterPark'
// }, {
//     label: 'Điện máy xanh',
//     value: 'dienMayXanh'
// }, {
//     label: 'Family Mart',
//     value: 'familyMart'
// }, {
//     label: 'Ngã tư Thủ đức ',
//     value: 'ngaTuThuDuc'
// }, {
//     label: 'Hutech University',
//     value: 'hutechUniversity'
// }, {
//     label: 'FPT University',
//     value: 'fptUniversity'
// },];

const RouteForm = ({ showBusRouteForm, setShowBusRouteForm, type = 'new', }) => {
    const [startStation, setStartStation] = useState("Departure");
    const [endStation, setEndStation] = useState("Destination");
    const [middleStations, setMiddleStations] = useState([]);
    const [showMiddleStationSelect, setShowMiddleStationSelect] = useState(false);
    const [stations, setStations] = useState([])

    const getAllStations = async () => {
        try {
            const response = await getAllStationsFunction()
            if (response.data.status === "Success") {
                setStations(response.data.data);
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    const handleStartStationChange = (value) => {
        if (value === endStation) {
            message.error('Trạm xuất phát không được trùng với trạm kết thúc!');
            setStartStation("Departure")
        } else {
            setStartStation(value);
        }
        if (middleStations.includes(value)) {
            message.error('Trạm xuất phát không được trùng với trạm ở giữa!');
            setStartStation("Departure")
        }
        if (value !== "Departure" && value !== endStation && value !== "Destination") {
            setShowMiddleStationSelect(true);
        }
    };

    const handleEndStationChange = (value) => {
        if (value === startStation) {
            message.error('Trạm kết thúc không được trùng với trạm xuất phát!');
            setEndStation("Destination");
        } else {
            setEndStation(value);
        }
        if (middleStations.includes(value)) {
            message.error('Trạm kết thúc không được trùng với trạm ở giữa!');
            setEndStation("Destination");
        }
        if (value !== "Destination" && value !== startStation && value !== "Departure") {
            setShowMiddleStationSelect(true);
        }

    };

    const handleMiddleStationChange = (index, value) => {
        const newMiddleStations = [...middleStations];
        newMiddleStations[index] = value;
        if (value === startStation || value === endStation) {
            message.error('Trạm ở giữa không được trùng với trạm đã chọn!');
            return setMiddleStations([])
        } else {
            setMiddleStations(newMiddleStations);
        }
        if (middleStations.includes(value)) {
            message.error('Trạm ở giữa không được trùng lặp!');
            setMiddleStations([])
            return;
        } else {
            setMiddleStations(newMiddleStations);
        }
        //
        // if (index === newMiddleStations.length - 1) {
        //     setShowMiddleStationSelect(true);
        // }
    };
    const handleAddMiddleStation = () => {
        setMiddleStations([...middleStations, null]);
        // setShowMiddleStationSelect(false);
    };

    useEffect(() => {
        getAllStations();
    }, []);

    return (
        <div>
            <Modal width={800}
                title={type === "new" ? "New BusRoute" : "Edit BusRoute"}
                open={showBusRouteForm}
                onCancel={() => { setShowBusRouteForm(false) }}
                footer={false}>
                <Form>
                    <Timeline mode="alternate">
                        <Timeline.Item color={"blue"}
                            dot={(<EnvironmentOutlined style={{ fontSize: '80px', }} />)}
                            children={(
                                <Form.Item label='Start' >
                                    <Select value={startStation} style={{ width: 200, }}
                                        onChange={handleStartStationChange}
                                        options={stations.map((station) => ({
                                            station_name: station.station_name,
                                            value: station.station_name
                                        }))} />
                                </Form.Item>
                            )}>
                        </Timeline.Item>
                        {middleStations.map((middleStation, index) => (
                            <Timeline.Item key={index}>
                                <Select key={index} placeholder={`Station ${index + 2}`}
                                    style={{ width: 200, }}
                                    onChange={(value) => handleMiddleStationChange(index, value)}
                                    options={stations.map((station) => ({
                                        station_name: station.station_name,
                                        value: station.station_name
                                    }
                                    ))}>
                                </Select>
                            </Timeline.Item>
                        ))}
                        <Timeline.Item color={"green"}
                            dot={(<SmileOutlined style={{ fontSize: '80px', }} />)}
                            children={(
                                <Form.Item label='End' >
                                    <Select value={endStation} style={{ width: 200, }}
                                        onChange={handleEndStationChange}
                                        options={stations.map((station) => ({
                                            station_name: station.station_name,
                                            value: station.station_name
                                        }))} />
                                </Form.Item>
                            )}
                        >
                        </Timeline.Item>
                    </Timeline>
                    <Form.Item className='d-flex justify-content-end'>
                        {showMiddleStationSelect &&
                            (<Button className="primary-btn" onClick={handleAddMiddleStation}>
                                Add middle station
                            </Button>
                            )}
                    </Form.Item>
                </Form>
            </Modal>
        </div >
    );
};

export default RouteForm;   
