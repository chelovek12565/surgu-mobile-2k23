import { useEffect } from "react";
import { useRouter } from "next/router";
import PageContent from "@/components/pageContent";

function CreateChat() {
  const router = useRouter();
    

  return (
    <PageContent>
      <div className='flex w-[100%] h-screen bg-main items-center flex-col'>
        <h1 className="text-black text-2xl font-sans">Создание чата</h1>
      </div>
    </PageContent>
  )
}



export default CreateChat
