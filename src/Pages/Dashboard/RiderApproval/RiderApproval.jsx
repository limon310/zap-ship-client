import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaTrashAlt, FaUserCheck } from 'react-icons/fa';
import { IoPersonRemove } from 'react-icons/io5';
import Swal from 'sweetalert2';

const RiderApproval = () => {
    const axiosSecure = useAxiosSecure();
    const { refetch, data: riders = [] } = useQuery({
        queryKey: ['riders', "pending"],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders')
            return res.data;
        }
    })

    // handle approval

    const updateRiderStatus = (rider, status) => {
        const updateInfo = { status: status, email: rider.email }
        axiosSecure.patch(`/riders/${rider._id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Application has been approved !",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    // handle approve
    const handleApproval = rider => {
        updateRiderStatus(rider, "approved")
    }
    // handle reject
    const handleReject = rider => {
        updateRiderStatus(rider, "reject")
    }
    // handle delete
    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/riders/${id}`)
                    .then(res => {
                        
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }
    return (
        <div>
            <h2 className='text-5xl font-bold'>Approve rider application {riders.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Sl No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>District</th>
                            <th>Status</th>
                            <th>Working Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            riders.map((rider, index) => <tr key={rider._id}>
                                <th>{index + 1}</th>
                                <td>{rider.name}</td>
                                <td>{rider.email}</td>
                                <td>{rider.district}</td>
                                <td>{rider.status}</td>
                                <td>{rider.workingStatus}</td>
                                <td className='flex gap-3'>
                                    <button onClick={() => handleApproval(rider)} className='btn btn-square'>
                                        <FaUserCheck />
                                    </button>
                                    <button onClick={() => handleReject(rider)} className='btn btn-square'>
                                        <IoPersonRemove />
                                    </button>
                                    <button onClick={() => handleDelete(rider._id)} className='btn btn-square'>
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RiderApproval;