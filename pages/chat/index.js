import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as userService from '../../services/user.service';
import Header from '@/components/Header';

export default function ChatPage() {
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
        <Header></Header>
        <div className="h-screen py-[5%] bg-black">
            <div className="rounded-3xl bg-main-bg max-w-xl w-[80%] m-auto">
                
            </div>
            
        </div>
        </>
        )
}
