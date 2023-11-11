import { Icon24ArrowLeftOutline } from "@vkontakte/icons";
import { Button, Tappable } from "@vkontakte/vkui";
import React, { useState, useEffect } from "react";
import Modal from 'react-modal'


export function SelectModal ({openState, setOpenState}) {
  const gaps = {
    padding: 16,
  };

  return (
    <Modal
      isOpen={openState}
      style={{
        overlay: {
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        content: {
          width: '80%',
          minHeight: '10rem',
          borderRadius: '2rem',
          backgroundColor: 'var(--vkui--color_background_content)',
          outline: 'none',
          border: 'none',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }
      }}
    
    >
      <div className='flex flex-col items-center justify-center h-full'>
        <div className=" flex flex-col">
          <div style={gaps} className="">
            <Tappable
              
            // поиграйся с моими параметрами :) доступный список параметров см. в конце страницы
            >
              <h1 style={gaps} className="text-[--vkui--color_text_accent--active]">Найти чат</h1>
            </Tappable>
          </div>
          <div style={gaps}>
            <Tappable
            // поиграйся с моими параметрами :) доступный список параметров см. в конце страницы
            >
              <h1 style={gaps} className="text-[--vkui--color_text_accent--active]">Создать чат</h1>
            </Tappable>
          </div>
        </div>
      </div>
    </Modal>
  )
}
