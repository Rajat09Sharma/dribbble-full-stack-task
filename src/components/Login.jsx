import React, { useState } from 'react'
import Signup from './Signup'
import LOGO from "../assets/images/logo-image.png"
import Signin from './Signin';
export default function Login() {
    const [isSignUp,setIsSignUp] = useState(true);
    function handleSignUp() {
        setIsSignUp(true);
    }
    function handleSignIn(){
        console.log("false clicked");
        setIsSignUp(false);
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 ">
            <div className="col-span-1 md:col-span-4 lg:col-span-4 logo-bg-color">
                <h2 className="barand-color mt-8 text-2xl ps-8">dribbble</h2>
                <h1 className='title-color my-4 ps-8 font-bold text-3xl'>Discover the world's top <br/>Designers & Creatives.</h1>
                <img src={LOGO} alt='Logo image' />
            </div>
            
            {isSignUp?<Signup onSignIn={handleSignIn} />:<Signin onSignUp={handleSignUp} />}
            
        </div>
    )
}
