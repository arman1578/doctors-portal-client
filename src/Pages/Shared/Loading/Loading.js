import React from 'react';

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className='spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full'>
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default Loading;