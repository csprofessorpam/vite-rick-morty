import React, {useState, useEffect} from 'react'
import './HomePage.css'
import axios from 'axios'
import CharacterCard from '../../components/CharacterCard/CharacterCard'
import Search from '../../components/Search/Search'

function HomePage() {

    const [characters, setCharacters] = useState([])

    //https://rickandmortyapi.com/api/character
    useEffect(
        ()=>{
            console.log('homepage loaded')
            axios.get("https://rickandmortyapi.com/api/character")
            .then(res =>{
                console.log(res.data.results)
                setCharacters(res.data.results)
            })
            .catch(err => console.log(err))
        }, []
    )
  return (
    <div className="home-container">
        <Search setCharacters={setCharacters} />
        <h1>Main Characters</h1>
        <div className="characters-container">
            {
                characters.map(item=><CharacterCard key={item.id} character={item} />)
                // characters.map(item=><p>{item?.name}</p>)
                
            }
        </div>
    </div>
  )
}

export default HomePage