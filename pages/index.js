import React, { useState } from "react";
import { Cell, CustomSelect, FormItem, Group, SimpleCell, Input, Placeholder, Button } from "@vkontakte/vkui";
import { useRouter } from "next/router";
import { Icon28Search, Icon28UserOutline, Icon36UserOutline, Icon56UsersOutline  } from "@vkontakte/icons";
import PageContent from "@/components/pageContent";

function Home() {
  const router = useRouter();
  const [activePanel, setActivePanel] = React.useState('panel1');
  const [yourChats, setYourChats] = useState()
  const [inputValue, setInputValue] = useState('')

  const TextChats = [
    {name: 'Хакатон', id: '1'},
    {name: 'Чат1', id: '1'},
    {name: 'Чат2', id: '1'},
    {name: 'Чат3', id: '1'},
  ]

  const TextChatsYour = [
    {name: 'Твой чат', id: '1'},
  ]

  const renderChats = (chats) => {
    return (
      chats.map((chat)=> {
        return (
          <SimpleCell before={<h1 className="text-text-main">#</h1>}>
            <h1 className="text-gray-500">{chat.name}</h1>
          </SimpleCell>
        )
      })
    )
  }

  const getChats = (chatsArray) =>
    chatsArray.map((user) => ({
      label: user.name,
      value: `${user.id}`,
      avatar: user.photo_100,
      description: user.screen_name,
  }));


  const getData = (val) => {
    setInputValue(val.target.value)
    console.log(val.target.value)
  }

  const chats = [...getChats(TextChats)]

  return ( 
    <PageContent>
    <div className="flex self-center flex-col items-center w-[100%]">
      <div className='w-full flex flex-col'>
        <div className="self-center">
          <h1 className=" text-black text-2xl font-bold">Чаты</h1>
        </div>
        <div className="flex self-center">
          <FormItem className="w-[100vw] self-center" >
            <Input onChange={getData} before={<Icon28Search/>}/>
          </FormItem>
        </div>
        <div className="self-start">
          <h1 className="text-black text-xl font-semibold mt-2">Ваши чаты</h1>
        </div>
          {inputValue === '' ?
          <div>
            {TextChatsYour.length !== 0 ? 
            renderChats(TextChatsYour)
            :
            <div>
              <Placeholder
                icon={<Icon56UsersOutline />}
                header="Чаты организации"
              >
              Найдите чаты, в которых вы хотите принять участие
              </Placeholder>
          </div>
          }
          </div>
          :
          <div>

          </div>
          }
        </div>
    </div>
    </PageContent>
  )
}


export default Home
