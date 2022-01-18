import React, { useState } from 'react'

const Button = ({clickHandler, text}) => (
  <button onClick={clickHandler}>
    {text}
  </button>
)

const Display = ({text}) => (
  <h1>{text}</h1>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint16Array(anecdotes.length))

  function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

  function findMaxVote(votes) {
    return votes.reduce((max, curr, currIdx, votes) => curr > votes[max] ? currIdx : max, 0)
  }

  const handleVotes = (index) => () => {
    const copy = [...votes]
    copy[index] += 1
    setVotes(copy)
  }

  return (
    <>
      <Display text="Anecdote of the day" />
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <Button clickHandler = {handleVotes(selected)} text = "vote"/>
      <Button clickHandler ={() => setSelected(getRandomInt(anecdotes.length))} text="next anecdote" />
      <Display text="Anecdote with most votes" />
      <div>{anecdotes[findMaxVote(votes)]}</div>
    </>
  )
}

export default App
