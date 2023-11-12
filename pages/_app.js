import Layout from '@/components/GeneralPageLayout'
import '../styles/globals.css'
import '@vkontakte/vkui/dist/vkui.css';
import { ConfigProvider, AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

 const App = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>)
  return getLayout( <Component {...pageProps} />)
}

export default App
