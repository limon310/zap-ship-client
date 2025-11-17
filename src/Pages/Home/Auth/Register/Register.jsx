import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../../hooks/useAuth';
import SocialLogin from '../socialLogin/socialLogin';
import { Link, useLocation, useNavigate } from 'react-router';
import axios from 'axios';

const Register = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {createUser, updateUserProfile} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    // handle register
    const handleRegister = (data) =>{
        console.log("after register", data.photo[0]);
        const profileImg = data.photo[0];
        createUser(data.email, data.password)
        .then(result =>{
            console.log(result.user);
            // store the image and get the photo url
            const formData = new FormData();
            formData.append("image", profileImg);
            const image_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST_KEY}`;
            
            axios.post(image_URL, formData)
            .then(res =>{
                console.log("after post", res.data.data.url);
                const userProfile = {
                    displayName: data.name,
                    photoURL: res.data.data.url
                }
                updateUserProfile(userProfile)
                .then(()=>{
                    console.log("updated successfully");
                    navigate(location?.state || "/");
                })
                .catch(err=>{
                    console.log(err);
                })
            })

        })
        .catch(error=>{
            console.log(error)
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit(handleRegister)}>
                <fieldset className="fieldset">
                    {/* Name field */}
                    <label className="label">Name</label>
                    <input type="text" {...register("name", {required: true})} className="input" placeholder="name" />

                    {
                        errors.name?.type === 'required' && 
                        <p className='text-red-500'>Name is required</p>
                    }
                    {/* image field */}
                    <label className="label">Photo</label>
                    <input type="file" {...register("photo", {required: true})} className="file-input" placeholder="Photo" />

                    {
                        errors.photo?.type === 'required' && 
                        <p className='text-red-500'>Photo is required</p>
                    }
                    {/* email */}
                    <label className="label">Email</label>
                    <input type="email" {...register("email", {required: true})} className="input" placeholder="Email" />

                    {
                        errors.email?.type === 'required' && 
                        <p className='text-red-500'>Email is required</p>
                    }

                    {/* password field */}
                    <label className="label">Password</label>
                    <input type="password" {...register("password", {
                        required: true,
                        minLength: 6,
                        pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).{6,}$/
                    })} className="input" placeholder="Password" />

                    {
                        errors.password?.type==='required' &&
                        <p className='text-red-500'>password is required</p>
                    }
                    {
                        errors.password?.type==='pattern' &&
                        <p className='text-red-500'>password is required</p>
                    }

                    {
                        errors.password?.type === 'minLength' && 
                        <p className='text-red-500'>Password must be at least 6 characters with upper, lower & special symbol</p>
                    }
                    <button className="btn btn-neutral mt-4">Register</button>
                </fieldset>
            </form>
            <SocialLogin></SocialLogin>
            <p>Already have an account? Please <Link 
            to="/login" 
            state={location.state}
            className='text-blue-500 underline'>Login</Link></p>
        </div>
    );
};

export default Register;