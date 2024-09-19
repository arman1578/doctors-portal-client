import React from "react";

const Testimonial = ({ review }) => {
  const { img, name, description, location } = review;
  return (
    <div className="card shadow-xl hover:shadow-2xl">
      <div className="card-body">
        <p>{description}</p>
        <div className="card-actions mt-6">
          <div className="avatar">
            <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 mr-5 ring-offset-2">
              <img src={img} alt="" />
            </div>
          </div>
          <div>
            <h5 className="text-lg">{name}</h5>
            <p>{location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
