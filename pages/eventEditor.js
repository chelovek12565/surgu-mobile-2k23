import EventInputField from "@/components/EventInputField";
import { GetEvents } from "@/services/event.service";
import moment from "moment/moment";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


function EventEditor()
{
  const router = useRouter()
  const searchParams = useSearchParams()

  const { register, handleSubmit, formState } = useForm();
  const [id, setId] = useState()

  const [initialProps, setInitialProps] = useState();

  useEffect(() => {
    setId(searchParams.get('id'))

  }, [searchParams])

  useEffect(()=> {
    console.log('checking for event ' + id)
    if(id != undefined || '' || null)
      fetchEventData(id)
    else{
      console.log('check failed')
    }

  }, [id])

  async function fetchEventData(id)
  {
    setInitialProps((await GetEvents()).events.filter(e => e.id == id)[0])
  }

  useEffect(() => {
    console.log(initialProps)
    // console.log('T: ' + moment(new Date(initialProps.time_start)).format('HH:mm'))
  }, [initialProps])


  async function onSubmitEventCreation(props) {
    console.log(JSON.stringify(props))
    console.log(JSON.stringify({...props, author_id: 1, image: 'https://lh3.googleusercontent.com/pw/ADCreHeqtPcm42VbPNpM46Xvh2mATt-lZ_lNcqjj96Z4BrOfeNzc9svAuJqOrj-FThfMV8dEnY9SM_0HyW9rktWojIkaClMLozA4beZdLhtdMcu6syGZbVs=w2400', plan: "[]", tags: ["Досуг"], type: "Мероприятие"}))
    if(validateForm(props))
    {
      props.time_start = new Date(props.date + ' ' + props.time_start).toISOString()
      props.time_end = new Date(props.date + ' ' + props.time_end).toISOString()

      // eventService.CreateEvent(props)
      router.reload();
    }
  }

  return(
    <>
    <div className=" min-h-screen h-fit bg-primary">
      <div className="p-10"> 
        <div className="rounded-3xl bg-main-bg max-w-4xl m-auto">
          <h2 className="text-5xl text-center m-auto rounded-xl h-14 w-fit pt-5">
              Редактор мероприятия
          </h2>
          
          <br/>

          {initialProps == undefined ? 
          <h1 className=" m-auto text-4xl text-zinc-300 pt-10">Загрузка...</h1> 
          :
          <form onSubmit={(handleSubmit(onSubmitEventCreation))} className="self-center bg-secondary rounded-xl w-[90%] m-auto">
            {/* <h1 className="text-4xl text-center m-auto rounded-xl w-fit pt-5">Редактирвать мероприятие</h1> */}

            <div className="flex flex-col w-[90%] m-auto pt-5">
              <EventInputField value={initialProps.id} label='EventID' type='text' register={register} regType={'id'} disabled={true} />

              <EventInputField value={initialProps.title} label='Название мероприятия' type='text' register={register} regType={'title'}/>

              {/* <div className="flex justify-left flex-1 flex-col pt-2">
                <label className="text-zinc-100 text-2xl pb-2">Вид</label>
                <div className="w-full h-full">
                  <label className="text-zinc-300 text-xl pb-2 pl-10">Мероприятие</label>
                  <input type="radio" className="rounded-xl h-10 w-full self-center bg-[#161C22] text-zinc-200 pl-5" />
                  <label className="text-zinc-300 text-xl pb-2 pl-10">Проект</label>
                  <input type="radio" className="rounded-xl h-10 w-full self-center bg-[#161C22] text-zinc-200 pl-5" />
                </div>
              </div> */}

              <EventInputField value={initialProps.topic} label='Тема' type='text' register={register} regType={'topic'}/>
    
              <EventInputField value={moment(new Date(initialProps.date)).format('YYYY-MM-DD')} label='Дата' type='date' register={register} regType={'date'}/>
              <EventInputField value={initialProps.adress} label='Место проведения' type='text' register={register} regType={'adress'}/>

              <div className="flex justify-left flex-1 flex-col pt-2">
                <label className="text-zinc-100 text-2xl pb-2">Описание</label>
                <textarea value={initialProps.description} {...register('description')} rows="4" className="rounded-xl h-auto w-full self-center bg-[#161C22] text-zinc-200 pl-5"/>
              </div>
              <div className="flex justify-left flex-1 flex-col pt-2">
                <label className="text-zinc-100 text-2xl pb-2">Тэги</label>
                <input value={initialProps.tags} type="text" name="event_adress" {...register('tags')} className="rounded-xl h-10 w-full self-center bg-[#161C22] text-zinc-200 pl-5" />
              </div>

              <EventInputField value={moment(new Date(initialProps.time_start)).format('HH:mm')} label='Время начала' type='time' register={register} regType={'time_start'}/>
              <EventInputField value={moment(new Date(initialProps.time_end)).format('HH:mm')} label='Время завершения' type='time' register={register} regType={'time_end'}/>

              <div className="flex justify-left flex-1 flex-col pt-2">
                <label className="text-zinc-100 text-2xl pb-2">План мероприятия</label>
                <input disabled type="text" name="event_adress" {...register('plan')} className="rounded-xl h-10 w-full self-center bg-[#161C22] text-zinc-200 pl-5" />
              </div>

              <div className="flex justify-left flex-1 flex-col pt-2">
                <label className="text-zinc-100 text-2xl pb-2">Превью</label>
                <input disabled={true} type="file" name="event_adress" {...register('preview')} className="rounded-xl h-10 w-full self-center text-zinc-200 pl-5" />
              </div>
              
              <button type="submit" className="bg-green-300 rounded-lg h-14 text-4xl w-1/2 self-center mb-5">Сохранить</button>
            </div>
          </form>
          
          }

          <br/>
        </div>
      </div>

      </div> 
    </>
    )
}

export default EventEditor