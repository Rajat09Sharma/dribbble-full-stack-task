import React from 'react'

export default function ChoiceCard({imgSrc, onChecked, title, name,isActiveclassName, isChecked}) {
  return (
    <div className={isActiveclassName}>
        <img src={imgSrc} />
        <h2 className='text-xl font-bold mb-2.5'>{title}</h2>
        <input type="checkbox" name={name} onChange={(event)=>{onChecked(event.target.name,title)}} checked={isChecked} className='checkbox-round mb-4'/>
    </div>
  )
}
