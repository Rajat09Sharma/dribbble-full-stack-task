import React, { useContext, useRef, useState } from 'react'
import Button from './Button'
import { UserContext } from '../store/acount-setup-context';
import { useNavigate } from 'react-router-dom';


export default function Avatar() {
    const [activeButton, setActiveButton] = useState(false);
    const fileInput = useRef();
    const navigate = useNavigate();
    const { file, address, addSelectedImage, addEnteredAddress } = useContext(UserContext);
    function handleClick() {
        fileInput.current.click();
    }
    function handleActive(value){
        if(value!==""){
            setActiveButton(true);
        }else{
            setActiveButton(false);
        }
    }
    function handleNavigate() {
        if (activeButton) {
            navigate("/seeking");
        }
    }

    return (
        <>
            <div className='flex items-center lg:justify-start lg:gap-12'>
                <h2 className="barand-color mt-8 text-2xl ps-8 barand-name-color">dribbble</h2>
            </div>
            <div className='w-11/12 md:w-6/12 lg:w-6/12 mx-auto text-left mt-6'>
                <h1 className='text-xl lg:text-3xl font-bold mb-4'>Welcome! Let's create your profile</h1>
                <p className='text-gray-500 text-xs md:text-base lg:text-base font-medium'>Let others get to know you better! You can do these later</p>

                <div className="col-span-full mt-4">
                    <div className="my-10">
                        <label htmlFor="photo" className="block text-2xl font-bold leading-6 mb-6">Add an avatar</label>
                        <div className="mt-2 flex items-center gap-x-8 md:gap-x-12 lg:gap-x-12">
                            {file ? <img src={URL.createObjectURL(file)} className="h-32 w-32 md:h-40 md:w-40 lg:h-40 lg:w-40 rounded-full" /> : <p onClick={handleClick} className="h-32 w-32 md:h-40 md:w-40 lg:h-40 lg:w-40 cursor-pointer border-2 border-dashed rounded-full flex flex-col items-center justify-center">
                                <svg className="h-8 w-8 md:h-10 md:w-10 lg:h-10 lg:w-10 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                                </svg>
                            </p>}
                            <div className="felx flex-col justify-center pb-8 md:pb-14 lg:pb-14">
                                <input type="file" ref={fileInput} onChange={(event) => addSelectedImage(event)} className="hidden" />
                                <button type="button" id="photo" onClick={handleClick} className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" >Choose image</button>
                                <p className="mt-3 lg:mt-4 text-gray-500 text-sm font-medium">{`> Or choose one of our defaults`}</p>
                            </div>

                        </div>
                    </div>
                    <div className="my-8">
                        <label htmlFor="address" className="block text-2xl font-bold leading-6 mb-4">Add your location</label>
                        <input id="address" name="address" value={address} type="text" 
                        onChange={(event) => {
                            addEnteredAddress(event.target.value)
                            handleActive(event.target.value)
                            }} 
                        className="block border-b-2 border-0 w-10/12 md:w-8/12 lg:w-8/12 text-xl" />
                    </div>
                </div>

                <Button isActive={activeButton} type="button" onClick={handleNavigate} smallWidth={true}>Next</Button>
                <p className="mt-0 text-gray-500 text-xs font-semibold ms-8">or Press RETURN</p>


            </div>
        </>
    )
}
