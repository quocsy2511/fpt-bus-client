import { Button, Form, message, Modal } from 'antd';
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
    console.log("stations:",stations);
    const dispatch = useDispatch();


    const handleStartStationChange = (value) => {
        console.log('value start :', value)
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
        console.log('value end', value)
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
        //
        // if (index === newMiddleStations.length - 1) {
        //     setShowMiddleStationSelect(true);
        // }
    };

    const handleAddMiddleStation = () => {
        setMiddleStations([...middleStations, null]);
        // setShowMiddleStationSelect(false);
    };

    const onFinish = async (values) => {
        const data = { ...values, stations: middleStations }
        console.log('data : ', data)
        try {
            dispatch(ShowLoading())
            let response = null;
            if (type === "new") {
                response = await handleNewBusRouteFunction(data);
                console.log('response in bus form add : ', response)
            } else {
                response = await handleUpdateBusRouteFunction(data, selectedBusRoute);
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
                <Form onFinish={onFinish} initialValues={selectedBusRoute}>
                    <Form.Item className='d-flex justify-content-end'>
                        {showMiddleStationSelect &&
                            (<Button className="primary-btn" onClick={handleAddMiddleStation}>
                                Add middle station
                            </Button>
                            )}
                    </Form.Item>
                    <Timeline mode="alternate" >
                        <Timeline.Item color={"blue"}
                            dot={(<EnvironmentOutlined style={{ fontSize: '80px', }} />)}
                            children={(
                                <Form.Item label='Start' name="start" >
                                    <Select defaultValue={selectedBusRoute?.departure || stations[0]?.station_name} style={{ width: 200, }}
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
                                    <Form.Item>
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
                        <Timeline.Item color={"green"}
                            dot={(<SmileOutlined style={{ fontSize: '80px', }} />)}
                            children={(
                                <Form.Item label='End' name="end"  >
                                    <Select defaultValue={selectedBusRoute?.destination || stations[1]?.station_name} style={{ width: 200, }}
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
