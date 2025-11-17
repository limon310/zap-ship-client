import React from 'react';
import { FaTruck } from 'react-icons/fa';

const Card = () => {
    const cards = [
        {id: 1, title: "Booking Pick & Drop", description: "From personal packages to business shipments — we deliver on time, every time."},
        {id: 2, title: "Booking Pick & Drop", description: "From personal packages to business shipments — we deliver on time, every time."},
        {id: 3, title: "Booking Pick & Drop", description: "From personal packages to business shipments — we deliver on time, every time."},
        {id: 4, title: "Booking Pick & Drop", description: "From personal packages to business shipments — we deliver on time, every time."}
    ]
    return (
        <div className='py-10'>
            <h2 className='text-3xl font-bold mb-5'>How It Works</h2>
          <div className='flex gap-3'>
              {
                cards.map(card => <div key={card.id} className='bg-gray-300 p-3 rounded-2xl'>

                    <span className='mb-2'><FaTruck size={44} /></span>
                    <h2>{card.title}</h2>
                    <p>{card.description}</p>

                </div>)
            }
          </div>
        </div>
    );
};

export default Card;