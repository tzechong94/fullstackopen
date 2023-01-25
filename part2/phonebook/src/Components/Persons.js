const Persons = ({inputSearch, persons, onDelete}) => {
    return (
      inputSearch===''? persons.map(person => 
        <div>
          <p>{person.name} {person.number} <button onClick={()=>onDelete(person.id)}>delete</button></p>
        </div>
        ) : persons.filter(obj => obj.name.toLowerCase().includes(inputSearch)).map(filteredObj => (
          <p>
          {filteredObj.name} {filteredObj.number} <button onClick={()=>onDelete(filteredObj.id)}>delete</button>
        </p>
      ))
    )
  }

export default Persons;