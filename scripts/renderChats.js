import { SimpleCell } from '@vkontakte/vkui'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const  ChatAvatar = require('../assets/Ellipse92.png')


function renderChats(arr) {
  const router = useRouter()
  const renderChats = (chats) => {
    return (
      chats.map((chat)=> {
        return (
          <SimpleCell key={chat.id} style={{borderRadius: 15, backgroundColor: '#F4F2F3'}} borderRadiusMode={'auto'} className="flex my-3 rounded-2xl"  onClick={() => router.push('/chat')} before={<Image alt='' src={ChatAvatar} height={70}/>}>
            <h1 className="text-lg font-semibold mb-0.25">{chat.name}</h1>
            <h1 className="text-base font-normal text-grey">{chat.description}</h1>
          </SimpleCell>
        )
      })
    )
  }

  return <>{renderChats(arr)}</>

}

export default renderChats