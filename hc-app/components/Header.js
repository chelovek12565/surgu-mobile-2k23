import style from "../styles/Header.module.css"
import HeaderComponents from "./HeaderComponents"

const Header = ({checkAuth}) => {
     return(
     <header>
        <div className={style.header}>
            <HeaderComponents checkAuth={checkAuth}>
                
            </HeaderComponents>

        </div>
       
     </header>
     );
}

export default Header;
