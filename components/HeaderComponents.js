import style from "../styles/Header.module.css"
import guestAvatar from '../public/dvAvatar.png'
import Image from 'next/image'
import { useEffect, useState } from "react";
import { isLoggedIn } from "../services/user.service.js";
import { useRouter } from "next/router";

const userCredentials = {
    name: "Дмитрий ", 
};

const HeaderComponents = () => {
    return(
    <div className='item-center justify-center w-[100vw] h-[10vh]' >

    </div>
        
    )
}


export default HeaderComponents;
