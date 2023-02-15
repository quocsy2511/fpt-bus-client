import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../resources/layout.css";

const DefaultLayout = ({ children }) => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const { user } = useSelector((state) => state.users);
    const userMenu = [
        {
            name: "Home",
            icon: "ri-home-line",
            path: "/",
        },
        {
            name: "Bookings",
            icon: "ri-file-list-line",
            path: "/bookings",
        },
        {
            name: "Profile",
            icon: "ri-user-line",
            path: "/profile",
        },
        {
            name: "Logout",
            icon: "ri-logout-box-line",
            path: "/logout",
        },
    ];
    const adminMenu = [
        {
            name: "Home",
            path: "/admin",
            icon: "ri-home-line",
        },
        {
            name: "Buses",
            path: "/admin/buses",
            icon: "ri-bus-line",
        },
        {
            name: "Users",
            path: "/admin/users",
            icon: "ri-user-line",
        },
        {
            name: "Trip",
            path: "/admin/trip",
            icon: "ri-file-list-line",
        },
        {
            name: "Station",
            path: "/admin/station",
            icon: "ri-map-2-fill",
        },
        {
            name: "Route",
            path: "/admin/route",
            icon: "ri-pin-distance-line",
        },
        {
            name: "Logout",
            path: "/logout",
            icon: "ri-logout-box-line",
        },
    ];

    const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;
    let activeRoute = window.location.pathname;
    if (window.location.pathname.includes('book-now')) {
        activeRoute = "/";
    }
    return (
        <div className='layout-parent'>
            <div className='sidebar'>
                <div className="sidebar-header">
                    <div className='flex flex-row gap-4   ' >
                        <h3 className="logo items-center justify-content-start"><i className="ri-bus-fill"> </i> FPT </h3>
                    </div>
                    <h1 className="role ">{user?.isAdmin ? 'Admin' : 'User'} : {user?.name}</h1>
                </div>
                <div className='d-flex flex-column gap-3 justify-content-start menu'>
                    {menuToBeRendered.map((item, index) => {
                        return (
                            <div key={index} className={`${activeRoute === item.path && "active-menu-item"} menu-item`}>
                                <i className={item.icon}></i>
                                {!collapsed && (
                                    <span
                                        onClick={() => {
                                            if (item.path === "/logout") {
                                                localStorage.removeItem("token");
                                                navigate("/login");
                                            } else {
                                                navigate(item.path);
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
                <div className='header'>
                    {collapsed ? (
                        <i
                            className="ri-menu-2-fill"
                            onClick={() => setCollapsed(!collapsed)}
                        ></i>
                    ) : (
                        <i
                            className="ri-close-line"
                            onClick={() => setCollapsed(!collapsed)}
                        ></i>
                    )}
                </div>
                <div className='content'>{children}</div>
            </div>

        </div>
    );
};

export default DefaultLayout;