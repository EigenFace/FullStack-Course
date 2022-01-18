import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Person = ({name, number, deleteHandler}) => {
  return(
    <li>
      {name} {number}
      <button onClick={deleteHandler}>
        Delete
      </button>
    </li>
    )
}

const Persons = ({namesToShow, deleteHandler}) => {
  return(
  <ul>
        {namesToShow.map(person => <Person key={person.id} name={person.name} number={person.number} deleteHandler={() => deleteHandler(person.id)} />)}
  </ul>
  )
}

const Filter = ({text, onChange}) => <div>{text} <input onChange={onChange} /></div>

const PersonForm = ({newName, newNumber, onSubmit, onNameChange, onNumberChange}) => {
    return(
     <form onSubmit={onSubmit}>
        <div>name: <input value={newName} onChange={onNameChange}/> </div>
        <div>number: <input value={newNumber} onChange={onNumberChange} /> </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilterName, setFilterName] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const namesToShow = persons.filter((person) => person.name.toLowerCase().includes(newFilterName))

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id : persons.length + 1
    }
    if(persons.some((person) => person.name === newName)) {
      if(window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const changedPerson = {...person, number: newNumber}
        personService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
          })
      }
    }
    else {
      personService
        .create(personObject)
        .then(returnedPerson => { 
          setPersons(persons.concat(returnedPerson))
        })
      
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterName(event.target.value.toLowerCase())
  }

  const deleteHandler = (id) => {
    if(window.confirm("Are you sure you want to delete this person?")) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text='filter shown with' onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm onSubmit={addPerson} onNameChange={handleNameChange} 
      onNumberChange={handleNumberChange} newName={newName} newNumber={newNumber}  />
      <h2>Numbers</h2>
      <Persons namesToShow={namesToShow} deleteHandler={deleteHandler} />
    </div>
  )
}

export default App