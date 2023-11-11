import React, { useState } from "react";
import { Cell, CustomSelect, FormItem, Group } from "@vkontakte/vkui";
import { useRouter } from "next/router";
import { Icon28UserOutline, Icon36UserOutline } from "@vkontakte/icons";

function Home() {
  const router = useRouter();
  const [activePanel, setActivePanel] = React.useState('panel1');
  const [yourChats, setYourChats] = useState()
  const [inputValue, setInputValue] = useState()

  const TextChats = [
    {name: 'Хакатон', id: '1'}
  ]

  const getChats = (chatsArray) =>
  chatsArray.map((user) => ({
    label: user.name,
    value: `${user.id}`,
    avatar: user.photo_100,
    description: user.screen_name,
  }));


  const getData = (val) => {
    setInputValue(val.target.value)
  }

  const chats = [...getChats(TextChats)]

  return ( 
    <div className="flex self-center flex-col items-center w-[100%]">
      <div className='w-full flex flex-col'>
        <div className="self-center">
          <h1 className=" text-black text-2xl font-bold">Чаты</h1>
        </div>
        <div className='w-full'>
          <FormItem top="Поиск по чатам">
            <CustomSelect placeholder="Введите название чатов" searchable options={chats} onChange={getData} />
          </FormItem>
        </div>
        {inputValue ? 
        <div>
          
        </div>
        :
        <div>
          
        </div>
        }
        </div>
    </div>
  )
}


export default Home
