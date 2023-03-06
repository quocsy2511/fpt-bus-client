
import { Button, Form, Input, message, Checkbox } from 'antd';
import Modal from 'antd/es/modal/Modal';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/alertsSlice';
import { handleNewStationFunction } from '../../services/station.service'
import { handleUpdateStationFunction } from '../../services/station.service';
import 'antd/dist/reset.css'
import "../../resources/form.css"

const StationForm = ({
    showStationForm,
    setShowStationForm,
    type = 'new',
    getData,
    selectedStation,
    setSelectedStation,
}) => {
    const [checked, setChecked] = useState(false);
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        // console.log('values in station : ', values)
        const data = {
            ...values,
            status: checked
        };
        console.log(data);
        try {
            dispatch(ShowLoading())
            let response = null;
            if (type === "new") {
                response = await handleNewStationFunction(values);
                console.log('response in Station form add : ', response)
            } else {
                response = await handleUpdateStationFunction(data, selectedStation);
                console.log('response in Station form update', response)
            }
            dispatch(HideLoading());
            setShowStationForm(false);
            if (response.data.status === "Success") {
                message.success(response.data.message);
                dispatch(HideLoading());
            } else {
                dispatch(HideLoading());
                message.error(response.data.message)
            }
            getData();
            setShowStationForm(false);
            setSelectedStation(null);
        } catch (error) {
            console.log("error in Station form: ", error);
            dispatch(HideLoading());
        }
    }

    return (
        <div>
            <Modal
                width={800}
                title={type === "new" ? "New Station" : "Edit Station"}
                open={showStationForm}
                onCancel={() => {
                    setShowStationForm(false)
                }}
                footer={false}>
                <Form layout='horizontal' className='new-user' labelCol={{ span: 5 }} wrapperCol={{ span: 17 }} autoComplete="off"
                    onFinish={onFinish} initialValues={selectedStation}>
                    <Form.Item label="Station Name" name="station_name" rules={
                        [{
                            required: true,
                            message: 'Please input License Plate! Example : FPT University',
                        },
                        {
                            whitespace: true,
                            message: 'Please type License Plate!'
                        },
                        {
                            min: 10,
                            message: "Enter at least 10 characters Example : FPT University",
                        },
                        ]}
                        hasFeedback>
                        <Input placeholder='Enter Station Name ' />
                    </Form.Item>
                    <Form.Item label="Longitude" name="longitude" rules={
                        [{
                            required: true,
                            message: 'Please input Longitude!',
                        },
                        {
                            pattern: /^[0-9.]+$/,
                            message: 'Please input numbers only! Example : 10.8019828',
                        },
                        {
                            max: 45,
                            min: 9,
                            message: "Longitude must be between 9 and 45!"
                        }
                        ]} hasFeedback>
                        <Input style={{ width: "100%" }} placeholder='Enter Station Longitude ' />
                    </Form.Item>
                    <Form.Item label="Latitude" name="latitude" rules={
                        [{
                            required: true,
                            message: 'Please input Latitude!',
                        },
                        {
                            pattern: /^[0-9.]+$/,
                            message: 'Please input numbers only! Example : 100.7919828',
                        },
                        {
                            max: 45,
                            min: 9,
                            message: "Latitude must be between 9 and 45!"
                        }
                        ]} hasFeedback>
                        <Input placeholder='Enter Station Latitude ' />
                    </Form.Item>s
                    <Form.Item style={{ "marginLeft": "150px" }}
                        checked={checked} >
                        <Checkbox onChange={(e) => setChecked(e.target.checked)}>
                            Active Station
                        </Checkbox>
                    </Form.Item>
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

export default StationForm;

