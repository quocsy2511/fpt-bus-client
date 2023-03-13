import { Input } from 'antd';
import Search from 'antd/es/input/Search';
import React from 'react';
import "../resources/layout.css";
import { SearchOutlined } from '@ant-design/icons';

const Header = ({ setQuery }) => (
    <div className='header' >
        <div className='header' >
            <div className='search'>
                <Input placeholder="search here ... "
                    addonBefore={<SearchOutlined style={{ color: "white", margin: "5px 10px" }} />} size="large" onChange={(e) => setQuery(e.target.value)} />
            </div>
        </div>
    </div>
);

export default Header;