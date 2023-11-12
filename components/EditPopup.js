import renderChats from "@/scripts/renderChats";
import { Icon24ArrowLeftOutline, Icon28ArrowLeftOutline } from "@vkontakte/icons";
import { Avatar, Button, FormItem, Input, Tappable } from "@vkontakte/vkui";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Modal from 'react-modal'
import InputField from "./InputField";


export function EditPopup ({openState, setOpenState, groupName, setGroupName }) {

  const [inputNameValid, setInputNameValid] = useState('')

  useEffect(() => {
    if (groupName.trim() === '') {
      setInputNameValid('error')
    } else {
      setInputNameValid('default')
    }
  }, [groupName])

  const router = useRouter();

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
          height: '50%',
          borderRadius: '2rem',
          backgroundColor: 'var(--vkui--color_background_content)',
          outline: 'none',
          border: 'none',
          position: 'absolute',
          bottom: '0%',
          left: '50%',
          transform: 'translate(-50%, 100%)',
          padding: 0
        }
      }}
    
    >
      <div className='flex flex-col items-center w-full h-full'>
        <div className="flex flex-col w-full items-center mt-5">
          <h1 className="text-2xl font-semibold" >Настройки чата</h1>
        </div>
        <div className="absolute top-6 w-[90%]">
          <button onClick={() => setOpenState(!openState)}>
            <Icon28ArrowLeftOutline/>
          </button>
        </div>
        <div className="flex w-[90%] ml-[4vw] mt-[5vh] flex-row items-center">
          <Avatar size={120} />
          <div className="flex flex-col  justify-center items-center ml-3">
            <FormItem status={`${inputNameValid}`}>
              <h1 className="mb-4">Имя чата</h1>
              <Input className="bg-main" type="text" defaultValue={groupName} onChange={(val) => setGroupName(val.target.value)}/>
            </FormItem>
          </div>
        </div>
      </div>
    </Modal>
  )
}
