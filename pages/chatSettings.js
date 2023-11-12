import React, { useEffect, useState }  from "react"
import { useRouter } from "next/router";
import PageContent from "@/components/pageContent";
import { Icon24Filter, Icon28ArrowLeftOutline, Icon28ArrowRightOutline } from "@vkontakte/icons";
import { FormItem, Input, Placeholder } from "@vkontakte/vkui";
import { Icon28Search } from "@vkontakte/icons";
import { FilterPopup } from "@/components/FilterPopup";
import renderChats from "@/scripts/renderChats";
import { FilterSearch } from "@/scripts/Filters";

function chatSettings () {
  const router = useRouter();
  
  return (
    <PageContent>
      <div className='flex w-[100%] h-screen flex-col'>

      </div>
    </PageContent>
  )
}



export default chatSettings
