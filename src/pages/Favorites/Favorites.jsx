import React, {useContext} from 'react'
import { FavoritesContext } from '../../contexts/FavoritesContext'


function Favorites() {
    //change to use global state
  //NOTE {} not []
  const {favorites} = useContext(FavoritesContext)
  return (
    <div>Favorites
        {
            favorites.map(item=><p>{item.name}</p>)
        }
    </div>
  )
}

export default Favorites