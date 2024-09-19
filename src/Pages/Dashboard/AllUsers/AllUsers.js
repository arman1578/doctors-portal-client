import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { useState } from "react";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";
import Loading from "../../Shared/Loading/Loading";

const AllUsers = () => {
  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("https://doctors-portal-server-kappa-wine.vercel.app/users");
      const data = await res.json();
      return data;
    },
  });

  const [deleteingUser, setDeleteingUser] = useState(null);

  const closeModal = () => {
    setDeleteingUser(null);
  }


  const handleMakeAdmin = id => {
    fetch(`https://doctors-portal-server-kappa-wine.vercel.app/users/admin/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
            toast.success("Make Admin Successful");
          refetch();
        }
      })
  }

  const handleDeleteUser = user => {
    fetch(`https://doctors-portal-server-kappa-wine.vercel.app/users/${user._id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("User Deleted Successfully");
          setDeleteingUser(null);
          refetch();
        }
      })
  }

  if( isLoading ){
    return <Loading></Loading>;
  }

  return (
    <div>
      <h1 className="text-3xl">All Users</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th className="pl-10">Email</th>
              <th className="pl-10">Role</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  { user?.role !== "admin" && (
                    <button onClick={() => handleMakeAdmin(user._id)} className="btn btn-primary btn-xs">Make Admin</button>
                  )}
                </td>
                <td>
                  <label onClick={() => setDeleteingUser(user)} htmlFor="confirmation-modal" className="btn btn-sm btn-error mr-5 btn-outline">Delete</label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {
        deleteingUser && <ConfirmationModal
          title={`Are you sure you want to delete?`}
          message={`If you delete User: ${deleteingUser.name}. It cannot be undone.`}
          successAction = {handleDeleteUser}
          successButtonName = "Delete"
          modalData = {deleteingUser}
          closeModal = {closeModal}
        ></ConfirmationModal>
      }
    </div>
  );
};

export default AllUsers;
