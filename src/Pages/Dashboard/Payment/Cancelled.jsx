import React from 'react';
import { Link } from 'react-router';

const Cancelled = () => {
    return (
        <div>
            <h2>Payment Failled Try Agani</h2>
            <Link to="/dashboard/my-parcel" className='btn btn-outline'>Try Again</Link>
        </div>
    );
};

export default Cancelled;