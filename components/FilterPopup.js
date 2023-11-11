import renderChats from "@/scripts/renderChats";
import { Icon24ArrowLeftOutline } from "@vkontakte/icons";
import { Button, Tappable } from "@vkontakte/vkui";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Modal from 'react-modal'


export function FilterPopup ({openState, setOpenState }) {

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
          height: '100%',
          borderRadius: '2rem',
          backgroundColor: 'var(--vkui--color_background_content)',
          outline: 'none',
          border: 'none',
          position: 'absolute',
          bottom: '0%',
          left: '50%',
          transform: 'translate(-50%, 10%)',
          padding: 0
        }
      }}
    
    >
      <div className='flex flex-col items-center w-full h-full'>
        <div className="flex flex-col w-full items-center mt-5">
          <h1 className="text-2xl font-semibold" >Фильтры</h1>
        </div>
        <div className="mt-[60vh]">
          <Button className="flex" onClick={() => setOpenState(!openState)}>
            <h1 className="text-lg px-3 py-1 text-main" >Применить фильтры</h1>
          </Button>
        </div>
      </div>
    </Modal>
  )
}
