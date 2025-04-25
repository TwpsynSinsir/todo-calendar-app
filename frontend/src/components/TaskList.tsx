// src/TaskList.js
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Task } from '../models/Tasks'
import TaskItem from './TaskItem'

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Fetch tasks from the Rails API
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/tasks`
        )
        setTasks(response.data) // Save data to state
      } catch (err) {
        setError('Failed to load tasks')
        console.error('Error fetching tasks:', err)
      }
    }

    fetchTasks()
  }, []) // Empty array means it runs once when the component mounts

  const handleToggleCompletion = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  if (error) {
    return <div>{error}</div>
  }
  // Passing th task to TaskItem as a prop
  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleCompletion={handleToggleCompletion}
          />
        ))}
      </ul>
    </div>
  )
}

export default TaskList
