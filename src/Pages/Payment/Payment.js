import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Payment = () => {
    const booking = useLoaderData();
    return (
        <div>
            <h1 className='text-3xl sm:text-5xl font-bold lg:text-left mt-10 lg:ml-10 text-center'>Payment</h1>
            <div className="w-96 my-12">
                <div className="card w-96 bg-base-100 ml-3 shadow-xl">
                    <div className="card-body">
                        <p className="text-success font-bold">Hello, {booking.patient}</p>
                        <h2 className="card-title">Pay for {booking.treatment}</h2>
                        <p>Your Appointment: <span className='text-orange-500 font-bold'>{booking.date} at {booking.slot}</span></p>
                        <p className="text-black-500 font-bold">Please pay: ${booking.price}</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary btn-lg text-white bg-gradient-to-r from-secondary to-primary">Pay</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;