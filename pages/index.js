import React, { useEffect, useState } from "react";
import { Cell, CustomSelect, FormItem, Group, SimpleCell, Input, Placeholder, Button, Div, SegmentedControl } from "@vkontakte/vkui";
import { useRouter } from "next/router";
import { Icon12Add, Icon16GridOfFour, Icon20UserOutline, Icon20Users3Outline, Icon24List, Icon28ChatsOutline, Icon28MessageAddBadgeOutline, Icon28Search, Icon28UserOutline, Icon36UserOutline, Icon56UserAddOutline, Icon56UsersOutline  } from "@vkontakte/icons";
import PageContent from "@/components/pageContent";
import Image from "next/image";
import {SelectModal} from "@/components/SelectModal";
import renderChats from "@/scripts/renderChats";
import { FilterSearch } from "@/scripts/Filters";
import { checkLogin, getToken, getUserByToken } from "@/services/user.service";
import { getChatById, getChatsForUser, getUserChats } from "@/services/chat.service";




function Home() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState('')
  const [selectorValue, setSelectorValue] = useState('YourChats')
  const [modalVisible, setModalVisible] = useState(false)


  useEffect(() => {
    if(checkLogin() === false) 
    {
      router.push('/auth')
      return
    }
    fetchChats()

    
  }, [])


  const [TextChatsGP, setGroupChats] = useState([
    // {name: 'Хакатон', id: '1', description: 'Крутой чат'},
    // {name: 'Чат1', id: '2', description: 'Крутой чат'},
    // {name: 'Чат2', id: '3', description: 'Крутой чат'},
    // {name: 'Чат3', id: '4', description: 'Крутой чат'},
  ])

  const TextChatsLC = [
    // {name: 'Твой чат', id: '5', description: 'Крутой чат'},
    // {name: 'Твой чат1', id: '6', description: 'Крутой чат'},
    // {name: 'Твой чат2', id: '7', description: 'Крутой чат'},
    // {name: 'Твой чат3', id: '8', description: 'Крутой чат'},
    // {name: 'Твой чат4', id: '9', description: 'Крутой чат'},
  ]

  async function fetchChats()
  {
    const user = await getUserByToken(getToken())
    const chatsIds = await getChatsForUser(1)
    console.log(chatsIds)
    // console.log(await getChatsForUser(user.id))
    setGroupChats(prev => prev.concat(chatsIds))
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
        <div className="flex flex-col">
          <h1 className="text-xl mb-2">Ваши задания</h1>
          <button onClick={() => router.push('/Tasks')} className="w-[95%] bg-grey bg-opacity-10 flex flex-row items-center self-center justify-center rounded-2xl">
            <h1>#</h1>
            <div className="mx-4 my-4">
              <h1 className="text-xl font-semibold" >Digital Chalange</h1>
              <h1>Забрать на уверенности этот Хакатон</h1>
              <h1>Дата создания 6.11.2023</h1>
            </div>
          </button>
          <div className="w-[95%] bg-grey bg-opacity-10 flex flex-row items-center self-center justify-center rounded-2xl mt-2">
            <h1>#</h1>
            <button onClick={() => router.push('/Tasks')} className="mx-4 my-4">
              <h1 className="text-xl font-semibold" >SurGu Mobile</h1>
              <h1>Забрать на уверенности этот Хакатон</h1>
              <h1>Дата создания 6.11.2023</h1>
            </button>
          </div>
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
                  icon={<Icon56UserAddOutline/>}
                  header="Личные чаты"
                  action={<Button onClick={() => router.push('/searchPage')} size="m">Найти или создать чат</Button>}
                >
                  Добавте чаты, в которых Вы хотите поринимать участие
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
                  header="Групповые чаты"
                  action={<Button onClick={() => router.push('/searchPage')} size="m">Искать чаты</Button>}
                >
                  Найдите групповые чаты, от которых Вы хотите получать уведомления
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
