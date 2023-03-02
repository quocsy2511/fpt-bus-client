import { Form, Modal } from 'antd';
import React, { useState } from 'react';
import { Timeline } from 'antd';
import { SmileOutlined, EnvironmentOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css'
import "../../resources/form.css"

const stations = ['Station A', 'Station B', 'Station C', 'Station D', 'Station E'];

const RouteForm = ({
    showBusRouteForm,
    setShowBusRouteForm,
    type = 'new',
}) => {
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [stationsInBetween, setStationsInBetween] = useState([]);
    const [addStation, setAddStation] = useState(false);

    const handleStartChange = (event) => {
        setStart(event.target.value);
    };

    const handleEndChange = (event) => {
        setEnd(event.target.value);
    };

    const handleStationChange = (event) => {
        setStationsInBetween([...stationsInBetween, event.target.value]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Do something with start, end, and stationsInBetween
    };

    return (
        <div>
            <Modal width={800}
                title={type === "new" ? "New BusRoute" : "Edit BusRoute"}
                open={showBusRouteForm}
                onCancel={() => {
                    setShowBusRouteForm(false)
                }}
                footer={false}>
                <Timeline
                    mode="alternate"
                    items={[
                        {
                            color: "blue",
                            dot: (
                                <EnvironmentOutlined
                                    style={{
                                        fontSize: '80px',
                                    }}
                                />),
                            children: <strong>VinHome center park</strong>,
                        },
                        {
                            color: "gray",
                            children: 'Ngã tư Thủ đức ',
                        },
                        {
                            color: "gray",
                            children: 'Hutech University',
                        },
                        {
                            dot: (
                                <SmileOutlined
                                    style={{
                                        fontSize: '80px',
                                    }}
                                />),
                            color: "green",
                            children: <strong>FPT University</strong>,
                        },
                    ]}
                />
            </Modal>
        </div>
    );
};

export default RouteForm;