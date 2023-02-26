import React from 'react';
import "../resources/layout.css";
import { Input } from 'antd';

const Header = ({ setShowForm }) => {
    const { Search } = Input;

    return (
        <div className='header' >
            <div>
                <button className='add-button' onClick={() => setShowForm(true)}> New </button>
            </div>
            <div className='search'>
                <Search placeholder="search here " enterButton="Search" size="large" />
            </div>
        </div>
    );
};

export default Header;