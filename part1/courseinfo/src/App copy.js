// exercise 1
// const Hello = ({name, age}) => {
//   // const {name, age} = props
//   const bornYear = () => {
//     const yearNow = new Date().getFullYear()
//     return yearNow - props.age
//   }

//   return (
//     <div>
//       <p>
//         Hello {name}, you are {age} years old
//       </p>
//       <p>So you were born in {bornYear()}</p>
//     </div>
//   )
  
// }

//exercise 2 state

// import {useState} from 'react';

// const Display = ({counter}) => {
//   return (
//     <div>{counter}</div>
//   )
// }

// const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>
 
// const App = (props) => {

//   // when state is change, react rerenders
//   //Calling a function that changes the state causes the component to rerender.
//   const [counter, setCounter] = useState(0)

//   const increaseByOne = () => setCounter(counter+1)
//   const decreaseByOne = () => setCounter(counter-1)
//   const zero = () => setCounter(0)

//   return (
//     <div>
//       <Display counter={counter}/>
//       <Button onClick={increaseByOne} text="plus"/>
//       <Button onClick={decreaseByOne} text="minus"/>
//       <Button onClick={zero} text="Reset"/>
//     </div>
//   )
// }
// // event handle is supposed to be either a function or a function reference, not a function call

// export default App;

// exercise 3 complex state 

const App = () => {
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  })

  const handleLeftClick = () => {
    // ...clicks creates a new object that has copies
    //   // of all the properties of the click object
    // if properties from previous state object are not changed,
    // they need to simply be copied, then updated the other properties,
    // then setting as new state. otherwise, unexpected side effects.
    setClicks({...clicks, left: clicks.left + 1})
  }

  const handleRightClick = () => {
    setClicks({...clicks, right: clicks.right + 1})
  }

  return (
    <div>
      {clicks.left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {clicks.right}

    </div>

  )

}

// part 1d handle arrays

