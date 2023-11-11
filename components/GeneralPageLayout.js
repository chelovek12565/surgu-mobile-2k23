import { ConfigProvider, AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
 
export default function Layout({ children }) {
  return (
    <div className='w-[100vw] bg-white flex flex-col items-center min-h-screen'>
      <main className='self-center'>
        {children}
      </main>
    </div> 
  )
}