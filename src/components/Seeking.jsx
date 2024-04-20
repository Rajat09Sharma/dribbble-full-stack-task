import React, { useContext, useState } from 'react'
import Button from "./Button"
import ChoiceCard from './ChoiceCard'
import CARD_IMG_ONE from "../assets/images/choice-1.png"
import CARD_IMG_TWO from "../assets/images/choice-2.png"
import CARD_IMG_THRID from "../assets/images/choice-3.png"
import { UserContext } from '../store/acount-setup-context'
import { useNavigate } from 'react-router-dom'
export default function Seeking() {
  const [userChoice, setUserChoice] = useState({
    first: false,
    second: false,
    third: false
  });
  const { choice, addSelectedChoice } = useContext(UserContext);
  const navigate =useNavigate();

  function handleCheck(name, checkedValue) {
    setUserChoice(prevs => {
      if (name === "first") {
        return {
          first: true,
          second: false,
          third: false
        }
      }
      if (name === "second") {
        return {
          first: false,
          second: true,
          third: false
        }
      }
      if (name === "third") {
        return {
          first: false,
          second: false,
          third: true
        }
      }
    })
    addSelectedChoice(checkedValue);
  }

  function handleNavigate(){
    if(userChoice.first || userChoice.second || userChoice.third){
      navigate("/email")
    }
  }

  const activeCSS = "choice-card col-span-1 lg:col-span-4 rounded-md border-2 py-2 px-14 active-choice";
  const notActiveCSS = "choice-card col-span-1 lg:col-span-4 rounded-md border-2 py-2 px-14 "
  return (
    <>
      <div className='flex items-center lg:justify-start lg:gap-12'>
        <h2 className="barand-color mt-8 text-2xl ps-8 barand-name-color">dribbble</h2>
        <button className='rounded-lg px-4 py-3 text-sm mt-8 seeking-button-color'>{`<`}</button>
      </div>
      <div className='w-9/12 mx-auto text-center mt-6'>
        <h1 className='text-3xl font-bold mb-4'>What brings you to Dribbble?</h1>
        <p className='text-gray-500 font-medium'>Select the options that best describe you. Don't worry, you can explore other options later.</p>

        <div className='card-container grid grid-cols-1 gap-2 lg:grid-cols-12 lg:gap-2 my-12'>
          <ChoiceCard onChecked={handleCheck} isChecked={userChoice.first} isActiveclassName={userChoice.first ? activeCSS : notActiveCSS} name="first" title="I'm a designer looking to share my work" imgSrc={CARD_IMG_ONE} />
          <ChoiceCard onChecked={handleCheck} isChecked={userChoice.second} isActiveclassName={userChoice.second ? activeCSS : notActiveCSS} name="second" title="I'm looking to hire a designer" imgSrc={CARD_IMG_TWO} />
          <ChoiceCard onChecked={handleCheck} isChecked={userChoice.third} isActiveclassName={userChoice.third ? activeCSS : notActiveCSS} name="third" title="I'm looking for design inspiration" imgSrc={CARD_IMG_THRID} />
        </div>

        <Button isActive={userChoice.first || userChoice.second || userChoice.third} onClick={handleNavigate} smallWidth={true}>Finish</Button>
      </div>
    </>
  )
}
