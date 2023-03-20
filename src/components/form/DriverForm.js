import { Button, Form, Input, message, Select, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import Modal from 'antd/es/modal/Modal';
import React, { useState } from 'react';
import 'antd/dist/reset.css'
import "../../resources/form.css"
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/alertsSlice';
import { handleFileUploadFunction, handleNewUserFunction, handleUpdateUserFunction } from '../../services/user.service';

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
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([
        {
            uid: "-1", name: "defaultImage.png",
            status: "done",
            url: selectedDriver?.profile_img
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
        const data = { ...values, profile_img: urlImage || "", role_id: 3 }
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

export default DriverForm;