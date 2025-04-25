// src/TaskList.js
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const TaskList = () => {
  const [tasks, setTasks] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    // Fetch tasks from the Rails API
    axios
      .get('http://localhost:3000/tasks')
      .then((response) => {
        setTasks(response.data) // Save data to state
      })
      .catch((err) => {
        setError('Failed to load tasks')
        console.error(err)
      })
  }, []) // Empty array means it runs once when the component mounts

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.completed ? 'Completed' : 'Not Completed'}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TaskList
