import React from 'react';

const PageTitle = ({ title }) => {
    return (
        <div>
            <h1 className='text-xl' style={{ padding: "10px", margin: "10px", color: "#f26f21" }}>{title}</h1>
        </div>
    );
};

export default PageTitle;