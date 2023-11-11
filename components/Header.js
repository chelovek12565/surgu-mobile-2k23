import style from "../styles/Header.module.css"
import HeaderComponents from "./HeaderComponents"

const Header = ({checkAuth, children}) => {
     return(
     <header className=" rounded-3xl bg-main max-w-xl w-[100wv] m-auto shadow-2xl">
            <HeaderComponents checkAuth={checkAuth} >
                  {children}
            </HeaderComponents>
     </header>
     );
}

export default Header;
