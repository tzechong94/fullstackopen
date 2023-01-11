const Header = (props) => {
  return (
    <h1>{props.courseName}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.part[0]} />
      <Part part={props.part[1]} />
      <Part part={props.part[2]} />
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Total exercises {props.courseParts[0].exercises + props.courseParts[1].exercises + props.courseParts[2].exercises} </p>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }

    ]
  }
  // the props name is defined in each individual component, and is assigned to the referenced value
  // when the component is called. 
  // 

  return (
    <div>
      <Header courseName={course.name} />
      <Content part={course.parts}/>
      <Total courseParts={course.parts}/>
    </div>
  )
}

export default App
