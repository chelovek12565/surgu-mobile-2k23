import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as userService from '../../services/user.service';
import Header from '@/components/Header';
import HeaderComponents from '@/components/HeaderComponents';

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
        <HeaderComponents title={'132'}></HeaderComponents>
        {/* <div className="h-screen py-[5%] bg-main">
            
        </div> */}
        </>
        )
}
