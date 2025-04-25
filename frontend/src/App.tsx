// src/App.js
import React from 'react'
import TaskList from './components/TaskList'
import TaskCalendar from './components/TaskCalendar'

function App() {
  return (
    <div className="App">
      <h1>My Todo List</h1>
      <TaskList />
      <TaskCalendar />
    </div>
  )
}

export default App
