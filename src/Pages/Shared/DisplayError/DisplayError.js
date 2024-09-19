import React from 'react';
import { useRouteError } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';

const DisplayError = () => {
    const error = useRouteError();
    const {logout} = useContext(AuthContext);
    const mavigate = useNavigate();

    const handleSignOut = () => {
        logout()
        .then(() => {
            mavigate('/login');
        })
        .catch(error => console.log(error));
    }

    return (
        <div>
            <p className='text-red-600'>Something went wrong</p>
            <p className='text-red-400'>{error.statusText || error.message}</p>
            <h2 className='text-3xl'>Please <button onClick={handleSignOut}  className='btn btn-primary'>Sign Out</button> and try again</h2>
        </div>
    );
};

export default DisplayError;