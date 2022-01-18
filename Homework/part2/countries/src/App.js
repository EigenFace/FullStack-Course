import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Filter = ({text, onChange}) => <div>{text} <input onChange={onChange} /></div>

const Countries = ({countriesToShow, showDetails}) => {
  if (countriesToShow.length === 0) {
    return (
      <div>
        There are no countries to show
      </div>
    )
  }
  if (countriesToShow.length ===1) {
    return (
      <DetailedCountry country = {countriesToShow[0]} />
    )
  }
  else if(countriesToShow.length > 10) {
    return (
      <div>
        There are too many countries to show
      </div>
    )
  }
  return(
  <ul>
        {countriesToShow.map(country => 
        <Country key={country.cca2} name={country.name.common} showDetails={showDetails}/>) }
  </ul>
  )
}

const Country = ({name, showDetails}) => {
  return (
    <>
      <div>{name}</div>
      <div>
          <button onClick={() => showDetails(name)}> show </button>
      </div>
    </>
  )
}

const DetailedCountry = ({country}) => {

  const [weather, setWeather] = useState({})
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
        .get(
            `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`
        )
        .then(response => {
            setWeather(response.data.current)
        })
    return () => setWeather({})
}, [country.capital])

  return (
    <>
      <h2>{country.name.common}</h2>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
      <h1>languages</h1> <Languages languages={country.languages} />
      
      <img src={country.flags.png} alt="nothing"/>
      {Object.keys(weather) != 0 && ( 
        <>
          {console.log(weather)}
          <h2>Weather in {country.capital} </h2>
          <p><strong>temperature:</strong> {weather.temperature} Celsius</p>
          <img
            src={weather.weather_icons[0]}
            alt={weather.weather_descriptions}
          />
          <p>
            <strong>wind: </strong> {weather.wind_speed} mph direction {weather.wind_dir}
          </p> 
        </> 
        )}   
    </>

  )
}

const Languages = ({languages}) => {
  return (
    <ul>
      {Object.keys(languages).map((language) => <li key={language}>{languages[language]}</li> )}
    </ul>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilterName, setFilterName] = useState('United')

  useEffect( () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])


  //console.log(countries)

  const countriesToShow = countries.filter((country) => country.name.common.toLowerCase().includes(newFilterName))

  const handleFilterChange = (event) => {
    setFilterName(event.target.value.toLowerCase())
  }

  const showDetails = (name) => {
    setFilterName(name.toLowerCase())
  }

  return (
    <div>
      <Filter text="find countries" onChange={handleFilterChange} />
      <Countries countriesToShow={countriesToShow} showDetails = {showDetails}/>
    </div>
  )
}

export default App;
