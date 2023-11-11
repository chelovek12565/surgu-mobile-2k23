import { ConfigProvider, AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
 
export default function Layout({ children }) {
  return (
    <div className='w-[100vw] mt-[3vh] bg-white flex flex-col items-center min-h-screen'>
      <main className='w-[95%] self-center'>
        {children}
      </main>
    </div> 
  )
}