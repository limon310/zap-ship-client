import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AssignRider = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedParcel, setSelectedParcel] = useState(null);
    console.log("in side the selectedParcel state", selectedParcel)
    const assignRiderModalRef = useRef();
    const { data: parcels = [], refetch: parcelRefetch } = useQuery({
        queryKey: ['parcels', 'pending-pickup'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcel?delivaryStatus=pending-pickup')
            return res.data;
        }
    })

    const { data: riders = [] } = useQuery({
        queryKey: ['riders', selectedParcel?.senderDistrict, 'available'],
        enabled: !!selectedParcel,
        queryFn: async () => {
            const res = await axiosSecure.get(`/riders?status=approved&workingStatus=available&district=${selectedParcel?.senderDistrict}`)
            return res.data;
        }
    })

    // open modal
    const handleOpenRiderModal = parcel => {
        setSelectedParcel(parcel)
        assignRiderModalRef.current.showModal();
    }

    // handle assign rider
    const handleAssignRider = rider => {
        // console.log("########", rider);
        const assignRiderInfo = {
            riderId: rider._id,
            riderName: rider.name,
            riderEmail: rider.email,
            parcelId: selectedParcel._id,
            trackingId: selectedParcel.trackingId
        }
        axiosSecure.patch(`/parcel/${selectedParcel._id}`, assignRiderInfo)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    assignRiderModalRef.current.close();
                    parcelRefetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Rider has been assigned!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }
    return (
        <div>
            <h2 className='text-4xl'>Assign Riders {parcels.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>CreatedAt</th>
                            <th>PickUp District</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            parcels.map((parcel, index) => <tr key={parcel._id}>
                                <th>{index + 1}</th>
                                <td>{parcel.parcelName}</td>
                                <td>{parcel.cost}</td>
                                <td>{parcel.createdAt}</td>
                                <td>{parcel.senderDistrict}</td>
                                <td>
                                    <button
                                        onClick={() => handleOpenRiderModal(parcel)}
                                        className='btn btn-primary'>Find Rider</button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>

            <dialog ref={assignRiderModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Riders {riders.length}</h3>

                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    riders.map((rider, i) => <tr key={rider._id}>
                                        <th>{i + 1}</th>
                                        <td>{rider.name}</td>
                                        <td>{rider.email}</td>
                                        <td>
                                            <button
                                                onClick={() => handleAssignRider(rider)}
                                                className='btn btn-primary'
                                            >Assign Rider</button>
                                        </td>
                                    </tr>)
                                }

                            </tbody>
                        </table>
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AssignRider;