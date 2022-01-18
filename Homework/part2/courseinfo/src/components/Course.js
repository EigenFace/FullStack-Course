import React from 'react'

const Course = ({course}) => {
    return (
      <>
        <Header name = {course.name} />
        <Content parts = {course.parts} />
        <Total parts = {course.parts} />
      </>
    )
  }

  const Header = ({name}) => {
  
    return (
      <h1>{name}</h1>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <>
        {parts.map(part => <Part key = {part.id} part = {part.name} exercises = {part.exercises} />)}
      </>
    )
  }
  
  const Part = ({part, exercises}) => {
    return (
      <>
        <p>
            {part} {exercises}
        </p>
      </>
    )
  }
  
  const Total = ({parts}) => {
    const total = parts.reduce((previousValue, currValue) => {
      return({exercises: previousValue.exercises + currValue.exercises})
    })
    return (
      <>
        <p>Number of exercises { total.exercises }
        </p>
      </>
    )
  }

  export default Course