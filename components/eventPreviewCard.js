import Image from "next/image"
import penIcon from "../public/pencil.svg";

export default function EventPreviewCard({event})
{
	return(
		<>
			<div className=" bg-secondary h-fit p-5 w-[90%] m-auto mt-10 rounded-3xl flex justify-between">
				<h1 className="text-[150%] w-fit">{event?.title}</h1>

				<div className=" bg-transparent w-fit">
					<div className="w-fit">
						<a href={`/eventEditor?id=${event?.id}`}>
							<Image
									priority
									src={penIcon}
									alt="Edit event"
									className="h-10 w-auto"
								/>
						</a>
					</div>
				</div>
			</div>
		</>
    )
} 