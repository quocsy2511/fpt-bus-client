import { Form, Input } from 'antd';
import Search from 'antd/es/input/Search';
import React from 'react';
import "../resources/layout.css";
import debounce from 'lodash.debounce';
// import { Button, Form, Input } from 'antd';
// import { useSearchParams } from 'react-router-dom';
// import Search from 'antd/es/transfer/search';

const Header = ({ setShowForm, setSelectedBus, query, setQuery, exclude }) => {
    return exclude === "routes" ?
        <div className='header' >
            <div>
                <button className='add-button' onClick={() => setShowForm(true)}> New </button>
            </div>
            <div className='search'>
                <Search placeholder="search here ... " enterButton="Search" size="large" onChange={(e) => setQuery(e.target.value)} style={{ display: "none" }} />
            </div>
        </div>
        :
        <div className='header' >
            <div>
                <button className='add-button' onClick={() => setShowForm(true)}> New </button>
            </div>
            <div className='search'>
                <Search placeholder="search here ... " enterButton="Search" size="large" onChange={(e) => setQuery(e.target.value)} />
            </div>
        </div>

};

export default Header;