import styles from "../styles/auth.module.css";
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as userService from '../services/user.service';
import Image from "next/image";
import PM from '../assets/projectManager.png'
import { Button, Input } from "@vkontakte/vkui";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [token, setToken] = useState('')

  useEffect(() => {
    if(userService.checkLogin()) 
      router.push('/')
  }, [])

  function onChange(e)
  {
    setToken(e.currentTarget.value)
  }

  function auth()
  {
    console.log(userService.getToken())
    console.log(userService.checkLogin())
    if(userService.auth(token))
      router.push('/')
  }

  return(    
    <>
      <div className="w-[100vw] h-[100vh] flex flex-col items-center">
        <div>
          <Image alt="" src={PM}/>
        </div>
        <div className="self-start ml-10 mt-[5vh] mb-[6vh]">
          <h1 className="text-3xl font-bold">Войти по токену</h1>
        </div>
        <Input onChange={onChange} value={token} className="bg-grey rounded-2xl opacity-15 w-[80vw] h-[20vh]"/>
        <div className="w-[100vw] flex justify-center mt-10">
          <Button onClick={auth} >
            <h1 className="text-main mx-[32vw] my-4">Вход</h1>
          </Button>
        </div>
      </div>
    </>
  )
}
