import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading/Loading';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import { toast } from 'react-hot-toast';

const ManageDoctors = () => {

    const [deletingDoctor, setDeletingDoctor] = useState( null);
    const closeModal = () => {
        setDeletingDoctor(null);
    }
    const { data: doctors = [], isLoading, refetch} = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch('https://doctors-portal-server-kappa-wine.vercel.app/doctors', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                const data = await res.json();
                return data;
            } catch (error) {

                }
            }
            }
    )
    
    const handleDeleteDoctor = doctor => {
        fetch(`https://doctors-portal-server-kappa-wine.vercel.app/doctors/${doctor._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount > 0){
                toast.success(`Doctor ${doctor.name} deleted successfully`)
                setDeletingDoctor(null);
                refetch();
            }
        })
    }

    if(isLoading){
        return <Loading></Loading>;
    }

    return (
        <div>
            <h1 className="text-3xl">Manage Doctors: {doctors.length}</h1>
            <div className="overflow-x-auto w-cover">
                <table className="table w-full">
                 <thead>
                     <tr>
                         <th></th>
                         <th>Avatar</th>
                         <th>Name</th>
                         <th>Email</th>
                         <th>Specialty</th>
                         <th>Action</th>
                     </tr>
                 </thead>
                 <tbody>
                    {
                        doctors.map((doctor, index) => <tr key={doctor._id}>
                            <th>{index + 1}</th>
                            <td>
                                <div className="avatar">
                                    <div className="w-10 lg:w-20 rounded-xl">
                                        <img src={doctor.image} alt="" />
                                    </div>
                                </div>
                            </td>
                            <td>{doctor.name}</td>
                            <td>{doctor.email}</td>
                            <td>{doctor.specialty}</td>
                            <td>
                                <label onClick={() => setDeletingDoctor(doctor)} htmlFor="confirmation-modal" className="btn btn-sm btn-error mr-5 btn-outline">Delete</label>
                            </td>
                        </tr>)
                    }
                 </tbody>
                </table>
            </div>
            {
                deletingDoctor && <ConfirmationModal
                    title={`Are you sure you want to delete?`}
                    message={`If you delete User: ${deletingDoctor.name}. It cannot be undone.`}
                    successAction = {handleDeleteDoctor}
                    successButtonName = "Delete"
                    modalData = {deletingDoctor}
                    closeModal = {closeModal}
                ></ConfirmationModal>
            }
        </div>
    );
};

export default ManageDoctors;