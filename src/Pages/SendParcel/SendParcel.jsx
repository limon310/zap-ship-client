import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const SendParcel = () => {
    const { register,
        handleSubmit,
        control,
        //  formState: { errors } 
    } = useForm();

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();
    const senderRegions = useLoaderData();
    // console.log(senderRegions);

    const senderRegion = useWatch({ control, name: "senderRegion" })
    const receiverRegion = useWatch({ control, name: 'receiverRegion' })

    const duplicateRegions = senderRegions.map(c => c.region);
    const regions = [...new Set(duplicateRegions)]
    // console.log(regions)

    const regionByDistrict = region => {
        const districtRegions = senderRegions.filter(r => r.region === region)
        const districts = districtRegions.map(c => c.district)
        return districts;
    }

    // handle send parcel
    const handleSendParcel = (data) => {
        console.log(data);
        const isDocument = data.parcelType === "document";
        const sameDistrict = data.senderDistrict === data.receiverDistrict;
        console.log(isDocument);
        const parcelWeight = parseFloat(data.parcelWeight);
        let cost = 0;
        if (isDocument) {
            cost = sameDistrict ? 60 : 80
        }
        else {
            if (parcelWeight < 3) {
                cost = sameDistrict ? 110 : 150
            }
            else {
                const minCharge = sameDistrict ? 110 : 150;
                const extraWeight = parcelWeight - 3;
                const extraCharge = sameDistrict ? extraWeight * 40 : extraWeight * 40 + 40;
                cost = minCharge + extraCharge;



            }
        }
        console.log(cost);
        data.cost = cost;

        Swal.fire({
            title: "Are you sure?",
            text: "please confirm your pay!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Proced to pay ${cost}`
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.post('/parcel', data)
                    .then(data => {
                        console.log("after post", data.data);
                        if (data.data.insertedId) {
                            navigate("/dashboard/my-parcel")
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Please Pay Now!",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
            }
        });
    }
    return (
        <div>
            <h2>Send a Parcel</h2>
            <form onSubmit={handleSubmit(handleSendParcel)} className='text-black'>
                {/* parcel type */}
                <div>
                    <label className='label'>
                        <input type="radio" value="document" {...register("parcelType")} className="radio radio-primary" defaultChecked />Document
                    </label>
                    <label className='label ml-4'>
                        <input type="radio" value="non-document" {...register("parcelType")} className="radio radio-primary" />Non-Document
                    </label>
                </div>
                {/* parcel info name and weight */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <fieldset className="fieldset">
                        <label className="label">Parcel Name</label>
                        <input type="text" {...register("parcelName")} className="input w-full" placeholder="Parcel Name" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <label className="label">Parcel Weight (kg)</label>
                        <input type="number" {...register("parcelWeight")} className="input w-full" placeholder="Parcel Weight" />
                    </fieldset>
                </div>
                {/* two collumn */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div>
                        {/* sender info */}
                        <fieldset className="fieldset">
                            <h2 className='text-2xl font-bold py-3'>Sender Details</h2>
                            {/* sender name */}
                            <label className="label">Sender Name</label>
                            <input type="text" {...register("senderName")} defaultValue={user?.displyName} className="input w-full mt-1" placeholder="Sender Name" />
                            {/* sender email */}
                            <label className="label">Sender Email</label>
                            <input type="email" {...register("senderEmail")} defaultValue={user?.email} className="input w-full mt-1" placeholder="Sender Email" />
                            {/* sender region */}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Sender Region</legend>
                                <select {...register("senderRegion")} defaultValue="Pick Your Region" className="select">
                                    <option disabled={true}>Pick Your Region</option>
                                    {
                                        regions.map((r, i) => <option key={i}>{r}</option>)
                                    }

                                </select>
                            </fieldset>

                            {/* sender district */}

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">District</legend>
                                <select {...register("senderDistrict")} defaultValue="Pick Your District" className="select">
                                    <option disabled={true}>Pick Your District</option>
                                    {
                                        regionByDistrict(senderRegion).map((r, i) => <option key={i}>{r}</option>)
                                    }

                                </select>
                            </fieldset>

                            {/* sender address */}
                            <label className="label">Sender Address</label>
                            <input type="text" {...register("senderAddress")} className="input w-full mt-1" placeholder="Sender Address" />
                        </fieldset>
                    </div>
                    {/* receiver info */}
                    <div>
                        <fieldset className="fieldset">
                            <h2 className='text-2xl font-bold py-3'>Receiver Details</h2>
                            {/* receiver name */}
                            <label className="label">Receiver Name</label>
                            <input type="text" {...register("receiverName")} className="input w-full mt-1" placeholder="Receiver Name" />
                            {/* RECEIVER EMAIL */}
                            <label className="label">Receiver Email</label>
                            <input type="email" {...register("receiverEmail")} className="input w-full mt-1" placeholder="Receiver Email" />
                            {/* sender region */}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Receiver Region</legend>
                                <select {...register("receiverRegion")} defaultValue="Pick Your Region" className="select">
                                    <option disabled={true}>Pick Your Region</option>
                                    {
                                        regions.map((r, i) => <option key={i}>{r}</option>)
                                    }

                                </select>
                            </fieldset>

                            {/* receiver district */}

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Receiver District</legend>
                                <select {...register("receiverDistrict")} defaultValue="Pick Your District" className="select">
                                    <option disabled={true}>Pick Your District</option>
                                    {
                                        regionByDistrict(receiverRegion).map((r, i) => <option key={i}>{r}</option>)
                                    }

                                </select>
                            </fieldset>
                            {/* receiver address */}
                            <label className="label">Receiver Address</label>
                            <input type="text" {...register("receiverAddress")} className="input w-full mt-1" placeholder="Receiver Address" />
                        </fieldset>
                    </div>
                </div>
                <button type='submit' className='btn btn-primary my-4'>Send Parcel</button>
            </form>
        </div>
    );
};

export default SendParcel;