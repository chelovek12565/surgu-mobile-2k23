import React, { use, useEffect, useState }  from "react"
import { useRouter } from "next/router";
import PageContent from "@/components/pageContent";
import { Icon16Dropdown, Icon24Filter, Icon28ArrowLeftOutline, Icon28ArrowRightOutline, Icon28Notifications, Icon28PhoneWaveOutline, Icon28SettingsOutline, Icon28UserAddBadgeOutline, Icon48Linked, Icon56UsersOutline } from "@vkontakte/icons";
import { Avatar, FormItem, Input, Placeholder, SegmentedControl, Separator, SimpleCell, Spacing, TabsItem } from "@vkontakte/vkui";
import { Icon28Search } from "@vkontakte/icons";
import { EditPopup } from "@/components/EditPopup";


function Tasks () {


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
      <div>
        
      </div>
    </PageContent>
  )
}



export default Tasks
