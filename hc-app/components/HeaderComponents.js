import style from "../styles/Header.module.css"
import guestAvatar from '../public/dvAvatar.png'
import Image from 'next/image'
import { useEffect, useState } from "react";
import { isLoggedIn } from "../services/user.service.js";
import { useRouter } from "next/router";

const userCredentials = {
    name: "Дмитрий ", 
};

const HeaderComponents = ({children, checkAuth = true}) => {
    const router = useRouter();

    const [logged, setLog] = useState(undefined)

    useEffect(()=> {
        isLoggedIn().then(res => setLog(res))
    }, [])

    useEffect(() => {
        console.log('auth status: ' + logged)
        if(logged != undefined && logged === false && checkAuth)
            router.push('/auth')
    }, [logged])

    return(
    <div className={style.container}>
			<div className={style.upper_header}>
					<div className={style.left_side_content}>
							
							<div className={style.heading_wrapper}>
									<a href="/">
									<h1 className={style.heading}> 
										EvenTracker<br/>admin
									</h1>
									</a>
							</div>
							
					</div>
					<div className={style.right_side_content}>
						<div className="flex pt-6 self-end">
							{logged ?
							<>
								<div className={style.profile_credentials}>
									<h3>{userCredentials.name}</h3><br/>
									<a href="/logout"><h4 className=" text-base text-emerald-300">Выйти</h4></a>
								</div>
									<Image
									className={style.profile_photo}
									src={guestAvatar}
									style={{objectFit: "cover"}}
									alt="Avatar`"
									/> 
							</>
							:
							<>
							<div className={style.profile_credentials}>
								<h3>{checkAuth ? 'Не авторизован' : 'Гостевой доступ'} </h3><br/>
							</div>
							</>}
						</div>
					</div>
        </div>

        {children}
    </div>
        
    )
}


export default HeaderComponents;
