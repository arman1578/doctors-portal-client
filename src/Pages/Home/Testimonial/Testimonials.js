import React from 'react';
import quote from '../../../../src/assets/icons/quote.svg';
import people1 from '../../../../src/assets/images/people1.png';
import people2 from '../../../../src/assets/images/people2.png';
import people3 from '../../../../src/assets/images/people3.png';
import Testimonial from './Testimonial';

const Testimonials = () => {
    const reviews = [
        {
            _id: 1,
            name: 'Winson Herry',
            img: people1,
            description: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content here',
            location: 'California'
        },
        {
            _id: 2,
            name: 'Lois Lane',
            img: people2,
            description: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content here',
            location: 'New York'
        },
        {
            _id: 3,
            name: 'Lucy Heart',
            img: people3,
            description: 'It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content here',
            location: 'Florida' 
        }
    ]
    return (
        <section className="my-16 ml-10">
            <div className="flex justify-between">
                <div>
                    <h4 className="text-2xl font-bold text-primary" >Testimonial</h4>
                    <h2 className="text-4xl">What Our Patients Says</h2>
                </div>
                <div>
                    <figure>
                        <img className="w-24 h-24 lg:w-48 lg:h-32 rounded-full" src={quote} alt="" />
                    </figure>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    reviews.map(review => <Testimonial
                        key={review._id}
                        review={review}
                    ></Testimonial>)
                }
            </div>
        </section>
    );
};

export default Testimonials;