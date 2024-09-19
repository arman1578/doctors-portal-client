import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";
import { useState } from "react";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";
import { toast } from "react-hot-toast";

const MyAppointment = () => {

    const [deletingBooking, setDeletingBooking] = useState( null);
    
    const closeModal = () => {
        setDeletingBooking(null);
    }

    const { user } = useContext(AuthContext);

    // const url =`https://doctors-portal-server-kappa-wine.vercel.app/bookings?email=${user?.email}`;

    const { data: bookings = [], isLoading, refetch } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://doctors-portal-server-kappa-wine.vercel.app/bookings?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            const data = await res.json();
            return data;
        }
    })
    
    


    const handleDeleteBooking = booking => {
        fetch(`https://doctors-portal-server-kappa-wine.vercel.app/bookings/${booking._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`

            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount > 0){
                toast.success(`deleted successfully`)
                setDeletingBooking(null);
                refetch();
            }
        })
      
    }
    if(isLoading){
    return <Loading></Loading>;
    }

  return (
    <div>
      <h1 className="text-3xl">My Appointment</h1>
      <div className="overflow-x-auto ">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Treatment</th>
              <th>Date</th>
              <th>Time</th>
              <th>Price</th>
              <th>Payment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
              bookings &&
            bookings?.map((booking, index) => (
              <tr key={booking._id}>
                <th>{index + 1}</th>
                <td>{booking.patient}</td>
                <td>{booking.treatment}</td>
                <td>{booking.appointmentDate}</td>
                <td>{booking.slot}</td>
                <td>{booking.price}</td>
                <td>
                  {
                    booking.price && !booking.paid && <Link
                      to={`/dashboard/payment/${booking._id}`}
                      className="btn btn-primary btn-sm"
                    >Pay</Link>
                  }
                  {
                    booking.price && booking.paid && <span className="text-green-500">Paid</span>

                  }
                </td>
                <td>
                  <label onClick={() => setDeletingBooking(booking)} htmlFor="confirmation-modal" className="btn btn-sm btn-error mr-5 btn-outline">Delete</label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {
        deletingBooking && <ConfirmationModal
          title={`Are you sure you want to delete?`}
          message={`If you delete ${deletingBooking.treatment}, it cannot be undone.`}
          successAction = {handleDeleteBooking}
          successButtonName = "Delete"
          modalData = {deletingBooking}
          closeModal = {closeModal}
        ></ConfirmationModal>
      }
    </div>
  );
};

export default MyAppointment;
