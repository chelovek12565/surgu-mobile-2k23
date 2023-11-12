import { use } from "react";
import { getToken, getUserByToken } from "./user.service";
import axios from "axios";
import { API_URL } from "@/config";

export async function getUserChats()
{
  const user = await getUserByToken(getToken())
  console.log(user.chats)
  return user.chats
}

export async function getChatById(id)
{
  try
  {
    const chat = (await axios.get(`${API_URL}/chat/${id}`)).data
    return chat
  }
  catch (e)
  {
    console.log(e)
  }
}


export async function getChatsForUser(userId)
{
  try
  {
    const chat = (await axios.get(`${API_URL}/users_chats/${1}`)).data
    return chat
  }
  catch (e)
  {
    console.log(e)
  }
}