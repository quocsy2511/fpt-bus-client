import { Col, Form, Row } from 'antd';
import Modal from 'antd/es/modal/Modal';
import React from 'react';
import 'antd/dist/reset.css'
import "../../resources/form.css"

const BusForm = ({
    showBusForm,
    setShowBusForm,
}) => {
    return (
        <div>
            <Modal
                width={800}
                title={"New User"}
                open={showBusForm}
                onCancel={() => {
                    setShowBusForm(false)
                }}
                footer={false}
            >
                <Form layout='horizontal' className='new-user' labelCol={{ span: 8 }} >
                    <Row>
                        <Col lg={20} xs={24}>
                            <Form.Item label="License Plate :" name="license_plate" >
                                <input type="text" placeholder='Enter Bus License Plate ' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={20} xs={24} className='content-input'>
                            <Form.Item label="Seat Quantity: " name="seat_quantity">
                                <input type="number" placeholder='Enter Seat Quantity' min={1} />
                            </Form.Item>

                        </Col>
                    </Row>
                    <Row>
                        <Col lg={20} xs={24} className='content-input'>
                            <Form.Item label="Driver Id: " name="driver_id">
                                <input type="text" placeholder='Enter Driver Id' />
                            </Form.Item>

                        </Col>
                    </Row>
                    <div className="d-flex justify-content-end">
                        <button className="primary-btn" type="submit">
                            Save
                        </button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default BusForm;