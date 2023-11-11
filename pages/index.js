import React, { useState } from "react";
import { Cell, CustomSelect, FormItem, Group, SimpleCell, Input, Placeholder, Button, Div, SegmentedControl } from "@vkontakte/vkui";
import { useRouter } from "next/router";
import { Icon12Add, Icon16GridOfFour, Icon20UserOutline, Icon20Users3Outline, Icon24List, Icon28ChatsOutline, Icon28MessageAddBadgeOutline, Icon28Search, Icon28UserOutline, Icon36UserOutline, Icon56UsersOutline  } from "@vkontakte/icons";
import PageContent from "@/components/pageContent";
import Image from "next/image";
import {SelectModal} from "@/components/SelectModal";
const  ChatAvatar = require('../assets/Ellipse92.png')


function Home() {
  const router = useRouter();
  const [activePanel, setActivePanel] = React.useState('panel1');
  const [yourChats, setYourChats] = useState()
  const [inputValue, setInputValue] = useState('')
  const [filtRes, setfiltRes] = useState()
  const [selectorValue, setSelectorValue] = useState('YourChats')
  const [modalVisible, setModalVisible] = useState(false)


  function FilterSearch (prop, value, arr) {
    let result = [],
        copy = [...arr]
    for (const event of copy) {
        if (((String(event[prop]).toLowerCase())).includes(value.toLowerCase()) === true) result.push(event)
    }
    return (
        result
    )
  }

  const TextChatsGP = [
    {name: 'Хакатон', id: '1', description: 'Крутой чат'},
    {name: 'Чат1', id: '1', description: 'Крутой чат'},
    {name: 'Чат2', id: '1', description: 'Крутой чат'},
    {name: 'Чат3', id: '1', description: 'Крутой чат'},
  ]

  const TextChatsLC = [
    {name: 'Твой чат', id: '1', description: 'Крутой чат'},
    {name: 'Твой чат1', id: '1', description: 'Крутой чат'},
    {name: 'Твой чат2', id: '1', description: 'Крутой чат'},
    {name: 'Твой чат3', id: '1', description: 'Крутой чат'},
    {name: 'Твой чат4', id: '1', description: 'Крутой чат'},
  ]

  const renderChats = (chats) => {
    return (
      chats.map((chat)=> {
        return (
          <SimpleCell style={{borderRadius: 15}} borderRadiusMode={'auto'} className="bg-grey bg-opacity-5 flex my-3 rounded-2xl"  onClick={() => router.push('/chat')} before={<Image src={ChatAvatar} height={70}/>}>
            <h1 className="text-lg font-semibold mb-0.25">{chat.name}</h1>
            <h1 className="text-base font-normal text-grey">{chat.description}</h1>
          </SimpleCell>
        )
      })
    )
  }

  function Filter (arr) {
    return FilterSearch('name', inputValue, arr)
  }

  const getChats = (chatsArray) =>
    chatsArray.map((user) => ({
      label: user.name,
      value: `${user.id}`,
      avatar: user.photo_100,
      description: user.screen_name,
  }));

  const selectorChange = (val) => {
    setSelectorValue(val)
  }

  const getData = (val) => {
    setInputValue(val.target.value)
    console.log(val.target.value)
  }

  const chats = [...getChats(TextChatsGP)]

  return ( 
    <PageContent>
    <SelectModal openState={modalVisible} setOpenState={setModalVisible}/>
    <div className="flex self-center flex-col items-center w-[100%]">
      <div className='w-full flex flex-col'>
        <div className="self-center">
          <h1 className=" text-black text-2xl font-bold">Чаты</h1>
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
    </PageContent>
  )
}


export default Home
