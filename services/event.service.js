import { default as axios } from "axios";
import { axiosAuthConfig } from '../config'
// import { Cookies } from "react-cookie";

export async function CreateEvent(props)
{
  let success = false
  try {
    
    let res;
    await axios.post(`event/createEvent`, 
      {...props, 
          author_id: 1, 
          image: 'https://lh3.googleusercontent.com/pw/ADCreHeqtPcm42VbPNpM46Xvh2mATt-lZ_lNcqjj96Z4BrOfeNzc9svAuJqOrj-FThfMV8dEnY9SM_0HyW9rktWojIkaClMLozA4beZdLhtdMcu6syGZbVs=w2400', 
          plan: "[]", 
          tags: "",
          type: "Мероприятие"}, {headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}`}})
      .then((response) => res = response);

    console.log(res.status != 200)

    success = res.status == 200;
  } catch(e){
    console.log(e);
  }finally {
    return success
  }

}

export async function GetAndSetEvents(eventsSetter)
{
  let result = {events: undefined, success: false}
  try {
      eventsSetter(await GetEvents())
      return result

  } catch(e){
    console.log(e);
    
    eventsSetter(result)
    return result
  }
}

export async function GetEvents()
{
  let result = {events: undefined, success: false}
  try {
      let res = await axios.get(`event/getEvents/`, {headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}`}})
      let events = res.data.events;
      result.events = events;
      result.success = true;

      return result

  } catch(e){
    console.log(e);
    
    return result
  }
}