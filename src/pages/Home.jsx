import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { UserData } from '../Data';
import BarChart from '../components/chart/BarChart'
import PieChart from '../components/chart/PieChart';
import { message, DatePicker } from 'antd';
import "../resources/content.css"
import 'antd/dist/reset.css'
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../redux/alertsSlice';
import { getDataChartByDate } from '../services/chart.service';
import LineChart from '../components/chart/LineChart';
const Home = () => {
    const dispatch = useDispatch();
    const today = dayjs().format('YYYY-MM-DD');
    const [date, setDate] = useState(today);
    const [dataAPI, setDateApi] = useState(null)
    const [dataChartPie, setDataChartPie] = useState({
        labels: ["Ticket Booking", "Ticket Cancel"],
        datasets: [
            {
                label: "Users Gained",
                data: [dataAPI?.TotalTicketBook, dataAPI?.TotalTicketCancel],
                backgroundColor: [
                    "#0078d1",
                    "#119d57"
                ],
                // borderColor: "black",
                borderWidth: 2,
            },
        ],
    });
    const [dataChartBar, setDataChartBar] = useState({
        labels: dataAPI?.TicketRoute?.map(item => item.route_name),
        datasets: [
            {
                label: "Ticket",
                data: dataAPI?.TicketRoute?.map(item => item.TotalTicketOfRoute),
                backgroundColor: [
                    "#0078d1",
                    "#119d57"
                ],
                // borderColor: "black",
                borderWidth: 2,
            },
        ],
    });
    const onChangeDate = (date, dateString) => {
        setDate(dateString)
    };
    const getDataChart = async (date) => {
        try {
            dispatch(ShowLoading());
            const res = await getDataChartByDate(date);
            console.log("Res:", res);
            dispatch(HideLoading());
            if (res.data.status === "Success") {
                setDateApi(res.data.data);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    }
    useEffect(() => {
        getDataChart(date);

    }, [date]);
    useMemo(() => {
        setDataChartPie({
            labels: ["Ticket Booking", "Ticket Cancel"],
            datasets: [
                {
                    label: "Ticket",
                    data: [dataAPI?.TotalTicketBook, dataAPI?.TotalTicketCancel],
                    backgroundColor: [
                        "#119d57",
                        "#ff0d0d"
                    ],
                    // borderColor: "black",
                    borderWidth: 2,
                },
            ],
        })
        setDataChartBar({
            labels: dataAPI?.TicketRoute?.map(item => item.route_name),
            datasets: [
                {
                    label: "Ticket",
                    data: dataAPI?.TicketRoute?.map(item => item.TotalTicketOfRoute),
                    backgroundColor: [
                        "#0078d1",
                        "#119d57"
                    ],
                    // borderColor: "black",
                    borderWidth: 2,
                },
            ],
        })
    }, [dataAPI])
    console.log("dateAPI:", dataAPI);
    console.log("dateChart:", dataChartPie);

    return (
        <div id="main-wrapper" data-layout="vertical" data-navbarbg="skin5" data-sidebartype="full" data-sidebar-position="absolute" data-header-position="absolute" data-boxed-layout="full">
            <div className="page-wrapper" style={{ marginLeft: "0px" }}>
                <div className="page-breadcrumb bg-white">
                    <div className="row align-items-center">
                        <div className="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                            <h4 className="page-title">Dashboard</h4>
                        </div>
                        <div className="col-lg-9 col-sm-8 col-md-8 col-xs-12">
                            <div className="d-md-flex">
                                <ol className="breadcrumb ms-auto ">
                                    <div className='search-picker-date'>
                                        <DatePicker onChange={onChangeDate} defaultValue={dayjs(today)} />
                                    </div>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-12">
                            <div className="white-box analytics-info">
                                <h3 className="box-title">Total Bus:</h3>
                                <ul className="list-inline two-part d-flex align-items-center mb-0">
                                    <li>
                                        <i className='ri-bus-line'></i>
                                    </li>
                                    <li className="ms-auto"><span className="counter text-success">{dataAPI?.TotalBus}</span></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <div className="white-box analytics-info">
                                <h3 className="box-title">Total ticket in today:</h3>
                                <ul className="list-inline two-part d-flex align-items-center mb-0">
                                    <li>
                                        <i className="ri-coupon-line"></i>
                                    </li>
                                    <li className="ms-auto"><span className="counter text-purple">{dataAPI?.TotalTicketBook + dataAPI?.TotalTicketCancel}</span></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <div className="white-box analytics-info">
                                <h3 className="box-title">Total trip in today:</h3>
                                <ul className="list-inline two-part d-flex align-items-center mb-0">
                                    <li>
                                        <i className="ri-map-2-line"></i>
                                    </li>
                                    <li className="ms-auto"><span className="counter text-info">{dataAPI?.TotalTrip}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                            <div className="white-box" style={{ padding: "60px" }}>
                                <div className='row' style={{ height: 405 }}>
                                    <div className='col-6'>
                                        <h3 className="box-title text-center">Total ticket of route in today</h3>
                                        <BarChart chartData={dataChartBar} />
                                    </div>
                                    <div className='col-6' style={{ height: 405 }}>
                                        <h3 className="box-title text-center">Total ticket booking and cancel in today</h3>
                                        <div style={{ marginLeft: "170px", height: 405 }}>
                                            <PieChart chartData={dataChartPie} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;