import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from '../../../assets/banner/banner1.png'
import banner2 from '../../../assets/banner/banner2.png'
import banner3 from '../../../assets/banner/banner3.png'
import { Carousel } from 'react-responsive-carousel';
import { FiArrowUpRight } from 'react-icons/fi';
const Banner = () => {
    return (
        <Carousel autoPlay={true} infiniteLoop={true}>
            <div className='relative'>
                <img src={banner1} />
                <div  className='absolute bottom-8 left-30 flex gap-4 items-center'>
                    <button className='bg-primary p-4 rounded-2xl text-black text-xl '>Track Your Parcel</button>
                    <span className='bg-gray-700 p-3 rounded-full'><FiArrowUpRight /></span>
                    <h3 className='btn btn-outline bg-white'>Be A Rider</h3>
                </div>
            </div>
            <div className='relative'>
                <img src={banner2} />
                 <div  className='absolute bottom-8 left-30 flex gap-4 items-center'>
                    <button className='bg-primary p-4 rounded-2xl text-black text-xl '>Track Your Parcel</button>
                    <span className='bg-gray-700 p-3 rounded-full'><FiArrowUpRight /></span>
                    <h3 className='btn btn-outline bg-white'>Be A Rider</h3>
                </div>
            </div>
            <div className='relative'>
                <img src={banner3} />
                 <div  className='absolute bottom-8 left-30 flex gap-4 items-center'>
                    <button className='bg-primary p-4 rounded-2xl text-black text-xl '>Track Your Parcel</button>
                    <span className='bg-gray-700 p-3 rounded-full'><FiArrowUpRight /></span>
                    <h3 className='btn btn-outline bg-white'>Be A Rider</h3>
                </div>
            </div>
        </Carousel>
    );
};

export default Banner;