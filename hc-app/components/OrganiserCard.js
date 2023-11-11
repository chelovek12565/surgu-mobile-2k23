import Link from 'next/link'
import style from '../styles/organiserCard.module.css'
import Image from 'next/image';

const OrganiserCard = ({logo, name}) => (
    <>
        <div className={style.bg}>
            <div className={style.content}>
                <div className={style.logo}>
                    <Image
                        // className={style.logo}
                        src={logo}
                        alt="organisation logo"
                        />
                </div>
                <div className={style.org_name}>
                    <h4>{name}</h4>
                </div>
            </div>
        </div>
    </>    
)

export default OrganiserCard;
