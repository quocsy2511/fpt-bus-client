import React from 'react';

const PageTitle = ({ title }) => {
    return (
        <div>
            <h1 className='text-lg' style={{ padding: "10px", margin: "10px" }}>{title}</h1>
        </div>
    );
};

export default PageTitle;