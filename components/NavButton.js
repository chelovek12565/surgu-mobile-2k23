import Link from 'next/link'
import style from '../styles/components.module.css'

const NavButton = ({text, href, isSelected}) => (
    <Link href={href} className={style.nav_button_selected}>{text}</Link>
    
)

export default NavButton;
