import { Icon20PlaceOutline, Icon20PlaneOutline } from "@vkontakte/icons";
import { Button } from "@vkontakte/vkui";
import { useState } from "react";


export default function ChatInput({onSubmit = (text) => {}})
{ 
  const [input, setInput] = useState('')

  function readInput(e)
  {
    setInput(e.currentTarget.value)
  }

  function clearField()
  {
    
    setInput('')
  }

  return(
    <div className="h-[6vh] bg-black justify-self-end align-bottom w-full flex justify-between border-[1px] border-gray-300 rounded-t-md">
      <input onInput={readInput} value={input} type="text" className="h-full flex-1 pl-5"></input>
      <button onClick={() => {clearField(); onSubmit(input)}} className="h-full w-16 bg-white"><Icon20PlaneOutline/></button>
    </div>
  )
}