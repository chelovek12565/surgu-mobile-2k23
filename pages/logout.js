import { useEffect } from "react";
import { useRouter } from "next/router";
import { logout } from "@/services/user.service";
// import { logOut } from "@/services/user.service";

function Logout() {
    const router = useRouter();
    
    useEffect(() => {
        logout()
        router.push('/auth')
    }, [])

    return (
    <>
    </>
    )
}



export default Logout
