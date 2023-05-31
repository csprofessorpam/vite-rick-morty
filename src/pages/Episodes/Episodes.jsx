import React, {useContext} from 'react'
import './Episodes.css'
import axios from 'axios'
import CharacterCard from '../../components/CharacterCard/CharacterCard'
import { ThemeContext } from '../../contexts/ThemeContext'



function Episodes() {
  //use global state for darkMode
  //NOTE {} not []
  const {darkMode, setDarkMode} = useContext(ThemeContext)

  //create state to hold the episode numbers
  const [options, setOptions] = React.useState([])
  const [selectedOption, setSelectedOption] = React.useState(1)
  const [selectedEpisode, setSelectedEpisode] = React.useState()
  const [characterList, setCharacterList] = React.useState([])

  //first need to create the dropdown with episode list
  //need to find out the number of episodes when the page loads
  //https://rickandmortyapi.com/api/episode

  //now store selected episode when dropdown changes, requires value={num}

  

  const fetchEpisodeData = async () =>{
    //console.log('fetching')
    
    try{
      //console.log('get episode data')
      //make api call, wait for result
      const res = await axios.get(`https://rickandmortyapi.com/api/episode/${selectedOption}`);

      console.log(res.data)
      //need to store this episode data in state
      setSelectedEpisode(res.data)

      //res.data.characters has the endpoint needed 
      //to get each character's data
      //need to make all these api calls to 
      //gather the info to render 

      const episodeCharacters = await Promise.all(
        res.data.characters.map(url => {
          return axios.get(url).then(res => res.data)
        })
      )
      console.log(episodeCharacters)
      //store in state
      setCharacterList(episodeCharacters)
      //now map to CharacterCard to render 


    }catch (err){
      console.log(err)
    }
    //console.log('try done')
    
  }

  const handleSelectChange = (e)=>{
    console.log(e.target.value)
    //this needs to be stored in state
    setSelectedOption(e.target.value)
    //fetchEpisodeData()
  }

  React.useEffect(
    ()=>{
      //first find out the number of episodes
        axios.get("https://rickandmortyapi.com/api/episode")
        .then(res=>{
          console.log(res.data.info.count)
          //for loop to create array of numbers
          const newOptions = []
          for (let i = 1; i <= res.data.info.count; i++){
            newOptions.push(i)
            //options.push[i]
          }
          console.log(options)
          //console.log(newOptions)
          //store in state
          setOptions(newOptions)

        })
        .catch(err => console.log(err))

        //fetchEpisodeData()
    }, []
  )

  //need useEffect to run when selectedOption changes
  
  React.useEffect(
    ()=>{
      console.log('you selected', selectedOption)
      //need to get data from this episode
      //https://rickandmortyapi.com/api/episode/28
      //but then need to make api call for each 
      //character in that episode
      //use async js
      //asynch makes a function return a promise
      // const fetchEpisodeData = async () =>{
      //   //console.log('fetching')
        
      //   try{
      //     //console.log('get episode data')
      //     //make api call, wait for result
      //     //await makes the function pause and wait for
      //     //resolved promise before continuing
      //     //we have to make multiple api calls so easier
      //     //in try catch
      //     //get the specific episode data
      //     const res = await axios.get(`https://rickandmortyapi.com/api/episode/${selectedOption}`);

      //     console.log(res.data)
      //     //need to store this episode data in state
      //     setSelectedEpisode(res.data)

      //     //res.data.characters has the endpoint needed 
      //     //to get each character's data
      //     //need to make all these api calls to 
      //     //gather the info to render 

      //     const episodeCharacters = await Promise.all(
      //       res.data.characters.map(url => {
      //         return axios.get(url).then(res => res.data)
      //       })
      //     )
      //     console.log(episodeCharacters)
      //     //store in state
      //     setCharacterList(episodeCharacters)
      //     //now map to CharacterCard to render 

      //   }catch (err){
      //     console.log(err)
      //   }
      //   //console.log('try done')
        
      // }
      
      //console.log('call function')
        //have to call the function!
        fetchEpisodeData()

    }, [selectedOption]
  )
  
  return (
    <div className={darkMode?"episodes-container episodes-dark"  :"episodes-container"}>
      <div>
        <label htmlFor="select-episode">Select an episode:</label>
        <select id="select-episode" onChange={handleSelectChange}>
          {
            options.map(num => 
            <option key={num} value={num}>{`Episode ${num}`}</option>
            )
          }
        </select>
      </div>
      <div>
        <div className="episode-info">
          <p>Episode Name: {selectedEpisode?.name}</p>
          <p>Air Date: {selectedEpisode?.air_date}</p>
        </div>
        <div className="character-container">
          {
            characterList.map(item => <CharacterCard character={item} key={item.id} />)
          }
        </div>
      </div>
    </div>
  )
}

export default Episodes