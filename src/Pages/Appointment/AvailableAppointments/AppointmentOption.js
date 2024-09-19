import React from 'react';

const AppointmentOption = ({appointment, setTreatment}) => {
    const { name, slots, price } = appointment;
    return (
        <div>
            <div className="card shadow-xl hover:shadow-2xl mt-10">
                <div className="card-body text-center">
                    <h2 className="text-center text-2xl text-secondary font-bold">{name}</h2>
                    <p>{slots.length > 0 ? slots[0] : 'Try Another Day'}</p>
                    <p>{slots.length} {slots.length > 1 ? 'Spaces' : 'Space'} Available</p>
                    <p><small>Price: ${price}</small></p>
                    <div className="card-actions justify-center">
                        <label
                            disabled={slots.length === 0}
                            htmlFor="booking-modal"
                            className="btn btn-primary text-white"
                            onClick={() => setTreatment(appointment)}
                        >Book Appointment</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentOption;