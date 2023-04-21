import React from 'react'
import { useParams } from 'react-router-dom'
import './CharacterDetails.css'
import axios from 'axios'

function CharacterDetails() {

    const {id} = useParams();
    //https://rickandmortyapi.com/api/character/2


    const[character, setCharacter] = React.useState('')
    React.useEffect(
        ()=>{
            axios.get(`https://rickandmortyapi.com/api/character/${id}`)
            .then(res =>{
                console.log(res.data.location.name)
                setCharacter(res.data)
            })
            .catch(err => console.log(err))
        }, []
    )

  return (
    <div>CharacterDetails {id}
    <img src={character.image} />
    <p>Name: {character.name}</p>
    <p>Gender: {character.gender}</p>
    <p>Location: {character?.location?.name}</p>
    <p>Species: {character.species}</p>
    </div>
  )
}

export default CharacterDetails