import Input from './Input'
import Button from './Button'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signin({ onSignUp }) {
    const [error, setError] = useState();


    const navigate = useNavigate();
    async function handleSumbit(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());

        try {

            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                body: JSON.stringify({ user: data }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const result = await response.json();
            // redirect to avatar.....
            localStorage.setItem("id", result.id);
            // console.log(localStorage.getItem("id"));
            setError("");
            navigate("/avatar");
        } catch (error) {
            if (error) {
                setError({ message: "Invalid email or password, please try again later." })
            }
        }
    }


    return (
        <div className="col-span-1 md:col-span-8 lg:col-span-8  h-screen main-bg">
            <p className="mb-8 text-right pe-8 mt-6 lg:mt-4">Create a account? <span className='span-color' onClick={onSignUp}>Sign Up</span></p>
            <form className="w-7/12 mx-auto ps-0 md:ps-12 lg:ps-12" onSubmit={handleSumbit}>
                <h2 className='text-2xl font-bold md:text-3xl mb-4'>Sign In to Dribbble</h2>
                {error && <li className="error mt-6 mb-7 text-sm">{error.message}</li>}

                <Input
                    label="Email"
                    id='email'
                    type="email"
                    name="email"
                />
                <Input
                    label="Password"
                    id="password"
                    type="password"
                    name="password"
                />

                <Button type="submit" smallWidth={false} > Sign In</Button>
            </form>
            <p className='w-7/12 mx-auto ps-0 md:ps-12 lg:ps-12 text-xs text-left'>This site is protected by reCAPTCHA and the Google <br />
                <span className='span-color'>Privacy Policy </span>and
                <span className='span-color'>Terms of Service </span>apply.
            </p>
        </div>
    )
}
