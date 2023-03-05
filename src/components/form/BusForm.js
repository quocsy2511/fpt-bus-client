import { Button, Form, Input, InputNumber, message } from 'antd';
import Modal from 'antd/es/modal/Modal';
import React from 'react';
import 'antd/dist/reset.css'
import "../../resources/form.css"
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/alertsSlice';
import { handleNewBusFunction } from '../../services/bus.service';
import { handleUpdateBusFunction } from '../../services/bus.service';

const BusForm = ({
    showBusForm,
    setShowBusForm,
    type = 'new',
    getData,
    selectedBus,
    setSelectedBus,
}) => {
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        // console.log(" values in onfinish ", values);
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

    return (
        <div>
            <Modal
                width={800}
                title={type === "new" ? "New Bus" : "Edit Bus"}
                open={showBusForm}
                onCancel={() => {
                    setShowBusForm(false)
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
                        <Input placeholder='Enter Bus License Plate ' />
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
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item label="Driver Id: " name="driver_id" rules={
                        [{
                            required: true,
                            message: 'Please input Driver Id!',

                        },
                        {
                            whitespace: true,
                            message: 'Please type License Plate!'
                        },
                        ]} hasFeedback>
                        <Input placeholder='Enter Driver Id ' />
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