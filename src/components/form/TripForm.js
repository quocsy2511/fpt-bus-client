import { Button, Form, Input, InputNumber, Modal, Select } from "antd";

const TripForm = ({
    showTripForm,
    setShowTripForm,
    type = 'new',
    getData,
    selectedTrip,
    setSelectedTrip,
}) => {
    return (
        <div>
            <Modal
                width={800}
                title={type === "new" ? "New Bus" : "Edit Bus"}
                open={showTripForm}
                onCancel={() => {
                    setShowTripForm(false)
                }}
                footer={false}
            >
                <Form layout='horizontal' className='new-user' labelCol={{ span: 5 }} wrapperCol={{ span: 17 }} autoComplete="off"
                // onFinish={onFinish} initialValues={selectedBus}
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
                        <InputNumber className='seat-quantity' />
                    </Form.Item>
                    <Form.Item className='d-flex justify-content-end'>
                        <Button className="primary-btn" htmlType='submit' >
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default TripForm;