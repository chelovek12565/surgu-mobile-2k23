import Link from 'next/link'
import style from '../styles/components.module.css'

const EventTag = ({tag, color}) => (
    <>
        <div className={style.event_tag}>
            <h2>{tag}</h2>
        </div>
    </>
)

export default EventTag;
