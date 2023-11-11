
export default function EventInputField({label, type, register, regType, disabled = false, value=undefined})
{
    return(
    <div className="flex justify-left flex-1 flex-col pt-2">
        <label className="text-zinc-100 text-2xl pb-2">{label}</label>
        <input defaultValue={value} disabled={disabled} type={type} name="event_topic" {...register(regType)} className="rounded-xl h-10 w-full self-center bg-[#161C22] text-zinc-200 pl-5"/>
    </div>
    )
}