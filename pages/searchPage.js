import { useEffect } from "react";
import { useRouter } from "next/router";
import PageContent from "@/components/pageContent";
import { Icon28ArrowLeftOutline, Icon28ArrowRightOutline } from "@vkontakte/icons";

function searchPage () {
  const router = useRouter();
    

  return (
    <PageContent>
      <div className='flex w-[100%] h-screen items-center flex-col'>
        <div className="flex flex-row justify-center w-full">
          <div className="absolute left-3 -top-2.5">
            <button className='p-4' onClick={() => router.back()}>
              <Icon28ArrowLeftOutline/>
            </button>
          </div>
          <h1 className="text-black text-2xl font-sans">Поиск чата</h1>
        </div>
      </div>
    </PageContent>
  )
}



export default searchPage
