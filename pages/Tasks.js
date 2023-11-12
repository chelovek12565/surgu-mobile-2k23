import React, { use, useEffect, useState }  from "react"
import { useRouter } from "next/router";
import PageContent from "@/components/pageContent";
import { Icon16Dropdown, Icon24Filter, Icon24ShareOutline, Icon28ArrowLeftOutline, Icon28ArrowRightOutline, Icon28Notifications, Icon28PhoneWaveOutline, Icon28SettingsOutline, Icon28UserAddBadgeOutline, Icon48Linked, Icon56UsersOutline } from "@vkontakte/icons";
import { Avatar, FormItem, Input, Placeholder, SegmentedControl, Separator, SimpleCell, Spacing, TabsItem } from "@vkontakte/vkui";
import { Icon28Search } from "@vkontakte/icons";
import { EditPopup } from "@/components/EditPopup";
import { Route } from "react-router-dom";
import { SharePopup } from "@/components/SharePopup";


function Tasks () {

  const route = useRouter()
  const [modalVisible, setModalVisible] = useState()

  const tasks = [
    {name: 'Digital Chalange', description: 'изи ту вин', project: 'Мобилка', date: '02.11.2023', id: '1'},
    {name: 'Digital Chalange', description: 'изи ту вин', project: 'Мобилка', date: '02.11.2023', id: '2'},
    {name: 'Digital Chalange', description: 'изи ту вин', project: 'Мобилка', date: '02.11.2023', id: '3'},
    {name: 'Digital Chalange', description: 'изи ту вин', project: 'Мобилка', date: '02.11.2023', id: '4'},
    {name: 'Digital Chalange', description: 'изи ту вин', project: 'Мобилка', date: '02.11.2023', id: '5'},
  ]
  

  const renderAllTasks = (arr) => {
    return (arr.map((task) => {
      return (
        <SimpleCell onClick={() => setModalVisible(!modalVisible)} key={task.id} style={{borderRadius: 15, backgroundColor: '#F4F2F3'}} borderRadiusMode={'auto'} className="flex w-full my-3 rounded-2xl">
          <div className="flex flex-row w-[92vw] self-center justify-between">
            <h1 className="text-lg font-semibold mb-0.25">{task.name}</h1>
            <button>
              <Icon24ShareOutline/>
            </button>
          </div>
          <h1 className="text-base font-normal text-grey">{task.description}</h1>
          <Spacing className="my-2">
            <Separator wide={true}/>
          </Spacing>
          <div className="flex flew-row w-[97vw] justify-between">
            <h1 className="text-base font-bold text-black">{`Проект ${task.project}`}</h1>
            <h1 className="text-base font-normal text-grey">{`Дата создания ${task.date}`}</h1>
          </div>
        </SimpleCell>
      )
    }))
  }



  return (
    <PageContent>
      <SharePopup openState={modalVisible} setOpenState={setModalVisible}/>
      <div className="w-[100vw] flex self-center items-center flex-col">
        <button onClick={() => route.back()} className="absolute top-5 left-5">
          <Icon28ArrowLeftOutline/>
        </button>
        <h1 className="text-2xl font-semibold my-4">Ваши задания</h1>
        <div className="flex flex-col w-full">
          {renderAllTasks(tasks)}
        </div>
      </div>
    </PageContent>
  )
}



export default Tasks
