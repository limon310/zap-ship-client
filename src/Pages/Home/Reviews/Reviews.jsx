import React, { use } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import ReviewCard from './ReviewCard';
const Reviews = ({reviewspromise}) => {
    const userReviews = use(reviewspromise);
    console.log(userReviews);
    return (
        <div className='py-10'>
            <h2 className='text-3xl font-bold text-center mb-5'>What our customers are sayings</h2>
            <Swiper
        effect={'coverflow'}
        rotate="50%"
        loop={true}
        spaceBetween={30}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 30,
          stretch: "50%",
          depth: 200,
          modifier: 1,
          scale:0.75,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        {
            userReviews.map(userRevie => <SwiperSlide key={userRevie.id}>
                <ReviewCard userRevie={userRevie}></ReviewCard>
        </SwiperSlide>)
        }
      </Swiper>
        </div>
    );
};

export default Reviews;