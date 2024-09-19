import React from 'react';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import MakeAppointment from '../MakeAppointment/MakeAppointment';
import Testimonials from '../Testimonial/Testimonials';
import Contact from '../Contact/Contact';

const Home = () => {
    return (
        <div className='mx-5'>
            <Banner></Banner>
            <Services></Services>
            <MakeAppointment></MakeAppointment>
            <Testimonials></Testimonials>
            <Contact></Contact>
        </div>
    );
};

export default Home;