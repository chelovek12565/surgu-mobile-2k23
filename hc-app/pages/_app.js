import Layout from '@/components/GeneralPageLayout'
import '../styles/globals.css'

 const App = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>)
  return getLayout(<Component {...pageProps} />)
}

export default App
