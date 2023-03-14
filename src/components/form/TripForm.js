import { Button, Form, InputNumber, message, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllBusesFunction } from "../../services/bus.service";
import { getAllBusRoutesFunction } from "../../services/busRoute.service";
import { HideLoading, ShowLoading } from '../../redux/alertsSlice';
import { addDays } from "date-fns"
import 'antd/dist/reset.css'
import "../../resources/form.css"
import DatePicker, { DateObject } from "react-multi-date-picker"
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import InputIcon from "react-multi-date-picker/components/input_icon";
import "react-multi-date-picker/styles/colors/teal.css"
import { handleNewTripFunction, handleUpdateTripFunction } from "../../services/trip.service";
import { FieldTimeOutlined } from "@ant-design/icons";


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
    let [departureDate, setDepartureDate] = useState([])
    let [departureTime, setDepartureTime] = useState([])
    let [selectedTime, setSelectedTime] = useState(selectedTrip?.departure_time ? new Date(`2000-01-01T${selectedTrip?.departure_time}`) : null)
    const dispatch = useDispatch();

    const getAllRoutes = async () => {
        try {
            dispatch(ShowLoading());
            const response = await getAllBusRoutesFunction()
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

    const handleDateChange = (date) => {
        let formattedDates = date.map((dateObj) => {
            if (dateObj instanceof DateObject) {
                return dateObj.format("YYYY-MM-DD");
            }
        });
        setDepartureDate(formattedDates);
    };

    const handleTimeChange = (date, index) => {
        const updatedDepartureTime = [...departureTime];
        updatedDepartureTime[index] = date;
        setDepartureTime(updatedDepartureTime);
    }

    //add time and remove time
    const handleAddTime = () => {
        setDepartureTime([...departureTime, new Date()])
    }
    const handleRemoveTime = (index) => {
        const updatedDepartureTime = [...departureTime];
        updatedDepartureTime.splice(index, 1);
        setDepartureTime(updatedDepartureTime);
    }

    const onFinish = async (values) => {
        // formatNewTimes
        let formattedTimes = departureTime
            .map((dateObj) => dateObj instanceof DateObject ? dateObj.format("HH:mm") : null)
            .filter(time => time !== null);

        //formatTimeUpdate
        let formattedSelectTime = selectedTime ? selectedTime.format("HH:mm") : null;

        const data = {
            ...values, departure_dates: departureDate,
            departure_times: formattedTimes.concat(formattedSelectTime || [])
        }
        console.log('data', data)
        try {
            let response = null;
            if (type === "new") {
                response = await handleNewTripFunction(data);
                console.log('response in bus form add : ', response)
            } else {
                response = await handleUpdateTripFunction(data, selectedTrip);
            }
            dispatch(HideLoading());
            setShowTripForm(false);
            if (response.data.status === "Success") {
                message.success(response.data.message);
                dispatch(HideLoading());
            } else {
                dispatch(HideLoading());
                message.error(response.data.message)
            }
            getData();
            setShowTripForm(false);
            setSelectedTrip(null);
        } catch (error) {
            console.log('error in form : ', error)
            dispatch(HideLoading());
            if (error.message) {
                message.error(error.message);
            } else {
                message.error("Something went wrong!");
            }
        }
    }

    useEffect(() => {
        getAllRoutes();
        getAllBuses();
    }, [])
    return (
        <div>
            <Modal
                width={800}
                title={type === "new" ? "New Trip" : "Edit Trip"}
                open={showTripForm}
                onCancel={() => {
                    setShowTripForm(false);
                    setSelectedTrip(null)
                }}
                footer={false}
            >
                <Form layout='horizontal' className='new-user' labelCol={{ span: 5 }} wrapperCol={{ span: 17 }} autoComplete="off"
                    onFinish={onFinish} initialValues={selectedTrip}
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
                        {
                            type: "number",
                            max: 45,
                            min: 1,
                            message: "Ticket quantity must be between 1 and 45!"
                        }
                        ]} hasFeedback>
                        <InputNumber className='seat-quantity' />
                    </Form.Item>
                    <Form.Item label="Departure Date : "
                        rules={
                            [{
                                required: true,
                                message: 'Please input !',
                            },
                            ]} hasFeedback>
                        <DatePicker
                            value={selectedTrip?.departure_date}
                            format="YYYY-MM-DD"
                            className="teal"
                            render={<InputIcon style={{ color: "green" }} />}
                            onChange={handleDateChange}
                            minDate={addDays(new Date(), 0)}
                            multiple
                            plugins={[
                                <DatePanel />,
                            ]}
                        />
                    </Form.Item>
                    {departureTime.map((time, index) => (
                        <Form.Item key={index} label={`Departure Time ${index + 1}: `}
                            rules={
                                [{
                                    required: true,
                                    message: 'Please input !',
                                },
                                ]} hasFeedback>
                            <DatePicker
                                value={time}
                                disableDayPicker
                                format="HH:mm"
                                onChange={(date) => handleTimeChange(date, index)}
                                plugins={[<TimePicker />]}
                            />
                            <div className="d-flex justify-content-end mt-1">
                                <Button onClick={handleRemoveTime}
                                    type="primary" danger ghost
                                >
                                    Remove
                                </Button>
                            </div>
                        </Form.Item>
                    ))}
                    {selectedTime !== null &&
                        (<Form.Item
                            label={`Departure Time : `}
                            rules={
                                [{
                                    required: true,
                                    message: 'Please input !',
                                },
                                ]} hasFeedback>
                            <DatePicker
                                disableDayPicker
                                format="HH:mm"
                                value={selectedTime}
                                onChange={(date) => setSelectedTime(date)}
                                plugins={[<TimePicker />]}
                            />
                        </Form.Item>)}
                    <Form.Item label="Departure Time">
                        <Button onClick={handleAddTime}
                            icon={<FieldTimeOutlined />}>
                            Add Time
                        </Button>
                    </Form.Item>
                    <Form.Item className="d-flex justify-content-end">
                        <Button className="primary-btn" htmlType='submit'>
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default TripForm;