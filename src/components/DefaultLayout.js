import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../resources/layout.css";
import { UserAuth } from '../context/AuthContext';
import 'antd/dist/reset.css'
import { Menu } from 'antd';
import { RiRouteFill, RiAdminLine } from 'react-icons/ri';
import {
    HomeFilled,
    LogoutOutlined,
    UsergroupAddOutlined,
    UserOutlined,
    UserSwitchOutlined,
    CarOutlined,
    CalendarOutlined,
    AimOutlined
} from '@ant-design/icons';


function getItem(label, key, icon, children, type, danger, style) {
    return {
        key,
        icon,
        children,
        label,
        type,
        danger,
        style
    };
}
const items = [
    getItem('Home', '/home', <HomeFilled />, null, null, null, { color: '#ffffff' }),
    getItem('Trips', '/trips', <CalendarOutlined />, null, null, null, { color: '#ffffff' }),
    getItem('Users', 'sub1', <UsergroupAddOutlined />, [
        getItem('Students', '/users', <UserOutlined />, null, null, null, { color: '#ffffff' }),
        getItem('Drivers', '/drivers', <UserSwitchOutlined />, null, null, null,
            { color: '#ffffff' }),
    ], null, null, { color: '#ffffff' }),
    getItem('Buses', '/buses', <CarOutlined />, null, null, null, { color: '#ffffff' }),
    getItem('Stations', '/stations', <AimOutlined />, null, null, null, { color: '#ffffff' }),
    getItem('Routes', '/routes', <RiRouteFill style={{ fontSize: "19px" }} />, null, null, null, { color: '#ffffff' }),
    getItem('Logout', '/logout', <LogoutOutlined />, null, null, null, { color: '#ffffff' }),
];

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
            path: "/login",
            icon: "ri-logout-box-line",
        },
    ];
    return (
        <div className='layout-parent'>
            <div className='sidebar'>
                <div className='d-flex flex-column gap-5 justify-content-start menu'>
                    <div className="sidebar-header">
                        <div className="logo">
                            <img src="https://scontent.fsgn5-15.fna.fbcdn.net/v/t1.6435-9/191299147_4218533944852001_9207524335393556037_n.png?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=rYCRBwSoQj8AX-mLIop&_nc_ht=scontent.fsgn5-15.fna&oh=00_AfBVtxgFmoNESUrmhcHYGw5oeAet3ERaSflxL_6dChFmjg&oe=64413C35" alt="logo" style={{ width: "36%" }} />
                        </div>
                        <div className='name-admin'>
                            <h2><RiAdminLine style={{ fontSize: "24px", color: "white" }} /> {user?.fullname}</h2>
                        </div>
                    </div>
                    <div >
                        <Menu
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                            inlineCollapsed={collapsed}
                            items={items}
                            onClick={async ({ key }) => {
                                if (key === "/logout") {
                                    await logOut();
                                    navigate("/login");
                                } else {
                                    navigate(key)
                                }
                            }}
                        />
                    </div>
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