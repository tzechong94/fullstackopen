import './App.css';
import { useState } from 'react';

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({text , value}) => {
  return (

      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
  )
    
}
// remember to return

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad

  if (total === 0) {
    return (
      <div>
        <br></br>
        No Feedback Given
      </div>
    )
  }
  const average = () => (good - bad) / total
  const positive = () => (good / total) * 100 + "%"

  return (

    <div>
      <h2>statistics</h2>
      <table>
        <Statistic text="good" value={good}/>
        <Statistic text="neutral" value={neutral}/>
        <Statistic text="bad" value={bad}/>
        <Statistic text="average" value={average()}/>
        <Statistic text="positive" value={positive()}/>
      </table>
    </div>
    )

}


const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleBad = () => {
    setBad(bad+1);
  }

  const handleGood = () => {
    setGood(good+1);
  }

  const handleNeutral = () => {
    setNeutral(neutral+1);
  }


  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />

      <Statistics good={good} bad={bad} neutral={neutral}/>

    </div>
  )
}

export default App;
