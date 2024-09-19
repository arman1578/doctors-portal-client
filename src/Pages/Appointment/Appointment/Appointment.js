import React, { useState } from "react";
import AppBanner from "../AppBanner/AppBanner";
import AvailableAppointments from "../AvailableAppointments/AvailableAppointments";

const Appointment = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div>
      <AppBanner
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <AvailableAppointments
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </div>
  );
};

export default Appointment;
