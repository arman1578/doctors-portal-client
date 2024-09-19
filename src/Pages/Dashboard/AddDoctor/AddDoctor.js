import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";

const AddDoctor = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const imageHostKey = process.env.React_APP_imgbb_API_KEY;

  const navigate = useNavigate();

  const { data: specialties = [], isLoading } = useQuery({
    queryKey: ["specialty"],
    queryFn: async () => {
      const res = await fetch("https://doctors-portal-server-kappa-wine.vercel.app/appointmentSpecialty")
        const data = await res.json();
        return data;
    }
  });

  const handleAddDoctor = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const doctor = {
            name: data.name,
            email: data.email,
            specialty: data.specialty,
            image: imgData.data.url,
          }
          // save doctor
          fetch("https://doctors-portal-server-kappa-wine.vercel.app/doctors", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(doctor),
          })
            .then((res) => res.json())
            .then((result) => {
              toast.success(`${data.name} added successfully`);
              navigate("/dashboard/managedoctors");
            })
        }
      })
  };

  if (isLoading) {
    return <Loading></Loading>
  }

  return (
    <div className="w-96 p-7 shadow-2xl rounded mx-auto mt-20 lg:ml-40 lg:mt-40">
      <h1 className="text-3xl font-bold mb-5 text-primary text-center mt-5">Add Doctor</h1>
      <form onSubmit={handleSubmit(handleAddDoctor)}>
        <div className="form-control w-full max-w-xs">
          <label className="lable mb-2">
            <span className="label-text text-xl">Name</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-600 mt-1 text-sm font-semibold text-left ml-1">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="lable mb-2 mt-5">
            <span className="label-text text-xl">Email</span>
          </label>
          <input
            type="email"
            className="input input-bordered w-full max-w-xs"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-600 mb-1 text-sm font-semibold text-left ml-1">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="lable mb-2 mt-5">
            <span className="label-text text-xl">Specialty</span>
          </label>
          <select
           {...register("specialty", { required: "Specialty is required" })}
           className="select select-bordered w-full max-w-xs">
            {specialties.map((specialty) => (
              <option key={specialty._id} value={specialty.name}>
                {specialty.name}
              </option>
            ))}
          </select>
          {errors.specialty && (
            <p className="text-red-600 mb-1 text-sm font-semibold text-left ml-1">
              {errors.specialty.message}
            </p>
          )}

        </div>
          <div className="form-control w-full max-w-xs mt-5">
            <label className="lable mb-2"><span className="label-text text-xl">Photo</span></label>
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: "Image is required" })}
              className="input input-bordered w-full max-w-xs pt-2 pb-10"
            />
            {errors.image && (
              <p className="text-red-600 text-sm font-semibold text-left ml-1">
                {errors.image.message}
              </p>
            )}
          </div>
        <input
          type="submit"
          className="btn btn-accent w-full max-w-xs mt-5 text-white"
          value="Add a Doctor"
        />
      </form>
    </div>
  );
};

export default AddDoctor;
