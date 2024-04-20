
import { createContext, useState } from "react";

export const UserContext=createContext({
    file:"",
    address:"",
    choice:"",
    addSelectedImage:()=>{},
    addEnteredAddress:()=>{},
    addSelectedChoice:()=>{}
});

export default function UserContextProvider({children}){
    const [file,setFile]=useState("");
    const [address,setAddress]=useState("");
    const [choice,setChoice]=useState("");

    function handleSelectedImage(event){
        setFile(event.target.files[0]);
    }

    function handleAddress(userEnterdeAddress){
        setAddress(userEnterdeAddress);
    }

    function handleChoice(userSelectedChoice){
        setChoice(userSelectedChoice);
    }

    const userCtx={
        file:file,
        address:address,
        choice:choice,
        addSelectedImage:handleSelectedImage,
        addEnteredAddress:handleAddress,
        addSelectedChoice:handleChoice
    }

    return <UserContext.Provider value={userCtx}>{children}</UserContext.Provider>
}