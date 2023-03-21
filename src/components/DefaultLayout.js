import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../resources/layout.css";
import { UserAuth } from '../context/AuthContext';
import 'antd/dist/reset.css'

const DefaultLayout = ({ children }) => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const { user } = useSelector((state) => state.users);
    const { logOut } = UserAuth();

    const adminMenu = [
        {
            name: "Home",
            path: "/home",
            icon: "ri-home-line",
        },
        {
            name: "Trips",
            path: "/trips",
            icon: "ri-file-list-line",
        },
        {
            name: "Buses",
            path: "/buses",
            icon: "ri-bus-line",
        },
        {
            name: "Stations",
            path: "/stations",
            icon: "ri-map-2-fill",
        },
        {
            name: "Routes",
            path: "/routes",
            icon: "ri-pin-distance-line",
        },
        {
            name: "Students",
            path: "/users",
            icon: "ri-user-line",
        },
        {
            name: "Drivers",
            path: "/drivers",
            icon: "ri-user-settings-fill",
        },
        {
            name: "Logout",
            path: "/logout",
            icon: "ri-logout-box-line",
        },
    ];

    const menuToBeRendered = adminMenu
    let activeRoute = window.location.pathname;
    if (window.location.pathname.includes('book-now')) {
        activeRoute = "/";
    }
    return (
        <div className='layout-parent'>
            <div className='sidebar'>
                <div className="sidebar-header">
                    <div className='sidebar-collapsed' >
                        <h3 className="logo items-center justify-content-start"><i className="ri-bus-fill"> </i> FPT </h3>
                        <div className='item-collapsed'>
                            {collapsed ? (
                                <i
                                    className="ri-bar-chart-horizontal-line"
                                    style={{ color: "while" }}
                                    onClick={() => setCollapsed(!collapsed)}
                                ></i>
                            ) : (
                                <i
                                    className="ri-close-circle-line"
                                    style={{ color: "while" }}
                                    onClick={() => setCollapsed(!collapsed)}
                                ></i>
                            )}
                        </div>
                    </div>
                    <h1 className="role">{user?.fullname}</h1>
                </div>
                <div className='d-flex flex-column gap-3 justify-content-start menu'>
                    {menuToBeRendered.map((item, index) => {
                        return (
                            <div key={index} className={`${activeRoute === item.path && "active-menu-item"} menu-item`}>
                                <i className={item.icon}></i>
                                {!collapsed && (
                                    <span
                                        onClick={async () => {
                                            try {
                                                if (item.path === "/logout") {
                                                    await logOut();
                                                    navigate("/login");
                                                } else {
                                                    navigate(item.path);
                                                }
                                            } catch (error) {
                                                console.log(error);
                                            }
                                        }}
                                    >
                                        {item.name}
                                    </span>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='body'>
                <div className='content'>
                    <div className='children'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DefaultLayout;