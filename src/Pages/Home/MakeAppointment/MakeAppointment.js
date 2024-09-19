import React from "react";
import doctorsmall from "../../../../src/assets/images/doctor-small.png";
import appointment from "../../../../src/assets/images/appointment.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";

const MakeAppointment = () => {

  const { user } = useContext(AuthContext);

  return (
    <section className="mt-32"
    style={{background: `url(${appointment})`
    , backgroundSize: 'cover '
    }}>
      <div className="hero lg:mt-40 pb-5 lg:pb-0">
        <div className="hero-content pb-0 flex-col lg:flex-row">
          <img src={doctorsmall} alt="" className="mt-[-100px] hidden md:block lg:w-1/2"/>
          <div>
            <h1 className="text-lg font-bold text-primary mb-5">
              Appointment
            </h1>
            <h3 className="text-4xl text-white font-bold">Make an Appointment Today</h3>
            <p className="py-6 text-white mb-5">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsumis that it has a more-or-less normal
              distribution of letters,as opposed to using 'Content here, content
              here', making it look like readable English.
            </p>
            {
              user?.uid ? <Link to="/appointment"><button className="btn btn-primary mr-5 mb-5 lg:mb-0 text-white ">Make Appointment</button></Link> : <Link to="/login"><button className="btn btn-primary text-white">Make Appointment</button></Link>
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default MakeAppointment;
