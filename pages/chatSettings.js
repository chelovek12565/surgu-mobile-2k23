import React, { use, useEffect, useState }  from "react"
import { useRouter } from "next/router";
import PageContent from "@/components/pageContent";
import { Icon16Dropdown, Icon24Filter, Icon28ArrowLeftOutline, Icon28ArrowRightOutline, Icon28Notifications, Icon28PhoneWaveOutline, Icon28SettingsOutline, Icon28UserAddBadgeOutline, Icon48Linked, Icon56UsersOutline } from "@vkontakte/icons";
import { Avatar, FormItem, Input, Placeholder, SegmentedControl, Separator, SimpleCell, Spacing, TabsItem } from "@vkontakte/vkui";
import { Icon28Search } from "@vkontakte/icons";
import { EditPopup } from "@/components/EditPopup";


function chatSettings () {
  const router = useRouter()
  const [selected, setSelected] = useState() 
  const [reportType, changeReportType] = useState('users')
  const [modalVisible, setModalVisible] = useState(false)
  const [groupName, setGroupName] = useState('Обсуждение')


  const users = [
    {name: 'Анастасия', role: 'UI|UX Designer', avatar: ''},
    {name: 'Дмитрий', role: 'Full Stack developer', avatar: ''},
    {name: 'Никита', role: 'Front-end developer', avatar: ''},
    {name: 'Рандом', role: 'Worker', avatar: ''},
  ]

  const tz = [
    {name: 'Пейдж лента', nameOfWorker: 'Никита', status: 'В процессе'},
    {name: 'Пейдж галавная', nameOfWorker: 'Дмитрий', status: 'Не начат'},
    {name: 'Фильтры', nameOfWorker: 'Никита', status: 'Завершен'},
    {name: 'Поиск', nameOfWorker: 'Никита', status: 'В процессе'},
  ]

  const renderAllTz = (arr) => {
    return (arr.map((task) => {
      return (
        <SimpleCell key={task.id} style={{borderRadius: 15, backgroundColor: '#F4F2F3'}} borderRadiusMode={'auto'} className="flex my-3 rounded-2xl flex-row justify-between w-[100%]">
          <div className="flex flex-col self-start w-[100%]">
            <h1 className="text-lg font-semibold mb-0.25">{task.name}</h1>
            <div className="flex flex-row w-[80vw] justify-between">
              <h1 className="text-base font-normal text-grey">{task.nameOfWorker}</h1>
              <h1 className="text-base font-normal text-grey">{task.status}</h1>
            </div>
          </div>
        </SimpleCell>
      )
    }))
  }


  const renderAllUsers = (arr) => {
    return (arr.map((user) => {
      return (
        <SimpleCell key={user.id} style={{borderRadius: 15, backgroundColor: '#F4F2F3'}} borderRadiusMode={'auto'} className="flex my-3 rounded-2xl">
          <h1 className="text-lg font-semibold mb-0.25">{user.name}</h1>
          <h1 className="text-base font-normal text-grey">{user.role}</h1>
        </SimpleCell>
      )
    }))
  }

  return (
    <PageContent>
      <EditPopup openState={modalVisible} setOpenState={setModalVisible} groupName={groupName} setGroupName={setGroupName}/>
      <div className='flex w-[100%] h-screen items-center flex-col'>
        <div className="absolute left-3 -top-2.5">
          <button className='p-4' onClick={() => router.back()}>
            <Icon28ArrowLeftOutline/>
          </button>
        </div>
        <div className="absolute right-3 -top-2.5">
          <button className='p-4' onClick={() => setModalVisible(!modalVisible)}>
            <Icon28SettingsOutline/>
          </button>
        </div>
        <div className="mt-[6vh] flex flex-col items-center">
          <Avatar src="" size={120}/>
          <h1 className="text-xl font-semibold mt-4">{groupName}</h1>
          <h1 className="text-lg font-normal mt-2 text-secondary">15 участников</h1>
        </div>
        <div className="flex flex-row w-[95%] mt-6 justify-between">
          <div className="items-center flex flex-col">
            <Icon28UserAddBadgeOutline className="text-[--vkui--color_text_accent_themed]" width={35} height={35}/>
            <h1 className="mt-1 text-sm">Добавить</h1>
          </div>
          <div className="items-center flex flex-col">
            <Icon28PhoneWaveOutline className="text-[--vkui--color_text_accent_themed]"  width={35} height={35}/>
            <h1 className="mt-1 text-sm">Звонок</h1>
          </div>
          <div className="items-center flex flex-col">
            <Icon28Notifications className="text-[--vkui--color_text_accent_themed]" width={35} height={35}/>
            <h1 className="mt-1 text-sm">Уведомления</h1>
          </div>
          <div className="items-center flex flex-col">
            <Icon28Search className="text-[--vkui--color_text_accent_themed]" width={35} height={35}/>
            <h1 className="mt-1 text-sm">Поиск</h1>
          </div>
        </div>
        <div className="w-[95%] my-5">
          <Spacing>
            <Separator wide={true}/>
          </Spacing>
        </div>
        <div className="flex flex-row w-[90%]">
          <Icon48Linked className="text-[--vkui--color_text_accent_themed]"/>
          <h1 className="ml-3">Ссылка для приглашения участников</h1>
        </div>
        <div className="w-[95%] my-5">
          <Spacing>
            <Separator wide={true}/>
          </Spacing>
        </div>
        <div className="w-[100vw] flex">
          <FormItem className="w-full">
            <SegmentedControl
              size="m"
              name="report-type"
              value={reportType}
              onChange={(value) => changeReportType(value)}
              options={[
                {
                  label: 'Участники',
                  value: 'users',
                },
                {
                  label: 'Задания',
                  value: 'tz',
                },
                {
                  label: 'Другое',
                  value: 'other',
                },
              ]}
            />
            </FormItem>
        </div>
        <div className="flex flex-col w-[95%]">
          {reportType === 'users' ? 
          <div>
            {renderAllUsers(users)}
          </div>
          :
          <div>
          {reportType === 'tz' ?
          <div>
            {renderAllTz(tz)}
          </div>
          :
          <div>
            <Placeholder
              icon={<Icon56UsersOutline />}
              header="Информация от руководителей"
            >
              Пока что тут ни чего нет, но как только ваш руководитель опубликует информацию она тут же появиться здесь
            </Placeholder>
          </div>
          }
          </div>
          }
        </div>
      </div>
    </PageContent>
  )
}



export default chatSettings
