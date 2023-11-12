import { API_URL } from "@/config";
import axios from "axios";
import  secureLocalStorage  from  "react-secure-storage";


export async function getUserByToken(token)
{
  try
  {
    console.log(token)
    const user = (await axios.get(`${API_URL}/user/by_token/${token}`)).data
    return user
  }
  catch (e)
  {
    console.log(e)
  }
}

export async function auth(token)
{
  try
  {
    console.log(token)
    const user = (await axios.post(`${API_URL}/auth`, {token: token})).data
    login(token)
    return true
  }
  catch (e)
  {
    console.log(e)
    return false
  }
}

export async function login(token)
{
  if(await getUserByToken(token))
  {
    secureLocalStorage.setItem("week-token", token);
    console.log('valid token')
    return true
  }
  console.log('invalid token')
  return false
}

export function logout()
{
  secureLocalStorage.removeItem('week-token')
}

export function getToken()
{
  return secureLocalStorage.getItem('week-token')
}

export function checkLogin()
{
  if(getToken())
  {
    return true
  }
  else{ return false}
}