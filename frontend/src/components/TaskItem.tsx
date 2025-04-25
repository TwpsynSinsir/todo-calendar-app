import React from 'react'
import { Task } from '../models/Tasks'

interface TaskItemProps {
  task: Task
  onToggleCompletion: (id: number) => void // Function passed from TaskList
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleCompletion }) => {
  return (
    <li>
      <span>
        {task.title} - {task.completed ? 'Completed' : 'Not Completed'}
      </span>
      <button onClick={() => onToggleCompletion(task.id)}>
        {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
      </button>
    </li>
  )
}

export default TaskItem
