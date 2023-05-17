import React, {useContext} from 'react'
import CharacterCard from '../../components/CharacterCard/CharacterCard'
import { FavoritesContext } from '../../contexts/FavoritesContext'
import { ThemeContext } from '../../contexts/ThemeContext'
import './Favorites.css'

function Favorites() {

  //use global state for darkMode
  //NOTE {} not []
  const {darkMode, setDarkMode} = useContext(ThemeContext)

    //change to use global state
  //NOTE {} not []
  const {favorites} = useContext(FavoritesContext)
  return (
    <div className={darkMode?"favorites-container favorites-dark"  :"favorites-container"}>
      <h1> My Favorite Characters</h1>
      <div className="favorite-characters">
        {
            // favorites.map(item=><p>{item.name}</p>)
            favorites.length > 0 ?
            favorites.map ((item=><CharacterCard key={item.id} character={item} />))
            :
            <p>No favorites selected yet</p>
        }
        </div>
    </div>
  )
}

export default Favorites