import { Button, Checkbox, Form, Input, InputNumber, message, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllBusesFunction } from "../../services/bus.service";
import { getAllBusRoutesFunction } from "../../services/busRoute.service";
import { HideLoading, ShowLoading } from '../../redux/alertsSlice';
import moment from "moment";
import 'antd/dist/reset.css'
import "../../resources/form.css"
import DatePicker, { DateObject } from "react-multi-date-picker"
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import InputIcon from "react-multi-date-picker/components/input_icon";
import "react-multi-date-picker/styles/colors/teal.css"
import transition from "react-element-popper/animations/transition"
import { handleNewTripFunction, handleUpdateTripFunction } from "../../services/trip.service";
// import DatePicker from 'react-date-picker';

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
    // let [departureDate, setDepartureDate] = useState(new Date())
    let [departureDate, setDepartureDate] = useState([])
    let [departureTime, setDepartureTime] = useState([])
    const [checked, setChecked] = useState(false);
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


    const handleDateChange = (date) => {
        setDepartureDate(date);
    };
    const handleTimeChange = (date) => {
        const index = departureTime.length - 1; // truyền vào cuối mảng
        const updatedDepartureTime = [...departureTime];
        updatedDepartureTime[index] = date;
        setDepartureTime(updatedDepartureTime);
    }

    const handleAddTime = () => {
        setDepartureTime([...departureTime, new Date()])
    }

    const handleRemoveTime = (index) => {
        const updatedDepartureTime = [...departureTime];
        updatedDepartureTime.splice(index, 1);
        setDepartureTime(updatedDepartureTime);
    }

    const onFinish = async (values) => {
        let formattedDates = departureDate.map((dateObj) => {
            if (dateObj instanceof DateObject) {
                return dateObj.format("YYYY/MM/DD");
            }
        });
        let formattedTimes = departureTime.map((dateObj) => {
            if (dateObj instanceof DateObject) {
                return dateObj.format("HH:mm");
            };
        })
        const data = {
            ...values, departure_dates: [formattedDates],
            departure_times: [formattedTimes]
        }
        console.log('data', data)
        // try {
        //     let response = null;
        //     if (type === "new") {
        //         response = await handleNewTripFunction(data);
        //         console.log('response in bus form add : ', response)
        //     } else {
        //         response = await handleUpdateTripFunction(data, selectedTrip);
        //     }
        //     dispatch(HideLoading());
        //     setShowTripForm(false);
        //     if (response.data.status === "Success") {
        //         message.success(response.data.message);
        //         dispatch(HideLoading());
        //     } else {
        //         dispatch(HideLoading());
        //         message.error(response.data.message)
        //     }
        //     getData();
        //     setShowTripForm(false);
        //     setSelectedTrip(null);
        // } catch (error) {
        //     console.log('error in form : ', error)
        //     dispatch(HideLoading());
        // }
    }

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
                        ]} hasFeedback>
                        <InputNumber className='seat-quantity' />
                    </Form.Item>
                    <Form.Item style={{ "marginLeft": "150px" }}
                        checked={checked} >
                        <Checkbox onChange={(e) => setChecked(e.target.checked)}>
                            Multiple Date Mode
                        </Checkbox>
                    </Form.Item>
                    {checked ? <Form.Item label="Departure Date 2 : " name="departure_dates"
                        rules={
                            [{
                                required: true,
                                message: 'Please input !',
                            },
                            ]} hasFeedback>
                        <DatePicker
                            format="YYYY/MM/DD"
                            className="teal"
                            render={<InputIcon />}
                            onChange={handleDateChange}
                            multiple
                            plugins={[
                                <DatePanel markFocused />
                            ]}
                        />
                    </Form.Item>
                        : <Form.Item label="Departure Date 1 : "
                            rules={
                                [{
                                    required: true,
                                    message: 'Please input !',
                                },
                                ]} hasFeedback>

                            <DatePicker
                                onChange={handleDateChange}
                                className="teal"
                                render={<InputIcon />}
                                format="YYYY/MM/DD"
                                animations={[
                                    transition({ duration: 800, from: 35 })
                                ]}
                            />
                        </Form.Item>}

                    {departureTime.map((time, index) => (
                        <Form.Item key={index} label={`Departure Time ${index + 1}: `}
                            rules={
                                [{
                                    required: true,
                                    message: 'Please input !',
                                },
                                ]} hasFeedback>
                            <DatePicker
                                disableDayPicker
                                format="HH:mm"
                                value={time}
                                onChange={(date) => handleTimeChange(date, index)}
                                plugins={[<TimePicker />]}
                            />
                            <Button onClick={handleRemoveTime}> Remove </Button>
                        </Form.Item>
                    ))}



                    <Form.Item className='d-flex '>
                        <Button className="primary-btn" onClick={handleAddTime} >
                            Add time
                        </Button>
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