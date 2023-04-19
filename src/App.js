// npx json-server --port 3001 --watch db.json
// Para levantar el servidor
import { useState, useEffect } from 'react'


import Person from './services/persons'

const person = new Person()

const Filter = ({ newFilter, handleFilterChange }) => {

  return (
    <>
      <h2>Filtro</h2>
      <input title={'filter:'} value={newFilter} onChange={handleFilterChange} />
      <br />
    </>
  )
}

const Persons = ({ persons, filterPersons, setPersons, persona, setMessage }) => {

  const regex = new RegExp(filterPersons, 'i');
  const match = persons.map((person) => person.name).filter(person => person.match(regex))


  const deletePersons = (id, name) => {
    console.log(name);
    const value = window.confirm('Are you sure you want to delete', id)
    if (!value) {
      return alert('The operation was canceled')
    }

    person.deletePerson(id).then(
      setPersons(persona.filter(person => person.id !== id))
    ).then(
      setMessage(`Person '${name}' was already removed from server`))
      .then(
        setTimeout(() => {
        setMessage(null)
      }, 5000)
      )
    
      
    }
      


if (match.length === 1) {

  const result = persons.find(person => person.name === match[0])
  // const resultName = result.name
  
  return (
    <>
      <li key={result.id}> {result.name} {result.number} <button onClick={() => deletePersons(result.id, result.name)}>delete</button> </li>
    </>
  )

}

if (match.length === 0) {
  return (
    <h1>Sin contactos</h1>
  )
}

return (
  <>

    {persons.map((person) => <li key={person.id}>
      {person.name} {person.number} <button onClick={() => deletePersons(person.id, person.name)}>delete</button>
    </li>
    )}

  </>
)



}


const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [persons, setPersons] = useState([])
  const [message, setMessage] = useState('')
  const [messageAdded, setMessageAdded] = useState('')

  useEffect(() => {
    person
      .getAll()
      .then(initialPerson => {
        setPersons(initialPerson)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };

    const existsPerson = persons.find(person => person.name.toLowerCase() === personObject.name.toLowerCase())
    if (!existsPerson) {
      (persons.length > 0) ? personObject.id = persons[persons.length - 1].id + 1 : personObject.id = 1
      console.log(personObject);
      person.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      }).then(
        setMessageAdded(`Person ${personObject.name} added`))
        .then(
          setTimeout(() => {
            setMessageAdded(null)
        }, 5000)
        )

    }

    const value = window.confirm(`Are you sure to update the contact: ${personObject.name}`)
    if (!value) {
      return alert('The operation was canceled')
    }
    console.log('update');



    person.update(existsPerson.id, personObject).then(() => {
      setPersons(persons.map(persona => {
        if (persona.name === personObject.name) {
          persona = Object.assign(existsPerson, personObject)
          return persona
        }
        return persona
      }))
    })
    setNewName('')
    setNewNumber('')
    return alert('Person actually added')

  }





  const handleNameChange = (event) => {

    setNewName(event.target.value)

  }
  const handleNumberChange = (event) => {

    setNewNumber(event.target.value)

  }
  const handleFilterChange = (event) => {

    setNewFilter(event.target.value)
  }

  const styleColor = {
    color: 'red',
    backgroundColor: 'gray',
    borderRaidus: 10
  }
  const styleColorAdded = {
    color: 'green',
    backgroundColor: 'purple',
    fontZise: 'bold',
  }

  return (
    <>
      <h1>Phonebook</h1>
      <h2 style={styleColor}>{message}</h2>
      <h2 style={styleColorAdded}>{messageAdded}</h2>
      <h2>Add new</h2>
      <Filter newFilter={newFilter} persons={persons} handleFilterChange={handleFilterChange} />
      <br />
      <br />
      <form onSubmit={addPerson} >

        name:
        <input title={'name:'} value={newName} onChange={handleNameChange} />
        <br />
        <br />
        number:
        <input title={'number: '} value={newNumber} onChange={handleNumberChange} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <Persons persons={persons} filterPersons={newFilter} setPersons={setPersons} persona={persons} setMessage={setMessage} />
    </>
  )
}

export default App