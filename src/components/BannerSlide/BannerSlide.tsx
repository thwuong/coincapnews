"use client";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
function BannerSlide() {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 1,
        centerPadding: "120px",
        centerMode: true,
    };
    return (
        <div className="w-full slider-container py-4" id="slide">
            <Slider {...settings}>
                <div>
                    <Image
                        src={"/assets/images/banner-coin.png"}
                        alt="banner"
                        width={344}
                        height={136}
                        className="rounded-md"
                    />
                </div>
                <div>
                    <Image
                        src={"/assets/images/banner-coin.png"}
                        alt="banner"
                        width={344}
                        height={136}
                        className="rounded-md"
                    />
                </div>
                <div>
                    <Image
                        src={"/assets/images/banner-coin.png"}
                        alt="banner"
                        width={344}
                        height={136}
                        className="rounded-md"
                    />
                </div>
                <div>
                    <Image
                        src={"/assets/images/banner-coin1.png"}
                        alt="banner"
                        width={344}
                        height={136}
                        className="rounded-md"
                    />
                </div>
                <div>
                    <Image
                        src={"/assets/images/banner-coin1.png"}
                        alt="banner"
                        width={344}
                        height={136}
                        className="rounded-md"
                    />
                </div>
                <div>
                    <Image
                        src={"/assets/images/banner-coin1.png"}
                        alt="banner"
                        width={344}
                        height={136}
                        className="rounded-md"
                    />
                </div>
            </Slider>
        </div>
    );
}

export default BannerSlide;
