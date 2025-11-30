import React from 'react';
import useAuth from '../../hooks/useAuth';
import UseRole from '../../hooks/UseRole/UseRole';
import Forbiden from '../../components/Forbiden/Forbiden';

const RiderRoutes = ({children}) => {
    const { loading, user } = useAuth();
    const { role, roleLoading } = UseRole();
    if (loading || !user || roleLoading) {
        return <span>Loading.........</span>
    }
    if (role !== "rider") {
        return Forbiden
    }
    return children;
};

export default RiderRoutes;