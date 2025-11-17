import React from 'react';
import Banner from '../Banner/Banner';
import Card from '../HowItWorks/Card';
import Ourservices from '../OurServices/Ourservices';
import Brands from '../Brands/Brands';
import Reviews from '../Reviews/Reviews';

const reviewspromise = fetch("/reviews.json").then(res=> res.json())
const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Card></Card>
            <Ourservices></Ourservices>
            <Brands></Brands>
            <Reviews reviewspromise={reviewspromise}></Reviews>
        </div>
    );
};

export default Home;