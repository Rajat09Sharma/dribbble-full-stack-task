import React from 'react'

export default function Button({ children, smallWidth, isActive, ...props }) {
    let bttnCSS = "rounded-lg py-2 text-lg my-5"
    if (smallWidth) {
        if (isActive) {
            bttnCSS += " w-5/12 md:w-3/12 lg:w-3/12 button"

        } else {
            bttnCSS += " w-5/12 md:w-3/12 lg:w-3/12 button-not-active"
        }

    } else {
        bttnCSS += " w-10/12 md:w-5/12 lg:w-5/12 button"
    }
    return (
        <button {...props} className={bttnCSS}>
            {children}
        </button>
    )
}
