import React from "react";
import fluoride from "../../../assets/images/fluoride.png";
import cavity from "../../../assets/images/cavity.png";
import whitening from "../../../assets/images/whitening.png";
import Service from "./Service";
import treatment from "../../../assets/images/treatment.png";

const Services = () => {
  const services = [
    {
      _id: 1,
      name: "Fluoride Treatment",
      description:
        "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
      img: fluoride,
    },
    {
      _id: 2,
      name: "Cavity Filling",
      description:
        "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
      img: cavity,
    },
    {
      _id: 3,
      name: "Teeth Whitening",
      description:
        "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
      img: whitening,
    },
  ];

  return (
    <div className="mt-16">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-primary uppercase mb-4">
          Our Services
        </h3>
        <h2 className="text-3xl">Services We Provide</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
        {services.map((service) => (
          <Service key={service._id} service={service}></Service>
        ))}
      </div>
      <div>
        <div className="hero">
          <div className="hero-content lg:pb-16 flex-col lg:flex-row">
            <img src={treatment} alt="" className="lg:ml-20 w-3/4 lg:mt-40 mt-10 max-w-sm rounded-lg shadow-2xl" />
            <div>
              <h1 className="lg:ml-20 lg:mt-6 ml-2 text-5xl font-bold">
                Exceptional Dental Care, On Your Terms
              </h1>
              <p className="lg:ml-20 ml-2 lg:mt-6 py-6">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsumis that it has a more-or-less
                normal distribution of letters,as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
