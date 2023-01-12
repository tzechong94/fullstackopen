const Total = ({parts}) => {
    const total = parts.map(s=>s.exercises).reduce((accumulator, currentValue) => accumulator + currentValue)
      return (
        <div>
          total of {total} exercises
        </div>
        )
      }


export default Total;