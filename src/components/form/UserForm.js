import { Button, Form, Input, message, Select, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import Modal from 'antd/es/modal/Modal';
import React, { useState } from 'react';
import 'antd/dist/reset.css'
import "../../resources/form.css"
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/alertsSlice';
import { handleNewUserFunction, handleUpdateUserFunction } from '../../services/user.service';

const UserForm = ({
    showUserForm,
    setShowUserForm,
    getDataStudents,
    getDataDrivers,
    selectedUser,
    setSelectedUser,
    type = 'new',
}) => {
    const dispatch = useDispatch();
    const [showStudentId, setShowStudentId] = useState(false);
    const role = [
        {
            role_name: "STUDENT",
            role_id: 2
        },
        {
            role_name: "DRIVER",
            role_id: 3
        }];

    //showStudentID
    const handleRoleChange = (value) => {
        if (value === 2) { // if the selected role is STUDENT
            setShowStudentId(true); // show the Student ID input
        } else {
            setShowStudentId(false); // hide the Student ID input
        }
    };

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
        const data = { ...values, profile_img: fileList[0].name }

        try {
            dispatch(ShowLoading())
            let response = null;
            if (type === "new") {
                response = await handleNewUserFunction(data);
                console.log('response in user form add : ', response)
            } else {
                response = await handleUpdateUserFunction(data, selectedUser);
            }
            dispatch(HideLoading());
            setShowUserForm(false);
            if (response.data.status === "Success") {
                message.success(response.data.messages);
                dispatch(HideLoading());
            } else {
                dispatch(HideLoading());
                message.error(response.data.messages)
            }
            getDataStudents();
            getDataDrivers();
            setShowUserForm(false);
            setSelectedUser(null);
        } catch (error) {
            console.log('error in form: ', error)

        }

    }

    //validation form
    const validateStudentId = (_, value) => {
        const regex = /^[A-Z]{2}\d{6}$/;
        if (!regex.test(value)) {
            return Promise.reject('Please enter a valid Student ID: 2 capital letters and 6 digits Example : SE123456');
        }
        const prefix = value.slice(0, 2);
        const validPrefixes = ['SS', 'SA', 'SE'];
        if (!validPrefixes.includes(prefix)) {
            return Promise.reject('Please enter a valid Student ID prefix: SS, SA, or SE');
        }
        return Promise.resolve();
    };



    return (
        <div>
            <Modal
                width={800}
                title={type === "new" ? "New Bus" : "Edit Bus"}
                open={showUserForm}
                onCancel={() => {
                    setShowUserForm(false);
                    setSelectedUser(null);
                }}
                footer={false}
            >
                <Form layout='horizontal' className='new-user' labelCol={{ span: 5 }} wrapperCol={{ span: 17 }} autoComplete="off"
                    onFinish={onFinish} initialValues={selectedUser} >
                    <Form.Item label="Role : " name="role_id" rules={
                        [{
                            required: true,
                            message: 'Please choose Role !',
                        },
                        ]} hasFeedback>
                        <Select className='driver'
                            placeholder="choose driver "
                            options={role.map((item) => ({
                                value: item.role_id,
                                label: item.role_name,
                            }))}
                            onChange={handleRoleChange}
                        />
                    </Form.Item>
                    {showStudentId &&
                        (<Form.Item label=" Student ID :" name="student_id" rules={
                            [{
                                required: true,
                                message: 'Please input License Plate! Example : SE123456',
                            },
                            {
                                whitespace: true,
                                message: 'Please type License Plate!'
                            },
                            {
                                validator: validateStudentId,
                            },
                            {
                                min: 8,
                                message: "Enter at least 8 characters Example : SE151029",
                            },
                            {
                                max: 8,
                                message: "Enter at max 8 characters "
                            }
                            ]}
                            hasFeedback>
                            <Input placeholder='Enter your Student ID ' />
                        </Form.Item>)}
                    <Form.Item label=" User Name : " name="fullname" rules={
                        [{
                            required: true,
                            message: 'Please input your Name  Example : Nguyen Thanh Tung',
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
                        <Input placeholder='Enter your Name ' />
                    </Form.Item>
                    <Form.Item label="Email Address : " name="email" rules={
                        [{
                            required: true,
                            message: 'Please input your Email  Example : Phuongntu@fpt.edu.vn',
                        },
                        {
                            pattern: /^.+@fpt\.edu\.vn$/,
                            message: "Please enter a valid email address with @fpt.edu.vn domain!",
                        },
                        ]}
                        hasFeedback>
                        <Input placeholder='Enter your Email ' />
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
                        <Input placeholder="Enter your phone number" />
                    </Form.Item>
                    {/* <Form.Item label="Profile Image : " name="profile_img" rules={
                        [{
                            required: true,
                            message: 'Please input your Email  Example : Phuongntu@fpt.edu.vn',
                        },
                        ]}
                        hasFeedback>
                        <Input placeholder='Enter your Profile Image ' />
                    </Form.Item> */}
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

export default UserForm;