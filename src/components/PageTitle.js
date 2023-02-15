import React from 'react';

const PageTitle = ({ tile }) => {
    return (
        <div>
            <h1 className='text-lg'>{tile}</h1>
        </div>
    );
};

export default PageTitle;