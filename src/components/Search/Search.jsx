import React from 'react'
import './Search.css'
import axios from 'axios'

function Search({setCharacters}) {
    //need state to hold user input
    const [query, setQuery] = React.useState('')

    //https://rickandmortyapi.com/api/character/?name=rick

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(query)

        //need to make api call to filter
        axios.get(`https://rickandmortyapi.com/api/character/?name=${query}`)
        .then(res =>{
            console.log(res.data.results)
            setCharacters(res.data.results)
        })
        .catch(err => console.log(err))

    }

  return (
    <form className="search-container" onSubmit={handleSubmit}>
        <input type="text" 
               placeholder="Search all characters"
               onChange={(e)=>setQuery(e.target.value)} />

    </form>
  )
}

export default Search