import React from 'react';
import { FaTruck } from 'react-icons/fa';

const Ourservices = () => {
    const cards = [
        {id: 1, title: "Express  & Standard Delivery", description: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi.  Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off."},
        {id: 2, title: "Express  & Standard Delivery", description: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi.  Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off."},
        {id: 3, title: "Express  & Standard Delivery", description: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi.  Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off."},
        {id: 4, title: "Express  & Standard Delivery", description: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi.  Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off."},
        {id: 5, title: "Express  & Standard Delivery", description: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi.  Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off."},
        {id: 6, title: "Express  & Standard Delivery", description: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi.  Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off."},
    ]
    return (
        <div className='py-10'>
            <h2 className='text-3xl font-bold mb-5'>How It Works</h2>
          <div className='grid grid-cols-3 gap-5 flex-wrap p-8 bg-secondary'>
              {
                cards.map(card => <div key={card.id} className='bg-gray-300 p-8 rounded-2xl'>

                    <span className='mb-2'><FaTruck size={44} /></span>
                    <h2 className="text-2xl font-bold">{card.title}</h2>
                    <p>{card.description}</p>

                </div>)
            }
          </div>
        </div>
    );
};

export default Ourservices;