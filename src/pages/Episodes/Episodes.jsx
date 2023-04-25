import React from 'react'
import './Episodes.css'
import axios from 'axios'

function Episodes() {

  //create state to hold the episode numbers
  const [options, setOptions] = React.useState([])
  const [selectedOption, setSelectedOption] = React.useState(1)

  //first need to create the dropdown with episode list
  //need to find out the number of episodes when the page loads
  //https://rickandmortyapi.com/api/episode

  //now store selected episode when dropdown changes, requires value={num}

  const handleSelectChange = (e)=>{
    console.log(e.target.value)
    //this needs to be stored in state
    setSelectedOption(e.target.value)
  }

  React.useEffect(
    ()=>{
        axios.get("https://rickandmortyapi.com/api/episode")
        .then(res=>{
          console.log(res.data.info.count)
          //for loop to create array of numbers
          const newOptions = []
          for (let i = 1; i <= res.data.info.count; i++){
            newOptions.push(i)
          }
          //console.log(newOptions)
          //store in state
          setOptions(newOptions)

        })
        .catch(err => console.log(err))
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
      const fetchEpisodeData = async () =>{
        
        try{
          console.log('get episode data')
          //make api call, wait for result
          const res = await axios.get(`https://rickandmortyapi.com/api/episode/${selectedOption}`);

          console.log(res)

        }catch (err){
          console.log(err)
        }
        console.log('call function')
        //have to call the function!
        fetchEpisodeData()
      }
      console.log('try done')

    }, [selectedOption]
  )
  return (
    <div className="episodes-container">
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
          <p>Episode Name:</p>
          <p>Air Date:</p>
        </div>
        <div className="character-container">
          Cards go here
        </div>
      </div>
    </div>
  )
}

export default Episodes