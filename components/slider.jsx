'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSlider() {
  const sliderData = [
    {
      id: 1,
      title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
      offer: "Limited Time Offer 30% Off",
      buttonText1: "Buy now",
      buttonText2: "Find more",
      imgSrc:
        "https://quickcart.greatstack.in/_next/static/media/header_macbook_image.2135a26c.png",
    },
    {
      id: 2,
      title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
      offer: "Hurry up only few lefts!",
      buttonText1: "Shop Now",
      buttonText2: "Explore Deals",
      imgSrc:
        "https://quickcart.greatstack.in/_next/static/media/header_playstation_image.f40d654c.png",
    },
    {
      id: 3,
      title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
      offer: "Exclusive Deal 40% Off",
      buttonText1: "Order Now",
      buttonText2: "Learn More",
      imgSrc:
        "https://quickcart.greatstack.in/_next/static/media/header_headphone_image.cb07f9d4.png",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="overflow-hidden relative w-full">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="flex flex-col-reverse md:flex-row items-center justify-between 
                       bg-[#E6E9F2] py-6 px-5 md:px-10 lg:px-16 mt-6 rounded-xl 
                       min-w-full h-auto md:h-[350px]"
          >
            <div className="mt-6 md:mt-0 flex-1 text-center md:text-left">
              <p className="text-xs sm:text-sm md:text-base text-orange-600 pb-1">
                {slide.offer}
              </p>
              <h1 className="max-w-lg mx-auto md:mx-0 text-lg sm:text-xl md:text-2xl font-bold leading-snug md:leading-snug">
                {slide.title}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start mt-4 gap-3">
                <Link href="/shop" className="px-5 sm:px-7 md:px-8 py-2 bg-orange-600 rounded-full text-white text-sm font-medium hover:bg-orange-700 transition">
                  {slide.buttonText1}
                </Link>
                <Link href="/shop" className="group flex items-center gap-2 px-4 sm:px-5 py-2 text-sm font-medium hover:text-orange-600 transition">
                  {slide.buttonText2}
                </Link>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <Image
                className="w-32 sm:w-44 md:w-56 lg:w-64 object-contain"
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
                width={400}
                height={400}
                priority
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 mt-5">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2 w-2 rounded-full cursor-pointer transition ${
              currentSlide === index ? "bg-orange-600 scale-110" : "bg-gray-400/40"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
