import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const CompletedDelivery = () => {
    const { user } = useAuth();
    console.log(user);
    const axiosSecure = useAxiosSecure();
    const { data: parcels = [] } = useQuery({
        queryKey: ['parcel', user.email, 'driver_assigned'],
        queryFn: async () => {
            const res = await axiosSecure.get(`parcel/rider?riderEmail=${user.email}&delivaryStatus=parcel_delivary`)
            return res.data;
        }
    })
    const calculatePrice = parcel => {
        if(parcel.senderDistrict === parcel.receiverDistrict){
            return parcel.cost*0.8;
        }
        else{
            return parcel.cost*0.6;
        }
    }
    return (
        <div>
            <h2 className='text-3xl'>Completed Delivery {parcels.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>parcelId</th>
                            <th>totalPayout</th>
                            <th>Others Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel, i) => <tr>
                            <th>{i + 1}</th>
                            <td>{parcel.parcelName}</td>
                            <td>{parcel.cost}</td>
                            <td>{parcel._id}</td>
                            <td>{calculatePrice(parcel)}</td>
                            <td>
                                <button className='btn btn-primary'>Cash out</button>
                            </td>
                        </tr>)}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CompletedDelivery;