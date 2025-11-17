import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../../hooks/useAuth';
import SocialLogin from '../socialLogin/socialLogin';
import { Link, useLocation, useNavigate } from 'react-router';
const Login = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {signInUser} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    // handle login user with email and password
    const handleSignIn = (data)=>{
        console.log(data)
        signInUser(data.email, data.password)
        .then(result =>{
            console.log(result.user);
            navigate(location?.state || "/");
        })
        .catch(error=>{
            console.log(error);
        })
    }
    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <form onSubmit={handleSubmit(handleSignIn)}>
                    <fieldset className="fieldset">
                    {/* email */}
                    <label className="label">Email</label>
                    <input type="email" {...register("email", {required: true})} className="input" placeholder="Email" />
                    {
                        errors.email?.type === 'required' && 
                        <p className='text-red-500'>email required</p>
                    }
                    {/* password */}
                    <label className="label">Password</label>
                    <input type="password" {...register("password", {required: true, minLength: 6})} className="input" placeholder="Password" />

                    {
                        errors.password?.type === 'minLength' &&
                        <p className='text-red-500'>Password must be atleast 6 character</p>
                    }
                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Login</button>
                </fieldset>
                </form>
                <SocialLogin></SocialLogin>
                <p>Don't have any account? Please <Link 
                to="/register"
                state={location.state}
                 className='text-blue-500 underline'>Register</Link></p>
            </div>
        </div>
    );
};

export default Login;