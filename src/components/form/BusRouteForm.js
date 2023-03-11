import { Button, Form, Input, message, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { Timeline, Select } from 'antd';
import { SmileOutlined, EnvironmentOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css'
import "../../resources/form.css"
import { handleNewBusRouteFunction, handleUpdateBusRouteFunction } from '../../services/busRoute.service';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/alertsSlice';

const RouteForm = ({
    showBusRouteForm,
    setShowBusRouteForm,
    type = 'new',
    setSelectedBusRoute,
    getData,
    selectedBusRoute,
    stations
}) => {
    const [startStation, setStartStation] = useState("Departure");
    const [endStation, setEndStation] = useState("Destination");
    const [middleStations, setMiddleStations] = useState([]);
    const [showMiddleStationSelect, setShowMiddleStationSelect] = useState(false);
    const dispatch = useDispatch();
    const [stationsBetween, setStationsBetween] = useState(selectedBusRoute?.stations)
    console.log('stationsBetween  : ', stationsBetween)


    const handleStartStationChange = (value) => {
        console.log('value start :', value)
        if (value === endStation) {
            message.error('Trạm xuất phát không được trùng với trạm kết thúc!');
            setStartStation("Departure")
        }
        else if (middleStations.includes(value)) {
            message.error('Trạm xuất phát không được trùng với trạm ở giữa!');
            setStartStation("Departure")
        } else {
            setStartStation(value);
        }

        if (value !== "Departure" && value !== endStation && value !== "Destination") {
            setShowMiddleStationSelect(true);
        }
        if (value === endStation) {
            setEndStation("Destination");
        }
    };

    const handleEndStationChange = (value) => {
        console.log('value end', value)
        if (value === startStation) {
            message.error('Trạm kết thúc không được trùng với trạm xuất phát!');
            setEndStation("Destination");
        } else if (middleStations.includes(value)) {
            message.error('Trạm kết thúc không được trùng với trạm ở giữa!');
            setEndStation("Destination");
        } else {
            setEndStation(value);
        }

        if (value !== "Destination" && value !== startStation && value !== "Departure") {
            setShowMiddleStationSelect(true);
        }

        if (value === startStation) {
            setStartStation("Departure");
        }
    };

    const handleMiddleStationChange = (index, value) => {
        const newMiddleStations = [...middleStations];
        console.log('newMiddleStations', newMiddleStations)
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
    };


    const handleStationsBetweenChange = (index, value) => {
        if (value === startStation || value === endStation) {
            message.error('Trạm ở giữa không được trùng với trạm đã chọn!');
            return setStationsBetween([])
        }
        const newStationsBetween = [...stationsBetween];

        if (newStationsBetween.includes(value)) {
            message.error('Trạm ở giữa không được trùng lặp!');
            setStationsBetween([])
            return;
        }
        newStationsBetween[index] = value; // cập nhật phần tử tại index với giá trị mới

        setStationsBetween(newStationsBetween); // cập nhật mảng stationsBetween với bản sao mới
    };

    const handleAddMiddleStation = () => {
        setMiddleStations([...middleStations, null]);
    };

    const onFinish = async (values) => {
        console.log('values', values)
        const dataMiddleStation = { ...values, stations: middleStations }
        console.log('dataMiddleStation', dataMiddleStation)
        const dataStationsBetween = { ...values, stations: stationsBetween }
        console.log('dataStationsBetween : ', dataStationsBetween)
        try {
            dispatch(ShowLoading())
            let response = null;
            if (type === "new") {
                response = await handleNewBusRouteFunction(dataMiddleStation);
                console.log('response in bus form add : ', response)
            } else {
                response = await handleUpdateBusRouteFunction(dataStationsBetween, selectedBusRoute);
                console.log('response in route: ', response)
            }
            dispatch(HideLoading());
            setShowBusRouteForm(false);
            if (response.data.status === "Success") {
                message.success(response.data.message);
                dispatch(HideLoading());
            } else {
                dispatch(HideLoading());
                message.error(response.data.message)
            }
            getData();
            setShowBusRouteForm(false);
            setSelectedBusRoute(null)
        } catch (error) {
            console.log('error in form', error)
        }
    }

    return (
        <div>
            <Modal width={800}
                title={type === "new" ? "New BusRoute" : "Edit BusRoute"}
                open={showBusRouteForm}
                onCancel={() => { setShowBusRouteForm(false); setSelectedBusRoute(null); }}
                footer={false}>
                <Form onFinish={onFinish}
                    initialValues={selectedBusRoute}>
                    <Form.Item className='d-flex justify-content-end'>
                        {showMiddleStationSelect &&
                            (<Button className="primary-btn" onClick={handleAddMiddleStation}>
                                Add middle station
                            </Button>
                            )}
                    </Form.Item>
                    <Form.Item label="Route Name :" name="route_name" rules={
                        [{
                            required: true,
                            message: 'Please input License Plate! Example : route 1',
                        },
                        {
                            whitespace: true,
                            message: 'Please type License Plate!'
                        },
                        {
                            min: 5,
                            message: "Enter at least 5 characters Example : route 1",
                        },
                        {
                            max: 25,
                            message: "Enter at max 25 characters Example : route 1"
                        }
                        ]}
                        hasFeedback>
                        <Input placeholder='Enter route name' />
                    </Form.Item>
                    <br />
                    <Timeline mode="alternate" >
                        <Timeline.Item color={"blue"}
                            dot={(<EnvironmentOutlined style={{ fontSize: '80px', }} />)}
                            children={(
                                <Form.Item label='Start' name="start"
                                    initialValue={selectedBusRoute?.departure || startStation}
                                >
                                    <Select
                                        value={startStation}
                                        style={{ width: 200, }}
                                        onChange={handleStartStationChange}
                                        options={stations.map((station) => ({
                                            label: station.station_name,
                                            value: station.id
                                        }))} />
                                </Form.Item>
                            )}>
                        </Timeline.Item>
                        {middleStations.map((middleStation, index) => (
                            <Timeline.Item key={index}
                                children={(
                                    <Form.Item >
                                        <Select key={index} placeholder={`Station ${index + 2}`}
                                            style={{ width: 200, }}
                                            onChange={(value) => handleMiddleStationChange(index, value)}
                                            options={stations.map((station) => ({
                                                label: station.station_name,
                                                value: station.id
                                            }
                                            ))}>
                                        </Select>
                                    </Form.Item>
                                )}>
                            </Timeline.Item>
                        ))}
                        {stationsBetween && stationsBetween.map((stationBetween, index) => (
                            <Timeline.Item key={index}
                                children={(
                                    <Form.Item initialValue={stationBetween.station_name}>
                                        <Select key={index}
                                            defaultValue={stationBetween.station_name}
                                            style={{ width: 200, }}
                                            onChange={(value) => handleStationsBetweenChange(index, value)}
                                            options={stations.map((station) => ({
                                                label: station.station_name,
                                                value: station.id
                                            }
                                            ))}>
                                        </Select>
                                    </Form.Item>
                                )}>
                            </Timeline.Item>
                        ))}
                        <Timeline.Item color={"green"}
                            dot={(<SmileOutlined style={{ fontSize: '80px', }} />)}
                            children={(
                                <Form.Item label='End' name="end"
                                    initialValue={selectedBusRoute?.destination || endStation}
                                >
                                    <Select
                                        value={endStation}
                                        style={{ width: 200, }}
                                        onChange={handleEndStationChange}
                                        options={stations.map((station) => ({
                                            label: station.station_name,
                                            value: station.id
                                        }))} />
                                </Form.Item>
                            )}>
                        </Timeline.Item>
                    </Timeline>
                    <Form.Item className='d-flex justify-content-end'>
                        <Button className="primary-btn" htmlType='submit' >
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default RouteForm;   
