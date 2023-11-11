import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import EventInputField from "@/components/EventInputField";
import * as eventService from '../services/event.service';
import SuccessResultCard from "@/components/resultCard";
import { useSearchParams } from "next/navigation";

function validateForm(props)
{
  let keys = Object.getOwnPropertyNames(props)

  let res = true
  keys.forEach(key => {
    if(props[key] == '')
    {
      console.log(`Form has empty properties (p.name: ${key})`)
      res = false;
    }
  });
  return res
}

function CreateEventPage() {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm();
  const { register: regID, handleSubmit: handleDelete, DeleteEvent } = useForm();
  const [messages, setMessages] = useState()
  const searchParams = useSearchParams()

  useEffect(() => {
    const success = searchParams.get('success')
    console.log('s: ' + success)
    if(success == 'true')
    {
        setMessages(<SuccessResultCard message={'Мероприятие успешно создано'}/>)
    }

  }, [searchParams])

  async function onSubmitEventCreation(props) {
    console.log(JSON.stringify(props))
    console.log(JSON.stringify({...props, author_id: 1, image: 'https://lh3.googleusercontent.com/pw/ADCreHeqtPcm42VbPNpM46Xvh2mATt-lZ_lNcqjj96Z4BrOfeNzc9svAuJqOrj-FThfMV8dEnY9SM_0HyW9rktWojIkaClMLozA4beZdLhtdMcu6syGZbVs=w2400', plan: "[]", tags: ["Досуг"], type: "Мероприятие"}))
    if(validateForm(props))
    {
      props.time_start = new Date(props.date + ' ' + props.time_start).toISOString()
      props.time_end = new Date(props.date + ' ' + props.time_end).toISOString()

      await eventService.CreateEvent(props)
      router.push('/eventCreator?success=true');
    }
  }

  
  async function onSubmitEventDelete(props) {
    console.log(JSON.stringify(props))
    validateForm(props)
  }

  return (
  <>
    <div className="h-auto bg-primary">
      <div className="p-10"> 
        <div className="rounded-3xl bg-main-bg max-w-6xl m-auto">
          <h2 className="text-5xl text-center m-auto rounded-xl h-14 w-fit pt-5">
            Создание мероприятия
          </h2>
          
          <br/>
          {/* <SuccessResultCard message={'Мероприятие успешно создано'}/> */}

          <form onSubmit={(handleSubmit(onSubmitEventCreation))} className="self-center bg-secondary rounded-3xl w-[80%] m-auto">

            <div className="flex flex-col w-[90%] m-auto pt-5">
                
              <EventInputField label='Название мероприятия' type='text' register={register} regType={'title'}/>

              {/* <div className="flex justify-left flex-1 flex-col pt-2">
                <label className="text-zinc-100 text-2xl pb-2">Вид</label>
                <div className="w-full h-full">
                  <label className="text-zinc-300 text-xl pb-2 pl-10">Мероприятие</label>
                  <input type="radio" className="rounded-xl h-10 w-full self-center bg-[#161C22] text-zinc-200 pl-5" />
                  <label className="text-zinc-300 text-xl pb-2 pl-10">Проект</label>
                  <input type="radio" className="rounded-xl h-10 w-full self-center bg-[#161C22] text-zinc-200 pl-5" />
                </div>
              </div> */}

              <EventInputField label='Тема' type='text' register={register} regType={'topic'}/>
              <EventInputField label='Дата' type='date' register={register} regType={'date'}/>
              <EventInputField label='Место проведения' type='text' register={register} regType={'adress'}/>

              <div className="flex justify-left flex-1 flex-col pt-2">
                <label className="text-zinc-100 text-2xl pb-2">Описание</label>
                <textarea {...register('description')} rows="4" className="rounded-xl h-auto w-full self-center bg-[#161C22] text-zinc-200 pl-5"/>
              </div>
              <div className="flex justify-left flex-1 flex-col pt-2">
                <label className="text-zinc-100 text-2xl pb-2">Тэги</label>
                <input type="text" name="event_adress" {...register('tags')} className="rounded-xl h-10 w-full self-center bg-[#161C22] text-zinc-200 pl-5" />
              </div>

              <EventInputField label='Время начала' type='time' register={register} regType={'time_start'}/>
              <EventInputField label='Время завершения' type='time' register={register} regType={'time_end'}/>

              <div className="flex justify-left flex-1 flex-col pt-2">
                <label className="text-zinc-100 text-2xl pb-2">План мероприятия</label>
                <input disabled type="text" name="event_adress" {...register('plan')} className="rounded-xl h-10 w-full self-center bg-[#161C22] text-zinc-200 pl-5" />
              </div>

              <div className="flex justify-left flex-1 flex-col pt-2">
                <label className="text-zinc-100 text-2xl pb-2">Превью</label>
                <input disabled={true} type="file" name="event_adress" {...register('preview')} className="rounded-xl h-10 w-full self-center text-zinc-200 pl-5" />
              </div>
              
              <button type="submit" className="bg-green-300 rounded-lg h-14 text-4xl w-1/2 self-center mb-5">Создать</button>
            </div>
          </form>
          {messages}

          <br/>

          {/* <form onSubmit={(handleDelete(onSubmitEventDelete))} className="flex flex-col self-center bg-secondary rounded-xl w-[80%] m-auto">
            <h1 className="text-4xl text-center m-auto rounded-xl w-fit pt-5">Удалить мероприятие</h1>
            <div className="flex flex-col w-[90%] m-auto pt-5">
                <div className="flex justify-left flex-1 flex-row mb-3 m-auto">
                    <label className="text-zinc-100 text-2xl pb-3 w-auto">EventID</label>
                    <input type="text" {...regID('id')} className="w-1/2 rounded-xl h-10 bg-[#161C22] text-zinc-200 pl-5 ml-10"/>
                </div>
                <button disabled type="submit" className=" bg-rose-500 rounded-lg text-4xl w-1/2 h-14 self-center mb-5">Удалить</button>
            </div>
          </form> */}
          <br/>

        </div>
      </div>

      </div> 
  </>
  )
}


export default CreateEventPage
