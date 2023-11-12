import style from '../styles/dateTimeCard.module.css'

const DateTimeCard = ({day, month, startTime, endTime}) => (
    <>
		<div className={style.content}>
			<div className={style.month}>
				<h3>{month}</h3>
			</div>
			<div className={style.day_time}>
				<h1 className={style.day}>{day}</h1>
				<h4 className={style.time}>{startTime}-{endTime}</h4>
			</div>
		</div>
    </>
)

export default DateTimeCard;
