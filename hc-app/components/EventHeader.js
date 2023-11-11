import style from "../styles/EventHeader.module.css"
import HeaderComponents from "./HeaderComponents"
import EventTag from "./EventTag";
import OrganiserCard from "./OrganiserCard";

const EventHeader = ({title, orgName, orgLogo}) => {
     return(
     <header>
        <div className={style.header}>
            <HeaderComponents>
                <div className={style.event_info}>
                    <div className={style.title_details}>
                        <div className={style.event_tags_container}>
                            <ul>
                                <li><EventTag tag={'Конференция'}/></li>
                                <li><EventTag tag={'Онлайн'}/></li>
                            </ul>
                        </div>
                        <div className={style.title_container}>
                            <h1 className={style.event_title}>{title}</h1>
                        </div>
                    </div>

                    <div className={style.organiser_details}>
                        <div className={style.org_group}>
                            <h3>Группа-организатор</h3>
                            
                            <div className={style.org_card}>
                                <OrganiserCard name={orgName} logo={orgLogo}/>
                            </div>
                        </div>

                    </div>
                </div>
            </HeaderComponents>
        </div>
       
     </header>
     );
}

export default EventHeader;
