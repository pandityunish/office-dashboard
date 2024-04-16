// InfiniteSlider.js
"use client"
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const InfiniteSlider = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Increment the current slide index to move to the next slide
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000); // Adjust the interval as needed (e.g., 3000ms for 3 seconds)

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [slides]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplaySpeed: 3000,
    arrows: false,
    autoplay: true, // Autoplay is managed manually using useEffect
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className={index === currentSlide ? 'block' : 'hidden'}>
            {/* Your slide content goes here */}
            <img src={slide} alt={`Slide`} className="" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default InfiniteSlider;
