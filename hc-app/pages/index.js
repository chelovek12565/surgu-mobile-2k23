import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isLoggedIn } from "@/services/user.service";
import NamedRouteElement from "@/components/namedRouteElement";

function Home() {
  const router = useRouter();

  return (
    <>
      <div className=" min-h-screen h-fit bg-primary">
        <div className="p-10"> 
          <div className="rounded-3xl bg-main-bg m-auto max-w-xl">
            <h2 className="text-5xl text-center m-auto rounded-xl h-14 w-fit pt-5">
                Admin panel
            </h2>
            <div className=" h-fit pb-5">
              <NamedRouteElement name='Список мероприятий' route={'/eventsList'}/>
              <NamedRouteElement name='Создать мероприятие' route={'/eventCreator'}/>

            </div>

          </div>
        </div>

        </div> 
    </>
  )
}


export default Home
