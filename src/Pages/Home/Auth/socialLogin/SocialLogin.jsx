import React from 'react';
import useAuth from '../../../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';

const SocialLogin = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {googleSignIn} = useAuth();
    // hanlde google sign in
    const handleGoogleSignIn = ()=>{
        googleSignIn()
        .then(result=>{
            console.log(result.user);
            navigate(location?.state || "/");
        })
        .catch(error=>{
            console.log(error);
        })
    }
    return (
        <div className='text-center'>
            <p className='mb-3'>Or</p>
            <button onClick={handleGoogleSignIn} className='btn btn-secondary'>Sign in with Google</button>
        </div>
    );
};

export default SocialLogin;