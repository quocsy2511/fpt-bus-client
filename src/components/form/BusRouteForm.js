import { Button, Form, Input, message, Modal } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
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
    const dispatch = useDispatch();
    const [startStation, setStartStation] = useState("Departure");
    const [endStation, setEndStation] = useState("Destination");
    const [middleStations, setMiddleStations] = useState([]);
    console.log('middleStations', middleStations)
    const [showMiddleStationSelect, setShowMiddleStationSelect] = useState(false);
    const [stationsBetween, setStationsBetween] = useState([])
    console.log('stationsBetween', stationsBetween)
    const [errorDuplication, setErrorDuplication] = useState(false)

    const handleStartStationChange = (value) => {
        console.log('value start :', value)
        //check điều kiện với end
        if (value === endStation) {
            setErrorDuplication(true)
            message.error('The starting station must not be the same as the ending station please choose again !');
            setStartStation(value)
        } else {
            //check điều kiện với mid khi add
            if (middleStations.includes(value)) {
                setErrorDuplication(true)
                message.error('The starting station must not be the same as the middle station please choose again !');
            } //check điều kiện với mid khi update
            else if (stationsBetween.includes(value)) {
                setErrorDuplication(true)
                message.error('The starting station must not be the same as the middle station please choose again !');
            }
            else {
                setErrorDuplication(false)
                setStartStation(value)
                if (endStation !== "Destination" && type === "new") {
                    setShowMiddleStationSelect(true);
                } else {
                    setShowMiddleStationSelect(false);
                }
            }
        }
    };

    const handleEndStationChange = (value) => {
        if (value === startStation) {
            setErrorDuplication(true)
            message.error('The ending station must not be the same as the starting station! please choose again ');
            setEndStation(value);
        } else {
            if (middleStations.includes(value)) {
                setErrorDuplication(true)
                message.error('The end station must not coincide with the middle station! Please choose again');
            } else if (stationsBetween.includes(value)) {
                setErrorDuplication(true)
                message.error('The end station must not be the same as the middle station please choose again !');
            }
            else {
                setErrorDuplication(false)
                setEndStation(value);
                if (startStation !== "Departure" && type === "new") {
                    setShowMiddleStationSelect(true);
                } else {
                    setShowMiddleStationSelect(false);
                }
            }
        }
    };

    const handleMiddleStationChange = (index, value) => {
        const newMiddleStations = [...middleStations];
        newMiddleStations[index] = value;
        if (value === startStation || value === endStation) {
            setErrorDuplication(true)
            message.error('The station in the middle cannot match the selected station! please choose again ');
        } else {
            if (middleStations.includes(value)) {
                setErrorDuplication(true)
                message.error('Stations in the middle cannot be duplicated ! please choose again');
            } else if (stationsBetween.includes(value)) {
                setErrorDuplication(true)
                message.error('Stations in the middle cannot be duplicated ! please choose again');
            } else {
                setErrorDuplication(false)
                setMiddleStations(newMiddleStations);
            }
        }
    };

    const handleStationsBetweenChange = (index, value) => {
        console.log('value', value)
        console.log('index', index)

        const newStationsBetween = [...stationsBetween];
        console.log('value between ', value)

        if (value === startStation || value === endStation) {
            setErrorDuplication(true)
            message.error('The station in the middle cannot match the selected station! please choose again');
        } else {
            if (newStationsBetween.includes(value)) {
                setErrorDuplication(true)
                message.error('Stations in the middle cannot be duplicated ! please choose again ');
            } else {
                if (startStation === endStation) {
                    setErrorDuplication(true)
                    message.error('Stations in the start and end cannot be duplicated ! please choose again  <3 ');
                } else {
                    setErrorDuplication(false)
                    newStationsBetween[index] = value; // cập nhật phần tử tại index với giá trị mới
                    setStationsBetween(newStationsBetween); // cập nhật mảng stationsBetween với bản sao mới
                }
            }
        }
    };

    const handleAddMiddleStation = () => {
        setMiddleStations([...middleStations, null]);
    };
    const onFinish = async (values) => {
        if (errorDuplication) {
            message.error("Can't create route when there are 2 same stations")
            return;
        }
        const dataMiddleStation = { ...values, stations: middleStations }
        // console.log('dataMiddleStation', dataMiddleStation)
        const dataStationsBetween = { ...values, stations: stationsBetween.concat(middleStations || "") }
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
            dispatch(HideLoading());
            if (error.message) {
                message.error(error.message);
            } else {
                message.error("Something went wrong!");
            }
        }
    }

    // dùng để tìm id theo name khi edit mà ko chọn select start (code ngu)
    const initialStationStart = useMemo(() => {
        if (selectedBusRoute?.departure) {
            const stationStart = stations.find((item) => selectedBusRoute?.departure === item.station_name)
            setStartStation(stationStart?.id)
        } else {
            setStartStation("Departure");
        }
    }, [selectedBusRoute, stations])

    // dùng để tìm id theo name khi edit mà ko chọn select end (code ngu)
    const initialStationEnd = useMemo(() => {
        if (selectedBusRoute?.destination) {
            const stationEnd = stations.find((item) => selectedBusRoute?.destination === item.station_name)
            setEndStation(stationEnd?.id)
        } else {
            setEndStation("Destination");
        }
    }, [selectedBusRoute, stations])

    useEffect(() => {
        // truyền id từ trong mảng station ơ giữa vô stationBetween 
        if (selectedBusRoute?.stations && selectedBusRoute.stations.length > 0) {
            const stationBetweenIDs = selectedBusRoute?.stations.map((item) => item.id)
            setStationsBetween(stationBetweenIDs);
        }
        if (selectedBusRoute) {
            setShowMiddleStationSelect(true)
        }
    }, [selectedBusRoute?.stations, showMiddleStationSelect])

    return (
        <div>
            <Modal width={800}
                title={type === "new" ? "New BusRoute" : "Edit BusRoute"}
                open={showBusRouteForm}
                onCancel={() => { setShowBusRouteForm(false); setSelectedBusRoute(null); }}
                footer={false}>
                <Form onFinish={onFinish}
                    initialValues={selectedBusRoute}>
                    {showMiddleStationSelect &&
                        (<div className='d-flex justify-content-end'
                            style={{ marginTop: "20px" }} >
                            <Button className="primary-btn" onClick={handleAddMiddleStation}>
                                Add middle station
                            </Button>
                        </div>)}
                    <Form.Item label="Route Name :" name="route_name" style={{ marginTop: "30px" }}
                        rules={
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
                                    initialValue={startStation || "Departure"}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please choose a station.',
                                        },
                                    ]}
                                >
                                    <Select
                                        // value={startStation}
                                        style={{ width: 200, }}
                                        required
                                        onChange={handleStartStationChange}
                                        options={stations.map((station) => ({
                                            label: station.station_name,
                                            value: station.id
                                        }))} />
                                </Form.Item>
                            )}>
                        </Timeline.Item>
                        {middleStations.map((middleStation, index) => (
                            <Timeline.Item key={index} color={"red"}
                                children={(
                                    <Form.Item >
                                        <Select placeholder={`Station ${index + 2}`}
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
                                    <Form.Item >
                                        <Select key={index}
                                            defaultValue={stationBetween}
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
                                    initialValue={endStation || "Destination"}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please choose a station.',
                                        },
                                    ]}
                                >
                                    <Select
                                        // value={endStation}
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
