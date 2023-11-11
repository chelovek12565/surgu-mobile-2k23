import { ConfigProvider, AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
import { useEffect, useState } from 'react';
 
export default function Layout({ children }) {
  const [isClient, setClient] = useState(false)

  useEffect(()=> {
    setClient(true)
  }, [])

  return (
    <>
      {isClient ?     
      <div className='w-[100vw] bg-white flex flex-col items-center min-h-screen'>
        <main className='self-center'>
          {children}
        </main>
      </div>  
      : <></>}
    </>
  )
}