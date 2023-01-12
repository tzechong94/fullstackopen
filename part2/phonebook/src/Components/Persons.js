const Persons = ({inputSearch, persons}) => {
    return (
      inputSearch===''? persons.map(person => 
        <div>
        <p>{person.name} {person.number}</p>
        </div>
        ) : persons.filter(obj => obj.name.toLowerCase().includes(inputSearch)).map(filteredObj => (
          <p>
          {filteredObj.name} {filteredObj.number}
        </p>
      ))
    )
  }

export default Persons