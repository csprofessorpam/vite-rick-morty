import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
Link
import './CharacterCard.css'
//FaHeart
//FaRegHeart
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FavoritesContext } from '../../contexts/FavoritesContext';


function CharacterCard({character}) {
  //start with variable to test UI
  const isFavorite = false;

  //change to use global state
  //NOTE {} not []
  const {favorites, addCharacter, removeCharacter} = useContext(FavoritesContext)

  return (
    <div className="character-card">
        <img src={character.image} />
        <p>{character.name}</p>
        <div className="button-container">
        <Link to={`/details/${character.id}`}>See Details</Link>
        {
          //isFavorite?
          favorites && favorites?.find(item=>item.id===character.id)
          ?
          <FaHeart className='heart-icon'
          onClick={()=>removeCharacter(character.id)} />
          :
          <FaRegHeart className='heart-icon' 
            onClick={()=>addCharacter(character)}/>
        }
        </div>
    </div>
  )
}

export default CharacterCard