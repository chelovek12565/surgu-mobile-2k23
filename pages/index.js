import React, { useEffect, useState } from "react";
import { Cell, CustomSelect, FormItem, Group, SimpleCell, Input, Placeholder, Button } from "@vkontakte/vkui";
import { useRouter } from "next/router";
import { Icon12Add, Icon16GridOfFour, Icon20UserOutline, Icon20Users3Outline, Icon24List, Icon28ChatsOutline, Icon28MessageAddBadgeOutline, Icon28Search, Icon28UserOutline, Icon36UserOutline, Icon56UsersOutline  } from "@vkontakte/icons";
import PageContent from "@/components/pageContent";
import Image from "next/image";
import {SelectModal} from "@/components/SelectModal";
import renderChats from "@/scripts/renderChats";
import { FilterSearch } from "@/scripts/Filters";



import { socket } from "../services/websocket.service";
import { ConnectionManager } from "@/components/ConnectionManager";

function Home() {
  const router = useRouter();
  const [activePanel, setActivePanel] = React.useState('panel1');
  const [yourChats, setYourChats] = useState()
  const [inputValue, setInputValue] = useState('')
  const [filtRes, setfiltRes] = useState()
  const [selectorValue, setSelectorValue] = useState('YourChats')
  const [modalVisible, setModalVisible] = useState(false)




  const TextChatsGP = [
    {name: 'Хакатон', id: '1', description: 'Крутой чат'},
    {name: 'Чат1', id: '2', description: 'Крутой чат'},
    {name: 'Чат2', id: '3', description: 'Крутой чат'},
    {name: 'Чат3', id: '4', description: 'Крутой чат'},
  ]

  const TextChatsLC = [
    {name: 'Твой чат', id: '5', description: 'Крутой чат'},
    {name: 'Твой чат1', id: '6', description: 'Крутой чат'},
    {name: 'Твой чат2', id: '7', description: 'Крутой чат'},
    {name: 'Твой чат3', id: '8', description: 'Крутой чат'},
    {name: 'Твой чат4', id: '9', description: 'Крутой чат'},
  ]

  const renderChats = (chats) => {
    return (
      chats.map((chat)=> {
        return (
            <h1 className="text-gray-500">{chat.name}</h1>
        )
      })
    )
  }

  function Filter (arr) {
    return FilterSearch('name', inputValue, arr)
  }

  const selectorChange = (val) => {
    setSelectorValue(val)
  }

  const getData = (val) => {
    setInputValue(val.target.value)
  }

  return ( 
    <PageContent>
    <SelectModal openState={modalVisible} setOpenState={setModalVisible}/>
    <div className="flex self-center flex-col items-center w-[100%]">
      <div className='w-full flex flex-col'>
        <div className="self-center">
          <h1 className=" text-black text-2xl font-semibold">Чаты</h1>
        </div>
        <div className="flex self-center">
          <FormItem className="w-[100vw] self-center" >
            <Input onChange={getData} before={<Icon28Search/>} after={<button><Icon28MessageAddBadgeOutline onClick={() => setModalVisible(!modalVisible)}/></button>}/>
          </FormItem>
        </div>
          <Div className="w-[100vw] self-center">
          <SegmentedControl 
            onChange={selectorChange}
            options={[
              {
                'label': <Icon20UserOutline />,
                'value': 'YourChats',
                'aria-label': 'Список',
              },
              {
                'label': <Icon20Users3Outline width={27} height={27} />,
                'value': 'AllChats',
                'aria-label': 'Плитки',
              },
            ]}
          />
          </Div>
        </div>
        {selectorValue === 'YourChats' ? 
          <>
            {inputValue === '' ?
            <div className="w-[100%]">
              {TextChatsLC.length === 0 ?
              <div>
                <Placeholder
                  icon={<Icon56UsersOutline />}
                  header="Уведомления от сообществ"
                  action={<Button size="m">Подключить сообщества</Button>}
                >
                  Подключите сообщества, от которых Вы хотите получать уведомления
                </Placeholder>
              </div>
              :
              <div>
                <h1 className="text-black ml-2 text-xl font-semibold">Личные чаты</h1>
                {renderChats(TextChatsLC)}
              </div>
              
              }
            </div>
            :
            <>
              {Filter(TextChatsLC).length === 0 ? 
              <div>
                <Placeholder
                  icon={<Icon56UsersOutline />}
                  header="Уведомления от сообществ"
                  action={<Button size="m">Подключить сообщества</Button>}
                >
                  Подключите сообщества, от которых Вы хотите получать уведомления
                </Placeholder>
              </div>
              :
              <div className="w-full">
                <h1 className="text-black ml-2 text-xl font-semibold">Личные чаты</h1>
                {renderChats(Filter(TextChatsLC))}
              </div>
              }
            </>
            }
          </>
          :
          <>
            {inputValue === '' ?
            <div className="w-[100%]">
              {TextChatsGP.length === 0 ?
              <div>
                <Placeholder
                  icon={<Icon56UsersOutline />}
                  header="Уведомления от сообществ"
                  action={<Button size="m">Подключить сообщества</Button>}
                >
                  Подключите сообщества, от которых Вы хотите получать уведомления
                </Placeholder>
              </div>
              :
              <div>
                <h1 className="text-black ml-2 text-xl font-semibold">Групповые чаты</h1>
                {renderChats(TextChatsGP)}
              </div>
              }
            </div>
            :
            <>
              {Filter(TextChatsGP).length === 0 ? 
              <div>
                <Placeholder
                  icon={<Icon56UsersOutline />}
                  header="Уведомления от сообществ"
                  action={<Button size="m">Подключить сообщества</Button>}
                >
                  Подключите сообщества, от которых Вы хотите получать уведомления
                </Placeholder>
              </div>
              :
              <div className="w-full">
                <h1 className="text-black ml-2 text-xl font-semibold">Групповые чаты</h1>
                {renderChats(Filter(TextChatsGP))}
              </div>
              }
            </>
            }
          </>
        }
    </div>
    <ConnectionManager/>
    </PageContent>
  )
}


export default Home
