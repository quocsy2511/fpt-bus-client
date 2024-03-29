import { Button, Form, Input, message, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import Modal from 'antd/es/modal/Modal';
import React, { useState } from 'react';
import 'antd/dist/reset.css'
import "../../resources/form.css"
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/alertsSlice';
import { handleFileUploadFunction, handleNewUserFunction, handleUpdateUserFunction } from '../../services/user.service';

const UserForm = ({
    showUserForm,
    setShowUserForm,
    getDataStudents,
    selectedUser,
    setSelectedUser,
    type = 'new',
}) => {
    const dispatch = useDispatch();

    //updaload img
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([
        {
            uid: "-1", name: "defaultImage.png",
            status: "done",
            url: selectedUser?.profile_img
        }
    ]);
    const [urlImage, setUrlImage] = useState("")

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleFileUpload = async (previewImage) => {
        const base64 = await getBase64(previewImage);
        try {
            const response = await handleFileUploadFunction(base64)
            console.log('response upload File', response)
            if (response?.data?.status === "Success") {
                message.success(response.data.messages);
                console.log("url image : ", response.data.data.imageUrl);
                setUrlImage(response.data.data.imageUrl)
            } else {
                message.error(response.data.messages)
            }
        } catch (error) {
            console.log('error in upload : ', error)
            message.error(error.message);
        }
    }

    //create User
    const onFinish = async (values) => {
        const data = { ...values, profile_img: urlImage || "", role_id: 2 }
        console.log('data', data)
        try {
            dispatch(ShowLoading())
            let response = null;
            if (type === "new") {
                response = await handleNewUserFunction(data);
                console.log('response in user form add : ', response)
            } else {
                response = await handleUpdateUserFunction(data, selectedUser);
                console.log('response', response)
            }
            dispatch(HideLoading());
            setShowUserForm(false);
            if (response.data.status === "Success") {
                message.success(response.data.message);
                dispatch(HideLoading());
            } else {
                dispatch(HideLoading());
                message.error(response.data.message)
            }
            getDataStudents();
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

    console.log("selectedUser: ", selectedUser);
    console.log("selectedUser?.profile_img: ", selectedUser?.profile_img);
    return (
        <div>
            <Modal
                width={800}
                title={type === "new" ? "New Student" : "Edit Student"}
                open={showUserForm}
                onCancel={() => {
                    setShowUserForm(false);
                    setSelectedUser(null);
                }}
                footer={false}
            >
                <Form layout='horizontal' className='new-user' labelCol={{ span: 5 }} wrapperCol={{ span: 17 }} autoComplete="off"
                    onFinish={onFinish} initialValues={selectedUser} >
                    <Form.Item label=" Student ID :" name="student_id" rules={
                        [
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
                        <Input placeholder='Enter your Student ID ' disabled={true} />
                    </Form.Item>
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
                        [
                            {
                                pattern: /^.+@fpt\.edu\.vn$/,
                                message: "Please enter a valid email address with @fpt.edu.vn domain!",
                            },
                        ]}
                        hasFeedback>
                        <Input placeholder='Enter your Email ' disabled={true} />
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
                    <Form.Item label="Profile Image : "
                        hasFeedback>
                        <ImgCrop rotate>
                            <Upload
                                defaultFileList={[...fileList]}
                                action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                                accept='.png, .jpg'
                                listType="picture-card"
                                fileList={fileList}
                                onChange={onChange}
                                onPreview={handlePreview}
                                beforeUpload={(file) => {
                                    handleFileUpload(file)
                                    return false;
                                }}
                            >
                                {fileList.length < 2 && '+ Upload'}
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