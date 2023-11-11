import { useRouter } from 'next/router';
import * as userService from '../services/user.service';
import EventPreviewCard from "@/components/eventPreviewCard";
import { GetEvents } from "@/services/event.service";
import { useEffect, useState } from "react";

export default function EventListPage() {
    const router = useRouter();

    const [events, setEvents] = useState()
    // const { register, handleSubmit, formState } = useForm();

    useEffect(()=> {
        FetchEvents()
    }, [])

    async function onSubmit({ email, password }) {
        console.log(email +' p:' + password)
        let res = await userService.Login({email: email, password: password})
        if(res)
        {
            router.push("/")
            router.reload()
        }
    }


    async function FetchEvents() 
    {
      setEvents((await GetEvents()).events)     
      console.log(JSON.stringify(await GetEvents())); 
    }

    return(    
      <>
      <div className="h-fit min-h-screen bg-primary py-[5%]">
        <div className="rounded-3xl bg-main-bg max-w-4xl w-[80%] m-auto p-5">
          <h2 className="text-5xl text-center m-auto rounded-xl h-14 w-fit p-5">Мероприятия</h2>
          <div className="w-full h-auto">
              {events?.map((event) => {
                return(
                  <EventPreviewCard event={event} key={event?.id}/>
                )
              })}
          </div>
        </div>
      </div>
      </>
    )
}
