import style from '../styles/components.module.css'

export default function InputField({placeholderImage, placeholder, id, className}) {
    return (
    <>
      <form action="#" method="post">  
        <input className={style.search_input_field} 
        // style={[{backgroundImage: {placeholderImage}}, {placeholder: {placeholder}}]} 
        type="text" id="searchQuery" name="searchQuery"/>
        <input type="submit" hidden/>
      </form>
    </>
    )
  }
