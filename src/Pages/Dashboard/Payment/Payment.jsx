import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Payment = () => {
    const {parcelId} = useParams();
    const axiosSecure = useAxiosSecure();
    const {isLoading ,data: parcel=[]} = useQuery({
        queryKey:["payment", parcelId],
        queryFn: async() =>{
           const res = await  axiosSecure.get(`/parcel/${parcelId}`)
            return res.data
        }
    })

    // PAYMENT
    const handelPayment = async() =>{
        const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName,
            trackingId: parcel.trackingId
        }
        const res = await axiosSecure.post('/create-checkout-session',paymentInfo)
        console.log(res.data);
        window.location.href= res.data.url
    }

    if(isLoading){
        return <span>Loading........</span>
    }
    return (
        <div>
            <h2>Please Pay {parcel.cost}  for: {parcel.parcelName}</h2>
            <button onClick={handelPayment} className='btn btn-outline'>Pay Now</button>
        </div>
    );
};

export default Payment;