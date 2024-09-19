import React from "react";
import { format } from "date-fns";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { toast } from "react-hot-toast";

const BookingModal = ({ treatment, selectedDate, setTreatment, refetch }) => {
  const { name, slots, price } = treatment;
  const formattedDate = format(selectedDate, "PP");
  const {user} = useContext(AuthContext);



  const handleBooking = event => {
    event.preventDefault();
    const form = event.target;
    const date = form.date.value;
    const slot = form.slot.value;
    const fullname = form.fullname.value;
    const phone = form.phone.value;
    const email = form.email.value;
    const booking = {
      appointmentDate: date,
      patient: fullname,
      slot,
      phone,
      email,
      price,
      treatment: name,
    };
    
    fetch("https://doctors-portal-server-kappa-wine.vercel.app/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {

        if (data.acknowledged) {
          setTreatment(null);
          form.reset();
          toast.success("Booking Confirmed");
          refetch();
        } else {
          toast.error(data.message);
          form.reset();
        }
        }
      );
  };
  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{name}</h3>
          <form onSubmit={handleBooking} className="grid grid-cols-1 gap-3 mt-10">
            <input
              name="date"
              type="text"
              disabled
              value={formattedDate}
              className="text-black input input-bordered w-full"
            />
            <select name="slot" className="select select-bordered w-full">
              {slots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            <input
              name="fullname"
              type="text"
              defaultValue={user?.displayName}
              disabled
              placeholder="Full Name"
              className="input input-bordered w-full mt-5"
            />
            <input
              name="email"
              type="email"
              defaultValue={user?.email}
              disabled
              placeholder="Email"
              className="input input-bordered w-full mt-5"
            />
            <input
              name="phone"
              type="text"
              placeholder="Phone Number"
              className="input input-bordered w-full mt-5"
            />
            <input
              type="submit"
              value="Submit"
              className="btn btn-primary w-full mt-5"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
