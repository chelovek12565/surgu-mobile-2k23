import React, { useEffect, useState }  from "react"
import { useRouter } from "next/router";
import PageContent from "@/components/pageContent";
import { Icon24Filter, Icon28ArrowLeftOutline, Icon28ArrowRightOutline, Icon56UsersOutline } from "@vkontakte/icons";
import { FormItem, Input, Placeholder } from "@vkontakte/vkui";
import { Icon28Search } from "@vkontakte/icons";
import { FilterPopup } from "@/components/FilterPopup";
import renderChats from "@/scripts/renderChats";
import { FilterSearch } from "@/scripts/Filters";
import { checkLogin } from "@/services/user.service";

function searchPage () {
  const router = useRouter();
  const [inputValue, setInputValue] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
    
  useEffect(() => {
    if(checkLogin() === false) 
      router.push('/auth')
  }, [])

  const getData = (val) => {
    setInputValue(val.target.value)
    console.log(val.target.value)
  }

  const Filter = (arr) => {
    return FilterSearch('name', inputValue, arr)
  }

  const AllChats = [
    {name: 'Хакатон', id: '10', description: 'Крутой чат'},
    {name: 'Digital Chalange', id: '11', description: 'Крутой чат'},
    {name: 'Хантатон', id: '12', description: 'Крутой чат'},
    {name: 'Девопсы', id: '13', description: 'Крутой чат'},
    {name: 'Фронт', id: '14', description: 'Крутой чат'},
    {name: 'Бек', id: '15', description: 'Крутой чат'},
  ]

  return (
    <PageContent>
      <FilterPopup openState={modalVisible} setOpenState={setModalVisible} />
      <div className='flex w-[100%] h-screen flex-col'>
        <div className="flex flex-row justify-center w-[100%]">
          <div className="absolute left-3 -top-2.5">
            <button className='p-4' onClick={() => router.back()}>
              <Icon28ArrowLeftOutline/>
            </button>
          </div>
          <h1 className="text-black text-2xl font-semibold">Поиск чата</h1>
        </div>
        <div className="flex self-center justify-center w-[100%] my-3">
          <FormItem className="w-[100%]" style={{padding: 0}} >
            <Input onChange={getData} before={<Icon28Search/>} after={<Icon24Filter width={30} height={30} onClick={() => setModalVisible(!modalVisible)}/>}/>
          </FormItem>
        </div>
        <div className="flex w-full ">
          <h1 className="text-2xl font-semibold">Всё чаты</h1>
        </div>
        <div className="flex flex-col">
          {inputValue === '' ?
          <div>
            {AllChats.length === 0 ?
            <div>
              <Placeholder
                icon={<Icon56UsersOutline />}
                header="Групповые чаты"
              >
                Чаты не найдены
              </Placeholder>
            </div>
            :
            <div>
              {renderChats(AllChats)}
            </div>
            }
          </div>
          :
          <div>
            {Filter(AllChats).length === 0 ?
            <div>
              <Placeholder
                icon={<Icon56UsersOutline />}
                header="Групповые чаты"
              >
                По данным фильтрам чаты не найдены
              </Placeholder>
            </div>
            :
            <div>
              {renderChats(Filter(AllChats))}
            </div>
            }
          </div>
          }
        </div>
      </div>
    </PageContent>
  )
}



export default searchPage
