import { useState } from 'react'



const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));


  const randomQuote = () => {
    let random = Math.floor((Math.random() * anecdotes.length))
    setSelected(random);
  }

  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy);
  }

  const highestVotes = Math.max(...votes)
  const highestQuote = anecdotes[votes.indexOf(highestVotes)]

  return (
    <div>

      <div>
        <h2>Anecdote of the day</h2>
        {anecdotes[selected]} <br>
        </br>
        vote: {votes[selected]}
        <br></br>
        <button onClick={vote}>vote</button>
        <button onClick={randomQuote}>next anecdote</button>
      </div>
      <div>
        <h2>Anecdote with most votes</h2>
        <p>{highestQuote}</p>
        <p>votes: {highestVotes}</p>
      </div>
    </div>
  )
}

export default App
