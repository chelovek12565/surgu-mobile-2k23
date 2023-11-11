import style from "../styles/Header.module.css"
import guestAvatar from '../public/dvAvatar.png'
import Image from 'next/image'
import { useEffect, useState } from "react";
import { isLoggedIn } from "../services/user.service.js";
import { useRouter } from "next/router";

const userCredentials = {
    name: "Дмитрий ", 
};

const HeaderComponents = ({before, after, title}) => {
    return(
    <div className='justify-center w-[100vw] h-[7vh] shadow-inner rounded-sm bg-main' >
        <div className=" shadow-md w-full h-full content-baseline flex">
            <div className="flex justify-between align-middle self-center items-center w-full mx-5">
                <div>{before}</div>
                <h1 className=" self-center text-[5rem] ">{title}</h1>
                <div>{after}</div>
            </div>

        </div>
    </div>
        
    )
}


export default HeaderComponents;
