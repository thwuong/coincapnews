"use client";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { Settings } from "react-slick";
import Image from "next/image";
import { FeedType } from "@/app/types";
function BannerSlide({ data }: { data: FeedType[] }) {
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
  if (!data) return null;
  return (
    <div className="w-full slider-container py-4" id="slide">
      <Slider {...settings}>
        {data?.map((item, index) => (
          <a
            className="h-[136px] relative"
            href={item.post_permalink}
            key={item.id}
            target="_blank"
          >
            <Image
              src={item.post_thumbnail || "/assets/images/banner-coin.png"}
              alt="banner"
              fill
              className="rounded-md absolute max-lg:w-full max-lg:h-[136px] object-cover"
            />
          </a>
        ))}
      </Slider>
    </div>
  );
}

export default BannerSlide;
