import { Button, Form, Input, InputNumber, message, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllBusesFunction } from "../../services/bus.service";
import { getAllBusRoutesFunction } from "../../services/busRoute.service";
import { HideLoading, ShowLoading } from '../../redux/alertsSlice';
import 'antd/dist/reset.css'
import "../../resources/form.css"

const TripForm = ({
    showTripForm,
    setShowTripForm,
    type = 'new',
    getData,
    selectedTrip,
    setSelectedTrip,
}) => {

    const [routes, setRoutes] = useState([]);
    const [buses, setBuses] = useState([]);
    const dispatch = useDispatch();

    const getAllRoutes = async () => {
        try {
            dispatch(ShowLoading());
            const response = await getAllBusRoutesFunction()
            console.log('response get all route in trip form: ', response)
            dispatch(HideLoading());
            if (response?.data?.status === "Success") {
                const filterRoutes = response.data.data.filter(route => route.status);
                setRoutes(filterRoutes);
            } else {
                message.error(response.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };
    const getAllBuses = async () => {
        try {
            dispatch(ShowLoading());
            const response = await getAllBusesFunction()
            console.log('response get all buses: ', response)
            dispatch(HideLoading());
            if (response?.data?.status === "Success") {
                const filterBuses = response.data.data.filter(bus => bus.status);
                setBuses(filterBuses);
            } else {
                message.error(response.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    useEffect(() => {
        getAllRoutes();
        getAllBuses();
    }, [])

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
                    <Form.Item label="Route :" name="route_id" rules={
                        [{
                            required: true,
                            message: 'Please input License Plate! Example : 29B-144.21',
                        },
                        ]}
                        hasFeedback>
                        <Select className='driver'
                            placeholder="choose route ... "
                            options={routes && routes.length > 0 ? routes.map((item) => ({
                                value: item.id,
                                label: `${item.departure} - ${item.destination}`
                            })) : []}
                        />
                    </Form.Item>
                    <Form.Item label="Bus : " name="bus_id" rules={
                        [{
                            required: true,
                            message: 'Please input !',
                        },
                        ]} hasFeedback>
                        <Select className='driver'
                            placeholder="choose bus ... "
                            options={buses && buses.length > 0 ? buses.map((item) => ({
                                value: item.id,
                                label: item.license_plate
                            })) : []}
                        />
                    </Form.Item>
                    <Form.Item label="Ticket Quantity : " name="ticket_quantity" rules={
                        [{
                            required: true,
                            message: 'Please input !',
                        },
                        ]} hasFeedback>
                        <InputNumber className='seat-quantity' />
                    </Form.Item>
                    <Form.Item label="Departure Date : " name="departure_dates" rules={
                        [{
                            required: true,
                            message: 'Please input !',
                        },
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