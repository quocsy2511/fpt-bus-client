import { Switch } from "antd";
import moment from "moment/moment";
import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const TripForm = () => {
    const [route, setRoute] = useState("");
    const [bus, setBus] = useState("");
    const [ticketQuantity, setTicketQuantity] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState([""]);
    const [showDaysOfWeek, setShowDaysOfWeek] = useState(false);
    const [selectedDaysOfWeek, setSelectedDaysOfWeek] = useState([]);

    const handleRouteChange = (event) => {
        setRoute(event.target.value);
    };

    const handleBusChange = (event) => {
        setBus(event.target.value);
    };

    const handleTicketQuantityChange = (event) => {
        setTicketQuantity(event.target.value);
    };

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleTimeChange = (event, index) => {
        const newTime = [...time];
        newTime[index] = event.target.value;
        setTime(newTime);
    };

    const handleRemoveTime = (index) => {
        const newTime = [...time];
        newTime.splice(index, 1);
        setTime(newTime);
    };

    const handleAddTime = () => {
        setTime([...time, ""]);
    };

    const handleToggleDaysOfWeek = () => {
        setShowDaysOfWeek(!showDaysOfWeek);
    };

    const handleDaysOfWeekChange = (days) => {
        setSelectedDaysOfWeek(days);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({
            route,
            bus,
            ticketQuantity,
            date,
            time,
            selectedDaysOfWeek,
        });
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="route">
                    <Form.Label>Route</Form.Label>
                    <Form.Control as="select" value={route} onChange={handleRouteChange}>
                        <option value="">Select Route</option>
                        <option value="Route 1">Route 1</option>
                        <option value="Route 2">Route 2</option>
                        <option value="Route 3">Route 3</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="bus">
                    <Form.Label>Bus</Form.Label>
                    <Form.Control as="select" value={bus} onChange={handleBusChange}>
                        <option value="">Select Bus</option>
                        <option value="Bus 1">Bus 1</option>
                        <option value="Bus 2">Bus 2</option>
                        <option value="Bus 3">Bus 3</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="ticketQuantity">
                    <Form.Label>Ticket Quantity</Form.Label>
                    <Form.Control
                        type="number"
                        value={ticketQuantity}
                        onChange={handleTicketQuantityChange}
                    />
                </Form.Group>
                <Form.Group controlId="date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        value={date}
                        onChange={handleDateChange}
                    />
                </Form.Group>
                <Form.Group controlId="time">
                    <Form.Label>Time</Form.Label>
                    {time.map((t, index) => (
                        <div key={index} className="d-flex mb-2">
                            <Form.Control
                                type="time"
                                value={t}
                                onChange={(event) => handleTimeChange(event, index)}
                            />
                            <Button
                                variant="danger"
                                className="ml-2"
                                onClick={() => handleRemoveTime(index)}
                            >
                                Remove
                            </Button>
                        </div>
                    ))}
                    <Button variant="success" onClick={handleAddTime}>
                        Add Time
                    </Button>
                </Form.Group>
                <Form.Group controlId="daysOfWeek">
                    <Form.Check
                        type="checkbox"
                        id="daysOfWeek"
                        label="Select days of the week"
                        checked={showDaysOfWeek}
                        onChange={handleToggleDaysOfWeek}
                    />
                    <Switch checkedChildren="Select days of the week" unCheckedChildren="Unselect days of the week" checked={showDaysOfWeek} onChange={handleToggleDaysOfWeek} />
                    {showDaysOfWeek && (
                        <div>
                            <Form.Check
                                type="checkbox"
                                id="monday"
                                label="Monday"
                                disabled={
                                    new Date(date) > new Date().setDate(new Date().getDate() + 1)
                                }
                                onChange={() =>
                                    handleDaysOfWeekChange([...selectedDaysOfWeek, moment(date).add(1, 'days').format("YYYY-MM-DD HH:mm:ss")])
                                }
                            >
                            </Form.Check>
                            <Form.Check
                                type="checkbox"
                                id="tuesday"
                                label="Tuesday"
                                disabled={
                                    new Date(date) > new Date().setDate(new Date().getDate() + 2)
                                }
                                onChange={() =>
                                    handleDaysOfWeekChange([...selectedDaysOfWeek, moment(date).add(2, 'days').format("YYYY-MM-DD")])
                                }
                            />
                            <Form.Check
                                type="checkbox"
                                id="wednesday"
                                label="Wednesday"
                                disabled={
                                    new Date(date) > new Date().setDate(new Date().getDate() + 3)
                                }
                                onChange={() =>
                                    handleDaysOfWeekChange([...selectedDaysOfWeek, moment(date).add(3, 'days').format("YYYY-MM-DD")])
                                }
                            />
                            <Form.Check
                                type="checkbox"
                                id="thursday"
                                label="Thursday"
                                disabled={
                                    new Date(date) > new Date().setDate(new Date().getDate() + 4)
                                }
                                onChange={() =>
                                    handleDaysOfWeekChange([...selectedDaysOfWeek, moment(date).add(4, 'days').format("YYYY-MM-DD")])
                                }
                            />
                            <Form.Check
                                type="checkbox"
                                id="friday"
                                label="Friday"
                                disabled={
                                    new Date(date) > new Date().setDate(new Date().getDate() + 5)
                                }
                                onChange={() =>
                                    handleDaysOfWeekChange([...selectedDaysOfWeek, moment(date).add(5, 'days').format("YYYY-MM-DD")])
                                }
                            />
                            <Form.Check
                                type="checkbox"
                                id="saturday"
                                label="Saturday"
                                disabled={
                                    new Date(date) > new Date().setDate(new Date().getDate() + 6)
                                }
                                onChange={() =>
                                    handleDaysOfWeekChange([...selectedDaysOfWeek, moment(date).add(6, 'days').format("YYYY-MM-DD")])
                                }
                            />
                            <Form.Check
                                type="checkbox"
                                id="sunday"
                                label="Sunday"
                                disabled={
                                    new Date(date) > new Date().setDate(new Date().getDate() + 7)
                                }
                                onChange={() =>
                                    handleDaysOfWeekChange([...selectedDaysOfWeek, moment(date).add(7, 'days').format("YYYY-MM-DD")])
                                }
                            />
                        </div>
                    )}
                </Form.Group>
                <Button variant="primary" type="submit">
                    Create
                </Button>
            </Form>
        </Container>
    );
};

export default TripForm;