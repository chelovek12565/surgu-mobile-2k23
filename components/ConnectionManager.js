import React, { useState } from 'react';
import { socket } from '../services/websocket.service';
import axios from 'axios';
import { Input } from '@vkontakte/vkui';

export function ConnectionManager() {

  const [inputVal, setInput ] = useState()

  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  function connectToChat() {
    socket.emit('user_connect_chat', '123123', 1);
  }

  function sendMsg() {
    socket.emit('new_message', 1, inputVal, 1);
  }

  function createChat() {
    axios.post('http://localhost:5000/new_chat', {name: 'Dmitrij', members: [1], admin_id: 1})
  }

  function createUser() {
    axios.post('http://localhost:5000/auth', {token: '9117492c-1f6e-4dba-9265-e524fa203b9c'})
  }


  return (
    <>
      <button onClick={ createUser }>Create User</button>
      <br/>
      <button onClick={ connect }>Connect</button>
      <br/>
      <button onClick={ connectToChat }>Connect to chat</button>
      <br/>
      <button onClick={ createChat }>createChat</button>
      <br/>
      <button onClick={ sendMsg }>Send Msg</button>
      <br/>
      <button onClick={ disconnect }>Disconnect</button>
      <br/>
      <Input onChange={(e)=> {setInput(e.currentTarget.value)}}></Input>
    </>
  );
}