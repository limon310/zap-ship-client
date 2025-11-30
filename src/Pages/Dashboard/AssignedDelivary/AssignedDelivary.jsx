import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AssignedDelivary = () => {
    const { user } = useAuth();
    console.log(user);
    const axiosSecure = useAxiosSecure();
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcel', user.email, 'driver_assigned'],
        queryFn: async () => {
            const res = await axiosSecure.get(`parcel/rider?riderEmail=${user.email}&delivaryStatus=driver_assigned`)
            return res.data;
        }
    })

    // handle delivary status update
    const handleParcelDelivaryStatus = (parcel, status) => {
        const statusUpdate = {
            delivaryStatus: status,
            riderId: parcel.riderId,
            trackingId: parcel.trackingId,
        }
        let message = `Marked parcel status ${status.split("_").join(" ")}`
        axiosSecure.patch(`/parcel/${parcel._id}/status`, statusUpdate)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "success!",
                        text: message,
                        icon: "success"
                    });
                }
            })
    }
    return (
        <div>
            <h2 className="text-4xl">Parcel Pending Pickup {parcels.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Actions</th>
                            <th>Others Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel, i) => <tr>
                            <th>{i + 1}</th>
                            <td>{parcel.parcelName}</td>
                            <td>
                                {
                                    parcel.delivaryStatus === "driver_assigned"
                                        ? <>
                                            <button onClick={() => handleParcelDelivaryStatus(parcel, 'rider_arriving')} className='btn btn-primary'>Accept</button>
                                            <button className='btn btn-outline ms-2'>reject</button>
                                        </>
                                        : <span>Accept</span>
                                }

                            </td>
                            <td>
                                 <button onClick={() => handleParcelDelivaryStatus(parcel, 'parcel_pickup')} className='btn btn-primary'>marked_as_pickup</button>

                                 <button onClick={() => handleParcelDelivaryStatus(parcel, 'parcel_delivary')} className='btn btn-primary ms-2'>marked_as_delivered</button>
                            </td>
                        </tr>)}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignedDelivary;