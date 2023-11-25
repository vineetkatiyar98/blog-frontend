"use client"
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  BiPlus,
  BiSolidUserCircle,
  BiSearchAlt,
  BiHomeCircle,
  BiSolidContact,
} from "react-icons/bi";
import { IoAlertCircleOutline } from "react-icons/io5";
import logo from "@/assets/logo.png";
import Image from "next/image";
import "./Navbar.css";
import { toast } from "react-toastify";
import { deleteCookie } from "cookies-next";

const Navbar = () => {
  const [auth, setauth] = useState<Boolean>(false);

  const checkLogin = async () => {
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
        if (response.ok) {
          setauth(true);
        } else {
          setauth(false);
        }
      })
      .catch((err) => {
        toast(err.message, {
          type: "error",
          position: "top-right",
          autoClose: 2000,
        });
      });
  };

  useEffect(() => {
    checkLogin(); // Call the checkLogin function on route change
  }, []);

  const handlelogout = async () => {
    await deleteCookie("authToken");
    await deleteCookie("refreshToken");
    window.location.href = "/pages/auth/signin";
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link href="/pages/profile" className="link">
          <BiSolidUserCircle className="icon" />
        </Link>
        <Link href="/pages/addblog">
          <BiPlus className="icon" />
        </Link>
        <Link href="/pages/search">
          <BiSearchAlt className="icon" />
        </Link>
      </div>
      <div className="navbar-middle">
        <Link href="/">
          <Image className="logo" src={logo} alt="Picture of the company" />
        </Link>
      </div>

      {auth ? (
        <div className="navbar-right">
          <Link href="/">
            <BiHomeCircle className="icon" />
          </Link>
          <Link href="/pages/about">
            <IoAlertCircleOutline className="icon" />
          </Link>
          <Link href="/pages/contact">
            <BiSolidContact className="icon" />
          </Link>
          <button className="btn" onClick={handlelogout}>Logout</button>
        </div>
      ) : (
        <div className="navbar-right">
          <Link href="/pages/auth/signin">
            <button className="btn">Login</button>
          </Link>
          <Link href="/pages/auth/signup">
            <button className="btn">Signup</button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
