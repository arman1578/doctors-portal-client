import React, { useState } from 'react';
import { format } from 'date-fns';
import AppointmentOption from './AppointmentOption';
import BookingModal from '../BookingModal/BookingModal';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading/Loading';

const AvailableAppointments = ({ selectedDate}) => {
    const [ treatment, setTreatment ] = useState(null);
    const date = format(selectedDate, 'PP');

    const {data: appointments = [], refetch, isLoading} = useQuery({
        queryKey: ['appointments', date],
        queryFn: () => fetch(`https://doctors-portal-server-kappa-wine.vercel.app/services?date=${date}`)
        .then(res => res.json())
    });

    if(isLoading){
        return<Loading></Loading>
    }

    return (
        <section className="my-16">
            <p className="text-xl text-center text-primary font-bold">Available Appointments on {format(selectedDate, 'PP')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {
                    appointments.map(appointment => <AppointmentOption
                        key={appointment._id}
                        appointment={appointment}
                        setTreatment={setTreatment}
                    ></AppointmentOption>)
                }
            </div>

                {treatment &&
                <BookingModal
                selectedDate={selectedDate}
                treatment={treatment}
                setTreatment={setTreatment}
                refetch={refetch}
                ></BookingModal>}
        </section>
    );
};

export default AvailableAppointments;