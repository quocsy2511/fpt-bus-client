import { Col, Form, Row } from 'antd';
import Modal from 'antd/es/modal/Modal';
import React from 'react';
import 'antd/dist/reset.css'
import "../../resources/form.css"


const UserForm = ({
    showUserForm,
    setShowUserForm,
}) => {
    return (
        <div>
            <Modal
                width={800}
                title={"New User"}
                open={showUserForm}
                onCancel={() => {
                    setShowUserForm(false)
                }}
                footer={false}
            >
                <Form layout='horizontal' className='new-user' labelCol={{ span: 8 }} >
                    <Row>
                        <Col lg={20} xs={24}>
                            <Form.Item label=" Student ID :" name="student_id">
                                <input type="text" placeholder='Enter your Student ID ' />
                            </Form.Item>

                        </Col>
                    </Row>
                    <Row>
                        <Col lg={20} xs={24} className='content-input'>
                            <Form.Item label=" User Name : " name="fullname">
                                <input type="text" placeholder='Enter your Name ' />
                            </Form.Item>

                        </Col>
                    </Row>
                    <Row>
                        <Col lg={20} xs={24} className='content-input'>
                            <Form.Item label="Email Address : " name="email">
                                <input type="text" placeholder='Enter your Email Address ' />
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

export default UserForm;