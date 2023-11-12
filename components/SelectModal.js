import { Icon24ArrowLeftOutline } from "@vkontakte/icons";
import { Button, Tappable } from "@vkontakte/vkui";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Modal from 'react-modal'


export function SelectModal ({openState, setOpenState}) {

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
          width: '80%',
          height: '15%',
          borderRadius: '2rem',
          backgroundColor: 'var(--vkui--color_background_content)',
          outline: 'none',
          border: 'none',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: 0
        }
      }}
    
    >
      <div className='flex flex-col items-center justify-center w-full h-full'>
        <div className=" flex flex-col w-full self-center items-center">
          <div className="flex w-[100%] mb-2">
            <Tappable className="h-10 flex items-center w-[100%] justify-center" onClick={() => router.push('/createChat')}
            // поиграйся с моими параметрами :) доступный список параметров см. в конце страницы
            >
              <h1 className="text-[--vkui--color_text_accent--active]">Создать чат</h1>
            </Tappable>
          </div>
          <div className="flex w-[100%]">
            <Tappable className="h-10 flex items-center w-[100%] justify-center" onClick={() => router.push('/searchPage')}
            // поиграйся с моими параметрами :) доступный список параметров см. в конце страницы
            >
              <h1 className="text-[--vkui--color_text_accent--active]">Найти чат</h1>
            </Tappable>
          </div>
        </div>
      </div>
    </Modal>
  )
}
