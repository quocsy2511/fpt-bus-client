import React from 'react';
import { Button, Form, Input, InputNumber, message, Modal, Select } from 'antd';
import 'antd/dist/reset.css'
import "../../resources/form.css"
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/alertsSlice';
import { handleNewNotiForUserFunction } from '../../services/noti.service';
const NotiForm = ({
    showNotiForm,
    setShowNotiForm,
    selectedUser,
    setSelectedUser
}) => {
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        console.log('values', values)
        try {
            dispatch(ShowLoading())
            const response = await handleNewNotiForUserFunction(values, selectedUser);
            console.log('response in noti form  : ', response)
            dispatch(HideLoading());
            setShowNotiForm(false);
            if (response.data.status === "Success") {
                message.success(response.data.message);
                dispatch(HideLoading());
            } else {
                dispatch(HideLoading());
                message.error(response.data.message)
            }
            setShowNotiForm(false);
            setSelectedUser(null);
        } catch (error) {
            console.log('error in form: ', error)
        }
    }

    return (
        <div>
            <Modal
                width={800}
                title={"Notification"}
                open={showNotiForm}
                onCancel={() => {
                    setShowNotiForm(false);
                    selectedUser(null);
                }}
                footer={false}
            >
                <Form layout='horizontal' className='new-user' labelCol={{ span: 5 }} wrapperCol={{ span: 17 }} autoComplete="off"
                    onFinish={onFinish}
                    initialValues={selectedUser}
                >
                    <Form.Item label="Title :" name="title" rules={[
                        {
                            required: true,
                            message: 'Please input ',
                        }
                    ]}
                        hasFeedback>
                        <Input placeholder='Enter Title' />
                    </Form.Item>
                    <Form.Item label="Content:" name="content" rules={[
                        {
                            required: true,
                            message: 'Please input ',
                        }
                    ]}
                        hasFeedback>
                        <Input placeholder='Enter Content ' />
                    </Form.Item>
                    <Form.Item className='d-flex justify-content-end'>
                        <Button className="primary-btn" htmlType='submit' >
                            Send
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default NotiForm;