import { useEffect, useState } from "react";
import axios from 'axios'


const App = () => {

  const [countries, setCountries] = useState([])
  const [userInput, setUserInput] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(()=>{
    axios
        .get('https://restcountries.com/v3.1/all')
        .then(response => {
          setCountries(response.data)
        })
  }, [])

  const handleInputChange = (event) => {
    setUserInput(event.target.value)
  }

  const View = ({filteredCountries, languages}) => {
    return (

      <div>
        <h2>
            {filteredCountries.map(filtered => filtered.name.common)}
        </h2>
        <p>capital {filteredCountries.map(filtered => filtered.capital)}</p>
        <p>area {filteredCountries.map(filtered => filtered.area)}</p>

        <h3>languages: </h3>
        <ul>
          {languages.map(s=> Object.values(s).map(s => 
            <li>{s}</li>))}
        </ul>
        <img alt="" src={filteredCountries.map(filtered => filtered.flags.png)[0]}></img>
      
      </div>

)
}

  // name
  // capital
  // area

  //languages
  // flag

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(userInput))
  const languages = Object.values(filteredCountries.map(s=>s.languages))
  return (
    <div>
      find countries
      <input onChange={handleInputChange}></input>
      <div>
        {userInput==='' ? '' : 
          filteredCountries.length>10 ? 
          <p>
            Too many matches, specify another filter
          </p> : 
          filteredCountries.length === 1 ?
          <View filteredCountries={filteredCountries} languages={languages}/>
          :
          filteredCountries.map(filteredCountry => 
          <div>
            {filteredCountry.name.common}
            <button onClick={() => setShowAll(!showAll)}>
              {showAll? 'show' : 'hide'}
            </button>
            
          </div>)
          }
          
      </div>
    </div>
  );
}

export default App;
