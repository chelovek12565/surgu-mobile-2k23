import Layout from '@/components/GeneralPageLayout'
import '../styles/globals.css'
import '@vkontakte/vkui/dist/vkui.css';
import { ConfigProvider, AdaptivityProvider, AppRoot } from '@vkontakte/vkui';

 const App = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>)
  return getLayout( <Component {...pageProps} />)
}

export default App
