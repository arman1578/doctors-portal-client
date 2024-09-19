import React from "react";
import appointment from "../../../assets/images/appointment.png";

const Contact = () => {
  return (
    <section
      className=""
      style={{ background: `url(${appointment})`, backgroundSize: "cover " }}
    >
      <div>
        <div className="hero lg:mt-40">
          <div className="hero-content flex-col ">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-primary mt-5 mb-5 ">
                Contact Now
              </h1>
              <h1 className="text-4xl font-bold text-white ">
                Stay connected with us
              </h1>
            </div>
            <div className="w-full">
              <form className="card-body">
                <div className="form-control">
                  <input
                    type="email"
                    placeholder="Email"
                    className="input input-bordered mb-4"
                    required
                  />
                </div>
                <div className="form-control">
                  <input
                    type="text"
                    placeholder="Subject"
                    className="input input-bordered mb-4"
                    required
                  />
                </div>
                <div className="form-control">
                  <textarea
                    className="textarea textarea-bordered"
                    placeholder="Your message"
                    required
                  ></textarea>
                </div>
                <button className="form-control btn font-bold mt-4 ml-24 w-1/3 btn-primary text-white uppercase ">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
