import styles from "../styles/auth.module.css";
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as userService from '../services/user.service';

export default function LoginPage() {
    const router = useRouter();

    const { register, handleSubmit, formState } = useForm();

    async function onSubmit({ email, password }) {
        console.log(email +' p:' + password)
        let res = await userService.Login({email: email, password: password})
        if(res)
        {
            router.push("/")
            router.reload()
        }
    }

    return(    
        <>
        <div className="h-screen bg-primary py-[5%]">
            <div className="rounded-3xl bg-main-bg max-w-xl w-[80%] m-auto">
                <h2 className="text-5xl text-center m-auto rounded-xl h-14 w-fit pt-5">Вход</h2>
                <form onSubmit={(handleSubmit(onSubmit))} className="flex flex-col self-center rounded-xl w-[80%] m-auto">
                    <div className="flex justify-center flex-1 flex-col pt-10 ">
                        <label className="text-zinc-400 text-2xl pb-3">Email</label>
                        <input {...register('email')} className="rounded-xl h-10 bg-[#161C22] text-zinc-200 pl-5" type="text" name="email" />
                    </div>

                    <div className="flex flex-1 flex-col pt-10 pb-10">
                        <label className="text-zinc-400 text-2xl pb-3">Пароль</label>
                        <input {...register('password')} className="rounded-xl h-10 w-full self-center bg-[#161C22] text-zinc-200 pl-5" type="password" name="password" />
                    </div>
                    
                    <button type="submit" className="bg-green-300 rounded-lg h-14 text-4xl w-1/2 self-center mb-6">Войти</button>
                </form>
            </div>
            
        </div>
        </>
        )
}
