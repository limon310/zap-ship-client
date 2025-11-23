import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({});
    const axiosSecure = useAxiosSecure();
    const sessionId = searchParams.get("session_id")
    console.log(sessionId);

    useEffect(()=>{
        if(sessionId){
            axiosSecure.patch(`/payment-success/?session_id=${sessionId}`)
            .then(res=>{
                console.log(res.data);
                setPaymentInfo({
                    transactionId: res.data.transactionId,
                    trackingId: res.data.trackingId
                })
            })
        }
    },[sessionId, axiosSecure])

    return (
        <div>
            <h2 className='text-4xl font-bold text-center'>Payment Success</h2>
            <span>Your Transection id is: {paymentInfo.transactionId}</span><br></br>
            <span>Your Tracking id is: {paymentInfo.trackingId}</span>
        </div>
    );
};

export default PaymentSuccess;