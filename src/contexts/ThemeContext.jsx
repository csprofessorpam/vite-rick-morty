import {useState, createContext, useEffect} from 'react'

export const ThemeContext = createContext();

export default function ThemeContextProvider(props){
    //create the global state
    const [darkMode, setDarkMode] = useState(false)

    //get inital state from localStorage when page loads
    useEffect(
        ()=>{
            //is there a value in localStorage
            const storedDarkMode = localStorage.getItem('darkMode')
            //check if something was there
            if (storedDarkMode){
                //console.log('datatype is ', typeof(storedDarkMode))
                //setDarkMode(storedDarkMode)
                //parse converts from string to its datatype
                setDarkMode(JSON.parse(storedDarkMode))
            }
            //otherwise will use default state value

        }, []
    )

    //save to localStorage whenever it changes
    useEffect(
        ()=>{
            //save current state to localStorage when it changes
            //stringify converts to JSON string format
            localStorage.setItem('darkMode', JSON.stringify(darkMode))
            //localStorage.setItem('darkMode', darkMode)

        }, [darkMode]
    )

    return(
        <ThemeContext.Provider value={{ darkMode, setDarkMode }} >
            {props.children}
        </ThemeContext.Provider>
    )


}