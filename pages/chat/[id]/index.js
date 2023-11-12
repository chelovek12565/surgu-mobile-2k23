import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import HeaderComponents from '@/components/HeaderComponents';
import { Icon16ArticleOutline, Icon16ChevronLeft, Icon20Info, Icon28ArrowLeftOutline } from '@vkontakte/icons';
import ChatInput from '@/components/ChatInput';
import { ChatMessage } from '@/components/ChatMessage';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';
import { Avatar, Message, MessageList, MessageSeparator, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import { authUser, connectToChat, connectToSocket, createChat, disconnectFromSocket, sendMsg, socket } from '@/services/websocket.service';
import { checkLogin, getToken, getUserByToken } from '@/services/user.service';
import { getLast100Messages } from '@/services/chat.service';


export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState([])
  const [hasMore, setMore] = useState(true)
  const [token, setToken] = useState()
  const [user, setUser] = useState()

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [chatId, setChatId] = useState([]);


  async function fetchMessages()
  {
    const msgs = await getLast100Messages(0, chatId);
    if(msgs)
    {
      const msgsObj = []
      msgs.forEach(aMsg => {
        msgsObj.push({text: aMsg[1], user_id: aMsg[2]})
      });
      setMessages(msgsObj.reverse())

    }
  }

  useEffect(() => {
    

    const exitingFunction = () => {
      disconnectFromSocket()
      console.log("exiting...");
    };

    router.events.on("routeChangeStart", exitingFunction);

    return () => {
      disconnectFromSocket()
      console.log("unmounting component...");
      router.events.off("routeChangeStart", exitingFunction);
    };
  }, []);

  useEffect(() => {
    if(checkLogin() === false) 
      router.push('/auth')
  }, [])
  

  useEffect(() => {
    if(router)
      setChatId(router.query.id)
  }, [router])

  useEffect(() => {
    console.log(chatId)
    if(chatId)
    {
      fetchMessages()
      connect(getToken())
    }
   }, [chatId])

  async function fetchUser(token)
  {
    console.log('getting user')
    const user = await getUserByToken(token)
    setUser(user)
    console.log(user)
    socket.connect();


  }

  useEffect(()=> {
    disconnectFromSocket()
    if(token !== undefined)
      connectToSocket()

  }, [token])

  useEffect(() => {

    function onConnect() {
      console.log('conn: ' + token)
      // fetchUser(token)
      setIsConnected(true);
    }

    function onDisconnect() {
      console.log('disconnect')
      setIsConnected(false);
    }

    function onMsgRecieved(value) {
      console.log('got new message')
      console.log(JSON.stringify(value) + 'usr: ' + user)
      setMessages(previous => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('chat', onMsgRecieved);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('chat', onMsgRecieved);
    };
  }, []);


    async function connect(token)
    {
      // could be uncommented
      // connectToChat()
      await fetchUser(token)
      await authUser(token)
      // await createChat()
      console.log('connecting to chat')

      connectToChat(token, chatId)
    }

    async function sendMessage(message)
    {
      if(!isConnected) console.log('could not send messages while disconnected');


      if(user)
        sendMsg(chatId, message, user.id)
      else
        console.log('error (no user)')
    }

    return(    
      <div className=' w-full h-screen flex flex-col'>
        <HeaderComponents 
        
        before={
          <div className=' flex flex-row content-baseline align-middle items-center '>
            <button onClick={() => router.back()}>
              <Icon28ArrowLeftOutline/>
            </button>
            <div className='ml-10'>
              <h1>Digital Chalenge</h1>
              <h1 className='text-sm text-gray'>открытая группа, 8 участников</h1>
            </div>
          </div>
        }
        after={
          <button onClick={() => router.push('/chatSettings')}>
            <Icon16ArticleOutline width={35} height={35}/>
          </button>
        }
        ></HeaderComponents>

        <div
          id="scrollableDiv"
          style={{
            flex: 1,
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column-reverse',
            width: '95%',
            margin: 'auto'
          }}
        >
          <InfiniteScroll
            dataLength={15} // if it changes we can recieve next() callback
            next={() => {console.log('next'); setMore(true)}}
            style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
            inverse={true} //
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollableDiv"
          >
            <br/>
            {/* <TypingIndicator /> */}
            <br/>
            {[...messages]?.reverse().map(msg => 
              {return(
                <Message
                key={Math.random() * 1000}
                model={{
                  message: msg.text,
                  direction: msg.user_id === user?.id ? 'outgoing' : 'incoming',
              }}
              > 
                <Message.Header sender="Emily" sentTime="just now" />
              </Message>
              )})}

          </InfiniteScroll> 
        </div>
        <div>
          <ChatInput onSubmit={sendMessage}/>
        </div>
      </div>
        )
}
