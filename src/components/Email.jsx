import React, { useEffect } from 'react'
import Navbar from './Navbar'
import MAIL_IMG from "../assets/images/mail-check.png"
import Footer from './Footer'
export default function Email() {
  useEffect(()=>{
    const id=localStorage.getItem("id");
    async function sendEmail(){
      try {
        const response = await fetch(`http://localhost:3000/user-email/${id}`);
        if(!response.ok){
          throw new Error(response.statusText);
        }
        console.log(response.statusText);
      } catch (error) {
        console.log(error.message);
      }
    }
    sendEmail();
  },[])
  return (
    <>
        <Navbar/>
        <div className="w-3/4 mx-auto py-6 text-center">
        <h1 className="text-2xl lg:text-3xl font-bold">Please verify your email...</h1>
        <img src={MAIL_IMG} className="w-24 lg:w-36 mx-auto mt-4" alt="checked mail image" />
        <p className="text-gray-400 text-sm mt-1 font-medium" font-medium >Please verify your email address. We've sent a confirmation email to:</p>
        <p className=" text-sm my-2  font-medium" >account@refero.design</p>
        <p className="text-gray-400 text-sm mb-2 font-medium" >Click the confirmation link in that email to begin using Dribbble</p>
        <p className="text-gray-400 text-sm font-medium" >Didn't receive the email? Check your Spam folder, it may have been caught by a filter. If</p>
        <p className="text-gray-400 text-sm mb-2 font-medium" >you still don't see it, you can <span className="mail-span-color font-medium"  >resend the confirmation email.</span></p>
        <p className="text-gray-400 text-sm font-medium" >Wrong email address? <span className="mail-span-color font-medium" >Change it.</span></p>
        </div>
        <Footer/>
    </>
  )
}
