import { Button, Form, Input, message, Select, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import Modal from 'antd/es/modal/Modal';
import React, { useState } from 'react';
import 'antd/dist/reset.css'
import "../../resources/form.css"
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/alertsSlice';
import { handleNewUserFunction, handleUpdateUserFunction } from '../../services/user.service';

const DriverForm = ({
    showDriverForm,
    setShowDriverForm,
    getDataDrivers,
    selectedDriver,
    setSelectedDriver,
    type = 'new',
}) => {
    const dispatch = useDispatch();

    //updaload img
    const [fileList, setFileList] = useState([]);
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    //create User
    const onFinish = async (values) => {
        const data = { ...values, profile_img: fileList[0]?.name || "", role_id: 3 }
        try {
            dispatch(ShowLoading())
            let response = null;
            if (type === "new") {
                response = await handleNewUserFunction(data);
                console.log('response in user form add : ', response)
            } else {
                response = await handleUpdateUserFunction(data, selectedDriver);
            }
            dispatch(HideLoading());
            setShowDriverForm(false);
            if (response.data.status === "Success") {
                message.success(response.data.message);
                dispatch(HideLoading());
            } else {
                dispatch(HideLoading());
                message.error(response.data.message)
            }
            getDataDrivers();
            setShowDriverForm(false);
            setSelectedDriver(null);
        } catch (error) {
            console.log('error in form: ', error)
        }
    }
    return (
        <div>
            <Modal
                width={800}
                title={type === "new" ? "New Driver" : "Edit Driver"}
                open={showDriverForm}
                onCancel={() => {
                    setShowDriverForm(false);
                    setSelectedDriver(null);
                }}
                footer={false}
            >
                <Form layout='horizontal' className='new-user' labelCol={{ span: 5 }} wrapperCol={{ span: 17 }} autoComplete="off"
                    onFinish={onFinish} initialValues={selectedDriver} >
                    <Form.Item label=" Driver Name : " name="fullname" rules={
                        [{
                            required: true,
                            message: 'Please input driver Name  Example : Nguyen Thanh Tung',
                        },
                        {
                            min: 3,
                            message: "Enter at least 3 characters ",
                        },
                        {
                            max: 20,
                            message: "Enter at max 20 characters "
                        }
                        ]}
                        hasFeedback>
                        <Input placeholder='Enter driver Name ' />
                    </Form.Item>
                    <Form.Item label="Email Address : " name="email" rules={
                        [{
                            required: true,
                            message: 'Please input driver Email  Example : Phuongntu@fpt.edu.vn',
                        },
                        {
                            pattern: /^.+@fpt\.edu\.vn$/,
                            message: "Please enter a valid email address with @fpt.edu.vn domain!",
                        },
                        ]}
                        hasFeedback>
                        <Input placeholder='Enter driver Email ' />
                    </Form.Item>
                    <Form.Item label=" Phone Number : " name="phone_number" rules={
                        [{
                            required: true,
                            message: 'Please input Phone Number! Example: 01234567890',
                        },
                        {
                            pattern: /^0\d{9}$/,
                            message: 'Phone number must contain 10 digits and start with 0 Example : 0123456789 ',
                        },
                        ]}
                        hasFeedback>
                        <Input placeholder="Enter driver phone number" />
                    </Form.Item>
                    <Form.Item label="Profile Image : " name="profile_img"
                        hasFeedback>
                        <ImgCrop rotate>
                            <Upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture-card"
                                fileList={fileList}
                                onChange={onChange}
                                onPreview={onPreview}
                            >
                                {fileList.length < 1 && '+ Upload'}
                            </Upload>
                        </ImgCrop>
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

export default DriverForm;