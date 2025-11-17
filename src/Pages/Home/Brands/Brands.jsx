import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import amazoon from '../../../assets/brands/amazon.png'
import casio from '../../../assets/brands/casio.png'
import moonstar from '../../../assets/brands/moonstar.png'
import randState from '../../../assets/brands/randstad.png'
import star from '../../../assets/brands/star.png'
import starPeople from '../../../assets/brands/start_people.png'
import { Autoplay } from 'swiper/modules';
const brands = [amazoon, casio, moonstar, randState, star, starPeople];
const Brands = () => {
    return (
        // <div>
        //     <h2 className='text-3xl font-bold text-center'>We've helped thousands of sales teams</h2>

        <Swiper
        loop={true}
        slidesPerView={4}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        modules={[Autoplay]}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
      >

        {
            brands.map((brandLogo, index) => <SwiperSlide key={index}><img src={brandLogo} alt="" /></SwiperSlide>)
        }
        
        
      </Swiper>
        // </div>
    );
};

export default Brands;