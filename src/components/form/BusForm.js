import { Button, Form, Input, InputNumber, message, Select } from 'antd';
import Modal from 'antd/es/modal/Modal';
import React, { useEffect, useState } from 'react';
import 'antd/dist/reset.css'
import "../../resources/form.css"
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/alertsSlice';
import { handleUpdateBusFunction, handleNewBusFunction } from '../../services/bus.service';
import { getAllDriversFunction } from '../../services/user.service';


const BusForm = ({
    showBusForm,
    setShowBusForm,
    type = 'new',
    getData,
    selectedBus,
    setSelectedBus,
}) => {
    const [drivers, setDrivers] = useState([])
    const dispatch = useDispatch();

    const getAllDrivers = async () => {
        try {
            dispatch(ShowLoading());
            const response = await getAllDriversFunction()
            console.log('response get all user: ', response)
            dispatch(HideLoading());
            if (response?.data?.status === "Success") {
                const drivers = response.data.data.filter((item) => item.RoleType?.role_name === "DRIVER");
                setDrivers(drivers)
            } else {
                message.error(response.data?.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    const onFinish = async (values) => {
        console.log(" values in onfinish ", values);
        try {
            dispatch(ShowLoading())
            let response = null;
            if (type === "new") {
                response = await handleNewBusFunction(values);
                console.log('response in bus form add : ', response)
            } else {
                response = await handleUpdateBusFunction(values, selectedBus);
            }
            dispatch(HideLoading());
            setShowBusForm(false);
            if (response.data.status === "Success") {
                message.success(response.data.message);
                dispatch(HideLoading());
            } else {
                dispatch(HideLoading());
                message.error(response.data.message)
            }
            getData();
            setShowBusForm(false);
            setSelectedBus(null);
        } catch (error) {
            console.log("error in bus form: ", error);
            dispatch(HideLoading());
        }
    }

    useEffect(() => {
        getAllDrivers()
    }, [])

    return (
        <div>
            <Modal
                width={800}
                title={type === "new" ? "New Bus" : "Edit Bus"}
                open={showBusForm}
                onCancel={() => {
                    setShowBusForm(false); setSelectedBus(null);
                }}
                footer={false}
            >
                <Form layout='horizontal' className='new-user' labelCol={{ span: 5 }} wrapperCol={{ span: 17 }} autoComplete="off"
                    onFinish={onFinish} initialValues={selectedBus}
                >
                    <Form.Item label="License Plate :" name="license_plate" rules={
                        [{
                            required: true,
                            message: 'Please input License Plate! Example : 29B-144.21',
                        },
                        {
                            pattern: /^[A-Z0-9.-]+$/,
                            message: "Only uppercase letters, digits, periods, and hyphens are allowed. Example: 29B-144.21",
                        },
                        {
                            whitespace: true,
                            message: 'Please type License Plate!'
                        },
                        {
                            min: 10,
                            message: "Enter at least 10 characters Example : 29B-144.21",
                        },
                        {
                            max: 10,
                            message: "Enter at max 10characters Example : 29B-144.21"
                        }
                        ]}
                        hasFeedback>
                        {/* <input type="text" placeholder='Enter Bus License Plate ' /> */}
                        <Input placeholder='Enter Bus License Plate '  />
                    </Form.Item>
                    <Form.Item label="Seat Quantity: " name="seat_quantity" rules={
                        [{
                            required: true,
                            message: 'Please input Seat Quantity!',
                        },
                        {
                            type: "number",
                            max: 45,
                            min: 10,
                            message: "Seat quantity must be between 10 and 45!"
                        }
                        ]} hasFeedback>
                        <InputNumber className='seat-quantity' />
                    </Form.Item>
                    <Form.Item label="Driver : " name="driver_id" rules={
                        [{
                            required: true,
                            message: 'Please choose Driver !',
                        },
                        ]} hasFeedback>
                        <Select className='driver'
                            // onChange={handleChange}
                            placeholder="choose driver "
                            options={drivers && drivers.length > 0 ? drivers.map((driver) => ({
                                value: driver.id,
                                label: driver.fullname,
                            })) : []}
                        />
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

export default BusForm;