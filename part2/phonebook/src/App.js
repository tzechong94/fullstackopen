import { useState, useEffect } from 'react'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import Filter from './Components/Filter'
import personService from './services/person'
import Notification from './Components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [inputSearch, setInputSearch] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(()=>{
    personService
        .getAll()
        .then(response => {
          console.log(response)
          setPersons(response.data)
        })
  }, [])

  useEffect(() => {console.log(persons)}, [persons])



  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleInputSearch = (event) => {
    setInputSearch(event.target.value)
  }

  const onDelete = (id) => {
    const person = persons.find(p => p.id === id)
    console.log("delete pressed")
    console.log("person ", person)
    let answer = window.confirm(`Confirm delete ${person.name}?`)
    console.log('answer', answer)
    console.log("person id", person.id)
    if (answer) {
      personService
        .remove(person.id)
        .then(()=>{
          setPersons(persons.filter(p=> p.id!== person.id))
        })
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    let isUpdate = false
    const nameObject = {
      name: newName,
      number: newNumber
    }
    for ( let i = 0; i < persons.length; i++) {
      if (persons[i].name.toLowerCase() === newName.toLowerCase()) {
        isUpdate = true
        if(window.confirm(`${newName} is already added. Replace number?`)){
          console.log(persons[i].id, nameObject)
          personService
            .update(persons[i].id, nameObject)
            .then((response) => {
              setPersons(persons.map((person)=> person.id !== persons[i].id ? person : response.data))
              setNotificationMessage(`${newName} updated.`)
        })
            .catch(error=>{
              setNotificationMessage(`${newName} was already removed`)
            })
          setTimeout(()=>{
            setNotificationMessage(null)
          }, 3000)
        break
      }
    }
  }

    if (!isUpdate) {
      personService.create(nameObject)
        .then(response=>{
          setPersons(persons.concat(response.data))
        })
        .then(response => {
          setNotificationMessage(`${newName} added.`)
          setTimeout(()=>{
            setNotificationMessage(null)
          },3000)
        })
    }
    isUpdate = false;
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Filter handleInputSearch={handleInputSearch}/>
      <h2>add a new</h2>
      <PersonForm handleSubmit={handleSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
       newName={newName} newNumber={newNumber}/>
      <h2>Numbers</h2>
      <Persons onDelete={onDelete} inputSearch={inputSearch} persons={persons}/>
    </div>
  )
}

export default App
