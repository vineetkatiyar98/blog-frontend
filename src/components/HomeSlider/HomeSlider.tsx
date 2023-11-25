"use client";
import React, {useState, useEffect} from "react";
import img1 from "@/assets/sliderTemp/img1.png";
import img2 from "@/assets/sliderTemp/img1.png";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import {toast} from 'react-toastify'



interface ParagraphData {
  title: string;
  description: string;
  image: File | null;
  imageUrl: string;
  position: string;
  createdAt: Number | null;
}
interface Blog {
  _id: string;
  title: string;
  description: string;
  image: File | null;
  imageUrl: string;
  paragraphs: ParagraphData[];
  category: string;
}


if (typeof window !== "undefined") {
var width = window.innerWidth;
var height = window.innerHeight;
}



const HomeSlider = () => {

  const [blogs, setBlogs] = useState<Blog[]>([])

  const get10latestblogs = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/blog`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((res) => {
            return res.json();
        })
        .then((response) => {
            if (response.ok) {
                console.log(response)
                setBlogs(response.data.blogs);
            }
            else {
                toast(response.message, {
                    type: 'error',
                })
            }
        })
        .catch((error) => {
            toast(error.message, {
                type: 'error',
            })

        })
}
useEffect(() => {
    get10latestblogs();
}, [])

  return (
    <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
         {
                blogs.length > 0 &&

                blogs.map((blog, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <Image src={blog.imageUrl} alt="" width={width} height={height / 2}
                                style={{
                                    objectFit: "cover"
                                }} />
                        </SwiperSlide>
                    )
                })
            }

      </Swiper>
    </div>
  );
};

export default HomeSlider;