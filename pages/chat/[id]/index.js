import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import HeaderComponents from '@/components/HeaderComponents';
import { Icon16ChevronLeft, Icon20Info } from '@vkontakte/icons';
import ChatInput from '@/components/ChatInput';
import { ChatMessage } from '@/components/ChatMessage';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';
import { Avatar, Message, MessageList, MessageSeparator, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import { Button, Input } from '@vkontakte/vkui';

import { authUser, connectToChat, connectToSocket, createChat, sendMsg, socket } from '@/services/websocket.service';
import { getUserByToken } from '@/services/user.service';


export default function ChatPage() {
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm();
  const [messages, setMessages] = useState([])
  const [hasMore, setMore] = useState(true)
  const [token, setToken] = useState()
  const [user, setUser] = useState()

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [chatId, setChatId] = useState([]);

  useEffect(() => {
    if(router)
      setChatId(router.query.id)
  }, [router])

  useEffect(() => {
    console.log(chatId)
    if(chatId)
    {
      connect('9117492c-1f6e-4dba-9265-e524fa203b9c')
    }
   }, [chatId])

  async function fetchUser(token)
  {
    console.log('getting user')
    const user = await getUserByToken(token)
    setUser(user)
    console.log(user)

  }

  useEffect(()=> {
    
    // if(token !== undefined)
    //   connectToSocket()

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

      //could be uncommented
      // await fetchUser(token)
      // await authUser(token)
      // await createChat()
      // connectToChat(token, 2)
    }

    async function sendMessage(message)
    {
      if(!isConnected) console.log('could not send messages while disconnected');


      if(user)
        sendMsg(chatId, message, user.id)
      else
        console.log('error (no user)')
    }

    async function onSubmit({ email, password }) {
        console.log(email +' p:' + password)
        let res = await userService.Login({email: email, password: password})
        if(res)
        {
            router.push("/")
            router.reload()
        }
    }

    return(    
      <div className=' w-full h-screen flex flex-col'>
        <HeaderComponents title={'132'} 
        before={
          <div className=' flex flex-row content-baseline align-middle items-center '>
            <Icon16ChevronLeft/>
            <div className='ml-10'>
              <h1>Чат1</h1>
            </div>
          </div>
        }
        after={
          <div>
            <Icon20Info/>
          </div>
        }
        ></HeaderComponents>
        {/* <div className='fixed top-24 left-0 w-full'>
          <Input placeholder='token' onChange={(e) => setToken(e.currentTarget.value)} value={token}></Input>
          <Button onClick={() => {connect(token)}}>auth</Button>
          <Button onClick={() => {socket.connect()}}>connect</Button>
          <Button onClick={() => {socket.disconnect()}}>disconn</Button>

        </div> */}
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
            <TypingIndicator />
            <br/>
            {[...messages]?.reverse().map(msg => 
              {return(
                <Message
                key={Math.random() * 1000}
                model={{
                  message: msg.text,
                  direction: msg.user_id === user?.id ? 'outgoing' : 'incoming',
                  position: "normal",
              }}
              > 
               <Message.Header sender={msg.username} sentTime="just now" />
                <Avatar src={'https://sun3-9.userapi.com/s/v1/ig2/QoqNWliOUCe5OTTDC7XSJi06pvDDpCZV1dPlarKNFTEM29XsBz6axCGDWrNi5bS0YYFXYtRdPaOKFR1_2uVq6JMV.jpg?size=200x200&quality=95&crop=159,392,598,598&ava=1'}/>
              </Message>
              )})}
            <Message
              model={{
                message: "Hello my friend",
                direction: 'outgoing',
                position: "normal",
            }}
            /> 
                        <Message
              model={{
                message: "Hello my friend",
                direction: 'outgoing',
                position: "normal",
            }}
            /> 
                        <Message
              model={{
                message: "Hello my friend",
                direction: 'outgoing',
                position: "normal",
            }}
            /> 
                        <Message
              model={{
                message: "Hello my friend",
                direction: 'outgoing',
                position: "normal",
            }}
            /> 
                        <Message
              model={{
                message: "Hello my friend",
                direction: 'outgoing',
                position: "normal",
            }}
            /> 
                        <Message
              model={{
                message: "Hello my friend",
                direction: 'outgoing',
                position: "normal",
            }}
            /> 
                                    <Message
              model={{
                message: "Hello my friend",
                direction: 'incoming',
                position: "normal",
            
              }}></Message>                       
          <Message
            model={{
              message: "Hello my friend",
              direction: 'outgoing',
              position: "normal",
          }}
          /> 
                                  <Message
            model={{
              message: "Hello my friend",
              direction: 'incoming',
              position: "normal",
          }}
          />                         <Message
          model={{
            message: "Hello my friend",
            direction: 'outgoing',
            position: "normal",
        }}
        /> 
                                <Message
          model={{
            message: "Hello my friend",
            direction: 'incoming',
            position: "normal",
        }}
        />                        
       <Message
        model={{
          message: "Hello my friend",
          direction: 'outgoing',
          position: "normal",
      }}
      /> 
      <Message
        model={{
          message: "Hello my friend",
          direction: 'incoming',
          position: "normal",
      }}
      /> 
             <Message
        model={{
          message: "Hello my friend",
          direction: 'outgoing',
          position: "normal",
      }}
      /> 
      <Message
        model={{
          message: "Hello my friend",
          direction: 'incoming',
          position: "normal",
      }}
      /> 
            
            <Message
        model={{
          message: "Hello my friend",
          direction: 'outgoing',
          position: "normal",
      }}
      /> 
      <Message
        model={{
          message: "Hello my friend",
          direction: 'incoming',
          position: "normal",
      }}
      /> 
            
            <Message
        model={{
          message: "Hello my friend",
          direction: 'outgoing',
          position: "normal",
      }}
      /> 
      <Message
        model={{
          message: "Hello my friend",
          direction: 'incoming',
          position: "normal",
      }}
      /> 
            
            <Message
        model={{
          message: "Hello my friend",
          direction: 'outgoing',
          position: "normal",
      }}
      /> 
      <Message
        model={{
          message: "Hello my friend",
          direction: 'incoming',
          position: "normal",
      }}
      /> 
            
            
             {/* <Message.Header sender="Dmitriy" sentTime="just now" />
              <Avatar src={'https://sun3-9.userapi.com/s/v1/ig2/QoqNWliOUCe5OTTDC7XSJi06pvDDpCZV1dPlarKNFTEM29XsBz6axCGDWrNi5bS0YYFXYtRdPaOKFR1_2uVq6JMV.jpg?size=200x200&quality=95&crop=159,392,598,598&ava=1'}/>
            </Message>

            <Message
              model={{
                message: "Hello my friend",
                position: "normal",
            }}
            
            > 
             <Message.Header sender="Dmitriy Vovchinskiy"/>
              <Avatar src={'https://sun3-9.userapi.com/s/v1/ig2/QoqNWliOUCe5OTTDC7XSJi06pvDDpCZV1dPlarKNFTEM29XsBz6axCGDWrNi5bS0YYFXYtRdPaOKFR1_2uVq6JMV.jpg?size=200x200&quality=95&crop=159,392,598,598&ava=1'}/>
            </Message> */}

          </InfiniteScroll> 
        </div>

        <ChatInput onSubmit={sendMessage}/>

      </div>
        )
}
