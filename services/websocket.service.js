import { API_URL } from '@/config';
import axios from 'axios';
import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'localhost:5000/';

export const socket = io(URL);

export function connectToSocket() {
  socket.connect();
}

export function disconnectFromSocket() {
  socket.disconnect();
}

export function connectToChat(token, chatId) {
  socket.emit('user_connect_chat', token, chatId);
}

export function sendMsg(chatId, message, userId) {
  socket.emit('new_message', chatId, message, userId);
}

export async function createChat() {
  await axios.post(`${API_URL}/new_chat`, {name: '12', members: [1,2], admin_id: 1})
}

//'9117492c-1f6e-4dba-9265-e524fa203b9c'
export async function authUser(token) {
  await axios.post(`${API_URL}/auth`, {token: token})
}
