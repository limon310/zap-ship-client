import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useLoaderData } from 'react-router';
import riderImg from '../../assets/agent-pending.png';
import Swal from 'sweetalert2';

const Rider = () => {
    // react hook form 
    const { register,
        handleSubmit,
        control,
        //  formState: { errors } 
    } = useForm();

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const senderRegions = useLoaderData();

    const riderRegion = useWatch({ control, name: "region" })

    const duplicateRegions = senderRegions.map(c => c.region);
    const regions = [...new Set(duplicateRegions)]
    // console.log(regions)

    const regionByDistrict = region => {
        const districtRegions = senderRegions.filter(r => r.region === region)
        const districts = districtRegions.map(c => c.district)
        return districts;
    }

    const handleRiderApplication = data => {
        console.log(data);
        axiosSecure.post('/riders', data)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Application submit successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }
    return (
        <div>
            <h2 className='text-3xl font-bold'>Be a Rider</h2>
            <form onSubmit={handleSubmit(handleRiderApplication)} className='text-black'>

                {/* two collumn */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div>
                        {/* Rider info */}
                        <fieldset className="fieldset">
                            <h2 className='text-2xl font-bold py-3'>Tell us about your self</h2>
                            {/* rider name */}
                            <label className="label">Name</label>
                            <input type="text" {...register("name")} defaultValue={user?.displyName} className="input w-full mt-1" placeholder="Name" />
                            {/* email */}
                            <label className="label">Email</label>
                            <input type="email" {...register("email")} defaultValue={user?.email} className="input w-full mt-1" placeholder="Email" />
                            {/* nid */}
                            <label className="label">NID</label>
                            <input type="text" {...register("nid")} className="input w-full mt-1" placeholder="NID" />
                            {/* bike */}
                            <label className="label">Bike Info</label>
                            <input type="text" {...register("bike")} className="input w-full mt-1" placeholder="Bike Info" />
                            {/* region */}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Region</legend>
                                <select {...register("region")} defaultValue="Pick Your Region" className="select">
                                    <option disabled={true}>Pick Your Region</option>
                                    {
                                        regions.map((r, i) => <option key={i}>{r}</option>)
                                    }

                                </select>
                            </fieldset>

                            {/* district */}

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">District</legend>
                                <select {...register("district")} defaultValue="Pick Your District" className="select">
                                    <option disabled={true}>Pick Your District</option>
                                    {
                                        regionByDistrict(riderRegion).map((r, i) => <option key={i}>{r}</option>)
                                    }

                                </select>
                            </fieldset>

                            {/* address */}
                            <label className="label">Address</label>
                            <input type="text" {...register("address")} className="input w-full mt-1" placeholder="Rider Address" />
                        </fieldset>
                    </div>
                    {/* rider img */}
                    <img src={riderImg} alt="" />
                </div>
                <button type='submit' className='btn btn-primary my-4'>Send Parcel</button>
            </form>
        </div>
    );
};

export default Rider;