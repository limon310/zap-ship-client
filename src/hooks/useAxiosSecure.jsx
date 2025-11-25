import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000/',
})
const useAxiosSecure = () => {
    const {user, signOutUser} = useAuth();
    const navigate = useNavigate();
    useEffect(()=>{
        const reqInterceptors = axiosSecure.interceptors.request.use(config =>{
            config.headers.Authorization = `Bearer ${user.accessToken}`
            return config;
        })

        const resInterceptors = axiosSecure.interceptors.response.use((response)=>{
            return response;
        }, (err)=>{
            console.log(err);
            const statusCode = err.status
            if(statusCode === 401 || statusCode === 403){
                signOutUser()
                .then(()=>{
                    navigate("/login");
                })
            }   
            return Promise.reject(err);
        })
        return ()=>{
            axiosSecure.interceptors.request.eject(reqInterceptors);
            axiosSecure.interceptors.response.eject(resInterceptors);
        }
    }, [user, signOutUser, navigate])
    return axiosSecure;
};

export default useAxiosSecure;