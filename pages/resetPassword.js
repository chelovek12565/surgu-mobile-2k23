import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSearchParams } from "next/navigation";
import * as userService from '../services/user.service';


function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const reset_token = searchParams.get('reset_token')

  const [isToken, setState] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if(userService.checkLogin() === false) 
      router.push('/auth')
  }, [])

  const { register, handleSubmit, formState } = useForm();
  
  useEffect(() => {
    if(reset_token == undefined || null || '')
        setState(false)
    else
        setState(true)
  }, [reset_token])


  async function onSubmit({ password, password2 }) {
    let res = false
    if(password2 != password)
    {
      setError('Пароли не совпадают!')
      return
    }

    if(password == '')
    {
      setError('Поле \'Пароль\' не заполенено')
      return
    }

    if(password.length < 8)
    {
      setError('Пароль должен состоять более чем из 8 символов!')
      return
    }

    res = await userService.ChangePassword(password, reset_token)
    console.log('got res: '  + res)
    router.push(`/resetResult?success=${res}`)
    
  }
  return (
  <>
  <Header checkAuth={false}/>
    <div className="h-screen bg-primary py-[5%]">
      <div className="rounded-3xl bg-main-bg max-w-xl w-[80%] m-auto">

        {isToken ? 
        <>
          <h2 className="text-5xl text-center m-auto rounded-xl h-14 w-fit pt-5">Смена пароля</h2>
          <form onSubmit={(handleSubmit(onSubmit))} className="flex flex-col self-center rounded-xl w-[80%] m-auto">
            <div className="flex justify-center flex-1 flex-col pt-10 ">
              <label className="text-zinc-400 text-2xl pb-3">Пароль</label>
              <input {...register('password')} className="rounded-xl h-10 bg-[#161C22] text-zinc-200 pl-5" type="password" name="password" />
            </div>

            <div className="flex flex-1 flex-col pt-10 pb-10">
              <label className="text-zinc-400 text-2xl pb-3">Подтвердите пароль</label>
              <input {...register('password2')} className="rounded-xl h-10 w-full self-center bg-[#161C22] text-zinc-200 pl-5" type="password" name="password2" />
              <h2 className=" text-red-500 mt-2">{error}</h2>
            </div>
            <button type="submit" className="bg-green-300 rounded-lg h-fit text-4xl w-fit p-5 self-center mb-6">Сменить пароль</button>
           </form>
        </>
        : 
        <>
            <h2 className="text-5xl text-center m-auto rounded-xl h-14 w-fit pt-5 pb-16">Ошибка</h2>
        </>
            }
      </div>

    </div>
    
  <Footer/>
  </>
  )
}

ResetPassword.getLayout = (page) => page

export default ResetPassword
