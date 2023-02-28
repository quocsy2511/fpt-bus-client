import Search from 'antd/es/input/Search';
import React from 'react';
import "../resources/layout.css";
// import { Button, Form, Input } from 'antd';
// import { useSearchParams } from 'react-router-dom';
// import Search from 'antd/es/transfer/search';

const Header = ({ setShowForm, query, setQuery }) => {
    // const { Search } = Input;
    // let [searchParams, setSearchParams] = useSearchParams();

    // const onFinish = (value) => {
    //     console.log('value', value)
    //     setSearchParams(value)
    // }
    return (
        <div className='header' >
            <div>
                <button className='add-button' onClick={() => setShowForm(true)}> New </button>
            </div>
            <div className='search'>
                <Search placeholder="search here ... " enterButton="Search" size="large" onChange={(e) => setQuery(e.target.value)}
                />
                {/* <Form onFinish={onFinish} layout='inline'>
                    <Form.Item name="fullname">
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType='submit'> Search </Button>
                    </Form.Item>
                </Form> */}
            </div>
        </div>
    );
};

export default Header;