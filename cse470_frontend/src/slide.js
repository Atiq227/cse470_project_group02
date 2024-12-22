// src/Slideshow.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './slide.css'; // Ensure this file exists

const Slideshow = () => {
    const images = [
        process.env.PUBLIC_URL + '/ai-generated-8287729_960_720.webp',
        process.env.PUBLIC_URL + '/Easy-Rosemary-Fried-Chicken-Recipe-The-New-Way-to-Fry-Chic-21489-07156d90ae-1628491804.jpg',
        process.env.PUBLIC_URL + '/hamburger-dinner_7QH4K6AESO.jpg',
        process.env.PUBLIC_URL + '/kimchi-fried-rice-241051_960_720.jpg',
        process.env.PUBLIC_URL + '/Veggie_Mexicana_kii4-vz.jpg'
    ];

    const settings = {
        dots: false,           // Disable navigation dots
        infinite: true,        // Loop the slides infinitely
        speed: 20000,          // A long transition duration for continuous effect
        autoplay: true,        // Enable automatic scrolling
        autoplaySpeed: 0,      // No delay between transitions
        cssEase: 'linear',     // Linear easing for smooth motion
        pauseOnHover: false,   // Do not stop on hover
        arrows: false          // Hide navigation arrows
    };
    
    
    return (
        <div className="slideshow-container">
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index} className="slide">
                        <img src={image} alt={`Slide ${index}`} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Slideshow;
