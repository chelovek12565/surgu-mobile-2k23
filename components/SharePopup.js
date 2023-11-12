import { getChatsForUser } from "@/services/chat.service";
import { getToken, getUserByToken } from "@/services/user.service";
import { Icon24ArrowLeftOutline } from "@vkontakte/icons";
import { Button, Tappable } from "@vkontakte/vkui";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Modal from 'react-modal'


export function SharePopup ({openState, setOpenState}) {

  const router = useRouter();
  const [TextChatsGP, setGroupChats] = useState([
    // {name: 'Хакатон', id: '1', description: 'Крутой чат'},
    // {name: 'Чат1', id: '2', description: 'Крутой чат'},
    // {name: 'Чат2', id: '3', description: 'Крутой чат'},
    // {name: 'Чат3', id: '4', description: 'Крутой чат'},
  ])

  async function fetchChats()
  {
    const user = await getUserByToken(getToken())
    const chatsIds = await getChatsForUser(user.id)
    console.log(chatsIds)
    // console.log(await getChatsForUser(user.id))
    setGroupChats(prev => prev.concat(chatsIds))
  }


  const renderAllChats = (arr) => {
    
  } 



  return (
    <Modal
      
      isOpen={openState}
      onRequestClose={() => setOpenState(!openState)}
      shouldCloseOnOverlayClick={true}
      style={{
        overlay: {
          position: 'fixed',
          width: '100vw',
          height: '100%',
          background: 'rgba(0,0,0,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

        },
        content: {
          width: '100%',
          height: '80%',
          borderRadius: '2rem',
          backgroundColor: 'var(--vkui--color_background_content)',
          outline: 'none',
          border: 'none',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -30%)',
          padding: 0
        }
      }}
    
    >
      <div className='flex flex-col items-center w-full h-full'>
        <h1 className="text-2xl font-semibold my-5">Поделиться</h1>
        <div>
          {renderAllChats()}
        </div>
      </div>
    </Modal>
  )
}
