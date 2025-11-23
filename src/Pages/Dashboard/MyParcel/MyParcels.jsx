import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaEdit } from 'react-icons/fa';
import { MdOutlinePageview } from 'react-icons/md';
import { FaTrashCan } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: parcels = [] } = useQuery({
        queryKey: ['myParcel', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcel?email=${user?.email}`)
            console.log(res.data)
            return res.data
        }
    })

    // handle delete parcel
    const handleDeleteParcel = (id) => {
        console.log(id);
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

                axiosSecure.delete(`/parcel/${id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount > 0) {
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

    // handle checkout
    // const handleCheckout = async (parcel) =>{
    //     const paymentInfo = {
    //         cost: parcel.cost,
    //         customer_email: parcel.senderEmail,
    //         parcelName: parcel.parcelName,
    //         parcelId: parcel.parcelId
    //     }
    //     const res = await axiosSecure.post('/create-checkout-session2',paymentInfo)
    //     console.log(res.data);
    //     window.location.assign(res.data.url)
    // }
    return (
        <div>
            <h2 className='text-3xl font-bold text-center py-10 text-yellow-400'>My total parcels: {parcels.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Sl No.</th>
                            <th>Type</th>
                            <th>Name</th>
                            <th>Sender</th>
                            <th>Payment Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            parcels.map((parcel, i) => <tr key={parcel._id}>
                                <td>{i + 1}</td>
                                <td>{parcel.parcelType}</td>
                                <td>{parcel.parcelName}</td>
                                <td>{parcel.senderName}</td>
                                <td>
                                    {
                                        parcel.payment_status === 'paid'
                                        ?<span className="text-green500 btn">Paid</span>
                                        :<Link to={`/dashboard/payment/${parcel._id}`} className='btn btn-outline'>Pay</Link>
                                        // :<button onClick={handleCheckout()} className='btn btn-primary'>Pay Now</button>
                                    }
                                </td>
                                <td className='flex gap-3'>
                                    <button className='btn btn-square hover:bg-primary'>
                                        <MdOutlinePageview />
                                    </button>
                                    <button className='btn btn-square hover:bg-primary'>
                                        <FaEdit />
                                    </button>
                                    <button onClick={() =>handleDeleteParcel(parcel._id)} className='btn btn-square hover:bg-primary'>
                                        <FaTrashCan />
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

export default MyParcels;