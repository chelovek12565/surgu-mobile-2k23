import { useEffect } from "react";
import { useRouter } from "next/router";
// import { logOut } from "@/services/user.service";

function Logout() {
    const router = useRouter();
    
    useEffect(() => {
        // logOut(router)
    }, [])

    return (
    <>
    </>
    )
}



export default Logout
