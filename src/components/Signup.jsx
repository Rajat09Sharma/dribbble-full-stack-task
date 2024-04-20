import Input from './Input'
import Button from './Button'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup({ onSignIn }) {
    const [errorClass, setErrorClass] = useState(false);
    const [serverError, setServerError] = useState();
    const [enteredUserName, setEnteredUserName] = useState("");
    const navigate = useNavigate();

    async function handleChange(event) {
        let value = event.target.value;
        setEnteredUserName(value);

        try {
            const response = await fetch("http://localhost:3000/usernames");
            console.log(response);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const result = await response.json();
            const isUeserNameTake = result.length > 0 && result.filter(username => username === value);
            if (isUeserNameTake) {
                setErrorClass(true);
            }
            setErrorClass(false);
        } catch (error) {
            if (error) {
                console.log(error.message);
                setServerError({ message: error.message });
            }
        }

    }

    async function handleSumbit(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());
        if (!errorClass) {
            try {
                const response = await fetch("http://localhost:3000/signup", {
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

                //navigate to Avatar page
                localStorage.setItem("id", result.id);
                navigate("/avatar");
            } catch (error) {
                if (error) {
                    console.log(error.message);
                    setServerError({ message: error.message });
                }
            }
        }

    }
    return (
        <div className="col-span-1 md:col-span-8 lg:col-span-8  h-screen main-bg">
            <p className="mb-8 text-right pe-8 mt-6 lg:mt-4">Already a member? <span className='span-color' onClick={onSignIn}>Sign In</span></p>
            <form className="w-7/12 mx-auto ps-0 md:ps-12 lg:ps-12" onSubmit={handleSumbit}>
                <h2 className='text-2xl font-bold md:text-3xl'>Sign up to Dribbble</h2>
                {errorClass && <li className="error mt-6 mb-7 text-sm" >Username has already been taken.</li>}
                {serverError && <li className="error mt-6 mb-7 text-sm" >{serverError.message}</li>}

                <div className="control-row" >
                    <Input
                        label="Name"
                        id='name'
                        type="text"
                        name="name"
                        required
                    />
                    <Input
                        label="Username"
                        id="userName"
                        type="text"
                        name="userName"
                        className={errorClass ? "input-error" : undefined}
                        value={enteredUserName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <Input
                    label="Email"
                    id='email'
                    type="email"
                    name="email"
                    required
                />

                <Input
                    label="Password"
                    id="password"
                    type="password"
                    name="password"
                    required
                    minLength={6}
                    placeholder="6+characters"
                />

                <div className="grid grid-cols-12 mt-4">
                    <input type="checkbox" id="terms-and-conditions" name="terms" required className='h-4 mt-1' />
                    <label htmlFor="terms-and-conditions"
                        className='col-span-11 md:col-span-8 lg:col-span-8 text-xs lg:text-sm ms-1'>
                        Creating an account means you're okay with our
                        <span className='span-color'>Terms of Service, Privacy Policy</span>,
                        and our default <span className='span-color'>Notification<br />Settings.</span>
                    </label>
                </div>

                <Button type="submit" smallWidth={false}>Create Account</Button>
            </form>
            <p className='w-7/12 mx-auto ps-0 md:ps-12 lg:ps-12 text-xs text-left'>This site is protected by reCAPTCHA and the Google <br />
                <span className='span-color'>Privacy Policy </span>and
                <span className='span-color'>Terms of Service </span>apply.
            </p>
        </div>

    )
}
