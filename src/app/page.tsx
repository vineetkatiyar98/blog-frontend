"use client";
import { useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar/Navbar";
import HomeSlider from "@/components/HomeSlider/HomeSlider";
import CategorySlider from "@/components/Categories/CategorySlider";
import BlogSlider from "@/components/BlogCards/BlogsSlider";
import Footer from "@/components/Footer/Footer";
export default function Home() {
  const checkLogin = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/checklogin`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        console.log(response);

        if (response.ok) {
        } else {
          window.location.href = "/pages/auth/signin";
        }
      })
      .catch((error) => {
        window.location.href = "/";
      });
  };

  useEffect(() => {
    checkLogin();
}, []);

  return (
    <main>
      <Navbar />
      <HomeSlider />
      <CategorySlider />
      <BlogSlider />
      <Footer />
    </main>
  );
}
