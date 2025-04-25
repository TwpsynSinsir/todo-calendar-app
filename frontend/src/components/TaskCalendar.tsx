import React, { useState, useEffect } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import axios from 'axios'
import { Task } from '../models/Tasks'

const TaskCalendar: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [error, setError] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [newTaskTitle, setNewTaskTitle] = useState<string>('')

  // Dynamically set the task's due date based on selectedDate
  const newTaskDate = selectedDate.toISOString()

  useEffect(() => {
    //Fetch tasks from the Rails API
    const fetchCalendar = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/tasks`
        )
        setTasks(response.data)
      } catch (err) {
        setError('Failed to load tasks')
        console.error('Error fetching tasks:', err)
      }
    }

    fetchCalendar()
  }, [])

  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) {
      setError('Please enter a task title')
      return
    }
    const newTask = {
      title: newTaskTitle,
      completed: false,
      due_date: newTaskDate,
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/tasks`,
        newTask
      )
      setTasks([...tasks, response.data]) // Add a new task to the list
      setNewTaskTitle('') // Reset task input
    } catch (err) {
      setError('Failed to add task')
      console.error('Error adding task:', err)
    }
  }

  // Use onClickDay instead of onChange to handle date selection
  const handleDateClick = (date: Date) => {
    setSelectedDate(date) // Update the selected date
  }

  const tasksForSelectedDate = tasks.filter((task) => {
    const taskDate = new Date(task.due_date)
    return taskDate.toDateString() === selectedDate.toDateString()
  })

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div>
      <h2>Task Calendar</h2>
      <Calendar onClickDay={handleDateClick} value={selectedDate} />
      <h3>Tasks on {selectedDate.toDateString()}</h3>

      {/* Form to add a new task */}
      <input
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        placeholder="New Task"
      />
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {tasksForSelectedDate.map((task) => (
          <li key={task.id}>
            {task.title} - {task.completed ? 'Completed' : 'Not Completed'}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TaskCalendar
