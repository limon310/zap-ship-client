import React from 'react';
import UseRole from '../../hooks/UseRole/UseRole';
import Forbiden from '../../components/Forbiden/Forbiden';
import useAuth from '../../hooks/useAuth';

const AdminRoutes = ({children}) => {
    const {loading} = useAuth();
    const {role, roleLoading} = UseRole();
    if(loading || roleLoading){
        return <span>Loading.........</span>
    }
    if(role !== "admin"){
        return Forbiden
    }
    return children;
};

export default AdminRoutes;