import { useState } from "react"

export default function SuccessResultCard({color, message, callback})
{
  const [closed, setClose] = useState(false)
  function close()
  {
    setClose(true)
  }

  return(
    <>
    {closed ? <></> : 
      <div className=" h-16 bg-emerald-500 border-green-300 rounded-xl border-2 flex justify-between mt-5 w-[80%] m-auto">
        <h1 className=" h-full mt-[2%] ml-5 text-xl">{message}</h1>
        <div className=" h-10 w-10">
          <button className="h-full w-full text-center" onClick={close}><h2 className="text-center w-full">X</h2></button>
        </div>
      </div>
    } 
  </>
  )
}