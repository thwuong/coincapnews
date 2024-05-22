"use client";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { Settings } from "react-slick";
import Image from "next/image";
function BannerSlide() {
    const settings: Settings = {
        speed: 500,
        autoplay: true,
        slidesToShow: 3,
        centerMode: true,
        responsive: [
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 1023,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                    infinite: true,
                    arrows: false,
                    centerMode: false,
                },
            },
        ],
    };
    return (
        <div className="w-full slider-container py-4" id="slide">
            <Slider {...settings}>
                <div className="h-[136px] relative">
                    <Image
                        src={"/assets/images/banner-coin.png"}
                        alt="banner"
                        fill
                        className="rounded-md absolute max-lg:w-full max-lg:h-[136px] object-cover"
                    />
                </div>
                <div className="h-[136px] relative">
                    <Image
                        src={"/assets/images/banner-coin.png"}
                        alt="banner"
                        fill
                        className="rounded-md absolute max-lg:w-full max-lg:h-[136px] object-cover"
                    />
                </div>
                <div className="h-[136px] relative">
                    <Image
                        src={"/assets/images/banner-coin.png"}
                        alt="banner"
                        fill
                        className="rounded-md absolute max-lg:w-full max-lg:h-[136px] object-cover"
                    />
                </div>
                <div className="h-[136px] relative">
                    <Image
                        src={"/assets/images/banner-coin1.png"}
                        alt="banner"
                        fill
                        className="rounded-md absolute max-lg:w-full max-lg:h-[136px] object-cover"
                    />
                </div>
                <div className="h-[136px] relative">
                    <Image
                        src={"/assets/images/banner-coin1.png"}
                        alt="banner"
                        fill
                        className="rounded-md absolute max-lg:w-full max-lg:h-[136px] object-cover"
                    />
                </div>
                <div className="h-[136px] relative">
                    <Image
                        src={"/assets/images/banner-coin1.png"}
                        alt="banner"
                        fill
                        className="rounded-md absolute max-lg:w-full max-lg:h-[136px] object-cover"
                    />
                </div>
            </Slider>
        </div>
    );
}

export default BannerSlide;
