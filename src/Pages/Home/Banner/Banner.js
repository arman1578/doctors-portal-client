import React from "react";
import bg from "../../../../src/assets/images/bg.png";
import chair from "../../../../src/assets/images/chair.png";
import clock from "../../../../src/assets/icons/clock.svg";
import marker from "../../../../src/assets/icons/marker.svg";
import phone from "../../../../src/assets/icons/phone.svg";
import InfoCard from "../InfoCards/InfoCard";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";

const Banner = () => {
  const { user } = useContext(AuthContext);

  const cardData = [
    {
      id: 1,
      name: "Openning Hours",
      description: "Opens 9.00am to 5.00pm",
      icon: clock,
      bgClass: "bg-primary",
    },
    {
      id: 2,
      name: "Visit our location",
      description: "Brooklyn, NY 10036, United States",
      icon: marker,
      bgClass: "bg-accent",
    },
    {
      id: 3,
      name: "Contact us now",
      description: "+000 123 456789",
      icon: phone,
      bgClass: "bg-gray-500",
    },
  ];
  return (
    <section
      style={{ background: `url(${bg})`, backgroundSize: "cover" }}
      className="lg:mt-10"
    >
      <div className="hero w-full lg:pt-40">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src={chair} alt="" className=" rounded-lg shadow-2xl lg:w-1/2" />
          <div>
            <h1 className="text-4xl font-bold">Your New Smile Starts Here</h1>
            <p className="py-6">
              "Welcome to Doctors Portal Dental Care! Your journey to a healthier
              smile starts here. <span className="text-primary font-bold">Please Log In </span>to schedule your next appointment and
              experience our expert care firsthand. Let's work together to
              achieve your dental goals!"
            </p>
            {user?.uid ? (
              <Link to="/appointment">
                <button className="btn btn-primary mr-5 mb-5 lg:mb-0 text-white ">
                  Make Appointment
                </button>
              </Link>
            ) : (
              <Link to="/login">
                <button className="btn btn-primary text-white">
                  Make Appointment
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardData.map((card) => (
          <InfoCard key={card.id} card={card}></InfoCard>
        ))}
      </div>
    </section>
  );
};

export default Banner;
