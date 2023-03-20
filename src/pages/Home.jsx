import React, { useState } from 'react'
import { UserData } from '../Data';
import BarChart from '../components/chart/BarChart'
import PieChart from '../components/chart/PieChart';
import DatePicker from 'react-multi-date-picker';
import "../resources/content.css"
import 'antd/dist/reset.css'

const Home = () => {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          "#0078d1",
          "#119d57",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        // borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
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
                    <DatePicker defaultValue=''/>
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
                  <li className="ms-auto"><span className="counter text-success">02</span></li>
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
                  <li className="ms-auto"><span className="counter text-purple">869</span></li>
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
                  <li className="ms-auto"><span className="counter text-info">911</span>
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
                    <h3 className="box-title text-center">Total sales for this month</h3>
                    <BarChart chartData={userData} />
                  </div>
                  <div className='col-6' style={{ height: 405 }}>
                    <h3 className="box-title text-center">Total sales for this month</h3>
                    <div style={{ marginLeft: "170px", height: 405 }}>
                      <PieChart chartData={userData} />
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