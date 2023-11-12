import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import PageContent from "@/components/pageContent";
import { Icon28ArrowLeftOutline, Icon28ArrowRightOutline } from "@vkontakte/icons";
import { Avatar, Button, FormItem, HorizontalCell, HorizontalScroll, Input, SegmentedControl, Select } from "@vkontakte/vkui";
import { checkLogin } from "@/services/user.service";
import { createChat } from "@/services/websocket.service";


function CreateChat() {
  const router = useRouter();
  const [nameChat, setNameChat] = useState()
  const inputRef = useRef()
  const [inputName, setInputName] = useState('пример')
  const [inputNameState, setInputNameState] = useState('default')
  const [inputTopic, setInputTopic] = useState('')
  const [inputTopicState, setInputTopicState] = useState('default')
  const [selectedIcon, setSelectedIcon] = useState('')
  const [projectState, setProjectState] = useState('')
  const [projectEror, setProjectError] = useState('error')

  useEffect(() => {
    if(checkLogin() === false) 
      router.push('/auth')
  }, [])

  useEffect(() => {
    if (inputName.trim() === '') {
      setInputNameState('error')
    } else {
      setInputNameState('default')
    }
  }, [inputName])
  
  useEffect(() => {
    if (inputTopic.trim() === '') {
      setInputTopicState('error')
    } else {
      setInputTopicState('default')
    }
  }, [inputTopic])

  useEffect(() => {
    console.log(projectState)
    if (projectState == '') {
      setProjectError('error')
    } else {
      setProjectError('default')
    }
  }, [projectState])

  const chatsImages = [
    {img: '../assers/Ellipse92.png', id: 1},
    {img: '../assets/Ellipse92.png', id: 2},
    {img: '../assets/Ellipse92.png', id: 3},
    {img: '../assets/Ellipse92.png', id: 4},
    {img: '../assets/Ellipse92.png', id: 5},
    {img: '../assets/Ellipse92.png', id: 6},
    {img: '../assets/Ellipse92.png', id: 7},
    {img: '../assets/Ellipse92.png', id: 8},
    
  ]



  return (
    <PageContent>
      <div className='flex w-[100%] h-screen items-center flex-col'>
        <div className="flex flex-row justify-center w-full">
          <div className="absolute left-3 -top-2.5">
            <button className='p-4' onClick={() => router.back()}>
              <Icon28ArrowLeftOutline/>
            </button>
          </div>
          <h1 className="text-black text-2xl font-semibold">Создание чата</h1>
        </div>
        <div className="w-[100vw] flex flex-col">
          <FormItem status={`${inputNameState}`} top="Название">
            <Input type="text" defaultValue={'пример'} onChange={(val) => setInputName(val.target.value)}/>
            {inputNameState === 'error' ? 
            <h1 className="text-sm text-red-500">Введено неверное название</h1>
            :
            <></>
            }
          </FormItem>
          <FormItem status={`${inputTopicState}`} top="Тема">
            <Input type="text" defaultValue={''} onChange={(val) => setInputTopic(val.target.value)}/>
            {inputTopicState === 'error' ? 
            <h1 className="text-sm text-red-500">Введена неверная тема</h1>
            :
            <></>
            }
          </FormItem>
          <FormItem status={`${projectEror}`} top="Проект">
            <Select
              placeholder="Выберите проект"
              onChange={(e) => {setProjectState(e.currentTarget.value)}}
              options={[
                {
                  value: '0',
                  label: 'Digital Chalange',
                },
                {
                  value: '1',
                  label: 'SurGu Mobile',
                },
              ]}
            />
          </FormItem>
            <FormItem status="error" top="Тип чата">
              <SegmentedControl
                size="m"
                name="type"
                options={[
                  {
                    label: 'Общий',
                    value: 'open',
                  },
                  {
                    label: 'Приватный',
                    value: 'private',
                  },
                ]}
              />
            </FormItem>
          <div className="w-[95%] self-center mt-1 mb-2">
            <h1 className="text-[grey]">Выберите аватарку для чата</h1>
          </div>
          <div className="flex flex-row " >
            <HorizontalScroll className="flex flex-row">
              <div className="flex flex-row">
                {chatsImages.map((item, index) => {
                  return (
                    <HorizontalCell id={item.id} key={item.id} className="mx-1 " 
                      onClick={(e) => {
                        setSelectedIcon(e.currentTarget.id)
                        
                      }} >
                      {selectedIcon == item.id ? 
                        <Avatar size={65} className="outline outline-blue-500" src={item.img}/>
                      :
                      <Avatar size={65} className="" src={item.img}/>
                      }
                      
                    </HorizontalCell>
                  );
                })}
              </div>
            </HorizontalScroll>
            </div>
        </div>
        <div className="mt-20">
          <Button onClick={() => {createChat(inputName, [1]); router.back()}}>
            <h1 className="mx-28 my-3 text-main">Создать чат</h1>
          </Button>
        </div>
      </div>
    </PageContent>
  )
}



export default CreateChat
