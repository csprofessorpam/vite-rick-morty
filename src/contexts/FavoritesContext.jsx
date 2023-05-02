import {useState, createContext, useEffect} from 'react'

export const FavoritesContext = createContext();

export default function FavoritesContextProvider(props){
    //create the global state
    const [favorites, setFavorites] = useState([])

    //get inital state from localStorage when page loads
    useEffect(
        ()=>{
            //is there a value in localStorage
            const storedFavs = localStorage.getItem('favoritesList')
            //check if something was there
            if (storedFavs){
                //console.log('datatype is ', typeof(storedDarkMode))
                //setDarkMode(storedDarkMode)
                //parse converts from string to its datatype
                setFavorites(JSON.parse(storedFavs))
            }
            //otherwise will use default state value

        }, []
    )

    // //save to localStorage whenever it changes
    // useEffect(
    //     ()=>{
    //         //save current state to localStorage when it changes
    //         //stringify converts to JSON string format
    //         localStorage.setItem('darkMode', JSON.stringify(darkMode))
    //         //localStorage.setItem('darkMode', darkMode)

    //     }, [darkMode]
    // )

    const addCharacter = (charToAdd) =>{
        console.log('adding', charToAdd)
        let newFavorites;
        newFavorites = [...favorites, charToAdd]
        setFavorites(newFavorites)
        localStorage.setItem('favoritesList', JSON.stringify(newFavorites))
    }

    const removeCharacter = (charId) =>{
        console.log("remove", charId)
        let newFavorites;
        newFavorites = favorites.filter(item => item.id !== charId)
        setFavorites(newFavorites)
        localStorage.setItem('favoritesList', JSON.stringify(newFavorites))
    }

    return(
        <FavoritesContext.Provider value={{ favorites, addCharacter, removeCharacter }} >
            {props.children}
        </FavoritesContext.Provider>
    )


}