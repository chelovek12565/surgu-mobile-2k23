import { API_URL } from "@/config";
import axios from "axios";

export async function getUserByToken(token)
{
  try
  {
    const user = (await axios.get(`${API_URL}/user/by_token/${token}`)).data

    return user
  }
  catch (e)
  {
    console.log(e)
  }
}