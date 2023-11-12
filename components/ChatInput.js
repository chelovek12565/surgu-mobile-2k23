import { Icon16AddSquareOutline, Icon20PlaceOutline, Icon20PlaneOutline, Icon28PaperplaneOutline } from "@vkontakte/icons";
import { Button, Input } from "@vkontakte/vkui";
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
    <div className="h-auto fixed bottom-0 w-[100vw] ">
      <Input onInput={readInput} before={<button><Icon16AddSquareOutline width={30} height={30}/></button>} value={input} type="text" after={<button onClick={() => {clearField(); onSubmit(input)}}><Icon28PaperplaneOutline/></button>} className=" my-23 bg-[#D9D9D9]"></Input>
      
    </div>
  )
}