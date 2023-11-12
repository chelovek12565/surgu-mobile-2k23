import style from "../styles/Header.module.css"
import guestAvatar from '../public/dvAvatar.png'
import Image from 'next/image'
import { useEffect, useState } from "react";

const userCredentials = {
    name: "Дмитрий ", 
};

const HeaderComponents = ({before= (<div></div>), after = (<div></div>), title}) => {
  return(
    <div className='justify-center w-[100vw] h-fit min-h-[7vh] shadow-inner rounded-sm bg-main fixed left-0 z-50' >
      <div className=" shadow-md w-full h-full content-baseline flex">
        <div className="flex justify-between align-middle self-center items-center w-full mx-5">
          <>{before}</>
            <div className="flex flex-col">
              <h1 className=" self-center text-[2rem] ">{title}</h1>
              <h1 className=" self-center text-[2rem] ">{title}</h1>
            </div>
            
            
          <>{after}</>
        </div>
      </div>
    </div>
        
    )
}


export default HeaderComponents;
