import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function ResetResult() {
    const router = useRouter();
    const searchParams = useSearchParams()

    const success = searchParams.get('success')
    const [isSuccess, setState] = useState(false)

    
    useEffect(() => {
        setState(success == 'true')
    }, [success])

    return (
    <>
    <Header checkAuth={false} />
    <div className="h-screen bg-primary py-[5%]">
      <div className="rounded-3xl bg-main-bg max-w-xl w-[80%] m-auto">
        {isSuccess ? <h2 className="text-5xl text-center m-auto rounded-xl h-fit w-fit pt-5 pb-5">Пароль успешно изменён</h2> : <h2 className="text-5xl text-center m-auto rounded-xl h-fit w-fit pt-5 pb-5">Ошибка</h2>}
      </div>
    </div>
    <Footer/>
    </>
    )
}

ResetResult.getLayout = (page) => page

export default ResetResult
